"use client";

import React from "react";
import InputField, { FieldMeta } from "@/components/ui/add-input";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Map,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function ClientIntakeForm() {
  const [values, setValues] = React.useState<Record<string, string>>({});
  const handleChange = (key: string, val: string) =>
    setValues((prev) => ({ ...prev, [key]: val }));

  const firstSection: { title: string; fields: FieldMeta[] }[] = [
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
          label: "Names you have previo",
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
          label: "City",
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

  return (
    <>
      {firstSection.map((section) => (
        <section key={section.title} className="mt-10 first:mt-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            {section.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.fields.map((field) => (
              <InputField
                key={field.id}
                {...field}
                value={values[field.id] ?? ""}
                onChange={(val) => handleChange(field.id, val)}
                extraValues={values}
                onExtraChange={handleChange}
              />
            ))}
          </div>
        </section>
      ))}
      <div className="flex justify-start mt-8">
        <Link
          href={"/client/dashboard/success"}
          className="inline-flex items-center cursor-pointer px-6 py-3 rounded-md bg-blue-primary text-white shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Next
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </>
  );
}
