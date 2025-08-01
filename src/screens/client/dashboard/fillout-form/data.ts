import { FieldMeta } from "@/components/ui/add-input";
import { Calendar, User, Phone, Mail, MapPin, Map } from "lucide-react";

export const sections: { title: string; fields: FieldMeta[] }[] = [
  {
    title: "Client Management",
    fields: [
      {
        id: "todayDate",
        label: "Today's Date",
        type: "date",
        icon: Calendar,
      },
      {
        id: "currentFullName",
        label: "Current Full Name",
        placeholder: "Hafiz Ahmad Ismail",
        type: "text",
        icon: User,
      },
      {
        id: "previousName",
        label: "Names you have previous",
        type: "text",
        placeholder: "A. Ahmad",
      },
      {
        id: "countryCode",
        label: "Code",
        placeholder: "+92",
        type: "text",
      },
      {
        id: "phoneNumber",
        label: "Number",
        placeholder: "3335558269",
        type: "tel",
        icon: Phone,
      },
      {
        id: "email",
        label: "Email",
        placeholder: "ahmadansari55@gmail.com",
        type: "email",
        icon: Mail,
      },
      {
        id: "maritalStatus",
        label: "Marital Status",
        type: "select",
        options: [
          { value: "single", label: "Single" },
          { value: "married", label: "Married" },
          { value: "divorced", label: "Divorced" },
          { value: "widowed", label: "Widowed" },
        ],
      },
      {
        id: "placeOfBirth",
        label: "Place of Birth (City, State, Country)",
        placeholder: "Alaska, USA",
        type: "text",
        icon: MapPin,
      },
      {
        id: "liveInUSA",
        label: "Do you currently live in the USA?",
        type: "toggle",
      },
      {
        id: "currentAddress",
        label: "Your Current Address",
        placeholder: "Alaska, USA",
        type: "text",
        icon: Map,
      },
      {
        id: "livedInUSA",
        label: "Have you lived in the USA?",
        type: "toggle",
      },
      {
        id: "height",
        label: "Height (feet/inches)",
        placeholder: "4.9",
        type: "text",
        subToggle: { leftLabel: "feet/inches", rightLabel: "cm" },
      },
      {
        id: "weight",
        label: "Weight (lbs)",
        placeholder: "75",
        type: "text",
        subToggle: { leftLabel: "lbs", rightLabel: "kg" },
      },
      {
        id: "hairColor",
        label: "Hair Color",
        type: "select",
        options: [
          { value: "black", label: "Black" },
          { value: "brown", label: "Brown" },
          { value: "blonde", label: "Blonde" },
          { value: "other", label: "Other" },
        ],
      },
      {
        id: "eyeColor",
        label: "Eye Color",
        type: "select",
        options: [
          { value: "brown", label: "Brown" },
          { value: "blue", label: "Blue" },
          { value: "green", label: "Green" },
          { value: "other", label: "Other" },
        ],
      },
    ],
  },
  {
    title: "Children Information",
    fields: [
      {
        id: "hasChildren",
        label: "Do you have children?",
        type: "checkbox",
      },
      {
        id: "childrenCount",
        label: "How many children?",
        placeholder: "01",
        type: "select",
        options: Array.from({ length: 10 }, (_, i) => ({
          value: String(i + 1),
          label: String(i + 1),
        })),
      },
      {
        id: "childName",
        label: "Child Name",
        placeholder: "Liana Jones",
        type: "text",
        icon: User,
      },
      {
        id: "childDob",
        label: "Child DOB",
        type: "date",
        icon: Calendar,
      },
      {
        id: "childBirthPlace",
        label: "Place of Birth (child)",
        placeholder: "Islamabad",
        type: "text",
        icon: MapPin,
      },
      {
        id: "childAddress",
        label: "Child Address",
        placeholder: "H # no 2 , Muhalla Eid Gah",
        type: "text",
        bottomCheckbox: {
          id: "sameAddress",
          label: "Same as current address",
        },
      },
      {
        id: "childCity",
        label: "City",
        placeholder: "Islamabad",
        type: "select",
        options: [
          { value: "islamabad", label: "Islamabad" },
          { value: "lahore", label: "Lahore" },
          { value: "karachi", label: "Karachi" },
        ],
      },
      {
        id: "childCountry",
        label: "Country",
        placeholder: "Pakistan",
        type: "select",
        options: [
          { value: "pakistan", label: "Pakistan" },
          { value: "usa", label: "USA" },
        ],
      },
    ],
  },
  {
    title: "Spouse Information",
    fields: [
      {
        id: "spouseName",
        label: "Spouse Name",
        placeholder: "Liana Jones",
        type: "text",
        icon: User,
      },
      {
        id: "spouseDob",
        label: "Spouse DOB",
        type: "date",
        icon: Calendar,
      },
      {
        id: "spouseBirthPlace",
        label: "Place of Birth (spouse)",
        placeholder: "Islamabad",
        type: "text",
        icon: MapPin,
      },
      {
        id: "spouseMarriageDate",
        label: "Date of Marriage",
        type: "date",
        icon: Calendar,
      },
      {
        id: "spouseAddress",
        label: "Spouse Address",
        placeholder: "H # no 2 , Muhalla Eid Gah",
        type: "text",
        bottomCheckbox: {
          id: "sameAddress",
          label: "Same as current address",
        },
      },
      {
        id: "spouseCity",
        label: "City",
        placeholder: "Islamabad",
        type: "select",
        options: [
          { value: "islamabad", label: "Islamabad" },
          { value: "lahore", label: "Lahore" },
        ],
      },
      {
        id: "spouseState",
        label: "State",
        placeholder: "Islamabad",
        type: "select",
        options: [
          { value: "pakistan", label: "Pakistan" },
          { value: "usa", label: "USA" },
        ],
      },
      {
        id: "spouseCountry",
        label: "Country",
        placeholder: "Pakistan",
        type: "select",
        options: [
          { value: "pakistan", label: "Pakistan" },
          { value: "usa", label: "USA" },
        ],
      },
    ],
  },
  {
    title: "Parents Information (Father)",
    fields: [
      {
        id: "fatherName",
        label: "Father Name",
        placeholder: "Lee Jones",
        type: "text",
        icon: User,
      },
      {
        id: "fatherDob",
        label: "Father DOB",
        type: "date",
        icon: Calendar,
      },
      {
        id: "fatherBirthPlace",
        label: "Place of Birth (father)",
        placeholder: "Islamabad",
        type: "text",
        icon: MapPin,
      },
      {
        id: "fatherMarriageDate",
        label: "Date of Marriage",
        type: "date",
        icon: Calendar,
      },
      {
        id: "fatherAddress",
        label: "Father Address",
        placeholder: "H # no 2 , Muhalla Eid Gah",
        type: "text",
        bottomCheckbox: {
          id: "sameAddress",
          label: "Same as current address",
        },
      },
      {
        id: "fatherCity",
        label: "City",
        placeholder: "Islamabad",
        type: "select",
        options: [
          { value: "islamabad", label: "Islamabad" },
          { value: "lahore", label: "Lahore" },
        ],
      },
      {
        id: "fatherCountry",
        label: "Country",
        placeholder: "Pakistan",
        type: "select",
        options: [
          { value: "pakistan", label: "Pakistan" },
          { value: "usa", label: "USA" },
        ],
      },
    ],
  },
  {
    title: "Parents Information (Mother)",
    fields: [
      {
        id: "motherName",
        label: "Mother Name",
        placeholder: "Liana Jones",
        type: "text",
        icon: User,
      },
      {
        id: "motherDob",
        label: "Mother DOB",
        type: "date",
        icon: Calendar,
      },
      {
        id: "motherBirthPlace",
        label: "Place of Birth (mother)",
        placeholder: "Islamabad",
        type: "text",
        icon: MapPin,
      },
      {
        id: "motherMarriageDate",
        label: "Date of Marriage",
        type: "date",
        icon: Calendar,
      },
      {
        id: "motherAddress",
        label: "Mother Address",
        placeholder: "H # no 2 , Muhalla Eid Gah",
        type: "text",
        bottomCheckbox: {
          id: "sameAddress",
          label: "Same as current address",
        },
      },
      {
        id: "motherCity",
        label: "Mother City",
        placeholder: "Islamabad",
        type: "select",
        options: [
          { value: "islamabad", label: "Islamabad" },
          { value: "lahore", label: "Lahore" },
        ],
      },
      {
        id: "motherCountry",
        label: "Country",
        placeholder: "Pakistan",
        type: "select",
        options: [
          { value: "pakistan", label: "Pakistan" },
          { value: "usa", label: "USA" },
        ],
      },
    ],
  },
  {
    title: "Address 1 (Show Address History Timeline)",
    fields: [
      {
        id: "address1YearsSame",
        label: "I have lived at the same address for 5+ years.",
        type: "checkbox",
      },
      {
        id: "address1Street",
        label: "Address Line",
        placeholder: "H # no 22, street 01, Main Avenue",
        type: "text",
        icon: Map,
      },
      {
        id: "address1State",
        label: "State",
        placeholder: "Alaska",
        type: "select",
        options: [
          { value: "alaska", label: "Alaska" },
          { value: "california", label: "California" },
        ],
      },
      {
        id: "address1Country",
        label: "Country",
        placeholder: "Alaska",
        type: "select",
        options: [
          { value: "usa", label: "USA" },
          { value: "pakistan", label: "Pakistan" },
        ],
      },
      {
        id: "address1Postal",
        label: "Postal Code",
        placeholder: "95000",
        type: "text",
      },
    ],
  },
  {
    title: "Address 2 (Show Address History Timeline)",
    fields: [
      {
        id: "address2Street",
        label: "Address Line",
        placeholder: "H # no 22, street 01, Main Avenue",
        type: "text",
        icon: Map,
      },
      {
        id: "address2State",
        label: "State",
        placeholder: "Alaska",
        type: "select",
        options: [
          { value: "alaska", label: "Alaska" },
          { value: "california", label: "California" },
        ],
      },
      {
        id: "address2Country",
        label: "Country",
        placeholder: "Pakistan",
        type: "select",
        options: [
          { value: "pakistan", label: "Pakistan" },
          { value: "usa", label: "USA" },
        ],
      },
      {
        id: "address2MoveDate",
        label: "Move‑out Date",
        type: "date",
        icon: Calendar,
      },
    ],
  },
  {
    title: "US presence questions",
    fields: [
      {
        id: "usPresenceBefore",
        label: "Have you lived in the USA before?",
        type: "toggle",
      },
      {
        id: "usEntryMethod",
        label: "How did you last enter in the USA?",
        type: "select",
        options: [
          { value: "visa", label: "With Visa" },
          { value: "passport", label: "With Passport" },
        ],
      },
      {
        id: "usEntryPort",
        label: "Last port of entry?",
        placeholder: "Alaska",
        type: "text",
      },
      {
        id: "usExitDate",
        label: "Date of last entry?",
        type: "date",
        icon: Calendar,
      },
    ],
  },
  {
    title: "Immigration Applications",
    fields: [
      {
        id: "submittedBefore",
        label: "Have you submitted immigration applications before?",
        type: "toggle",
      },
      {
        id: "applicationType",
        label: "Type of application?",
        type: "select",
        options: [
          { value: "work", label: "Work Visa" },
          { value: "study", label: "Study Visa" },
        ],
      },
      {
        id: "applicationResult",
        label: "Result?",
        type: "select",
        options: [
          { value: "successful", label: "Successful" },
          { value: "rejected", label: "Rejected" },
        ],
      },
      {
        id: "applicationDate",
        label: "Date?",
        type: "date",
        icon: Calendar,
      },
    ],
  },
  {
    title: "Work Authorization",
    fields: [
      {
        id: "hadWorkPermit",
        label: "Have you had work permits in the USA?",
        type: "toggle",
      },
    ],
  },
  {
    title: "Legal History",
    fields: [
      {
        id: "arrestedBefore",
        label: "Have you been arrested before?",
        type: "toggle",
      },
    ],
  },
];

