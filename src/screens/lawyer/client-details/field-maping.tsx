import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  UserCircle2,
  Flag,
  Baby,
  Home,
  FileText,
  FileSignature,
} from "lucide-react";
export const fieldLabelMap: Record<string, string> = {
  legal_name: "Legal Name",
  passportNumber: "Passport Number",
  passportIssueDate: "Passport Issue Date",
  passportExpiryDate: "Passport Expiry Date",
  todayDate: "Today's Date",
  place_of_birth: "Place of Birth",
  father_name: "Father's Name",
  mother_name: "Mother's Name",
  birthCertificateNumber: "Birth Certificate Number",
  socialSecurityNumber: "Social Security Number",

  taxYear: "Tax Year",
  incomeAmount: "Income Amount",
  filingStatus: "Filing Status",

  dob: "Date of Birth",
  phone_number: "Phone Number",
  email_address: "Email Address",

  father_city: "Father's City",
  father_country: "Father's Country",
  marital_status: "Marital Status",

  weight: "Weight",
  height: "Height",
  eye_color: "Eye Color",
  hair_color: "Hair Color",

  children_info: "Has Children",

  father_dob: "Father's DOB",
  father_place_of_birth: "Father's Birthplace",
  father_address: "Father's Address",

  parent_marriage_date: "Parents' Marriage Date",

  mother_dob: "Mother's DOB",
  mother_place_of_birth: "Mother's Birthplace",
  mother_address: "Mother's Address",
  mother_city: "Mother's City",
  mother_country: "Mother's Country",

  immigration_application: "Submitted Immigration Application",
  arrest_history: "Arrest History",

  application_type: "Application Type",
  application_result: "Application Result",
  application_date: "Application Date",

  current_address: "Current Address",
  work_permit: "Had Work Permit",
};

export const fieldIconMap: Record<string, React.ReactNode> = {
  legal_name: <User className="w-4 h-4 text-gray-500" />,
  passportNumber: <FileSignature className="w-4 h-4 text-gray-500" />,
  passportIssueDate: <Calendar className="w-4 h-4 text-gray-500" />,
  passportExpiryDate: <Calendar className="w-4 h-4 text-gray-500" />,
  todayDate: <Calendar className="w-4 h-4 text-gray-500" />,
  place_of_birth: <MapPin className="w-4 h-4 text-gray-500" />,
  father_name: <User className="w-4 h-4 text-gray-500" />,
  mother_name: <UserCircle2 className="w-4 h-4 text-gray-500" />,
  birthCertificateNumber: <FileSignature className="w-4 h-4 text-gray-500" />,
  socialSecurityNumber: <FileSignature className="w-4 h-4 text-gray-500" />,

  taxYear: <Calendar className="w-4 h-4 text-gray-500" />,
  incomeAmount: <FileText className="w-4 h-4 text-gray-500" />,
  filingStatus: <Flag className="w-4 h-4 text-gray-500" />,

  dob: <Calendar className="w-4 h-4 text-gray-500" />,
  phone_number: <Phone className="w-4 h-4 text-gray-500" />,
  email_address: <Mail className="w-4 h-4 text-gray-500" />,

  father_city: <MapPin className="w-4 h-4 text-gray-500" />,
  father_country: <Flag className="w-4 h-4 text-gray-500" />,
  marital_status: <Flag className="w-4 h-4 text-gray-500" />,

  weight: <User className="w-4 h-4 text-gray-500" />,
  height: <User className="w-4 h-4 text-gray-500" />,
  eye_color: <User className="w-4 h-4 text-gray-500" />,
  hair_color: <User className="w-4 h-4 text-gray-500" />,

  children_info: <Baby className="w-4 h-4 text-gray-500" />,

  father_dob: <Calendar className="w-4 h-4 text-gray-500" />,
  father_place_of_birth: <MapPin className="w-4 h-4 text-gray-500" />,
  father_address: <Home className="w-4 h-4 text-gray-500" />,

  parent_marriage_date: <Calendar className="w-4 h-4 text-gray-500" />,

  mother_dob: <Calendar className="w-4 h-4 text-gray-500" />,
  mother_place_of_birth: <MapPin className="w-4 h-4 text-gray-500" />,
  mother_address: <Home className="w-4 h-4 text-gray-500" />,
  mother_city: <MapPin className="w-4 h-4 text-gray-500" />,
  mother_country: <Flag className="w-4 h-4 text-gray-500" />,

  immigration_application: <FileText className="w-4 h-4 text-gray-500" />,
  arrest_history: <FileText className="w-4 h-4 text-gray-500" />,

  application_type: <FileText className="w-4 h-4 text-gray-500" />,
  application_result: <FileText className="w-4 h-4 text-gray-500" />,
  application_date: <Calendar className="w-4 h-4 text-gray-500" />,

  current_address: <Home className="w-4 h-4 text-gray-500" />,
  work_permit: <FileText className="w-4 h-4 text-gray-500" />,
};
