"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

import {
  StepIndicator,
  SectionHeader,
  FormInput,
  FormSelect,
  FormTextarea,
  ProjectTypeCard,
  FeatureCard,
  TimelineCard,
  BudgetRangeCard,
  ChoicesSummary,
  ContactInfoCard,
  PageCountSlider,
} from "@/components/contact";
import type { ProjectType } from "@/components/contact";
import {
  HammerStrike,
  type HammerStrikeHandle,
} from "@/components/sections/Pricing/HammerStrike";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type PricingTier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta?: string;
  highlight?: boolean;
};

type LocalizedString = {
  fi?: string;
  en?: string;
};

type ContactPageCmsContent = {
  hero?: {
    eyebrow?: LocalizedString;
    title?: LocalizedString;
    titleAccent?: LocalizedString;
    subtitle?: LocalizedString;
  };
  steps?: {
    contact?: LocalizedString;
    package?: LocalizedString;
    project?: LocalizedString;
    features?: LocalizedString;
    details?: LocalizedString;
  };
  sectionHeaders?: {
    contact?: { number?: string; title?: LocalizedString; description?: LocalizedString };
    package?: { number?: string; title?: LocalizedString; description?: LocalizedString };
    project?: { number?: string; title?: LocalizedString; description?: LocalizedString };
    features?: { number?: string; title?: LocalizedString; description?: LocalizedString };
    details?: { number?: string; title?: LocalizedString; description?: LocalizedString };
  };
  formLabels?: Record<string, LocalizedString>;
  projectTypes?: Array<{ id: string; icon: string; label: LocalizedString; description: LocalizedString }>;
  features?: Array<{ id: string; label: LocalizedString; description: LocalizedString }>;
  timelineOptions?: Array<{ id: string; label: LocalizedString; description: LocalizedString }>;
  budgetRanges?: Array<{ id: string; label: LocalizedString }>;
  howFoundOptions?: Array<{ id: string; label: LocalizedString }>;
  buttons?: Record<string, LocalizedString>;
  success?: { title?: LocalizedString; message?: LocalizedString };
  sidebar?: Record<string, LocalizedString>;
  popularBadge?: LocalizedString;
};

type ContactPageContentProps = {
  locale: string;
  pricingTiers: PricingTier[];
  cmsContent?: ContactPageCmsContent;
};