// src/constants/fieldMappings.ts

export const fieldMappings: Record<string, Record<string, string>> = {
  passport: {
    name: "currentFullName",
    passport_number: "passportNumber",
    country_of_issue: "passportIssuingCountry",
    date_of_birth: "todayDate",
    place_of_birth: "placeOfBirth",
    gender: "gender",
    issue_date: "passportIssueDate",
    expiration_date: "passportExpiryDate",
    nationality: "nationality",
  },

  birth_certificate: {
    full_name: "currentFullName",
    date_of_birth: "todayDate",
    place_of_birth: "placeOfBirth",
    father_name: "fatherName",
    mother_name: "motherName",
    certificate_number: "birthCertificateNumber",
    issuing_authority: "birthIssuingAuthority",
  },

  marriage_certificate: {
    spouse_1_name: "spouseName", // if different spouses needed, change to spouse1Name
    spouse_2_name: "spouseAltName", // optional: add new field if needed
    marriage_date: "spouseMarriageDate",
    marriage_location: "spouseAddress", // or create a new "marriageLocation"
    certificate_number: "marriageCertificateNumber",
    officiant_name: "officiantName", // add field in form if missing
    issuing_authority: "marriageIssuingAuthority", // add field in form if missing
  },

  divorce_decree: {
    party_1_name: "spouseName",
    party_2_name: "spouseAltName",
    divorce_date: "divorceDate", // add in your form
    court_name: "courtName", // add in your form
    case_number: "divorceCaseNumber", // add in your form
  },

  green_card: {
    name: "currentFullName",
    uscis_a_number: "uscisNumber", // add in your form
    card_number: "greenCardNumber", // add in your form
    date_of_birth: "todayDate",
    issue_date: "greenCardIssueDate", // add in your form
    expiration_date: "greenCardExpiryDate", // add in your form
  },

  drivers_license: {
    name: "currentFullName",
    license_number: "licenseNumber", // add in your form
    date_of_birth: "todayDate",
    address: "currentAddress",
    issue_date: "licenseIssueDate", // add in your form
    expiration_date: "licenseExpiryDate", // add in your form
    state: "licenseIssuingState", // add in your form
  },

  social_security_card: {
    name: "currentFullName",
    social_security_number: "socialSecurityNumber", // add in your form
  },

  tax_return: {
    name: "currentFullName",
    ssn: "socialSecurityNumber",
    tax_year: "taxYear", // add in your form
    income_amount: "incomeAmount", // add in your form
    filing_status: "filingStatus", // add in your form
    employer_name: "employerName", // add in your form
  },

  medical_exam: {
    name: "currentFullName",
    date_of_birth: "todayDate",
    exam_date: "medicalExamDate", // add in your form
    civil_surgeon_name: "civilSurgeonName", // add in your form
    vaccination_status: "vaccinationStatus", // add in your form
  },

  police_clearance: {
    name: "currentFullName",
    date_of_birth: "todayDate",
    country_or_jurisdiction: "clearanceCountry", // add in your form
    certificate_number: "clearanceCertificateNumber", // add in your form
    issue_date: "clearanceIssueDate", // add in your form
    criminal_record_status: "criminalRecordStatus", // add in your form
  },
};
