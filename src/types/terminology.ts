// FHIR R4 Terminology Types for NAMASTE ↔ ICD-11 Mapping

export interface NAMASTETerm {
  code: string;
  display: string;
  definition?: string;
  system: "http://namaste.org/terminology";
}

export interface ICD11Code {
  code: string;
  display: string;
  foundationUri?: string;
  blockId?: string;
  classKind?: "category" | "window" | "chapter" | "block";
}

export interface TerminologyMapping {
  id: string;
  namasteCode: NAMASTETerm;
  icd11TM2?: ICD11Code;
  icd11Biomedicine?: ICD11Code;
  equivalence: "equivalent" | "equal" | "wider" | "subsumes" | "narrower" | "specializes" | "inexact" | "unmatched" | "disjoint";
  confidence: number; // 0-1
  lastVerified: string; // ISO date
  provenance: {
    author?: string;
    organization?: string;
    verificationMethod?: string;
  };
}

export interface FHIRCondition {
  id?: string;
  resourceType: "Condition";
  clinicalStatus: {
    coding: Array<{
      system: string;
      code: string;
      display: string;
    }>;
  };
  verificationStatus?: {
    coding: Array<{
      system: string;
      code: string;
      display: string;
    }>;
  };
  category?: Array<{
    coding: Array<{
      system: string;
      code: string;
      display: string;
    }>;
  }>;
  code: {
    coding: Array<{
      system: string;
      code: string;
      display: string;
    }>;
    text?: string;
  };
  subject: {
    reference: string;
    display?: string;
  };
  onsetDateTime?: string;
  recordedDate?: string;
  recorder?: {
    reference: string;
    display?: string;
  };
  note?: Array<{
    text: string;
  }>;
}

export interface SearchResult {
  mapping: TerminologyMapping;
  score: number;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  action: "search" | "translate" | "create-condition" | "update-mapping" | "view";
  user: {
    id: string;
    name: string;
    role: string;
  };
  resource?: {
    type: string;
    id: string;
  };
  details?: string;
}
