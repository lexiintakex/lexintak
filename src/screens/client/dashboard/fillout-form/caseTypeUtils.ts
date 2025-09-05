import {
  caseTypeDefinitions,
  caseTypeFieldMappings,
  caseTypeVoiceBotMappings,
} from "./caseTypes";
``
export type CaseType = keyof typeof caseTypeDefinitions;

export const getAvailableCaseTypes = (): CaseType[] => {
  return Object.keys(caseTypeDefinitions) as CaseType[];
};

export const getCaseTypeDefinition = (caseType: string) => {
  const normalizedCaseType = caseType.toUpperCase() as CaseType;
  return caseTypeDefinitions[normalizedCaseType] || caseTypeDefinitions.I130;
};

export const getFieldMappings = (caseType: string) => {
  const normalizedCaseType = caseType.toUpperCase() as CaseType;
  return (
    caseTypeFieldMappings[normalizedCaseType] || caseTypeFieldMappings.I130
  );
};

export const getVoiceBotMappings = (caseType: string) => {
  const normalizedCaseType = caseType.toUpperCase() as CaseType;
  return (
    caseTypeVoiceBotMappings[normalizedCaseType] ||
    caseTypeVoiceBotMappings.I130
  );
};

export const isCaseTypeSupported = (caseType: string): boolean => {
  const normalizedCaseType = caseType.toUpperCase() as CaseType;
  return normalizedCaseType in caseTypeDefinitions;
};

export const getCaseTypeDisplayInfo = (caseType: string) => {
  const definition = getCaseTypeDefinition(caseType);
  return {
    name: definition.name,
    description: definition.description,
    caseType: caseType.toUpperCase(),
  };
};

export const mapVoiceBotKeyToFormField = (
  key: string,
  caseType: string
): string | null => {
  const mappings = getVoiceBotMappings(caseType);
  return mappings[key] || null;
};

export const getFormSections = (caseType: string) => {
  const definition = getCaseTypeDefinition(caseType);
  return definition.sections;
};
