"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ExpandablePricingCards,
  type PricingTier,
} from "@/components/sections/Pricing/Content";

type FormData = {
  // Step 1: Contact Info
  name: string;
  email: string;
  company: string;
  phone: string;
  // Step 2: Preferred contact
  contactMethod: "email" | "phone" | "";
  // Step 3: Package
  selectedPackage: "kipina" | "hehku" | "roihu" | "";
  // Step 4: Features
  selectedFeatures: string[];
  // Step 5: Message
  message: string;
  // Step 6: Additional info
  currentWebsite: string;
  competitorLinks: string[];
  referralSource: string;
  budget: string;
};

function CTAButton({
  onClick,
  disabled,
  isLoading,
  loadingText,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      style={{ fontFamily: "var(--font-goldman)" }}
      className="group relative isolate flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#ff8a3c] transition-colors duration-300 cursor-pointer hover:text-white hover:shadow-[0_0_20px_rgba(255,138,60,0.2)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-[#ff8a3c] disabled:hover:shadow-none"
    >
      <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full group-disabled:group-hover:h-3 group-disabled:group-hover:w-3" />
      <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full group-disabled:group-hover:h-3 group-disabled:group-hover:w-3" />
      <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full group-disabled:group-hover:h-3 group-disabled:group-hover:w-3" />
      <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full group-disabled:group-hover:h-3 group-disabled:group-hover:w-3" />
      <span className="absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover:opacity-10 group-disabled:group-hover:opacity-0" />
      {isLoading ? (
        <>
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="relative z-10">{loadingText}</span>
        </>
      ) : (
        <>
          <span className="relative z-10">{children}</span>
          <svg className="relative z-10 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 12 12" fill="none">
            <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </>
      )}
    </button>
  );
}

export type Package = {
  id: "kipina" | "hehku" | "roihu";
  name: string;
  price: string;
  description: string;
  features: string[];
  maxPages: number;
  allowedFeatures: string[];
  // PricingTier fields for display
  monthlyLabel?: string;
  monthlyValue?: string;
  monthlyIncluded?: string[];
  monthlyExcluded?: string[];
  cta?: string;
  highlight?: boolean;
};

export type Feature = {
  id: string;
  label: string;
  description: string;
};

export type Translations = {
  steps: {
    contactInfo: {
      title: string;
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      company: string;
      companyPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
    };
    contactMethod: {
      title: string;
      email: { label: string; description: string };
      phone: { label: string; description: string };
    };
    package: {
      title: string;
      subtitle: string;
    };
    features: {
      title: string;
      subtitle: string;
      limitWarning: string;
      changePackage: string;
      selectedPackage: string;
    };
    message: {
      title: string;
      placeholder: string;
    };
    additional: {
      title: string;
      currentWebsite: string;
      currentWebsitePlaceholder: string;
      competitors: string;
      competitorsPlaceholder: string;
      referral: string;
      referralPlaceholder: string;
      budget: string;
      budgetPlaceholder: string;
    };
  };
  ui: {
    back: string;
    next: string;
    submit: string;
    sending: string;
    optional: string;
    addLink?: string;
  };
  success: {
    title: string;
    message: string;
    backHome: string;
  };
  packages: Package[];
  features: Feature[];
};

