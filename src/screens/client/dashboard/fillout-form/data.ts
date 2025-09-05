import { FieldMeta } from "@/components/ui/add-input";
import { Calendar, User, Phone, Mail, MapPin, Map } from "lucide-react";

// Legacy sections - kept for backward compatibility
// New code should use caseTypes.ts for dynamic form rendering
export const sections: {
  title: string;
  dependsOn?: { field: string; value: any };
  fields: FieldMeta[];
}[] = [
  {
    title: "Personal Information",
    fields: [
      {
        id: "dob",
        label: "Date of Birth",
        type: "date",
        icon: Calendar,
        required: true,
      },
      {
        id: "legal_name",
        label: "Full Legal Name",
        placeholder: "John Doe",
        type: "text",
        icon: User,
        required: true,
      },
      {
        id: "phone_number",
        label: "Phone Number",
        placeholder: "(555) 123-4567",
        type: "tel",
        icon: Phone,
        required: true,
      },
      {
        id: "email_address",
        label: "Email",
        placeholder: "johndoe@example.com",
        type: "email",
        icon: Mail,
        required: true,
      },
      {
        id: "marital_status",
        label: "Marital Status",
        type: "select",
        options: [
          { value: "single", label: "Single" },
          { value: "married", label: "Married" },
          { value: "divorced", label: "Divorced" },
          { value: "widowed", label: "Widowed" },
        ],
        required: true,
      },
      {
        id: "place_of_birth",
        label: "Place of Birth",
        placeholder: "New York, NY, USA",
        type: "text",
        icon: MapPin,
        required: false, // Made optional since voice bot doesn't provide this
      },
      {
        id: "current_address",
        label: "Current Address",
        placeholder: "123 Main St, New York, NY",
        type: "text",
        icon: Map,
        required: true,
      },
      {
        id: "height",
        label: "Height (feet/inches)",
        placeholder: "5'8\"",
        type: "text",
        required: true,
      },
      {
        id: "weight",
        label: "Weight (lbs)",
        placeholder: "160",
        type: "text",
        required: true,
      },
      {
        id: "hair_color",
        label: "Hair Color",
        placeholder: "Brown",
        type: "text",
        required: true,
      },
      {
        id: "eye_color",
        label: "Eye Color",
        placeholder: "Hazel",
        type: "text",
        required: true,
      },
      {
        id: "has_lived_in_usa",
        label: "Have you ever lived in the USA?",
        type: "toggle",
        required: false,
      },
      {
        id: "address_history",
        label: "Address History",
        placeholder: "List your previous addresses",
        type: "text",
        required: false,
      },
      {
        id: "employment_history",
        label: "Employment History",
        placeholder: "List your employment history",
        type: "text",
        required: false,
      },
      {
        id: "previous_marriage",
        label: "Previous Marriage Information",
        placeholder: "Details about previous marriages if any",
        type: "text",
        required: false,
      },
    ],
  },
  {
    title: "Children Information",
    fields: [
      {
        id: "children_info",
        label: "Do you have children?",
        type: "toggle",
        required: false,
      },
      {
        id: "number_of_children",
        label: "Number of Children",
        placeholder: "1",
        type: "select",
        options: Array.from({ length: 10 }, (_, i) => ({
          value: String(i + 1),
          label: String(i + 1),
        })),
        required: true,
        dependsOn: { field: "children_info", value: true },
      },
      {
        id: "child_name",
        label: "Child Name",
        placeholder: "Emily Doe",
        type: "text",
        icon: User,
        required: true,
        dependsOn: { field: "children_info", value: true },
      },
      {
        id: "child_dob",
        label: "Child DOB",
        type: "date",
        icon: Calendar,
        required: true,
        dependsOn: { field: "children_info", value: true },
      },
      {
        id: "child_birth_place",
        label: "Child Birthplace",
        placeholder: "Chicago, IL, USA",
        type: "text",
        icon: MapPin,
        required: true,
        dependsOn: { field: "children_info", value: true },
      },
      {
        id: "child_city",
        label: "Child City",
        placeholder: "Chicago",
        type: "text",
        required: true,
        dependsOn: { field: "children_info", value: true },
      },
      {
        id: "child_country",
        label: "Child Country",
        placeholder: "USA",
        type: "text",
        required: true,
        dependsOn: { field: "children_info", value: true },
      },
    ],
  },
  {
    title: "Spouse Information",
    dependsOn: { field: "marital_status", value: "married" },
    fields: [
      {
        id: "spouse_name",
        label: "Spouse Name",
        placeholder: "Jane Doe",
        type: "text",
        icon: User,
        required: true,
        dependsOn: { field: "marital_status", value: "married" },
      },
      {
        id: "spouse_dob",
        label: "Spouse DOB",
        type: "date",
        icon: Calendar,
        required: true,
        dependsOn: { field: "marital_status", value: "married" },
      },
      {
        id: "date_of_marriage",
        label: "Date of Marriage",
        type: "date",
        icon: Calendar,
        required: true,
        dependsOn: { field: "marital_status", value: "married" },
      },
      {
        id: "spouse_birth_place",
        label: "Spouse Place of Birth",
        placeholder: "Los Angeles, CA, USA",
        type: "text",
        icon: MapPin,
        required: true,
        dependsOn: { field: "marital_status", value: "married" },
      },
      {
        id: "spouse_city",
        label: "Spouse City",
        placeholder: "Los Angeles",
        type: "text",
        required: true,
        dependsOn: { field: "marital_status", value: "married" },
      },
      {
        id: "spouse_state",
        label: "Spouse State",
        placeholder: "California",
        type: "text",
        required: true,
        dependsOn: { field: "marital_status", value: "married" },
      },
      {
        id: "spouse_country",
        label: "Spouse Country",
        placeholder: "USA",
        type: "text", // or "select" if you want dropdown options
        required: true,
        dependsOn: { field: "marital_status", value: "married" },
      },
      {
        id: "spouse_address",
        label: "Spouse Address",
        placeholder: "123 Main St, New York, NY",
        type: "text",
        required: true,
        dependsOn: { field: "marital_status", value: "married" },
      },
    ],
  },
  {
    title: "Father Information",
    fields: [
      {
        id: "father_name",
        label: "Father's Name",
        placeholder: "John Doe Sr.",
        type: "text",
        required: false, // Made optional since voice bot doesn't provide this
      },
      {
        id: "father_dob",
        label: "Father's DOB",
        type: "date",
        icon: Calendar,
        required: true,
      },
      {
        id: "father_place_of_birth",
        label: "Father's Place of Birth",
        placeholder: "Boston, MA, USA",
        type: "text",
        icon: MapPin,
        required: false, // Made optional since voice bot doesn't provide this
      },
      {
        id: "parent_marriage_date",
        label: "Date of Marriage (Father & Mother)",
        type: "date",
        icon: Calendar,
        required: false, // Made optional since voice bot doesn't provide this
      },
      {
        id: "father_address",
        label: "Father's Address",
        placeholder: "456 Oak St, Boston, MA",
        type: "text",
        required: true,
      },
      {
        id: "father_city",
        label: "Father's City",
        placeholder: "Boston",
        type: "text",
        required: false, // Made optional since voice bot doesn't provide this
      },
      {
        id: "father_country",
        label: "Father's Country",
        placeholder: "USA",
        type: "text", // or "select"
        required: true,
      },
    ],
  },
  {
    title: "Mother Information",
    fields: [
      {
        id: "mother_name",
        label: "Mother's Name",
        placeholder: "Jane Doe Sr.",
        type: "text",
        required: false, // Made optional since voice bot doesn't provide this
      },
      {
        id: "mother_dob",
        label: "Mother's DOB",
        type: "date",
        icon: Calendar,
        required: true,
      },
      {
        id: "mother_place_of_birth",
        label: "Mother's Place of Birth",
        placeholder: "Chicago, IL, USA",
        type: "text",
        icon: MapPin,
        required: false, // Made optional since voice bot doesn't provide this
      },
      {
        id: "mother_address",
        label: "Mother's Address",
        placeholder: "456 Oak St, Chicago, IL",
        type: "text",
        required: true,
      },
      {
        id: "mother_city",
        label: "Mother's City",
        placeholder: "Chicago",
        type: "text",
        required: false, // Made optional since voice bot doesn't provide this
      },
      {
        id: "mother_country",
        label: "Mother's Country",
        placeholder: "USA",
        type: "text", // or "select"
        required: true,
      },
    ],
  },
  {
    title: "Immigration Applications",
    fields: [
      {
        id: "immigration_application",
        label: "Have you previously filed any immigration application?",
        type: "toggle", // Yes / No switch
        required: false,
      },
      {
        id: "immigration_details",
        label: "Immigration Application Details",
        placeholder: "Details about your immigration applications",
        type: "text",
        required: false,
        dependsOn: { field: "immigration_application", value: true },
      },
      {
        id: "application_type",
        label: "Type of Application",
        placeholder: "e.g., Asylum, Green Card, Visa",
        type: "text",
        required: true,
        dependsOn: { field: "immigration_application", value: true },
      },
      {
        id: "application_result",
        label: "Result of Application",
        placeholder: "Approved, Denied, Pending",
        type: "text",
        required: true,
        dependsOn: { field: "immigration_application", value: true },
      },
      {
        id: "application_date",
        label: "Date of Application",
        type: "date",
        icon: Calendar,
        required: true,
        dependsOn: { field: "immigration_application", value: true },
      },
    ],
  },
  {
    title: "Legal History",
    fields: [
      {
        id: "arrest_history",
        label: "Have you been arrested before?",
        type: "toggle",
        required: false,
      },
      {
        id: "arrest_reason",
        label: "Reason for Arrest",
        placeholder: "Describe the reason",
        type: "text",
        required: true,
        dependsOn: { field: "arrest_history", value: true },
      },
      {
        id: "arrest_date",
        label: "Date of Arrest",
        type: "date",
        icon: Calendar,
        required: true,
        dependsOn: { field: "arrest_history", value: true },
      },
      {
        id: "arrest_location",
        label: "Location of Arrest",
        placeholder: "City, State, Country",
        type: "text",
        required: true,
        dependsOn: { field: "arrest_history", value: true },
      },
      {
        id: "arrest_outcome",
        label: "Outcome",
        placeholder: "e.g., Charges Dropped, Convicted, Released",
        type: "text",
        required: true,
        dependsOn: { field: "arrest_history", value: true },
      },
    ],
  },
  {
    title: "Work Authorization",
    fields: [
      {
        id: "work_permit",
        label: "Have you had a work permit in the USA?",
        type: "toggle",
        required: false,
      },
      {
        id: "work_permit_type",
        label: "Type of Work Permit",
        placeholder: "e.g., H1B, OPT, EAD",
        type: "text",
        required: true,
        dependsOn: { field: "work_permit", value: true },
      },
      {
        id: "work_permit_issue_date",
        label: "Date Issued",
        type: "date",
        icon: Calendar,
        required: true,
        dependsOn: { field: "work_permit", value: true },
      },
      {
        id: "work_permit_expiry_date",
        label: "Expiration Date",
        type: "date",
        icon: Calendar,
        required: true,
        dependsOn: { field: "work_permit", value: true },
      },
      {
        id: "illegal_work_usa",
        label: "Have you ever worked illegally in the USA?",
        type: "toggle",
        required: true,
        dependsOn: { field: "work_permit", value: true },
      },
    ],
  },
];

