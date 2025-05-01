import React, { useState } from "react";

interface Step4AgreementsProps {
  registrationData: any;
  onDataChange: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Step4Agreements: React.FC<Step4AgreementsProps> = ({
  registrationData,
  onDataChange,
  onNext,
  onPrevious,
}) => {
  const [agreements, setAgreements] = useState({
    termsOfService: registrationData.agreements?.termsOfService || false,
    privacyPolicy: registrationData.agreements?.privacyPolicy || false,
    nda: registrationData.agreements?.nda || false,
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAgreements({ ...agreements, [name]: checked });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Make sure the mandatory NDA is checked
    if (!agreements.nda) {
      setError(
        "You must agree to the Non-Disclosure Agreement (NDA) to continue."
      );
      return;
    }

    // Make sure all agreements are checked (in this implementation all are required)
    if (!agreements.termsOfService || !agreements.privacyPolicy) {
      setError("You must agree to all terms to continue.");
      return;
    }

    setSubmitting(true);

    // Simulate API call to record agreement acceptances
    setTimeout(() => {
      setSubmitting(false);

      // Add timestamps to the agreements in a real implementation
      const timestampedAgreements = {
        termsOfService: agreements.termsOfService,
        privacyPolicy: agreements.privacyPolicy,
        nda: agreements.nda,
        acceptedAt: new Date().toISOString(),
      };

      onDataChange({ agreements: timestampedAgreements });
      onNext();
    }, 1000);
  };

  return (
    <div>
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            Legal Agreements
          </h3>
          <p className="text-sm text-gray-600">
            Please review and accept the following agreements to continue.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Terms of Service */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="mb-4">
              <h4 className="text-md font-medium text-gray-900">
                Terms of Service
              </h4>
              <div className="mt-2 text-sm text-gray-600 h-32 overflow-y-auto p-2 border border-gray-200 bg-white rounded">
                <p className="mb-2">
                  Welcome to Auxiliare-Clover. By accessing or using our
                  services, you agree to be bound by these Terms of Service.
                </p>
                <p className="mb-2">
                  <strong>1. User Accounts</strong>
                </p>
                <p className="mb-2">
                  When you create an account with us, you must provide accurate
                  and complete information. You are solely responsible for the
                  activity that occurs on your account, and you must keep your
                  account password secure.
                </p>
                <p className="mb-2">
                  <strong>2. Prohibited Activities</strong>
                </p>
                <p className="mb-2">
                  Users may not engage in any fraudulent activity,
                  misrepresentation, or activities that violate any laws, third
                  party rights, or our policies.
                </p>
                <p className="mb-2">
                  <strong>3. Content Ownership</strong>
                </p>
                <p className="mb-2">
                  Users retain ownership of content they submit, but grant
                  Auxiliare-Clover a license to use, reproduce, and display such
                  content in connection with providing and promoting the
                  services.
                </p>
                <p className="mb-2">
                  <strong>4. Termination</strong>
                </p>
                <p className="mb-2">
                  We reserve the right to terminate or suspend your account at
                  our sole discretion, without notice, for conduct that we
                  believe violates these Terms of Service or is harmful to other
                  users, us, or third parties, or for any other reason.
                </p>
                <p>
                  This is an abbreviated version for demonstration purposes. The
                  full Terms of Service would be more comprehensive.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="termsOfService"
                  name="termsOfService"
                  type="checkbox"
                  checked={agreements.termsOfService}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="termsOfService"
                  className="font-medium text-gray-700"
                >
                  I agree to the Terms of Service
                </label>
              </div>
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="mb-4">
              <h4 className="text-md font-medium text-gray-900">
                Privacy Policy
              </h4>
              <div className="mt-2 text-sm text-gray-600 h-32 overflow-y-auto p-2 border border-gray-200 bg-white rounded">
                <p className="mb-2">
                  This Privacy Policy describes how Auxiliare-Clover collects,
                  uses, and shares your personal information.
                </p>
                <p className="mb-2">
                  <strong>1. Information We Collect</strong>
                </p>
                <p className="mb-2">
                  We collect information you provide directly to us, such as
                  when you create an account, update your profile, or
                  communicate with us. This may include your name, email
                  address, phone number, and identification documents.
                </p>
                <p className="mb-2">
                  <strong>2. How We Use Your Information</strong>
                </p>
                <p className="mb-2">
                  We use your information to provide, maintain, and improve our
                  services, communicate with you, and for security and
                  verification purposes, including verifying your identity.
                </p>
                <p className="mb-2">
                  <strong>3. Information Sharing</strong>
                </p>
                <p className="mb-2">
                  We may share your information with third-party service
                  providers who perform services on our behalf, such as identity
                  verification providers, payment processors, and cloud service
                  providers.
                </p>
                <p className="mb-2">
                  <strong>4. Data Security</strong>
                </p>
                <p className="mb-2">
                  We take reasonable measures to help protect your personal
                  information from loss, theft, misuse, unauthorized access,
                  disclosure, alteration, and destruction.
                </p>
                <p>
                  This is an abbreviated version for demonstration purposes. The
                  full Privacy Policy would be more comprehensive.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="privacyPolicy"
                  name="privacyPolicy"
                  type="checkbox"
                  checked={agreements.privacyPolicy}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="privacyPolicy"
                  className="font-medium text-gray-700"
                >
                  I agree to the Privacy Policy
                </label>
              </div>
            </div>
          </div>

          {/* Non-Disclosure Agreement (NDA) */}
          <div className="bg-gray-50 p-4 rounded-lg border border-primary">
            <div className="mb-4">
              <h4 className="text-md font-medium text-gray-900">
                Non-Disclosure Agreement (NDA)
              </h4>
              <div className="mt-2 text-sm text-gray-600 h-32 overflow-y-auto p-2 border border-gray-200 bg-white rounded">
                <p className="mb-2">
                  This Non-Disclosure Agreement ("Agreement") is entered into
                  between you and Auxiliare-Clover, as well as between you and
                  other users of the platform.
                </p>
                <p className="mb-2">
                  <strong>1. Purpose</strong>
                </p>
                <p className="mb-2">
                  The purpose of this Agreement is to protect confidential
                  information shared between users of the Auxiliare-Clover
                  platform, including but not limited to business plans,
                  financial information, technical specifications, and
                  proprietary methodologies.
                </p>
                <p className="mb-2">
                  <strong>2. Definition of Confidential Information</strong>
                </p>
                <p className="mb-2">
                  "Confidential Information" means any non-public information
                  disclosed by one user to another through the Auxiliare-Clover
                  platform, whether orally, in writing, or by any other means,
                  that is designated as confidential or that reasonably should
                  be understood to be confidential given the nature of the
                  information and the circumstances of disclosure.
                </p>
                <p className="mb-2">
                  <strong>3. Obligations</strong>
                </p>
                <p className="mb-2">
                  You agree to: (a) maintain the confidentiality of all
                  Confidential Information received; (b) use such information
                  only for purposes of evaluating potential business
                  opportunities within the platform; (c) not disclose such
                  information to any third party without prior written consent;
                  and (d) take reasonable measures to protect the secrecy of and
                  avoid disclosure of Confidential Information.
                </p>
                <p className="mb-2">
                  <strong>4. Term</strong>
                </p>
                <p className="mb-2">
                  This Agreement remains in effect for as long as you maintain
                  an account on the Auxiliare-Clover platform and for a period
                  of five (5) years thereafter.
                </p>
                <p>
                  This is an abbreviated version for demonstration purposes. The
                  full Non-Disclosure Agreement would be more comprehensive and
                  legally binding.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="nda"
                  name="nda"
                  type="checkbox"
                  checked={agreements.nda}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="nda" className="font-medium text-gray-700">
                  I agree to the Non-Disclosure Agreement (NDA){" "}
                  <span className="text-red-600">*</span>
                </label>
                <p className="text-xs text-gray-500">
                  This NDA is mandatory for all users to maintain
                  confidentiality between founders and investors.
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onPrevious}
              disabled={submitting}
              className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {submitting ? "Processing..." : "Accept & Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step4Agreements;
