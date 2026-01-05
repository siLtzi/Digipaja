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

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ContactPageContentProps = {
  locale: string;
};

export default function ContactPageContent({ locale }: ContactPageContentProps) {
  const t = useTranslations("contactPage");
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
    { id: "contact", title: t("steps.contact"), icon: "👤" },
    { id: "project", title: t("steps.project"), icon: "📋" },
    { id: "features", title: t("steps.features"), icon: "⚙️" },
    { id: "details", title: t("steps.details"), icon: "💬" },
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
                      onChange={(v) => setFormData(prev => ({ ...prev, name: v }))}
                      placeholder={t("form.namePlaceholder")}
                      required
                    />
                    <FormInput
                      label={t("form.emailLabel")}
                      type="email"
                      value={formData.email}
                      onChange={(v) => setFormData(prev => ({ ...prev, email: v }))}
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

              {/* Step 2: Project Type */}
              {currentStep === 1 && (
                <div className="form-section space-y-8">
                  <SectionHeader 
                    number={t("step2.number")} 
                    title={t("step2.title")} 
                    description={t("step2.description")}
                  />
                  
                  {/* Project Type Selection */}
                  <div className="step-content grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {projectTypes.map((type) => (
                      <ProjectTypeCard
                        key={type.id}
                        {...type}
                        selected={formData.projectType === type.id}
                        onClick={() => setFormData(prev => ({ ...prev, projectType: type.id }))}
                      />
                    ))}
                  </div>
                  
                  {/* Page Count Slider */}
                  <div className="step-content relative overflow-hidden rounded-lg border border-zinc-800 bg-[#0a0a0a] p-6">
                    <div className="absolute top-0 left-0 h-3 w-3 border-l border-t border-[#ff8a3c]/30" />
                    
                    <PageCountSlider
                      value={formData.pageCount}
                      onChange={(v) => setFormData(prev => ({ ...prev, pageCount: v }))}
                      min={1}
                      max={30}
                      label={t("step2.pageCountLabel")}
                      description=""
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

              {/* Step 3: Features */}
              {currentStep === 2 && (
                <div className="form-section space-y-8">
                  <SectionHeader 
                    number={t("step3.number")} 
                    title={t("step3.title")} 
                    description={t("step3.description")}
                  />
                  
                  <div className="step-content grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {featureOptions.map((feature) => (
                      <FeatureCard
                        key={feature.id}
                        id={feature.id}
                        label={feature.label}
                        description={feature.description}
                        selected={formData.features.includes(feature.id)}
                        onClick={() => handleFeatureToggle(feature.id)}
                      />
                    ))}
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

              {/* Step 4: Additional Details */}
              {currentStep === 3 && (
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

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between gap-4 pt-4">
                {currentStep > 0 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="group/btn relative flex items-center gap-2 px-6 py-3 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                  >
                    <svg className="h-4 w-4 transition-transform group-hover/btn:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {t("form.previousButton")}
                  </button>
                ) : (
                  <div />
                )}
                
                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#ff8a3c] transition-colors duration-300 hover:text-white"
                    style={{ fontFamily: "var(--font-goldman)" }}
                  >
                    <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                    <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                    <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                    <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#ff8a3c] transition-all duration-300 group-hover/btn:h-full group-hover/btn:w-full" />
                    <span className="absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-10" />
                    {t("form.nextButton")}
                    <svg className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 12 12">
                      <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#ff8a3c] transition-colors duration-300 hover:text-white disabled:opacity-50"
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