// Legacy field mappings - kept for backward compatibility
// New code should use caseTypes.ts for dynamic form rendering
export const fieldMappings: Record<string, Record<string, string>> = {
  passport: {
    name: "legal_name",
    passport_number: "passportNumber",
    country_of_issue: "passportIssuingCountry",
    date_of_birth: "todayDate",
    place_of_birth: "place_of_birth",
    gender: "gender",
    issue_date: "passportIssueDate",
    expiration_date: "passportExpiryDate",
    nationality: "nationality",
  },

  birth_certificate: {
    full_name: "legal_name",
    date_of_birth: "todayDate",
    place_of_birth: "place_of_birth",
    father_name: "father_name",
    mother_name: "mother_name",
    certificate_number: "birthCertificateNumber",
    issuing_authority: "birthIssuingAuthority",
  },

  marriage_certificate: {
    spouse_1_name: "spouse_name",
    spouse_2_name: "spouseAltName", // optional
    marriage_date: "date_of_marriage",
    marriage_location: "spouse_address", // or create "marriageLocation" if different
    certificate_number: "marriageCertificateNumber",
    officiant_name: "officiantName", // optional: add to your form
    issuing_authority: "marriageIssuingAuthority", // optional: add to your form
  },

  divorce_decree: {
    party_1_name: "spouse_name",
    party_2_name: "spouseAltName",
    divorce_date: "divorceDate", // optional: add to your form
    court_name: "courtName", // optional: add to your form
    case_number: "divorceCaseNumber", // optional: add to your form
  },

  green_card: {
    name: "legal_name",
    uscis_a_number: "uscisNumber", // optional: add to your form
    card_number: "greenCardNumber", // optional: add to your form
    date_of_birth: "todayDate",
    issue_date: "greenCardIssueDate", // optional
    expiration_date: "greenCardExpiryDate", // optional
  },

  drivers_license: {
    name: "legal_name",
    license_number: "licenseNumber", // optional
    date_of_birth: "todayDate",
    address: "current_address",
    issue_date: "licenseIssueDate", // optional
    expiration_date: "licenseExpiryDate", // optional
    state: "licenseIssuingState", // optional
  },

  social_security_card: {
    name: "legal_name",
    social_security_number: "socialSecurityNumber", // optional
  },

  tax_return: {
    name: "legal_name",
    ssn: "socialSecurityNumber", // optional
    tax_year: "taxYear", // optional
    income_amount: "incomeAmount", // optional
    filing_status: "filingStatus", // optional
    employer_name: "employerName", // optional
  },

  medical_exam: {
    name: "legal_name",
    date_of_birth: "todayDate",
    exam_date: "medicalExamDate", // optional
    civil_surgeon_name: "civilSurgeonName", // optional
    vaccination_status: "vaccinationStatus", // optional
  },

  police_clearance: {
    name: "legal_name",
    date_of_birth: "todayDate",
    country_or_jurisdiction: "clearanceCountry", // optional
    certificate_number: "clearanceCertificateNumber", // optional
    issue_date: "clearanceIssueDate", // optional
    criminal_record_status: "criminalRecordStatus", // optional
  },
};
