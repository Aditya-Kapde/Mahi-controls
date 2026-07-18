import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  ClipboardList,
  Mail,
  MessageSquare,
  Wrench,
} from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
import PageHero from "../components/ui/PageHero";
import CTASection from "../components/ui/CTASection";
import FormField from "../components/ui/FormField";
import { getInputClasses } from "../utils/formStyles";
import { getFieldError } from "../utils/formValidation";

const contactMethods = [
  {
    title: "Business Inquiries",
    description: "General questions about Mahi Controls and industrial sourcing support.",
    icon: Briefcase,
  },
  {
    title: "Product Sourcing",
    description: "Machinery, components, automation products, and spare parts requirements.",
    icon: Wrench,
  },
  {
    title: "Technical Requirements",
    description: "Specification review, compatibility questions, and application details.",
    icon: ClipboardList,
  },
  {
    title: "Request for Quote",
    description: "Structured procurement requirements with product and delivery details.",
    icon: MessageSquare,
  },
];

const initialFormState = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

function Contact() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submissionNotice, setSubmissionNotice] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));

    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: "" }));
    }

    if (submissionNotice) {
      setSubmissionNotice("");
    }
  };

  const validateForm = () => {
    const nextErrors = {
      fullName: getFieldError(formData.fullName, { required: true }),
      email: getFieldError(formData.email, { required: true, email: true }),
      subject: getFieldError(formData.subject, { required: true }),
      message: getFieldError(formData.message, { required: true }),
    };

    setErrors(nextErrors);
    return Object.values(nextErrors).every((error) => !error);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setSubmissionNotice("");
      return;
    }

    setSubmissionNotice(
      "Online form submission will be available shortly. Verified business contact details will be published here once confirmed. Your message has not been sent."
    );
  };

  return (
    <MainLayout>
      <PageHero
        eyebrow="Contact Us"
        title="Let's Discuss Your Industrial Requirement"
        description="Reach out to Mahi Controls regarding machinery, automation systems, electrical components, spare parts, and general industrial sourcing requirements."
      />

      <section className="w-full bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <motion.aside
              className="lg:col-span-5"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#F97316] uppercase mb-4">
                Get in Touch
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] leading-tight tracking-tight mb-4">
                How Can We Help?
              </h2>
              <p className="text-[#334155] text-base leading-relaxed mb-8">
                Use the form to share your inquiry. Verified contact details will be published
                on this page once confirmed by the business.
              </p>

              <ul className="space-y-4 mb-8">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <li
                      key={method.title}
                      className="flex gap-4 p-4 rounded-2xl bg-[#F8FAFC]/80 border border-slate-200/80"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center border border-orange-100 text-[#F97316]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#0F172A] mb-1">
                          {method.title}
                        </h3>
                        <p className="text-sm text-[#334155] leading-relaxed">
                          {method.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <Link
                to="/rfq"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F97316] hover:bg-orange-600 active:scale-95 text-white font-bold rounded-full shadow-md hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 text-sm tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] min-h-[44px]"
              >
                Request a Quote
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.aside>

            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="bg-[#F8FAFC]/50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-md">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center border border-orange-100 text-[#F97316]">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                      Send an Inquiry
                    </h2>
                    <p className="text-sm text-[#334155]">
                      Complete the form below and we will review your message when online submission is enabled.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      id="fullName"
                      label="Full Name"
                      required
                      error={errors.fullName}
                    >
                      {({ id, errorId, hasError }) => (
                        <input
                          id={id}
                          name="fullName"
                          type="text"
                          autoComplete="name"
                          value={formData.fullName}
                          onChange={handleChange}
                          aria-invalid={hasError}
                          aria-describedby={errorId}
                          className={getInputClasses(hasError)}
                        />
                      )}
                    </FormField>

                    <FormField
                      id="companyName"
                      label="Company Name"
                      error={errors.companyName}
                    >
                      {({ id, errorId, hasError }) => (
                        <input
                          id={id}
                          name="companyName"
                          type="text"
                          autoComplete="organization"
                          value={formData.companyName}
                          onChange={handleChange}
                          aria-invalid={hasError}
                          aria-describedby={errorId}
                          className={getInputClasses(hasError)}
                        />
                      )}
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      id="email"
                      label="Email"
                      required
                      error={errors.email}
                    >
                      {({ id, errorId, hasError }) => (
                        <input
                          id={id}
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleChange}
                          aria-invalid={hasError}
                          aria-describedby={errorId}
                          className={getInputClasses(hasError)}
                        />
                      )}
                    </FormField>

                    <FormField id="phone" label="Phone" error={errors.phone}>
                      {({ id, errorId, hasError }) => (
                        <input
                          id={id}
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          aria-invalid={hasError}
                          aria-describedby={errorId}
                          className={getInputClasses(hasError)}
                        />
                      )}
                    </FormField>
                  </div>

                  <FormField
                    id="subject"
                    label="Subject"
                    required
                    error={errors.subject}
                  >
                    {({ id, errorId, hasError }) => (
                      <input
                        id={id}
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        aria-invalid={hasError}
                        aria-describedby={errorId}
                        className={getInputClasses(hasError)}
                      />
                    )}
                  </FormField>

                  <FormField
                    id="message"
                    label="Message"
                    required
                    error={errors.message}
                  >
                    {({ id, errorId, hasError }) => (
                      <textarea
                        id={id}
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        aria-invalid={hasError}
                        aria-describedby={errorId}
                        className={getInputClasses(hasError)}
                      />
                    )}
                  </FormField>

                  {submissionNotice && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-900 leading-relaxed"
                    >
                      {submissionNotice}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0F172A] hover:bg-slate-800 text-white font-bold rounded-full shadow-md transition-all duration-300 text-sm tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] min-h-[44px]"
                  >
                    Submit Inquiry
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection
        heading="Have a Detailed Procurement Requirement?"
        description="For structured product details, quantities, and delivery requirements, use our Request for Quote form."
        primaryCta={{ label: "Request a Quote", to: "/rfq" }}
      />
    </MainLayout>
  );
}

export default Contact;
