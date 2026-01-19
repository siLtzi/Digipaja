"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
  referenceLinks: string[];
};

type Translations = {
  steps: {
    contact: string;
    project: string;
    details: string;
  };
  step1: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
  };
  step2: {
    title: string;
    subtitle: string;
    projectTypeLabel: string;
    budgetLabel: string;
  };
  step3: {
    title: string;
    subtitle: string;
    messageLabel: string;
    messagePlaceholder: string;
    linksLabel: string;
    linksPlaceholder: string;
    addLink: string;
  };
  projectTypes: {
    landing: { label: string; description: string };
    website: { label: string; description: string };
    ecommerce: { label: string; description: string };
    webapp: { label: string; description: string };
  };
  budgets: {
    starter: string;
    growth: string;
    enterprise: string;
    custom: string;
  };
  buttons: {
    next: string;
    previous: string;
    submit: string;
    submitting: string;
  };
  success: {
    title: string;
    message: string;
  };
  error?: {
    title: string;
    message: string;
    retry: string;
  };
};

const STEP_COUNT = 3;

export default function MultiStepContactForm({ t }: { t: Translations }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState(""); // Spam protection - hidden field
  const [formLoadTime] = useState(() => Date.now()); // Track when form was loaded
  const containerRef = useRef<HTMLDivElement>(null);
  const stepContainerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
    referenceLinks: [""],
  });

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const animateStep = useCallback((direction: 1 | -1, newStep: number) => {
    if (!stepContainerRef.current || isAnimating) return;
    
    setIsAnimating(true);
    const stepContent = stepContainerRef.current;
    
    // Animate out
    gsap.to(stepContent, {
      x: direction > 0 ? -50 : 50,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setCurrentStep(newStep);
        // Set initial position for animate in
        gsap.set(stepContent, { x: direction > 0 ? 50 : -50, opacity: 0 });
        // Animate in
        gsap.to(stepContent, {
          x: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => setIsAnimating(false),
        });
      },
    });
  }, [isAnimating]);

  const canProceed = useCallback(() => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== "" && formData.email.trim() !== "";
      case 2:
        return formData.projectType !== "";
      case 3:
        return formData.message.trim() !== "";
      default:
        return false;
    }
  }, [currentStep, formData]);

  const nextStep = () => {
    if (currentStep < STEP_COUNT && !isAnimating && canProceed()) {
      animateStep(1, currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1 && !isAnimating) {
      animateStep(-1, currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _honeypot: honeypot, // Spam protection
          _timestamp: formLoadTime.toString(), // Time check
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Viestin lähetys epäonnistui');
      }

      setIsSubmitted(true);
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
  };

  // Entrance animation
  useGSAP(
    () => {
      if (!containerRef.current) return;
      gsap.fromTo(
        ".form-container",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    },
    { scope: containerRef }
  );

  // Success animation
  useEffect(() => {
    if (isSubmitted && containerRef.current) {
      gsap.fromTo(
        ".success-content",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
      gsap.fromTo(
        ".success-icon",
        { scale: 0 },
        { scale: 1, duration: 0.4, delay: 0.2, ease: "back.out(2)" }
      );
    }
  }, [isSubmitted]);

  if (isSubmitted) {
    return (
      <div ref={containerRef} className="w-full max-w-2xl mx-auto">
        <div className="success-content form-container relative rounded-2xl border border-[#ff8a3c]/30 bg-[#0a0b10]/95 p-8 sm:p-12 backdrop-blur-xl text-center">
          {/* Success checkmark */}
          <div className="success-icon w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#ff8a3c]/20 to-[#ff8a3c]/5 flex items-center justify-center border border-[#ff8a3c]/30">
            <svg className="w-10 h-10 text-[#ff8a3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h3
            style={{ fontFamily: "var(--font-goldman)" }}
            className="text-2xl sm:text-3xl font-bold text-white mb-4"
          >
            {t.success.title}
          </h3>
          <p className="text-zinc-400 text-base">{t.success.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto">
      <div className="form-container relative rounded-2xl border border-[#ff8a3c]/20 bg-[#0a0b10]/95 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
        {/* Honeypot field - hidden from users, only bots fill this */}
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
          className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
          style={{ position: 'absolute', left: '-9999px' }}
        />
        
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 h-6 w-6 border-l-2 border-t-2 border-[#ff8a3c]/40 rounded-tl-lg" />
        <div className="absolute top-0 right-0 h-6 w-6 border-r-2 border-t-2 border-[#ff8a3c]/40 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 h-6 w-6 border-l-2 border-b-2 border-[#ff8a3c]/40 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 h-6 w-6 border-r-2 border-b-2 border-[#ff8a3c]/40 rounded-br-lg" />

        {/* Step indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div
                  className={`
                    relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500
                    ${currentStep >= step
                      ? "border-[#ff8a3c] bg-[#ff8a3c]/10"
                      : "border-zinc-700 bg-zinc-900/50"
                    }
                    ${currentStep === step ? "shadow-[0_0_20px_rgba(255,138,60,0.3)]" : ""}
                  `}
                >
                  {currentStep > step ? (
                    <svg className="w-5 h-5 text-[#ff8a3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span
                      style={{ fontFamily: "var(--font-goldman)" }}
                      className={`text-sm font-bold ${currentStep >= step ? "text-[#ff8a3c]" : "text-zinc-500"}`}
                    >
                      {step}
                    </span>
                  )}
                </div>
                {step < 3 && (
                  <div className="flex-1 mx-2">
                    <div className="h-[2px] bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r from-[#ff8a3c] to-[#ffb347] transition-all duration-500 ease-out`}
                        style={{ width: currentStep > step ? "100%" : "0%" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-zinc-500">
            <span className={currentStep >= 1 ? "text-[#ff8a3c]" : ""}>{t.steps.contact}</span>
            <span className={currentStep >= 2 ? "text-[#ff8a3c]" : ""}>{t.steps.project}</span>
            <span className={currentStep >= 3 ? "text-[#ff8a3c]" : ""}>{t.steps.details}</span>
          </div>
        </div>

        {/* Form steps */}
        <div className="relative min-h-[320px] overflow-hidden">
          <div ref={stepContainerRef} className="w-full">
            {currentStep === 1 && (
              <Step1
                formData={formData}
                updateFormData={updateFormData}
                t={t.step1}
              />
            )}
            {currentStep === 2 && (
              <Step2
                formData={formData}
                updateFormData={updateFormData}
                t={t.step2}
                projectTypes={t.projectTypes}
                budgets={t.budgets}
              />
            )}
            {currentStep === 3 && (
              <Step3
                formData={formData}
                updateFormData={updateFormData}
                t={t.step3}
              />
            )}
          </div>
        </div>

        {/* Error message */}
        {submitError && (
          <div className="mt-6 p-4 rounded-lg border border-red-500/30 bg-red-500/10 flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="flex-1">
              <p className="text-red-400 text-sm font-medium">
                {t.error?.title || 'Virhe'}
              </p>
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

        {/* Navigation buttons */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-zinc-800">
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              disabled={isAnimating}
              style={{ fontFamily: "var(--font-goldman)" }}
              className="flex-1 group relative flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-zinc-400 rounded-lg border border-zinc-700 bg-zinc-900/50 transition-all duration-300 hover:border-zinc-600 hover:text-white disabled:opacity-50"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {t.buttons.previous}
            </button>
          )}
          
          {currentStep < STEP_COUNT ? (
            <button
              onClick={nextStep}
              disabled={!canProceed() || isAnimating}
              style={{ fontFamily: "var(--font-goldman)" }}
              className={`
                flex-1 group relative flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300
                ${canProceed() && !isAnimating
                  ? "text-[#050609] bg-gradient-to-r from-[#ff8a3c] to-[#ffb347] hover:shadow-[0_0_30px_rgba(255,138,60,0.4)] hover:scale-[1.02]"
                  : "text-zinc-500 bg-zinc-800 cursor-not-allowed"
                }
              `}
            >
              {t.buttons.next}
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              style={{ fontFamily: "var(--font-goldman)" }}
              className={`
                flex-1 group relative flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300
                ${canProceed() && !isSubmitting
                  ? "text-[#050609] bg-gradient-to-r from-[#ff8a3c] to-[#ffb347] hover:shadow-[0_0_30px_rgba(255,138,60,0.4)] hover:scale-[1.02]"
                  : "text-zinc-500 bg-zinc-800 cursor-not-allowed"
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {t.buttons.submitting}
                </>
              ) : (
                <>
                  {t.buttons.submit}
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Step 1: Contact Information
function Step1({
  formData,
  updateFormData,
  t,
}: {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
  t: Translations["step1"];
}) {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3
          style={{ fontFamily: "var(--font-goldman)" }}
          className="text-xl sm:text-2xl font-bold text-white mb-2"
        >
          {t.title}
        </h3>
        <p className="text-sm text-zinc-400">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormInput
          label={t.nameLabel}
          placeholder={t.namePlaceholder}
          value={formData.name}
          onChange={(v) => updateFormData("name", v)}
          required
        />
        <FormInput
          label={t.emailLabel}
          type="email"
          placeholder={t.emailPlaceholder}
          value={formData.email}
          onChange={(v) => updateFormData("email", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormInput
          label={t.phoneLabel}
          type="tel"
          placeholder={t.phonePlaceholder}
          value={formData.phone}
          onChange={(v) => updateFormData("phone", v)}
        />
        <FormInput
          label={t.companyLabel}
          placeholder={t.companyPlaceholder}
          value={formData.company}
          onChange={(v) => updateFormData("company", v)}
        />
      </div>
    </div>
  );
}

// Step 2: Project Type
function Step2({
  formData,
  updateFormData,
  t,
  projectTypes,
  budgets,
}: {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
  t: Translations["step2"];
  projectTypes: Translations["projectTypes"];
  budgets: Translations["budgets"];
}) {
  const projectOptions = [
    { id: "landing", icon: "📄", ...projectTypes.landing },
    { id: "website", icon: "🌐", ...projectTypes.website },
    { id: "ecommerce", icon: "🛒", ...projectTypes.ecommerce },
    { id: "webapp", icon: "⚙️", ...projectTypes.webapp },
  ];

  const budgetOptions = [
    { id: "starter", label: budgets.starter },
    { id: "growth", label: budgets.growth },
    { id: "enterprise", label: budgets.enterprise },
    { id: "custom", label: budgets.custom },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3
          style={{ fontFamily: "var(--font-goldman)" }}
          className="text-xl sm:text-2xl font-bold text-white mb-2"
        >
          {t.title}
        </h3>
        <p className="text-sm text-zinc-400">{t.subtitle}</p>
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-3">
          {t.projectTypeLabel}
        </label>
        <div className="grid grid-cols-2 gap-3">
          {projectOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => updateFormData("projectType", option.id)}
              className={`
                group relative p-4 rounded-lg border-2 text-left transition-all duration-300
                ${formData.projectType === option.id
                  ? "border-[#ff8a3c] bg-[#ff8a3c]/10"
                  : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
                }
              `}
            >
              <span className="text-2xl mb-2 block">{option.icon}</span>
              <span className="block text-sm font-medium text-white">{option.label}</span>
              <span className="block text-xs text-zinc-500 mt-0.5">{option.description}</span>
              {formData.projectType === option.id && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#ff8a3c] flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-3">
          {t.budgetLabel}
        </label>
        <div className="grid grid-cols-2 gap-3">
          {budgetOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => updateFormData("budget", option.id)}
              className={`
                p-3 rounded-lg border text-center text-sm transition-all duration-300
                ${formData.budget === option.id
                  ? "border-[#ff8a3c] bg-[#ff8a3c]/10 text-[#ff8a3c]"
                  : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-white"
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Step 3: Project Details
function Step3({
  formData,
  updateFormData,
  t,
}: {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string | string[]) => void;
  t: Translations["step3"];
}) {
  const addLink = () => {
    if (formData.referenceLinks.length < 5) {
      updateFormData("referenceLinks", [...formData.referenceLinks, ""]);
    }
  };

  const updateLink = (index: number, value: string) => {
    const newLinks = [...formData.referenceLinks];
    newLinks[index] = value;
    updateFormData("referenceLinks", newLinks);
  };

  const removeLink = (index: number) => {
    if (formData.referenceLinks.length > 1) {
      const newLinks = formData.referenceLinks.filter((_, i) => i !== index);
      updateFormData("referenceLinks", newLinks);
    } else {
      // If it's the last one, just clear it
      updateFormData("referenceLinks", [""]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3
          style={{ fontFamily: "var(--font-goldman)" }}
          className="text-xl sm:text-2xl font-bold text-white mb-2"
        >
          {t.title}
        </h3>
        <p className="text-sm text-zinc-400">{t.subtitle}</p>
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
          {t.messageLabel}
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => updateFormData("message", e.target.value)}
          placeholder={t.messagePlaceholder}
          rows={4}
          className="w-full rounded-lg border border-zinc-800 bg-[#050609] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all duration-300 focus:border-[#ff8a3c] focus:bg-[#0a0b10] focus:shadow-[0_0_20px_rgba(255,138,60,0.1)] focus:ring-0 focus:outline-none resize-none"
        />
      </div>

      {/* Reference Links */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
          {t.linksLabel}
        </label>
        <div className="space-y-2">
          {formData.referenceLinks.map((link, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="url"
                value={link}
                onChange={(e) => updateLink(index, e.target.value)}
                placeholder={t.linksPlaceholder}
                className="flex-1 rounded-lg border border-zinc-800 bg-[#050609] px-4 py-2.5 text-sm text-white placeholder-zinc-600 transition-all duration-300 focus:border-[#ff8a3c] focus:bg-[#0a0b10] focus:shadow-[0_0_20px_rgba(255,138,60,0.1)] focus:ring-0 focus:outline-none"
              />
              {(formData.referenceLinks.length > 1 || link !== "") && (
                <button
                  type="button"
                  onClick={() => removeLink(index)}
                  className="flex items-center justify-center w-10 h-10 rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-500 hover:border-red-500/50 hover:text-red-400 transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
        {formData.referenceLinks.length < 5 && (
          <button
            type="button"
            onClick={addLink}
            className="mt-2 flex items-center gap-2 text-sm text-zinc-400 hover:text-[#ff8a3c] transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            {t.addLink}
          </button>
        )}
      </div>
    </div>
  );
}

// Reusable form input
function FormInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div className="group/input relative">
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-zinc-500 transition-colors duration-300 group-focus-within/input:text-[#ff8a3c]">
        {label}
        {required && <span className="text-[#ff8a3c] ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-zinc-800 bg-[#050609] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all duration-300 focus:border-[#ff8a3c] focus:bg-[#0a0b10] focus:shadow-[0_0_20px_rgba(255,138,60,0.1)] focus:ring-0 focus:outline-none"
      />
    </div>
  );
}