// STEP INDICATOR COMPONENT
function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex flex-col items-center gap-0">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        
        return (
          <div key={index} className="flex flex-col items-center">
            {/* Step dot */}
            <div
              className={`
                relative w-2.5 h-2.5 rounded-full transition-all duration-500
                ${isCurrent 
                  ? "bg-[#ff8a3c] shadow-[0_0_12px_rgba(255,138,60,0.6)]" 
                  : isCompleted 
                    ? "bg-[#ff8a3c]/60" 
                    : "bg-white/10"
                }
              `}
            >
              {isCurrent && (
                <div className="absolute inset-0 rounded-full bg-[#ff8a3c] animate-ping opacity-30" />
              )}
            </div>
            {/* Connector line */}
            {index < totalSteps - 1 && (
              <div
                className={`
                  w-px h-12 transition-all duration-500
                  ${isCompleted ? "bg-[#ff8a3c]/40" : "bg-white/10"}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

const TOTAL_STEPS = 6;

// Map package names to IDs
const PACKAGE_NAME_TO_ID: Record<string, "kipina" | "hehku" | "roihu"> = {
  "Kipinä": "kipina",
  "Hehku": "hehku",
  "Roihu": "roihu",
};

// MAIN COMPONENT
export default function ConversationalContactForm({ t }: { t: Translations }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [preSelectedPackage, setPreSelectedPackage] = useState<string | null>(null);
  const [showPackageSelector, setShowPackageSelector] = useState(false);
  const [honeypot, setHoneypot] = useState(""); // Spam protection
  const [formLoadTime] = useState(() => Date.now()); // Track when form was loaded

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = pathname?.startsWith("/en") ? "en" : "fi";

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    contactMethod: "",
    selectedPackage: "",
    selectedFeatures: [],
    message: "",
    currentWebsite: "",
    competitorLinks: [""],
    referralSource: "",
    budget: "",
  });

  // Handle URL param for pre-selected package
  useEffect(() => {
    const packageParam = searchParams.get("package");
    if (packageParam) {
      const packageId = PACKAGE_NAME_TO_ID[packageParam];
      if (packageId) {
        setPreSelectedPackage(packageParam);
        setFormData(prev => ({ ...prev, selectedPackage: packageId }));
      }
    }
  }, [searchParams]);

  const updateFormData = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (featureId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(featureId)
        ? prev.selectedFeatures.filter((f) => f !== featureId)
        : [...prev.selectedFeatures, featureId],
    }));
  };

  // Get allowed features based on selected package
  const getAllowedFeatures = useCallback(() => {
    const pkg = t.packages.find((p) => p.id === formData.selectedPackage);
    return pkg?.allowedFeatures || [];
  }, [formData.selectedPackage, t.packages]);

  // Animate transition between steps - clip/mask reveal animation
  const animateTransition = useCallback(
    (direction: 1 | -1, callback: () => void) => {
      if (!contentRef.current || isAnimating) return;

      setIsAnimating(true);
      const content = contentRef.current;
      
      // Get all elements with the anim-item class (the inner content)
      const items = content.querySelectorAll(".anim-item");
      
      // Exit animation: slide up out of the overflow-hidden container
      gsap.to(items, {
        yPercent: direction > 0 ? -100 : 100,
        duration: 0.5,
        stagger: 0.05,
        ease: "power3.in",
        onComplete: () => {
          callback();
          
          requestAnimationFrame(() => {
            const newItems = content.querySelectorAll(".anim-item");
            
            // Set starting position: below the container
            gsap.set(newItems, { 
              yPercent: direction > 0 ? 100 : -100
            });
            
            // Entrance animation: slide up into view
            gsap.to(newItems, {
              yPercent: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "expo.out",
              onComplete: () => setIsAnimating(false),
            });
          });
        },
      });
    },
    [isAnimating]
  );

  const canProceed = useCallback(() => {
    switch (currentStep) {
      case 0:
        return (
          formData.name.trim() !== "" &&
          formData.email.trim() !== "" &&
          formData.email.includes("@")
        );
      case 1:
        return formData.contactMethod !== "";
      case 2:
        return formData.selectedPackage !== "";
      case 3:
        return true; // Features are optional
      case 4:
        return formData.message.trim() !== "";
      case 5:
        return true; // Additional info is optional
      default:
        return false;
    }
  }, [currentStep, formData]);

  // Check if we should skip the package step (step 2) because it was pre-selected
  const shouldSkipPackageStep = useCallback(() => {
    return preSelectedPackage !== null && !showPackageSelector;
  }, [preSelectedPackage, showPackageSelector]);

  const nextStep = useCallback(() => {
    if (currentStep < TOTAL_STEPS - 1 && !isAnimating && canProceed()) {
      // If we're on step 1 (contact method) and package is pre-selected, skip to step 3 (features)
      if (currentStep === 1 && shouldSkipPackageStep()) {
        animateTransition(1, () => setCurrentStep(3));
      } else {
        animateTransition(1, () => setCurrentStep((prev) => prev + 1));
      }
    }
  }, [currentStep, isAnimating, animateTransition, canProceed, shouldSkipPackageStep]);

  const prevStep = () => {
    if (currentStep > 0 && !isAnimating) {
      // If we're on step 3 (features) and package was pre-selected, go back to step 1
      if (currentStep === 3 && shouldSkipPackageStep()) {
        animateTransition(-1, () => setCurrentStep(1));
      } else {
        animateTransition(-1, () => setCurrentStep((prev) => prev - 1));
      }
    }
  };

  // Handler to show package selector from features step
  const handleChangePackage = useCallback(() => {
    setShowPackageSelector(true);
    animateTransition(-1, () => setCurrentStep(2));
  }, [animateTransition]);

  const handleSubmit = useCallback(async () => {
    if (!canProceed()) return;
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Find the selected package name for the email
      const selectedPkg = t.packages.find(p => p.id === formData.selectedPackage);
      
      // Filter out empty links
      const validLinks = formData.competitorLinks.filter(link => link.trim() !== '');
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          projectType: selectedPkg?.name || formData.selectedPackage,
          budget: formData.budget,
          message: formData.message,
          // Additional fields for context
          contactMethod: formData.contactMethod,
          selectedFeatures: formData.selectedFeatures,
          currentWebsite: formData.currentWebsite,
          referenceLinks: validLinks,
          referralSource: formData.referralSource,
          // Spam protection
          _honeypot: honeypot,
          _timestamp: formLoadTime.toString(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Viestin lähetys epäonnistui');
      }

      animateTransition(1, () => setIsSubmitted(true));
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'Viestin lähetys epäonnistui. Yritä uudelleen.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [canProceed, animateTransition, formData, t.packages, honeypot, formLoadTime]);

  // Handle Enter key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey && canProceed() && !isAnimating) {
        e.preventDefault();
        if (currentStep === TOTAL_STEPS - 1) {
          handleSubmit();
        } else {
          nextStep();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canProceed, currentStep, isAnimating, nextStep, handleSubmit]);

  // Entrance animation
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        ".form-header",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "expo.out", delay: 0.2 }
      );
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "expo.out", delay: 0.3 }
      );
    }
  }, []);

  // SUCCESS STATE
  if (isSubmitted) {
    return (
      <div
        ref={containerRef}
        className="min-h-screen bg-[#050609] flex flex-col relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,138,60,0.1) 0%, transparent 60%)",
          }}
        />

        <div className="flex-1 flex items-center justify-center px-6 relative z-10">
          <div ref={contentRef} className="max-w-2xl w-full text-center">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full border-2 border-[#ff8a3c] flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[#ff8a3c]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1
              style={{ fontFamily: "var(--font-goldman)" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
            >
              {t.success.title}
            </h1>
            <p className="text-lg text-zinc-400 mb-12 max-w-md mx-auto">
              {t.success.message}
            </p>

            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[#ff8a3c] hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              {t.success.backHome}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // MAIN FORM
  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#050609] flex flex-col relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Ambient glow */}
      <div
        className="absolute left-1/2 top-0 h-[800px] w-[1200px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,138,60,0.12) 0%, rgba(255,138,60,0.04) 40%, transparent 70%)",
        }}
      />

      {/* Mobile step indicator - top */}
      <div className="sm:hidden fixed top-0 left-0 right-0 pt-24 pb-3 px-6 z-20 bg-gradient-to-b from-[#050609] via-[#050609]/95 to-transparent">
        <div className="flex items-center justify-center gap-1.5">
          {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
            <div
              key={index}
              className={`
                h-1 rounded-full transition-all duration-500
                ${index === currentStep 
                  ? "w-6 bg-[#ff8a3c]" 
                  : index < currentStep 
                    ? "w-3 bg-[#ff8a3c]/50" 
                    : "w-3 bg-white/10"
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* Main content with step indicator on the left */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 pt-28 sm:pt-8 pb-6 sm:py-8 relative z-10 min-h-screen">
        <div className="flex items-center gap-8 sm:gap-12 max-w-5xl w-full">
          {/* Step indicator - desktop only */}
          <div className="hidden sm:flex items-center">
            <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          </div>
          
          {/* Form content */}
          <div ref={contentRef} className="flex-1 max-w-4xl">
            {/* Honeypot field - hidden from users, only bots fill this */}
            <input
              type="text"
              name="website_url"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
              style={{ position: 'absolute', left: '-9999px' }}
            />

            {/* Error message */}
            {submitError && (
              <div className="mb-6 p-4 rounded-lg border border-red-500/30 bg-red-500/10 flex items-start gap-3 anim-item">
                <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="flex-1">
                  <p className="text-red-400 text-sm font-medium">Virhe</p>
                  <p className="text-red-300/80 text-sm mt-1">{submitError}</p>
                </div>
                <button
                  onClick={() => setSubmitError(null)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* Step 0: Contact Info */}
            {currentStep === 0 && (
              <ContactInfoStep
                t={t.steps.contactInfo}
                tUi={t.ui}
                formData={formData}
                updateFormData={updateFormData}
              />
            )}

            {/* Step 1: Contact Method */}
            {currentStep === 1 && (
              <ContactMethodStep
                t={t.steps.contactMethod}
                value={formData.contactMethod}
                onChange={(v) => {
                  updateFormData("contactMethod", v);
                  // Siirry seuraavaan steppiin heti valinnan jälkeen
                  animateTransition(1, () => setCurrentStep(shouldSkipPackageStep() ? 3 : 2));
                }}
              />
            )}

          {/* Step 2: Package Selection */}
          {currentStep === 2 && (
            <PackageStep
              t={t.steps.package}
              packages={t.packages}
              value={formData.selectedPackage}
              onChange={(v) => {
                updateFormData("selectedPackage", v);
                // Clear features that aren't allowed in new package
                const newPkg = t.packages.find((p) => p.id === v);
                if (newPkg) {
                  const allowedFeatures = formData.selectedFeatures.filter((f) =>
                    newPkg.allowedFeatures.includes(f)
                  );
                  updateFormData("selectedFeatures", allowedFeatures);
                }
                setTimeout(() => {
                  if (!isAnimating) {
                    animateTransition(1, () => setCurrentStep(3));
                  }
                }, 300);
              }}
            />
          )}

          {/* Step 3: Features */}
          {currentStep === 3 && (
            <FeaturesStep
              t={t.steps.features}
              features={t.features}
              selectedFeatures={formData.selectedFeatures}
              allowedFeatures={getAllowedFeatures()}
              selectedPackage={formData.selectedPackage}
              packages={t.packages}
              onToggle={toggleFeature}
              onChangePackage={handleChangePackage}
            />
          )}

          {/* Step 4: Message */}
          {currentStep === 4 && (
            <MessageStep
              t={t.steps.message}
              value={formData.message}
              onChange={(v) => updateFormData("message", v)}
            />
          )}

          {/* Step 5: Additional Info */}
          {currentStep === 5 && (
            <AdditionalInfoStep
              t={t.steps.additional}
              tUi={t.ui}
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {/* Navigation buttons */}
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            {/* Back button */}
            <div className="order-2 sm:order-1">
              {currentStep > 0 ? (
                <button
                  onClick={prevStep}
                  disabled={isAnimating}
                  className="group flex items-center gap-2 text-zinc-500 hover:text-[#ff8a3c] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  <span className="text-sm">{t.ui.back}</span>
                </button>
              ) : (
                <p className="text-xs text-zinc-600 hidden sm:block">
                  {locale === "fi" ? "Paina Enter tai klikkaa jatkaaksesi" : "Press Enter or click to continue"}
                </p>
              )}
            </div>
            
            {/* Next/Submit button - hidden for steps 1 & 2 (auto-advance on selection) */}
            {currentStep !== 1 && currentStep !== 2 && (
            <div
              className={`order-1 sm:order-2 transition-all duration-300 ${
                canProceed()
                  ? "opacity-100 translate-y-0"
                  : "opacity-50 translate-y-2 pointer-events-none"
              }`}
            >
              {currentStep === TOTAL_STEPS - 1 ? (
                <CTAButton
                  onClick={handleSubmit}
                  disabled={!canProceed() || isAnimating}
                  isLoading={isSubmitting}
                  loadingText={t.ui.sending}
                >
                  {t.ui.submit}
                </CTAButton>
              ) : (
                <CTAButton
                  onClick={nextStep}
                  disabled={!canProceed() || isAnimating}
                >
                  {t.ui.next}
                </CTAButton>
              )}
            </div>
            )}
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// STEP COMPONENTS

// Step 0: Contact Info (all fields on same screen)
function ContactInfoStep({
  t,
  tUi,
  formData,
  updateFormData,
}: {
  t: Translations["steps"]["contactInfo"];
  tUi: Translations["ui"];
  formData: FormData;
  updateFormData: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}) {
  return (
    <div className="space-y-5 sm:space-y-8">
      <div className="overflow-hidden">
        <h1
          style={{ fontFamily: "var(--font-goldman)" }}
          className="anim-item text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
        >
          {t.title}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="overflow-hidden">
          <div className="anim-item">
            <InputField
              label={t.name}
              placeholder={t.namePlaceholder}
              value={formData.name}
              onChange={(v) => updateFormData("name", v)}
              autoFocus
            />
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="anim-item">
            <InputField
              label={t.email}
              placeholder={t.emailPlaceholder}
              value={formData.email}
              onChange={(v) => updateFormData("email", v)}
              type="email"
            />
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="anim-item">
            <InputField
              label={t.company}
              placeholder={t.companyPlaceholder}
              value={formData.company}
              onChange={(v) => updateFormData("company", v)}
              optional
              optionalLabel={tUi.optional}
            />
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="anim-item">
            <InputField
              label={t.phone}
              placeholder={t.phonePlaceholder}
              value={formData.phone}
              onChange={(v) => updateFormData("phone", v)}
              type="tel"
              optional
              optionalLabel={tUi.optional}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Input field component
function InputField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  autoFocus = false,
  optional = false,
  optionalLabel = "optional",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoFocus?: boolean;
  optional?: boolean;
  optionalLabel?: string;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-4">
      <label className="block text-base text-zinc-400">
        {label}
        {optional && (
          <span className="text-zinc-600 ml-2">({optionalLabel})</span>
        )}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full bg-transparent text-xl text-white placeholder-zinc-600 pb-4 border-none outline-none focus:ring-0"
        />
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
          <div
            className={`h-full bg-[#ff8a3c] transition-transform duration-500 ease-out origin-left ${
              isFocused || value ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

// Step 1: Contact Method
function ContactMethodStep({
  t,
  value,
  onChange,
}: {
  t: Translations["steps"]["contactMethod"];
  value: string;
  onChange: (value: "email" | "phone") => void;
}) {
  const options = [
    { id: "email" as const, ...t.email },
    { id: "phone" as const, ...t.phone },
  ];

  return (
    <div className="space-y-5 sm:space-y-8">
      <div className="overflow-hidden">
        <h1
          style={{ fontFamily: "var(--font-goldman)" }}
          className="anim-item text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
        >
          {t.title}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
        {options.map((option) => (
          <div key={option.id} className="overflow-hidden">
            <div className="anim-item">
              <button
                onClick={() => onChange(option.id)}
                className={`
                  w-full group relative p-4 sm:p-8 text-left transition-all duration-300 cursor-pointer
                  border bg-gradient-to-br from-white/[0.03] to-transparent
                  rounded-lg rounded-br-none
                  ${
                    value === option.id
                      ? "border-[#ff8a3c]/50"
                      : "border-white/5 hover:border-[#ff8a3c]/20"
                  }
                `}
              >
                {/* Hover glow effect */}
                <div
                  className={`absolute inset-0 rounded-lg rounded-br-none bg-[radial-gradient(circle_at_center,rgba(255,138,60,0.1)_0%,transparent_70%)] transition-opacity duration-300 pointer-events-none ${
                    value === option.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                />

                {/* Top border glow */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] rounded-tl-lg bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent transition-opacity duration-300 ${
                    value === option.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                />

                {/* Icon */}
                <div className="relative z-10 mb-2 sm:mb-4">
                  {option.id === "email" ? (
                    <svg
                      className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-300 ${
                        value === option.id ? "text-[#ff8a3c]" : "text-zinc-500 group-hover:text-[#ff8a3c]"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  ) : (
                    <svg
                      className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-300 ${
                        value === option.id ? "text-[#ff8a3c]" : "text-zinc-500 group-hover:text-[#ff8a3c]"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  )}
                </div>

                <div className="relative z-10">
                  <span
                    style={{ fontFamily: "var(--font-goldman)" }}
                    className={`text-lg sm:text-2xl font-medium transition-colors ${
                      value === option.id
                        ? "text-[#ff8a3c]"
                        : "text-zinc-300 group-hover:text-white"
                    }`}
                  >
                    {option.label}
                  </span>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                    {option.description}
                  </p>
                </div>

                {/* Selected indicator */}
                <div
                  className={`absolute top-4 right-4 sm:top-6 sm:right-6 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    value === option.id
                      ? "border-[#ff8a3c]"
                      : "border-zinc-600 group-hover:border-zinc-400"
                  }`}
                >
                  <div
                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ff8a3c] transition-transform ${
                      value === option.id ? "scale-100" : "scale-0"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Step 2: Package Selection
function PackageStep({
  t,
  packages,
  value,
  onChange,
}: {
  t: Translations["steps"]["package"];
  packages: Package[];
  value: string;
  onChange: (value: "kipina" | "hehku" | "roihu") => void;
}) {
  // Convert Package to PricingTier for SelectablePricingCard
  const packageToTier = (pkg: Package): PricingTier => ({
    name: pkg.name,
    price: pkg.price,
    description: pkg.description,
    features: pkg.features,
    cta: pkg.cta || "Valitse",
    highlight: pkg.highlight,
    monthlyLabel: pkg.monthlyLabel,
    monthlyValue: pkg.monthlyValue,
    monthlyIncluded: pkg.monthlyIncluded,
    monthlyExcluded: pkg.monthlyExcluded,
  });

  const tiers = packages.map(packageToTier);
  const packageIds = ["kipina", "hehku", "roihu"] as const;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <div className="overflow-hidden">
          <h1
            style={{ fontFamily: "var(--font-goldman)" }}
            className="anim-item text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
          >
            {t.title}
          </h1>
        </div>
        <div className="overflow-hidden mt-2 sm:mt-3">
          <p className="anim-item text-sm sm:text-base text-zinc-400">{t.subtitle}</p>
        </div>
      </div>

      <div className="anim-item">
        <ExpandablePricingCards
          tiers={tiers}
          selectedId={value}
          onSelect={(id) => onChange(id as "kipina" | "hehku" | "roihu")}
          packageToId={(index) => packageIds[index]}
        />
      </div>
    </div>
  );
}

// Step 3: Features Selection
function FeaturesStep({
  t,
  features,
  selectedFeatures,
  allowedFeatures,
  selectedPackage,
  packages,
  onToggle,
  onChangePackage,
}: {
  t: Translations["steps"]["features"];
  features: Feature[];
  selectedFeatures: string[];
  allowedFeatures: string[];
  selectedPackage: string;
  packages: Package[];
  onToggle: (featureId: string) => void;
  onChangePackage: () => void;
}) {
  const pkg = packages.find((p) => p.id === selectedPackage);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <div className="overflow-hidden">
          <h1
            style={{ fontFamily: "var(--font-goldman)" }}
            className="anim-item text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
          >
            {t.title}
          </h1>
        </div>
        <div className="overflow-hidden mt-2 sm:mt-3">
          <p className="anim-item text-sm sm:text-base text-zinc-400">{t.subtitle}</p>
        </div>
        
        {/* Show selected package with change button */}
        {pkg && (
          <div className="overflow-hidden mt-3 sm:mt-4">
            <div className="anim-item flex items-center gap-3 p-3 bg-white/[0.03] border border-white/10 rounded-lg">
              <div className="flex-1">
                <span className="text-xs text-zinc-500">{t.selectedPackage || "Valittu paketti"}</span>
                <p className="text-sm sm:text-base font-medium text-[#ff8a3c]">{pkg.name}</p>
              </div>
              <button
                onClick={onChangePackage}
                className="px-3 py-1.5 text-xs sm:text-sm text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 rounded transition-colors cursor-pointer"
              >
                {t.changePackage || "Vaihda"}
              </button>
            </div>
          </div>
        )}
        
        {pkg && (
          <div className="overflow-hidden mt-1 sm:mt-2">
            <p className="anim-item text-xs sm:text-sm text-[#ff8a3c]">
              {t.limitWarning.replace("{package}", pkg.name)}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
        {features.map((feature) => {
          const isAllowed = allowedFeatures.includes(feature.id);
          const isSelected = selectedFeatures.includes(feature.id);

          return (
            <div key={feature.id} className="overflow-hidden">
              <div className="anim-item">
                <button
                  onClick={() => isAllowed && onToggle(feature.id)}
                  disabled={!isAllowed}
                  className={`
                    w-full group relative p-3 sm:p-4 text-left transition-all duration-300
                    border bg-gradient-to-br from-white/[0.03] to-transparent
                    rounded-lg rounded-br-none
                    ${
                      !isAllowed
                        ? "border-white/5 opacity-40 cursor-not-allowed"
                        : isSelected
                        ? "border-[#ff8a3c]/50 cursor-pointer"
                        : "border-white/5 hover:border-[#ff8a3c]/20 cursor-pointer"
                    }
                  `}
                >
                  {/* Hover glow effect */}
                  <div
                    className={`absolute inset-0 rounded-lg rounded-br-none bg-[radial-gradient(circle_at_center,rgba(255,138,60,0.1)_0%,transparent_70%)] transition-opacity duration-300 pointer-events-none ${
                      isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  />

                  {/* Top border glow */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] rounded-tl-lg bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent transition-opacity duration-300 ${
                      isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                  <div className="relative z-10 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <span
                        style={{ fontFamily: "var(--font-goldman)" }}
                        className={`text-xs sm:text-sm font-medium transition-colors line-clamp-2 ${
                          isSelected
                            ? "text-[#ff8a3c]"
                            : isAllowed
                            ? "text-zinc-300 group-hover:text-white"
                            : "text-zinc-600"
                        }`}
                      >
                        {feature.label}
                      </span>
                      <p
                        className={`mt-0.5 sm:mt-1 text-[10px] sm:text-xs hidden sm:block ${
                          isAllowed ? "text-zinc-500" : "text-zinc-700"
                        }`}
                      >
                        {feature.description}
                      </p>
                    </div>

                    {/* Checkbox */}
                    <div
                      className={`shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? "border-[#ff8a3c] bg-[#ff8a3c]"
                          : isAllowed
                          ? "border-zinc-600 group-hover:border-zinc-400"
                          : "border-zinc-700"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Step 4: Message
function MessageStep({
  t,
  value,
  onChange,
}: {
  t: Translations["steps"]["message"];
  value: string;
  onChange: (value: string) => void;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="overflow-hidden">
        <h1
          style={{ fontFamily: "var(--font-goldman)" }}
          className="anim-item text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
        >
          {t.title}
        </h1>
      </div>

      <div className="overflow-hidden">
        <div className="anim-item relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={t.placeholder}
            rows={4}
            autoFocus
            className="w-full bg-transparent text-base sm:text-lg text-white placeholder-zinc-600 pb-4 border-none outline-none focus:ring-0 resize-none"
          />
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
            <div
              className={`h-full bg-[#ff8a3c] transition-transform duration-500 ease-out origin-left ${
                isFocused || value ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 5: Additional Info
function AdditionalInfoStep({
  t,
  tUi,
  formData,
  updateFormData,
}: {
  t: Translations["steps"]["additional"];
  tUi: Translations["ui"];
  formData: FormData;
  updateFormData: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}) {
  const addLink = () => {
    if (formData.competitorLinks.length < 5) {
      updateFormData("competitorLinks", [...formData.competitorLinks, ""]);
    }
  };

  const updateLink = (index: number, value: string) => {
    const newLinks = [...formData.competitorLinks];
    newLinks[index] = value;
    updateFormData("competitorLinks", newLinks);
  };

  const removeLink = (index: number) => {
    if (formData.competitorLinks.length > 1) {
      const newLinks = formData.competitorLinks.filter((_, i) => i !== index);
      updateFormData("competitorLinks", newLinks);
    } else {
      updateFormData("competitorLinks", [""]);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="overflow-hidden">
        <h1
          style={{ fontFamily: "var(--font-goldman)" }}
          className="anim-item text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
        >
          {t.title}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="overflow-hidden">
          <div className="anim-item">
            <InputField
              label={t.budget}
              placeholder={t.budgetPlaceholder}
              value={formData.budget}
              onChange={(v) => updateFormData("budget", v)}
              optional
              optionalLabel={tUi.optional}
            />
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="anim-item">
            <InputField
              label={t.currentWebsite}
              placeholder={t.currentWebsitePlaceholder}
              value={formData.currentWebsite}
              onChange={(v) => updateFormData("currentWebsite", v)}
              optional
              optionalLabel={tUi.optional}
            />
          </div>
        </div>
        
        {/* Competitor links - spans full width */}
        <div className="overflow-hidden md:col-span-2">
          <div className="anim-item">
            <label className="block text-xs sm:text-sm text-zinc-400 mb-2">
              {t.competitors}
              <span className="text-zinc-600 ml-2">({tUi.optional})</span>
            </label>
            <div className="space-y-2">
              {formData.competitorLinks.map((link, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => updateLink(index, e.target.value)}
                    placeholder={t.competitorsPlaceholder}
                    className="flex-1 bg-transparent border-b border-zinc-700 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-zinc-600 focus:border-[#ff8a3c] focus:outline-none transition-colors duration-300"
                  />
                  {(formData.competitorLinks.length > 1 || link !== "") && (
                    <button
                      type="button"
                      onClick={() => removeLink(index)}
                      className="flex items-center justify-center w-10 h-10 text-zinc-500 hover:text-red-400 transition-colors duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
            {formData.competitorLinks.length < 5 && (
              <button
                type="button"
                onClick={addLink}
                className="mt-2 flex items-center gap-2 text-sm text-zinc-400 hover:text-[#ff8a3c] transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                {tUi.addLink || "Lisää linkki"}
              </button>
            )}
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="anim-item">
            <InputField
              label={t.referral}
              placeholder={t.referralPlaceholder}
              value={formData.referralSource}
              onChange={(v) => updateFormData("referralSource", v)}
              optional
              optionalLabel={tUi.optional}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
