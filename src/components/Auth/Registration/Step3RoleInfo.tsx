import React, { useState } from "react";

interface Step3RoleInfoProps {
  registrationData: any;
  onDataChange: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Step3RoleInfo: React.FC<Step3RoleInfoProps> = ({
  registrationData,
  onDataChange,
  onNext,
  onPrevious,
}) => {
  const isFounder = registrationData.role === "Founder";
  const [uploading, setUploading] = useState(false);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [errors, setErrors] = useState({
    id: "",
    companyName: "",
    industry: "",
    description: "",
    stage: "",
    linkedinUrl: "",
    organizationalAffiliations: "",
  });

  const [founderData, setFounderData] = useState({
    companyName: registrationData.companyInfo?.companyName || "",
    industry: registrationData.companyInfo?.industry || "",
    description: registrationData.companyInfo?.description || "",
    stage: registrationData.companyInfo?.stage || "",
    teamInfo: registrationData.companyInfo?.teamInfo || "",
    website: registrationData.companyInfo?.website || "",
    linkedin: registrationData.companyInfo?.linkedin || "",
  });

  const [investorData, setInvestorData] = useState({
    linkedinUrl: registrationData.investorInfo?.linkedinUrl || "",
    organizationalAffiliations:
      registrationData.investorInfo?.organizationalAffiliations || "",
    startupsFunded: registrationData.investorInfo?.startupsFunded || "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      id: "",
      companyName: "",
      industry: "",
      description: "",
      stage: "",
      linkedinUrl: "",
      organizationalAffiliations: "",
    };

    // Government ID validation - required for all users
    if (!idFile) {
      newErrors.id = "Please upload your government-issued ID";
      isValid = false;
    }

    if (isFounder) {
      // Founder-specific validations
      if (!founderData.companyName.trim()) {
        newErrors.companyName = "Company name is required";
        isValid = false;
      }

      if (!founderData.industry.trim()) {
        newErrors.industry = "Industry is required";
        isValid = false;
      }

      if (!founderData.description.trim()) {
        newErrors.description = "Company description is required";
        isValid = false;
      }

      if (!founderData.stage.trim()) {
        newErrors.stage = "Company stage is required";
        isValid = false;
      }
    } else {
      // Investor-specific validations
      if (!investorData.linkedinUrl.trim()) {
        newErrors.linkedinUrl = "LinkedIn URL is required";
        isValid = false;
      } else if (
        !/^https?:\/\/([a-z]{2,3}\.)?linkedin\.com\/.*$/i.test(
          investorData.linkedinUrl
        )
      ) {
        newErrors.linkedinUrl = "Please enter a valid LinkedIn URL";
        isValid = false;
      }

      if (!investorData.organizationalAffiliations.trim()) {
        newErrors.organizationalAffiliations =
          "Organizational affiliations are required";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFounderDataChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFounderData({ ...founderData, [name]: value });
  };

  const handleInvestorDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInvestorData({ ...investorData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Validate file size (< 5MB) and type
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, id: "File size exceeds 5MB limit" });
        return;
      }

      const validTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!validTypes.includes(file.type)) {
        setErrors({ ...errors, id: "Please upload a JPG, PNG, or PDF file" });
        return;
      }

      setIdFile(file);
      setErrors({ ...errors, id: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setUploading(true);

      // Simulate file upload - in a real app, this would be an API call
      setTimeout(() => {
        setUploading(false);

        const updatedData = {
          companyInfo: isFounder ? founderData : registrationData.companyInfo,
          investorInfo: !isFounder
            ? investorData
            : registrationData.investorInfo,
          idDocument: idFile ? idFile.name : null, // In a real app, this would be the URL or ID of the uploaded file
        };

        onDataChange(updatedData);
        onNext();
      }, 1500);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ID Upload Section - Common for all roles */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-900">
            Identity Verification
          </h3>
          <p className="text-sm text-gray-600">
            Please upload a government-issued ID for verification purposes.
          </p>

          <div className="mt-2">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {idFile ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center">
                    <svg
                      className="h-8 w-8 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium">{idFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(idFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button
                    type="button"
                    onClick={() => setIdFile(null)}
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label
                      htmlFor="id-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="id-upload"
                        name="id-upload"
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    JPG, PNG, PDF up to 5MB
                  </p>
                </div>
              )}
            </div>
            {errors.id && (
              <p className="mt-1 text-sm text-red-600">{errors.id}</p>
            )}
          </div>
        </div>

        {/* Role-specific information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            {isFounder ? "Company Information" : "Investor Profile"}
          </h3>

          {isFounder ? (
            // Founder-specific fields
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Name *
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={founderData.companyName}
                  onChange={handleFounderDataChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.companyName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="industry"
                  className="block text-sm font-medium text-gray-700"
                >
                  Industry *
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={founderData.industry}
                  onChange={handleFounderDataChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option value="">Select Industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Education">Education</option>
                  <option value="Retail">Retail</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Other">Other</option>
                </select>
                {errors.industry && (
                  <p className="mt-1 text-sm text-red-600">{errors.industry}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={founderData.description}
                  onChange={handleFounderDataChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Brief description of your company and what problem you're solving"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="stage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Stage *
                </label>
                <select
                  id="stage"
                  name="stage"
                  value={founderData.stage}
                  onChange={handleFounderDataChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option value="">Select Stage</option>
                  <option value="Idea">Idea</option>
                  <option value="Pre-Seed">Pre-Seed</option>
                  <option value="Seed">Seed</option>
                  <option value="Series A">Series A</option>
                  <option value="Series B">Series B</option>
                  <option value="Growth">Growth</option>
                </select>
                {errors.stage && (
                  <p className="mt-1 text-sm text-red-600">{errors.stage}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="teamInfo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Team Information (Optional)
                </label>
                <textarea
                  id="teamInfo"
                  name="teamInfo"
                  rows={2}
                  value={founderData.teamInfo}
                  onChange={handleFounderDataChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Brief description of your team members and their backgrounds"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="website"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Website (Optional)
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={founderData.website}
                    onChange={handleFounderDataChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="linkedin"
                    className="block text-sm font-medium text-gray-700"
                  >
                    LinkedIn (Optional)
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={founderData.linkedin}
                    onChange={handleFounderDataChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="https://linkedin.com/company/..."
                  />
                </div>
              </div>
            </div>
          ) : (
            // Investor-specific fields
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="linkedinUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  LinkedIn URL *
                </label>
                <input
                  type="url"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={investorData.linkedinUrl}
                  onChange={handleInvestorDataChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="https://linkedin.com/in/..."
                />
                {errors.linkedinUrl && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.linkedinUrl}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="organizationalAffiliations"
                  className="block text-sm font-medium text-gray-700"
                >
                  Organizational Affiliations *
                </label>
                <textarea
                  id="organizationalAffiliations"
                  name="organizationalAffiliations"
                  rows={3}
                  value={investorData.organizationalAffiliations}
                  onChange={handleInvestorDataChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="List your current organizational affiliations, VC firms, or investment groups"
                />
                {errors.organizationalAffiliations && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.organizationalAffiliations}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="startupsFunded"
                  className="block text-sm font-medium text-gray-700"
                >
                  Number of Startups Funded (Optional)
                </label>
                <input
                  type="number"
                  id="startupsFunded"
                  name="startupsFunded"
                  min="0"
                  value={investorData.startupsFunded}
                  onChange={handleInvestorDataChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-4 pt-2">
          <button
            type="button"
            onClick={onPrevious}
            disabled={uploading}
            className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={uploading}
            className="flex-1 bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step3RoleInfo;
