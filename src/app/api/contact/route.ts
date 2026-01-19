import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiter (resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3; // Max 3 submissions per minute per IP

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);
    
    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return false;
    }
    
    if (record.count >= MAX_REQUESTS_PER_WINDOW) {
        return true;
    }
    
    record.count++;
    return false;
}

export async function POST(request: Request) {
    try {
        // Get IP for rate limiting
        const forwardedFor = request.headers.get('x-forwarded-for');
        const ip = forwardedFor?.split(',')[0]?.trim() || 'unknown';
        
        // Check rate limit
        if (isRateLimited(ip)) {
            console.log('🚫 Rate limited:', ip);
            return NextResponse.json(
                { error: 'Liian monta yritystä. Odota hetki ennen uutta lähetystä.' },
                { status: 429 }
            );
        }

        const data = await request.json();
        
        const { 
            name, email, phone, company, projectType, budget, message, 
            referenceLinks, contactMethod, selectedFeatures, currentWebsite, referralSource,
            _honeypot, _timestamp 
        } = data;

        // Honeypot check - if this hidden field is filled, it's a bot
        if (_honeypot) {
            console.log('🍯 Honeypot triggered - bot detected');
            // Return success to fool the bot, but don't send email
            return NextResponse.json({ success: true, message: 'Viesti lähetetty' });
        }

        // Timestamp check - form must be open for at least 3 seconds
        if (_timestamp) {
            const submissionTime = Date.now() - parseInt(_timestamp, 10);
            if (submissionTime < 3000) {
                console.log('⏱️ Too fast submission - likely bot:', submissionTime, 'ms');
                return NextResponse.json(
                    { error: 'Lomake lähetettiin liian nopeasti. Yritä uudelleen.' },
                    { status: 400 }
                );
            }
        }

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Nimi, sähköposti ja viesti ovat pakollisia kenttiä' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Virheellinen sähköpostiosoite' },
                { status: 400 }
            );
        }

        // Spam phrase check - only obvious spam phrases, not legitimate business terms
        const spamPhrases = [
            'click here now',
            'act now',
            'limited time offer',
            'you have won',
            'you are a winner',
            'free money',
            'make money fast',
            'earn extra cash',
            'double your',
            'nigerian prince',
            'dear friend',
            'dear sir/madam',
            'buy viagra',
            'cheap pills',
            'weight loss',
            'work from home opportunity',
            'no obligation',
            'risk free',
            'act immediately',
            'call now',
            'order now',
            'urgent response',
            'this is not spam',
        ];
        const messageAndName = `${name} ${message}`.toLowerCase();
        const hasSpamPhrases = spamPhrases.some(phrase => messageAndName.includes(phrase));
        if (hasSpamPhrases) {
            console.log('🚨 Spam phrase detected');
            return NextResponse.json({ success: true, message: 'Viesti lähetetty' });
        }

        // Check for API key
        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY is not configured');
            return NextResponse.json(
                { error: 'Sähköpostipalvelu ei ole käytettävissä. Ota yhteyttä suoraan: info@digipajaoulu.fi' },
                { status: 500 }
            );
        }

        // Filter out empty links
        const validLinks = Array.isArray(referenceLinks) 
            ? referenceLinks.filter((link: string) => link && link.trim() !== '') 
            : [];

        // Parse features array and map to readable names
        const featuresArray = Array.isArray(selectedFeatures) ? selectedFeatures : [];
        const featureLabels: Record<string, string> = {
            'cms': '📝 Sisällönhallinta (CMS)',
            'blog': '📰 Blogi / Uutiset',
            'ecommerce': '🛒 Verkkokauppa',
            'booking': '📅 Ajanvaraus',
            'seo-advanced': '🔍 SEO-optimointi',
            'analytics': '📊 Analytiikka',
            'multilingual': '🌍 Monikielisyys',
            'animations': '✨ Animaatiot',
            'user-accounts': '👤 Käyttäjätilit',
            'api-integrations': '🔗 API-integraatiot',
            'contact-form': '📧 Lomakkeet',
            'live-chat': '💬 Live Chat',
            'responsive': '📱 Responsiivinen',
            'basic-seo': '🔍 Perus-SEO',
        };

        // Package labels
        const packageLabels: Record<string, string> = {
            'kipina': '🔥 Kipinä',
            'hehku': '🌟 Hehku', 
            'roihu': '🚀 Roihu',
        };

        const formattedPackage = packageLabels[projectType?.toLowerCase()] || projectType;

        // Format the email content
        const emailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; background-color: #0a0b10; font-family: 'Segoe UI', Arial, sans-serif;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #0a0b10;">
                    
                    <!-- Header with Logo -->
                    <div style="background: linear-gradient(135deg, #1a1b20 0%, #0a0b10 100%); padding: 40px 30px; text-align: center; border-bottom: 3px solid #ff8a3c;">
                        <div style="margin-bottom: 20px;">
                            <!-- Digipaja Logo PNG -->
                            <img src="https://digipajaoulu.fi/image/DigipajaLogo.png" alt="Digipaja Oulu" width="280" style="max-width: 100%; height: auto;" />
                        </div>
                        <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 600; letter-spacing: 1px;">
                            ✉️ Uusi yhteydenotto
                        </h1>
                        <p style="margin: 10px 0 0; color: #888; font-size: 14px;">
                            ${new Date().toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                    
                    <!-- Main Content -->
                    <div style="padding: 30px;">
                        
                        <!-- Contact Info Card -->
                        <div style="background: linear-gradient(135deg, #1a1b20 0%, #15161b 100%); border-radius: 12px; padding: 25px; margin-bottom: 20px; border-left: 4px solid #ff8a3c;">
                            <h2 style="margin: 0 0 20px; color: #ff8a3c; font-size: 16px; text-transform: uppercase; letter-spacing: 2px;">
                                👤 Yhteystiedot
                            </h2>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; color: #888; font-size: 13px; width: 120px;">Nimi</td>
                                    <td style="padding: 8px 0; color: #fff; font-size: 15px; font-weight: 600;">${name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #888; font-size: 13px;">Sähköposti</td>
                                    <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #ff8a3c; text-decoration: none; font-size: 15px;">${email}</a></td>
                                </tr>
                                ${phone ? `
                                <tr>
                                    <td style="padding: 8px 0; color: #888; font-size: 13px;">Puhelin</td>
                                    <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #ff8a3c; text-decoration: none; font-size: 15px;">${phone}</a></td>
                                </tr>
                                ` : ''}
                                ${company ? `
                                <tr>
                                    <td style="padding: 8px 0; color: #888; font-size: 13px;">Yritys</td>
                                    <td style="padding: 8px 0; color: #fff; font-size: 15px;">${company}</td>
                                </tr>
                                ` : ''}
                                ${contactMethod ? `
                                <tr>
                                    <td style="padding: 8px 0; color: #888; font-size: 13px;">Yhteydenotto</td>
                                    <td style="padding: 8px 0; color: #fff; font-size: 15px;">${contactMethod === 'email' ? '📧 Sähköpostilla' : '📞 Puhelimitse'}</td>
                                </tr>
                                ` : ''}
                            </table>
                        </div>
                        
                        ${projectType || budget || featuresArray.length > 0 ? `
                        <!-- Project Details Card -->
                        <div style="background: linear-gradient(135deg, #1a1b20 0%, #15161b 100%); border-radius: 12px; padding: 25px; margin-bottom: 20px; border-left: 4px solid #4a9eff;">
                            <h2 style="margin: 0 0 20px; color: #4a9eff; font-size: 16px; text-transform: uppercase; letter-spacing: 2px;">
                                📋 Projektin tiedot
                            </h2>
                            ${projectType ? `
                            <div style="margin-bottom: 15px;">
                                <span style="color: #888; font-size: 13px;">Valittu paketti</span>
                                <div style="margin-top: 5px; display: inline-block; background: linear-gradient(135deg, #ff8a3c 0%, #ff6b00 100%); color: #fff; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600;">
                                    ${formattedPackage}
                                </div>
                            </div>
                            ` : ''}
                            ${budget ? `
                            <div style="margin-bottom: 15px;">
                                <span style="color: #888; font-size: 13px;">Budjetti</span>
                                <div style="margin-top: 5px; color: #fff; font-size: 15px; font-weight: 500;">${budget}</div>
                            </div>
                            ` : ''}
                            ${featuresArray.length > 0 ? `
                            <div>
                                <span style="color: #888; font-size: 13px;">Valitut ominaisuudet</span>
                                <div style="margin-top: 10px;">
                                    ${featuresArray.map((f: string) => `
                                        <div style="display: inline-block; background: rgba(74, 158, 255, 0.15); color: #4a9eff; padding: 6px 12px; border-radius: 6px; font-size: 13px; margin: 4px 4px 4px 0; border: 1px solid rgba(74, 158, 255, 0.3);">
                                            ${featureLabels[f] || f}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            ` : ''}
                        </div>
                        ` : ''}
                        
                        <!-- Message Card -->
                        <div style="background: linear-gradient(135deg, #1a1b20 0%, #15161b 100%); border-radius: 12px; padding: 25px; margin-bottom: 20px; border-left: 4px solid #10b981;">
                            <h2 style="margin: 0 0 20px; color: #10b981; font-size: 16px; text-transform: uppercase; letter-spacing: 2px;">
                                💬 Viesti
                            </h2>
                            <div style="color: #e0e0e0; font-size: 15px; line-height: 1.7; white-space: pre-wrap; background: rgba(16, 185, 129, 0.05); padding: 15px; border-radius: 8px; border: 1px solid rgba(16, 185, 129, 0.2);">
${message}
                            </div>
                        </div>
                        
                        ${currentWebsite || referralSource ? `
                        <!-- Additional Info Card -->
                        <div style="background: linear-gradient(135deg, #1a1b20 0%, #15161b 100%); border-radius: 12px; padding: 25px; margin-bottom: 20px; border-left: 4px solid #a855f7;">
                            <h2 style="margin: 0 0 20px; color: #a855f7; font-size: 16px; text-transform: uppercase; letter-spacing: 2px;">
                                📎 Lisätiedot
                            </h2>
                            <table style="width: 100%; border-collapse: collapse;">
                                ${currentWebsite ? (() => {
                                    const fullUrl = currentWebsite.startsWith('http') ? currentWebsite : `https://${currentWebsite}`;
                                    const displayUrl = currentWebsite.replace(/^https?:\/\//, '').replace(/\/$/, '');
                                    return `
                                <tr>
                                    <td style="padding: 8px 0; color: #888; font-size: 13px; width: 140px;">Nykyinen sivusto</td>
                                    <td style="padding: 8px 0;"><a href="${fullUrl}" target="_blank" style="color: #a855f7; text-decoration: underline; font-size: 14px;">${displayUrl}</a></td>
                                </tr>
                                `})() : ''}
                                ${referralSource ? `
                                <tr>
                                    <td style="padding: 8px 0; color: #888; font-size: 13px;">Mistä kuuli meistä</td>
                                    <td style="padding: 8px 0; color: #fff; font-size: 14px;">${referralSource}</td>
                                </tr>
                                ` : ''}
                            </table>
                        </div>
                        ` : ''}
                        
                        ${validLinks.length > 0 ? `
                        <!-- Reference Links Card -->
                        <div style="background: linear-gradient(135deg, #1a1b20 0%, #15161b 100%); border-radius: 12px; padding: 25px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
                            <h2 style="margin: 0 0 20px; color: #f59e0b; font-size: 16px; text-transform: uppercase; letter-spacing: 2px;">
                                🔗 Inspiraatio / Kilpailijat
                            </h2>
                            ${validLinks.map((link: string, i: number) => {
                                // Ensure link has protocol for proper hyperlinking
                                const fullUrl = link.startsWith('http') ? link : `https://${link}`;
                                // Extract domain for display
                                const displayUrl = link.replace(/^https?:\/\//, '').replace(/\/$/, '');
                                return `
                                <div style="margin-bottom: 10px; padding: 15px; background: rgba(245, 158, 11, 0.1); border-radius: 8px; border: 1px solid rgba(245, 158, 11, 0.2);">
                                    <table style="width: 100%; border-collapse: collapse;">
                                        <tr>
                                            <td style="width: 30px; vertical-align: top;">
                                                <span style="display: inline-block; background: #f59e0b; color: #000; width: 22px; height: 22px; border-radius: 50%; text-align: center; line-height: 22px; font-size: 12px; font-weight: bold;">${i + 1}</span>
                                            </td>
                                            <td style="vertical-align: top;">
                                                <a href="${fullUrl}" target="_blank" style="color: #f59e0b; text-decoration: underline; font-size: 15px; font-weight: 500;">${displayUrl}</a>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            `}).join('')}
                        </div>
                        ` : ''}
                        
                    </div>
                    
                    <!-- Footer -->
                    <div style="background: #0a0b10; padding: 25px 30px; text-align: center; border-top: 1px solid #1a1b20;">
                        <p style="margin: 0 0 10px; color: #555; font-size: 12px;">
                            Tämä viesti lähetettiin automaattisesti Digipajan verkkosivuilta
                        </p>
                        <p style="margin: 0; color: #ff8a3c; font-size: 14px; font-weight: 500;">
                            digipajaoulu.fi
                        </p>
                    </div>
                    
                </div>
            </body>
            </html>
        `;

        // Send email using Resend
        const { data: emailData, error: emailError } = await resend.emails.send({
            from: 'Digipaja Yhteydenotto <noreply@digipajaoulu.fi>',
            to: ['info@digipajaoulu.fi'],
            replyTo: email,
            subject: `Uusi yhteydenotto: ${name}${company ? ` (${company})` : ''}`,
            html: emailHtml,
        });

        if (emailError) {
            console.error('Resend error:', emailError);
            return NextResponse.json(
                { error: 'Viestin lähetys epäonnistui. Yritä uudelleen tai ota yhteyttä suoraan: info@digipajaoulu.fi' },
                { status: 500 }
            );
        }

        console.log('📧 Email sent successfully:', emailData?.id);

        return NextResponse.json({ 
            success: true, 
            message: 'Viesti lähetetty onnistuneesti' 
        });

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Viestin lähetys epäonnistui. Yritä uudelleen.' },
            { status: 500 }
        );
    }
}
