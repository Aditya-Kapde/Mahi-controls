import { useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import FormField from "../components/ui/FormField";
import { getInputClasses } from "../utils/formStyles";
import { getFieldError } from "../utils/formValidation";

const PRODUCT_CATEGORY_OPTIONS = [
  "Road Construction Machinery",
  "Electrical & Automation",
  "Spare Parts",
  "Industrial Components",
  "Other",
];

const initialFormState = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  productCategory: "",
  productRequirement: "",
  quantity: "",
  deliveryLocation: "",
  expectedTimeline: "",
  technicalSpecifications: "",
};

function RFQ() {
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
      companyName: getFieldError(formData.companyName, { required: true }),
      email: getFieldError(formData.email, { required: true, email: true }),
      phone: getFieldError(formData.phone, { required: true }),
      productCategory: getFieldError(formData.productCategory, { required: true }),
      productRequirement: getFieldError(formData.productRequirement, {
        required: true,
      }),
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
      "Online RFQ submission will be available shortly. Your entered information has not been sent."
    );
  };

  return (
    <MainLayout>
      <PageHero
        eyebrow="Request for Quote"
        title="Tell Us What You Need"
        description="Share your industrial sourcing requirements so our team can review machinery, automation, electrical, component, or spare-parts needs."
      />

      <section className="w-full bg-white py-24 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionHeader
            eyebrow="RFQ Form"
            title="Submit Your Sourcing Requirement"
            description="Provide as much detail as possible to help us understand your product and delivery requirements."
            align="center"
            className="mb-12"
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-[#F8FAFC]/50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-md"
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-10">
              <fieldset className="space-y-5">
                <legend className="text-lg font-bold text-[#0F172A] tracking-tight mb-2">
                  Contact Information
                </legend>

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
                    required
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

                  <FormField
                    id="phone"
                    label="Phone"
                    required
                    error={errors.phone}
                  >
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
              </fieldset>

              <fieldset className="space-y-5">
                <legend className="text-lg font-bold text-[#0F172A] tracking-tight mb-2">
                  Requirement Details
                </legend>

                <FormField
                  id="productCategory"
                  label="Product Category"
                  required
                  error={errors.productCategory}
                >
                  {({ id, errorId, hasError }) => (
                    <select
                      id={id}
                      name="productCategory"
                      value={formData.productCategory}
                      onChange={handleChange}
                      aria-invalid={hasError}
                      aria-describedby={errorId}
                      className={getInputClasses(hasError)}
                    >
                      <option value="">Select a category</option>
                      {PRODUCT_CATEGORY_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                </FormField>

                <FormField
                  id="productRequirement"
                  label="Product / Requirement"
                  required
                  error={errors.productRequirement}
                >
                  {({ id, errorId, hasError }) => (
                    <textarea
                      id={id}
                      name="productRequirement"
                      rows={4}
                      value={formData.productRequirement}
                      onChange={handleChange}
                      aria-invalid={hasError}
                      aria-describedby={errorId}
                      className={getInputClasses(hasError)}
                      placeholder="Describe the product, part number, or requirement you need sourced."
                    />
                  )}
                </FormField>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField id="quantity" label="Quantity" error={errors.quantity}>
                    {({ id, errorId, hasError }) => (
                      <input
                        id={id}
                        name="quantity"
                        type="text"
                        value={formData.quantity}
                        onChange={handleChange}
                        aria-invalid={hasError}
                        aria-describedby={errorId}
                        className={getInputClasses(hasError)}
                        placeholder="e.g. 2 units, 50 pieces"
                      />
                    )}
                  </FormField>

                  <FormField
                    id="deliveryLocation"
                    label="Delivery Location"
                    error={errors.deliveryLocation}
                  >
                    {({ id, errorId, hasError }) => (
                      <input
                        id={id}
                        name="deliveryLocation"
                        type="text"
                        value={formData.deliveryLocation}
                        onChange={handleChange}
                        aria-invalid={hasError}
                        aria-describedby={errorId}
                        className={getInputClasses(hasError)}
                        placeholder="City, state, or site location"
                      />
                    )}
                  </FormField>
                </div>

                <FormField
                  id="expectedTimeline"
                  label="Expected Timeline"
                  error={errors.expectedTimeline}
                >
                  {({ id, errorId, hasError }) => (
                    <input
                      id={id}
                      name="expectedTimeline"
                      type="text"
                      value={formData.expectedTimeline}
                      onChange={handleChange}
                      aria-invalid={hasError}
                      aria-describedby={errorId}
                      className={getInputClasses(hasError)}
                      placeholder="e.g. Required within 4 weeks"
                    />
                  )}
                </FormField>
              </fieldset>

              <fieldset className="space-y-5">
                <legend className="text-lg font-bold text-[#0F172A] tracking-tight mb-2">
                  Technical Details
                </legend>

                <FormField
                  id="technicalSpecifications"
                  label="Technical Specifications / Additional Details"
                  error={errors.technicalSpecifications}
                >
                  {({ id, errorId, hasError }) => (
                    <textarea
                      id={id}
                      name="technicalSpecifications"
                      rows={5}
                      value={formData.technicalSpecifications}
                      onChange={handleChange}
                      aria-invalid={hasError}
                      aria-describedby={errorId}
                      className={getInputClasses(hasError)}
                      placeholder="Include specifications, standards, compatibility notes, or other relevant details."
                    />
                  )}
                </FormField>

                <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-4">
                  <p className="text-sm font-semibold text-[#0F172A] mb-1">
                    Document Upload
                  </p>
                  <p className="text-sm text-[#334155] leading-relaxed">
                    File attachment support will be added in a future release. Please include
                    key details in the technical specifications field for now.
                  </p>
                </div>
              </fieldset>

              {submissionNotice && (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-900 leading-relaxed"
                >
                  {submissionNotice}
                </div>
              )}

              <div className="space-y-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F97316] hover:bg-orange-600 active:scale-95 text-white font-bold rounded-full shadow-md hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 text-sm tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] min-h-[44px]"
                >
                  Submit RFQ
                </button>
                <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                  Form submission will be connected to the business inquiry system in the
                  production version. Until then, no data entered here is transmitted or stored.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}

export default RFQ;