export default function ContactPageContent({ locale, pricingTiers, cmsContent }: ContactPageContentProps) {
  const t = useTranslations("contactPage");
  const isFi = locale === "fi";
  
  // Helper to get localized string
  const l = (obj: LocalizedString | undefined, fallback: string = ""): string => {
    if (!obj) return fallback;
    return (isFi ? obj.fi : obj.en) ?? fallback;
  };
  
  // Fallback pricing tiers if none from CMS
  const defaultTiers: PricingTier[] = isFi ? [
    {
      name: "Startti",
      price: "990€",
      description: "Nopea landing page",
      features: ["1-3 sivua", "Responsiivinen design", "Yhteydenottolomake", "SEO-perusteet", "1 muokkauskierros"],
      highlight: false
    },
    {
      name: "Kasvu",
      price: "2 490€",
      description: "Ammattimainen verkkosivusto",
      features: ["5-10 sivua", "Räätälöity design", "Sisällönhallinta (CMS)", "SEO-optimointi", "Analytics-integraatio", "2 muokkauskierrosta"],
      highlight: true
    },
    {
      name: "Pro",
      price: "4 990€+",
      description: "Täysi digitaalinen ratkaisu",
      features: ["Rajattomat sivut", "Uniikki design", "Edistynyt CMS", "Verkkokauppa mahdollisuus", "API-integraatiot", "Jatkuva tuki"],
      highlight: false
    }
  ] : [
    {
      name: "Starter",
      price: "€990",
      description: "Quick landing page",
      features: ["1-3 pages", "Responsive design", "Contact form", "Basic SEO", "1 revision round"],
      highlight: false
    },
    {
      name: "Growth",
      price: "€2,490",
      description: "Professional website",
      features: ["5-10 pages", "Custom design", "Content Management (CMS)", "SEO optimization", "Analytics integration", "2 revision rounds"],
      highlight: true
    },
    {
      name: "Pro",
      price: "€4,990+",
      description: "Full digital solution",
      features: ["Unlimited pages", "Unique design", "Advanced CMS", "E-commerce ready", "API integrations", "Ongoing support"],
      highlight: false
    }
  ];
  
  const tiers = pricingTiers.length > 0 ? pricingTiers : defaultTiers;
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Form state
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Contact info
    name: "",
    email: "",
    phone: "",
    company: "",
    
    // Package selection
    package: "",
    
    // Project details
    projectType: "",
    pageCount: 5,
    features: [] as string[],
    timeline: "normal",
    budget: "",
    
    // Additional
    currentWebsite: "",
    competitors: "",
    message: "",
    howFound: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Validation for each step
  const validateStep = (step: number): boolean => {
    setValidationError(null);
    
    switch (step) {
      case 0: // Contact info
        if (!formData.name.trim()) {
          setValidationError(isFi ? "Nimi on pakollinen" : "Name is required");
          return false;
        }
        if (!formData.email.trim()) {
          setValidationError(isFi ? "Sähköposti on pakollinen" : "Email is required");
          return false;
        }
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          setValidationError(isFi ? "Tarkista sähköpostiosoite" : "Please enter a valid email");
          return false;
        }
        return true;
      case 1: // Package selection - handled by auto-advance
        return true;
      case 2: // Project type
        if (!formData.projectType) {
          setValidationError(isFi ? "Valitse projektityyppi" : "Please select a project type");
          return false;
        }
        return true;
      case 3: // Features - optional, but budget is recommended
        return true;
      case 4: // Details - all optional
        return true;
      default:
        return true;
    }
  };

  // Check if form can be submitted (all required fields filled)
  const canSubmit = useMemo(() => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.projectType !== ""
    );
  }, [formData.name, formData.email, formData.projectType]);

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Package-based constraints
  const packageConstraints = useMemo(() => {
    const pkg = formData.package.toLowerCase();
    const isStarter = pkg.includes("start") || pkg.includes("startti");
    const isGrowth = pkg.includes("growth") || pkg.includes("kasvu");
    const isPro = pkg.includes("pro");

    return {
      pageCount: {
        min: isStarter ? 1 : isGrowth ? 5 : 1,
        max: isStarter ? 3 : isGrowth ? 10 : 50,
        default: isStarter ? 2 : isGrowth ? 7 : 15,
      },
      // Features disabled for certain packages
      disabledFeatures: isStarter 
        ? ["ecommerce", "auth", "api", "chat", "multilang"] 
        : isGrowth 
          ? ["api"] 
          : [],
      // Project types disabled for certain packages
      disabledProjectTypes: isStarter 
        ? ["ecommerce", "webapp", "portal"] 
        : isGrowth 
          ? ["portal"] 
          : [],
    };
  }, [formData.package]);

  // Update page count when package changes
  useEffect(() => {
    const { min, max, default: defaultVal } = packageConstraints.pageCount;
    setFormData(prev => {
      const newPageCount = prev.pageCount < min ? min : prev.pageCount > max ? max : prev.pageCount;
      // Only update if different or if we need to set to default
      if (prev.pageCount !== newPageCount || (prev.package && prev.pageCount === 5)) {
        return { ...prev, pageCount: newPageCount === prev.pageCount ? newPageCount : defaultVal };
      }
      return prev;
    });
  }, [formData.package, packageConstraints.pageCount]);

  // Clear disabled features when package changes
  useEffect(() => {
    if (packageConstraints.disabledFeatures.length > 0) {
      setFormData(prev => ({
        ...prev,
        features: prev.features.filter(f => !packageConstraints.disabledFeatures.includes(f)),
        projectType: packageConstraints.disabledProjectTypes.includes(prev.projectType) ? "" : prev.projectType,
      }));
    }
  }, [formData.package, packageConstraints.disabledFeatures, packageConstraints.disabledProjectTypes]);

  // Feature options (using translations)
  const featureOptions = useMemo(() => [
    { id: "cms", label: t("features.cms.label"), description: t("features.cms.description") },
    { id: "blog", label: t("features.blog.label"), description: t("features.blog.description") },
    { id: "ecommerce", label: t("features.ecommerce.label"), description: t("features.ecommerce.description") },
    { id: "booking", label: t("features.booking.label"), description: t("features.booking.description") },
    { id: "seo", label: t("features.seo.label"), description: t("features.seo.description") },
    { id: "analytics", label: t("features.analytics.label"), description: t("features.analytics.description") },
    { id: "multilang", label: t("features.multilang.label"), description: t("features.multilang.description") },
    { id: "animations", label: t("features.animations.label"), description: t("features.animations.description") },
    { id: "auth", label: t("features.auth.label"), description: t("features.auth.description") },
    { id: "api", label: t("features.api.label"), description: t("features.api.description") },
    { id: "forms", label: t("features.forms.label"), description: t("features.forms.description") },
    { id: "chat", label: t("features.chat.label"), description: t("features.chat.description") },
  ], [t]);

  const projectTypes: ProjectType[] = useMemo(() => [
    { id: "landing", label: t("projectTypes.landing.label"), description: t("projectTypes.landing.description"), icon: "🚀" },
    { id: "website", label: t("projectTypes.website.label"), description: t("projectTypes.website.description"), icon: "🌐" },
    { id: "ecommerce", label: t("projectTypes.ecommerce.label"), description: t("projectTypes.ecommerce.description"), icon: "🛒" },
    { id: "webapp", label: t("projectTypes.webapp.label"), description: t("projectTypes.webapp.description"), icon: "⚡" },
    { id: "portal", label: t("projectTypes.portal.label"), description: t("projectTypes.portal.description"), icon: "🔐" },
  ], [t]);

  const timelineOptions = useMemo(() => [
    { id: "urgent", label: t("timeline.urgent.label"), description: t("timeline.urgent.description") },
    { id: "normal", label: t("timeline.normal.label"), description: t("timeline.normal.description") },
    { id: "relaxed", label: t("timeline.relaxed.label"), description: t("timeline.relaxed.description") },
    { id: "planning", label: t("timeline.planning.label"), description: t("timeline.planning.description") },
  ], [t]);

  const budgetRanges = useMemo(() => [
    { id: "starter", label: t("budget.starter"), description: "" },
    { id: "growth", label: t("budget.growth"), description: "" },
    { id: "professional", label: t("budget.professional"), description: "" },
    { id: "enterprise", label: t("budget.enterprise"), description: "" },
    { id: "flexible", label: t("budget.flexible"), description: "" },
  ], [t]);

  const steps = [
    { id: "contact", title: l(cmsContent?.steps?.contact, t("steps.contact")), icon: "👤" },
    { id: "package", title: l(cmsContent?.steps?.package, t("steps.package")), icon: "📦" },
    { id: "project", title: l(cmsContent?.steps?.project, t("steps.project")), icon: "📋" },
    { id: "features", title: l(cmsContent?.steps?.features, t("steps.features")), icon: "⚙️" },
    { id: "details", title: l(cmsContent?.steps?.details, t("steps.details")), icon: "💬" },
  ];

  // Animations
  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Hero animation
    const heroTl = gsap.timeline();
    heroTl
      .from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.6 })
      .from(".hero-title", { opacity: 0, y: 30, duration: 0.8 }, "-=0.3")
      .from(".hero-subtitle", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
      .from(".hero-decoration", { scaleX: 0, duration: 0.8, ease: "power2.out" }, "-=0.3");
    
    // Animate form sections on scroll
    gsap.utils.toArray<HTMLElement>(".form-section").forEach((section, i) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: i * 0.1,
      });
    });
    
  }, { scope: containerRef });

  // Step animation when changing
  useEffect(() => {
    if (!formRef.current) return;
    
    gsap.fromTo(
      formRef.current.querySelectorAll(".step-content"),
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.05 }
    );
  }, [currentStep]);

  const handleFeatureToggle = (featureId: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...prev.features, featureId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  // Success screen
  if (isSubmitted) {
    return (
      <div ref={containerRef} className="min-h-screen bg-[#050609] text-white">
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="max-w-2xl text-center">
            {/* Success icon */}
            <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full rounded-br-none border-2 border-[#ff8a3c] bg-[#ff8a3c]/10">
              <svg className="h-12 w-12 text-[#ff8a3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 
              className="mb-6 text-4xl font-bold text-white sm:text-5xl"
              style={{ fontFamily: "var(--font-goldman)" }}
            >
              {t("success.title")}
            </h1>
            <p className="mb-8 text-lg text-zinc-400">
              {t("success.message")}
            </p>
            <Link
              href={`/${locale}`}
              className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#ff8a3c] transition-colors duration-300 hover:text-white"
              style={{ fontFamily: "var(--font-goldman)" }}
            >
              <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
              <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
              <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
              <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
              <span className="absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-10" />
              {t("success.backToHome")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050609] text-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden pb-12 pt-32 lg:pb-20 lg:pt-40">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,138,60,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[32px_32px] opacity-30" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <span 
            className="hero-eyebrow mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#ff8a3c]"
            style={{ fontFamily: "var(--font-goldman)" }}
          >
            {t("hero.eyebrow")}
          </span>
          
          <h1 
            className="hero-title mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-goldman)" }}
          >
            {t("hero.title")} <span className="text-[#ff8a3c]">{t("hero.titleAccent")}</span>
          </h1>
          
          <p className="hero-subtitle mx-auto max-w-2xl text-lg text-zinc-400">
            {t("hero.subtitle")}
          </p>
          
          {/* Decorative line */}
          <div className="hero-decoration mx-auto mt-12 h-px w-full max-w-md bg-linear-to-r from-transparent via-[#ff8a3c]/50 to-transparent" />
        </div>
      </section>

      {/* Main Form Section */}
      <section className="relative pb-24 lg:pb-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr,380px]">
            {/* Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              {/* Step Indicator */}
              <StepIndicator
                steps={steps}
                currentStep={currentStep}
                onStepClick={setCurrentStep}
              />

              {/* Step 1: Contact Info */}
              {currentStep === 0 && (
                <div className="form-section space-y-6">
                  <SectionHeader 
                    number={t("step1.number")} 
                    title={t("step1.title")} 
                    description={t("step1.description")}
                  />
                  
                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormInput
                      label={t("form.nameLabel")}
                      type="text"
                      value={formData.name}
                      onChange={(v) => {
                        setValidationError(null);
                        setFormData(prev => ({ ...prev, name: v }));
                      }}
                      placeholder={t("form.namePlaceholder")}
                      required
                    />
                    <FormInput
                      label={t("form.emailLabel")}
                      type="email"
                      value={formData.email}
                      onChange={(v) => {
                        setValidationError(null);
                        setFormData(prev => ({ ...prev, email: v }));
                      }}
                      placeholder={t("form.emailPlaceholder")}
                      required
                    />
                    <FormInput
                      label={t("form.phoneLabel")}
                      type="tel"
                      value={formData.phone}
                      onChange={(v) => setFormData(prev => ({ ...prev, phone: v }))}
                      placeholder={t("form.phonePlaceholder")}
                    />
                    <FormInput
                      label={t("form.companyLabel")}
                      type="text"
                      value={formData.company}
                      onChange={(v) => setFormData(prev => ({ ...prev, company: v }))}
                      placeholder={t("form.companyPlaceholder")}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Package Selection */}
              {currentStep === 1 && (
                <div className="form-section space-y-8">
                  <SectionHeader 
                    number={cmsContent?.sectionHeaders?.package?.number ?? "02"} 
                    title={l(cmsContent?.sectionHeaders?.package?.title, isFi ? "Valitse paketti" : "Choose Your Package")} 
                    description={l(cmsContent?.sectionHeaders?.package?.description, isFi ? "Valitse tarpeisiisi sopiva paketti. Voit räätälöidä sitä seuraavissa vaiheissa." : "Select the package that best fits your needs. You can customize it in the next steps.")}
                  />
                  
                  <div className="step-content grid gap-6 lg:grid-cols-3">
                    {tiers.map((tier, index) => (
                      <PackageCard
                        key={tier.name}
                        name={tier.name}
                        price={tier.price}
                        description={tier.description}
                        features={tier.features}
                        highlight={tier.highlight}
                        selected={formData.package === tier.name}
                        selectText={l(cmsContent?.buttons?.selectPackage, "Select Package")}
                        selectedText={l(cmsContent?.buttons?.selected, "Selected ✓")}
                        popularBadge={l(cmsContent?.popularBadge, "Popular")}
                        onClick={() => {
                          setFormData(prev => ({ ...prev, package: tier.name }));
                          // Auto-advance to next step after hammer animation
                          setTimeout(() => setCurrentStep(2), 600);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Project Type */}
              {currentStep === 2 && (
                <div className="form-section space-y-8">
                  <SectionHeader 
                    number={t("step2.number")} 
                    title={t("step2.title")} 
                    description={t("step2.description")}
                  />
                  
                  {/* Project Type Selection */}
                  <div className="step-content grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {projectTypes.map((type) => {
                      const isDisabled = packageConstraints.disabledProjectTypes.includes(type.id);
                      return (
                        <ProjectTypeCard
                          key={type.id}
                          {...type}
                          selected={formData.projectType === type.id}
                          onClick={() => setFormData(prev => ({ ...prev, projectType: type.id }))}
                          disabled={isDisabled}
                          disabledText={isFi ? "Pro-paketti" : "Pro package"}
                        />
                      );
                    })}
                  </div>
                  
                  {/* Page Count Slider */}
                  <div className="step-content relative overflow-hidden rounded-lg border border-zinc-800 bg-[#0a0a0a] p-6">
                    <div className="absolute top-0 left-0 h-3 w-3 border-l border-t border-[#ff8a3c]/30" />
                    
                    <PageCountSlider
                      value={formData.pageCount}
                      onChange={(v) => setFormData(prev => ({ ...prev, pageCount: v }))}
                      min={packageConstraints.pageCount.min}
                      max={packageConstraints.pageCount.max}
                      label={t("step2.pageCountLabel")}
                      description={isFi 
                        ? `${formData.package}: ${packageConstraints.pageCount.min}-${packageConstraints.pageCount.max === 50 ? "∞" : packageConstraints.pageCount.max} sivua` 
                        : `${formData.package}: ${packageConstraints.pageCount.min}-${packageConstraints.pageCount.max === 50 ? "∞" : packageConstraints.pageCount.max} pages`
                      }
                      pagesUnit={t("choicesSummary.pagesUnit")}
                    />
                  </div>
                  
                  {/* Timeline Selection */}
                  <div className="step-content">
                    <label className="mb-4 block text-sm font-medium text-zinc-300">
                      {t("step2.timelineLabel")}
                    </label>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {timelineOptions.map((option) => (
                        <TimelineCard
                          key={option.id}
                          id={option.id}
                          label={option.label}
                          description={option.description}
                          selected={formData.timeline === option.id}
                          onClick={() => setFormData(prev => ({ ...prev, timeline: option.id }))}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Features */}
              {currentStep === 3 && (
                <div className="form-section space-y-8">
                  <SectionHeader 
                    number={t("step3.number")} 
                    title={t("step3.title")} 
                    description={t("step3.description")}
                  />
                  
                  <div className="step-content grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {featureOptions.map((feature) => {
                      const isDisabled = packageConstraints.disabledFeatures.includes(feature.id);
                      return (
                        <FeatureCard
                          key={feature.id}
                          id={feature.id}
                          label={feature.label}
                          description={feature.description}
                          selected={formData.features.includes(feature.id)}
                          onClick={() => handleFeatureToggle(feature.id)}
                          disabled={isDisabled}
                          disabledText={isFi ? "Pro" : "Pro"}
                        />
                      );
                    })}
                  </div>
                  
                  {/* Budget Selection */}
                  <div className="step-content">
                    <label className="mb-4 block text-sm font-medium text-zinc-300">
                      {t("step3.budgetLabel")}
                    </label>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {budgetRanges.map((range) => (
                        <BudgetRangeCard
                          key={range.id}
                          id={range.id}
                          label={range.label}
                          description={range.description}
                          selected={formData.budget === range.id}
                          onClick={() => setFormData(prev => ({ ...prev, budget: range.id }))}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Additional Details */}
              {currentStep === 4 && (
                <div className="form-section space-y-6">
                  <SectionHeader 
                    number={t("step4.number")} 
                    title={t("step4.title")} 
                    description={t("step4.description")}
                  />
                  
                  <div className="step-content space-y-6">
                    <FormInput
                      label={t("step4.currentWebsiteLabel")}
                      type="url"
                      value={formData.currentWebsite}
                      onChange={(v) => setFormData(prev => ({ ...prev, currentWebsite: v }))}
                      placeholder={t("step4.currentWebsitePlaceholder")}
                    />
                    
                    <FormInput
                      label={t("step4.competitorsLabel")}
                      type="text"
                      value={formData.competitors}
                      onChange={(v) => setFormData(prev => ({ ...prev, competitors: v }))}
                      placeholder={t("step4.competitorsPlaceholder")}
                    />
                    
                    <FormTextarea
                      label={t("step4.messageLabel")}
                      value={formData.message}
                      onChange={(v) => setFormData(prev => ({ ...prev, message: v }))}
                      placeholder={t("step4.messagePlaceholder")}
                      rows={5}
                    />
                    
                    <FormSelect
                      label={t("step4.howFoundLabel")}
                      value={formData.howFound}
                      onChange={(v) => setFormData(prev => ({ ...prev, howFound: v }))}
                      options={[
                        { value: "", label: t("step4.howFoundOptions.placeholder") },
                        { value: "google", label: t("step4.howFoundOptions.google") },
                        { value: "social", label: t("step4.howFoundOptions.social") },
                        { value: "referral", label: t("step4.howFoundOptions.referral") },
                        { value: "other", label: t("step4.howFoundOptions.other") },
                      ]}
                    />
                  </div>
                </div>
              )}

              {/* Validation Error Message */}
              {validationError && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {validationError}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between gap-4 pt-4">
                {currentStep > 0 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setValidationError(null);
                      setCurrentStep(prev => prev - 1);
                    }}
                    className="group/btn relative flex items-center gap-2 px-6 py-3 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                  >
                    <svg className="h-4 w-4 transition-transform group-hover/btn:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {l(cmsContent?.buttons?.previous, t("form.previousButton"))}
                  </button>
                ) : (
                  <div />
                )}
                
                {/* Navigation: Next button for steps 0, 2, 3 | No button for step 1 (package auto-advances) | Submit for step 4 */}
                {currentStep === steps.length - 1 ? (
                  // Last step: Submit button
                  <button
                    type="submit"
                    disabled={isSubmitting || !canSubmit}
                    className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#ff8a3c] transition-colors duration-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-[#ff8a3c]"
                    style={{ fontFamily: "var(--font-goldman)" }}
                  >
                    <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                    <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                    <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                    <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                    <span className="absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-10" />
                    {isSubmitting ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {t("form.submitting")}
                      </>
                    ) : (
                      <>
                        {t("form.submitButton")}
                        <svg className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 12 12">
                          <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </button>
                ) : currentStep !== 1 ? (
                  // Steps 0, 2, 3: Next button with validation
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#ff8a3c] transition-colors duration-300 hover:text-white"
                    style={{ fontFamily: "var(--font-goldman)" }}
                  >
                    <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                    <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                    <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                    <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                    <span className="absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-10" />
                    {l(cmsContent?.buttons?.next, t("form.nextButton"))}
                    <svg className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 12 12">
                      <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                ) : (
                  // Step 1 (package selection): No forward button - selecting a package auto-advances
                  <div />
                )}
              </div>
            </form>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
              {/* Choices Summary */}
              <ChoicesSummary
                projectType={formData.projectType}
                pageCount={formData.pageCount}
                timeline={formData.timeline}
                budget={formData.budget}
                selectedFeatures={formData.features}
                projectTypes={projectTypes}
                timelineOptions={timelineOptions}
                budgetRanges={budgetRanges}
                featureOptions={featureOptions}
                translations={{
                  title: t("choicesSummary.title"),
                  subtitle: t("choicesSummary.subtitle"),
                  projectTypeLabel: t("choicesSummary.projectTypeLabel"),
                  pageCountLabel: t("choicesSummary.pageCountLabel"),
                  timelineLabel: t("choicesSummary.timelineLabel"),
                  budgetLabel: t("choicesSummary.budgetLabel"),
                  featuresLabel: t("choicesSummary.featuresLabel"),
                  noSelection: t("choicesSummary.noSelection"),
                  pagesUnit: t("choicesSummary.pagesUnit"),
                }}
              />
              
              {/* Contact Info Card */}
              <ContactInfoCard
                name={formData.name}
                email={formData.email}
                phone={formData.phone}
                company={formData.company}
                translations={{
                  title: t("contactCard.title"),
                  subtitle: t("contactCard.subtitle"),
                  nameLabel: t("contactCard.nameLabel"),
                  emailLabel: t("contactCard.emailLabel"),
                  phoneLabel: t("contactCard.phoneLabel"),
                  companyLabel: t("contactCard.companyLabel"),
                  notProvided: t("contactCard.notProvided"),
                }}
              />
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

// Package Card Component
function PackageCard({
  name,
  price,
  description,
  features,
  highlight = false,
  selected,
  selectText,
  selectedText,
  popularBadge,
  onClick,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
  selected: boolean;
  selectText: string;
  selectedText: string;
  popularBadge: string;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const priceRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const strikeRef = useRef<HammerStrikeHandle>(null);

  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleSelect = contextSafe(() => {
    if (strikeRef.current) {
      strikeRef.current.strike({ onComplete: onClick });
    } else {
      onClick();
    }
  });

  const handleMouseEnter = contextSafe(() => {
    if (priceRef.current) {
      gsap.to(priceRef.current, {
        textShadow: "0 0 20px rgba(255,138,60,0.8), 0 0 40px rgba(255,138,60,0.4)",
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    }
    strikeRef.current?.show();
  });

  const handleMouseLeave = contextSafe(() => {
    if (priceRef.current) {
      gsap.to(priceRef.current, {
        textShadow: "0 0 0px rgba(255,138,60,0)",
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
    strikeRef.current?.hide();
  });

  const cornerColor = highlight
    ? "border-[#ff8a3c]"
    : "border-zinc-700 group-hover:border-[#ff8a3c]";

  return (
    <article
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        group relative flex flex-col justify-between
        rounded-lg p-6 sm:p-8 backdrop-blur-sm
        transition-all duration-500 hover:-translate-y-2
        border
        ${highlight
          ? "bg-gradient-to-b from-[#0a0a0a] to-[#050609] border-[#ff8a3c]/30 shadow-[0_0_40px_rgba(255,138,60,0.15)]"
          : "bg-gradient-to-b from-[#0a0a0a]/80 to-[#050609]/60 border-white/5 hover:border-[#ff8a3c]/20"
        }
        ${selected ? "ring-2 ring-[#ff8a3c]" : ""}
      `}
    >
      {/* Corner brackets */}
      <span className={`absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 transition-all duration-500 group-hover:h-8 group-hover:w-8 ${cornerColor}`} />
      <span className={`absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 transition-all duration-500 group-hover:h-8 group-hover:w-8 ${cornerColor}`} />
      <span className={`absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 transition-all duration-500 group-hover:h-8 group-hover:w-8 ${cornerColor}`} />
      <span className={`absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 transition-all duration-500 group-hover:h-8 group-hover:w-8 ${cornerColor}`} />
      
      {/* Background gradient on hover */}
      <div className={`absolute inset-0 pointer-events-none rounded-lg bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 ${highlight ? "opacity-100" : ""}`} />
      
      {highlight && (
        <>
          <div className="absolute right-4 top-4 rounded-full bg-[#ff8a3c] px-3 py-1 text-xs font-bold uppercase tracking-wider text-black z-10">
            {popularBadge}
          </div>
          <div className="absolute inset-0 pointer-events-none rounded-lg bg-[radial-gradient(circle_at_top,rgba(255,138,60,0.05),transparent_60%)] opacity-60" />
        </>
      )}

      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <span
              className={`text-[10px] font-bold tracking-widest uppercase mb-2 block ${
                highlight ? "text-[#ff8a3c]" : "text-zinc-600 group-hover:text-[#ff8a3c]"
              }`}
              style={{ fontFamily: "var(--font-goldman)" }}
            >
              {highlight ? "POPULAR" : "STANDARD"}
            </span>
            <h3
              className={`text-xl sm:text-2xl font-bold uppercase transition-colors ${
                highlight ? "text-white" : "text-white group-hover:text-[#ff8a3c]"
              }`}
              style={{ fontFamily: "var(--font-goldman)" }}
            >
              {name}
            </h3>
          </div>
        </div>

        {/* Divider */}
        <div className="relative h-[1px] w-full">
          <div className={`absolute inset-0 transition-all duration-500 ${
            highlight
              ? "bg-gradient-to-r from-[#ff8a3c] via-[#ff8a3c]/50 to-transparent shadow-[0_0_8px_rgba(255,138,60,0.4)]"
              : "bg-gradient-to-r from-white/10 to-transparent group-hover:from-[#ff8a3c]/30"
          }`} />
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span
            ref={priceRef}
            style={{ fontFamily: "var(--font-goldman)" }}
            className={`text-4xl sm:text-5xl font-bold inline-block ${
              highlight ? "text-[#ff8a3c]" : "text-white"
            }`}
          >
            {price}
          </span>
          <span className="text-sm text-zinc-500 font-medium">/ alkaen</span>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-zinc-300">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3 text-sm text-zinc-300">
              <div
                className={`h-1.5 w-1.5 rounded-sm transition-all duration-300 flex-shrink-0 ${
                  highlight
                    ? "bg-[#ff8a3c] shadow-[0_0_8px_rgba(255,138,60,0.8)]"
                    : "bg-zinc-700 group-hover:bg-[#ff8a3c] group-hover:shadow-[0_0_8px_rgba(255,138,60,0.8)]"
                }`}
              />
              <span className="leading-tight">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button with HammerStrike */}
      <div className="mt-auto relative z-10 pt-6 w-full">
        <button
          ref={buttonRef}
          type="button"
          onClick={handleSelect}
          style={{ fontFamily: "var(--font-goldman)" }}
          className={`
            group/btn relative flex w-full items-center justify-center gap-2 
            overflow-hidden px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] 
            transition-all cursor-pointer duration-300
            ${selected
              ? "bg-[#ff8a3c] text-black"
              : "text-[#ff8a3c] hover:text-white hover:shadow-[0_0_20px_rgba(255,138,60,0.2)]"
            }
          `}
        >
          {/* Corner brackets on button */}
          <span className={`pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full ${highlight ? "border-[#ff8a3c]" : "border-[#ff8a3c]/60 group-hover/btn:border-[#ff8a3c]"}`} />
          <span className={`pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full ${highlight ? "border-[#ff8a3c]" : "border-[#ff8a3c]/60 group-hover/btn:border-[#ff8a3c]"}`} />
          <span className={`pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full ${highlight ? "border-[#ff8a3c]" : "border-[#ff8a3c]/60 group-hover/btn:border-[#ff8a3c]"}`} />
          <span className={`pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full ${highlight ? "border-[#ff8a3c]" : "border-[#ff8a3c]/60 group-hover/btn:border-[#ff8a3c]"}`} />
          
          {/* Background hover effect */}
          <span className="pointer-events-none absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-10" />

          <span className="relative z-10">{selected ? selectedText : selectText}</span>
          <svg
            className="relative z-10 h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <HammerStrike
          ref={strikeRef}
          targetRef={buttonRef}
          className="absolute inset-0"
        />
      </div>
    </article>
  );
}
