import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        
        const { name, email, company, contactMethod, message, package: selectedPackage } = data;

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

        // Here you would typically:
        // 1. Send an email notification
        // 2. Store in database
        // 3. Send to CRM
        // For now, we'll just log and return success
        
        console.log('📧 Contact form submission:', {
            name,
            email,
            company: company || 'Ei ilmoitettu',
            contactMethod: contactMethod || 'Sähköposti',
            message,
            package: selectedPackage || 'Ei valittu',
            timestamp: new Date().toISOString(),
        });

        // TODO: Implement actual email sending with Resend, SendGrid, etc.
        // Example with Resend:
        // await resend.emails.send({
        //     from: 'noreply@digipaja.fi',
        //     to: 'contact@digipaja.fi',
        //     subject: `Uusi yhteydenotto: ${name}`,
        //     html: `...`
        // });

        return NextResponse.json({ 
            success: true, 
            message: 'Viesti vastaanotettu onnistuneesti' 
        });

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Viestin lähetys epäonnistui. Yritä uudelleen.' },
            { status: 500 }
        );
    }
}
