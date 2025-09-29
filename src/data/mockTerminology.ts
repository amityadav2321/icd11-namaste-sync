import { TerminologyMapping } from "@/types/terminology";

// Mock NAMASTE ↔ ICD-11 terminology mappings for demonstration
export const mockMappings: TerminologyMapping[] = [
  {
    id: "nm-001",
    namasteCode: {
      code: "NM.A01.001",
      display: "वात व्याधि (Vata Vyadhi) - Wind Disorder",
      definition: "Constitutional disorder characterized by aggravated Vata dosha",
      system: "http://namaste.org/terminology",
    },
    icd11TM2: {
      code: "DB90",
      display: "Traditional diagnosis related to structural body patterns",
      foundationUri: "http://id.who.int/icd/entity/1234567890",
      classKind: "category",
    },
    icd11Biomedicine: {
      code: "MB23.0",
      display: "Disorders of the autonomic nervous system",
      foundationUri: "http://id.who.int/icd/entity/0987654321",
      classKind: "category",
    },
    equivalence: "narrower",
    confidence: 0.85,
    lastVerified: "2025-09-15",
    provenance: {
      author: "Dr. Priya Sharma",
      organization: "AYUSH Terminology Working Group",
      verificationMethod: "Expert clinical review + WHO ICD-11 API sync",
    },
  },
  {
    id: "nm-002",
    namasteCode: {
      code: "NM.A01.002",
      display: "पित्त व्याधि (Pitta Vyadhi) - Bile/Fire Disorder",
      definition: "Constitutional disorder characterized by aggravated Pitta dosha",
      system: "http://namaste.org/terminology",
    },
    icd11TM2: {
      code: "DB91",
      display: "Traditional diagnosis related to metabolic patterns",
      foundationUri: "http://id.who.int/icd/entity/1234567891",
      classKind: "category",
    },
    icd11Biomedicine: {
      code: "5C64.0",
      display: "Functional digestive disorders",
      foundationUri: "http://id.who.int/icd/entity/0987654322",
      classKind: "category",
    },
    equivalence: "inexact",
    confidence: 0.72,
    lastVerified: "2025-09-10",
    provenance: {
      author: "Dr. Rajesh Kumar",
      organization: "AYUSH Terminology Working Group",
      verificationMethod: "Expert clinical review",
    },
  },
  {
    id: "nm-003",
    namasteCode: {
      code: "NM.A01.003",
      display: "कफ व्याधि (Kapha Vyadhi) - Phlegm/Water Disorder",
      definition: "Constitutional disorder characterized by aggravated Kapha dosha",
      system: "http://namaste.org/terminology",
    },
    icd11TM2: {
      code: "DB92",
      display: "Traditional diagnosis related to fluid balance patterns",
      foundationUri: "http://id.who.int/icd/entity/1234567892",
      classKind: "category",
    },
    icd11Biomedicine: {
      code: "CA40.0",
      display: "Respiratory system disorders with mucus production",
      foundationUri: "http://id.who.int/icd/entity/0987654323",
      classKind: "category",
    },
    equivalence: "wider",
    confidence: 0.68,
    lastVerified: "2025-08-28",
    provenance: {
      author: "Dr. Anita Desai",
      organization: "AYUSH Terminology Working Group",
      verificationMethod: "Expert clinical review",
    },
  },
  {
    id: "nm-004",
    namasteCode: {
      code: "NM.B02.015",
      display: "ज्वर (Jwara) - Fever",
      definition: "Elevated body temperature with systemic manifestations",
      system: "http://namaste.org/terminology",
    },
    icd11TM2: {
      code: "MG26",
      display: "Fever",
      foundationUri: "http://id.who.int/icd/entity/1639465870",
      classKind: "category",
    },
    icd11Biomedicine: {
      code: "MG26",
      display: "Fever",
      foundationUri: "http://id.who.int/icd/entity/1639465870",
      classKind: "category",
    },
    equivalence: "equivalent",
    confidence: 0.95,
    lastVerified: "2025-09-20",
    provenance: {
      author: "WHO ICD-11 API",
      organization: "World Health Organization",
      verificationMethod: "Direct terminology alignment",
    },
  },
  {
    id: "nm-005",
    namasteCode: {
      code: "NM.C03.042",
      display: "शिरोऽर्ति (Shiro'arti) - Headache",
      definition: "Pain or discomfort in the head region",
      system: "http://namaste.org/terminology",
    },
    icd11TM2: {
      code: "8A80.0",
      display: "Primary headache disorders",
      foundationUri: "http://id.who.int/icd/entity/1943898123",
      classKind: "category",
    },
    icd11Biomedicine: {
      code: "8A80.0",
      display: "Primary headache disorders",
      foundationUri: "http://id.who.int/icd/entity/1943898123",
      classKind: "category",
    },
    equivalence: "equivalent",
    confidence: 0.92,
    lastVerified: "2025-09-18",
    provenance: {
      author: "Dr. Sunita Rao",
      organization: "AYUSH Terminology Working Group",
      verificationMethod: "Clinical validation + ICD-11 API sync",
    },
  },
  {
    id: "nm-006",
    namasteCode: {
      code: "NM.D04.078",
      display: "अतिसार (Atisara) - Diarrhea",
      definition: "Increased frequency of loose or watery bowel movements",
      system: "http://namaste.org/terminology",
    },
    icd11TM2: {
      code: "DD70",
      display: "Diarrhoea",
      foundationUri: "http://id.who.int/icd/entity/1823685234",
      classKind: "category",
    },
    icd11Biomedicine: {
      code: "DD70",
      display: "Diarrhoea",
      foundationUri: "http://id.who.int/icd/entity/1823685234",
      classKind: "category",
    },
    equivalence: "equivalent",
    confidence: 0.97,
    lastVerified: "2025-09-22",
    provenance: {
      author: "WHO ICD-11 API",
      organization: "World Health Organization",
      verificationMethod: "Direct terminology alignment",
    },
  },
  {
    id: "nm-007",
    namasteCode: {
      code: "NM.E05.091",
      display: "श्वास रोग (Shvasa Roga) - Dyspnea",
      definition: "Difficulty in breathing or shortness of breath",
      system: "http://namaste.org/terminology",
    },
    icd11TM2: {
      code: "MD11.0",
      display: "Dyspnoea",
      foundationUri: "http://id.who.int/icd/entity/1487435289",
      classKind: "category",
    },
    icd11Biomedicine: {
      code: "MD11.0",
      display: "Dyspnoea",
      foundationUri: "http://id.who.int/icd/entity/1487435289",
      classKind: "category",
    },
    equivalence: "equivalent",
    confidence: 0.93,
    lastVerified: "2025-09-19",
    provenance: {
      author: "Dr. Manoj Patel",
      organization: "AYUSH Terminology Working Group",
      verificationMethod: "Expert clinical review + ICD-11 API sync",
    },
  },
  {
    id: "nm-008",
    namasteCode: {
      code: "NM.F06.105",
      display: "सन्धिवात (Sandhivata) - Arthritis/Joint Pain",
      definition: "Inflammatory or degenerative joint disorder",
      system: "http://namaste.org/terminology",
    },
    icd11TM2: {
      code: "FA20",
      display: "Joint pain",
      foundationUri: "http://id.who.int/icd/entity/1956743012",
      classKind: "category",
    },
    icd11Biomedicine: {
      code: "FA20",
      display: "Joint pain",
      foundationUri: "http://id.who.int/icd/entity/1956743012",
      classKind: "category",
    },
    equivalence: "wider",
    confidence: 0.88,
    lastVerified: "2025-09-17",
    provenance: {
      author: "Dr. Kavita Singh",
      organization: "AYUSH Terminology Working Group",
      verificationMethod: "Expert clinical review",
    },
  },
];

// Helper function to search mappings
export const searchMappings = (query: string): TerminologyMapping[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockMappings.filter(
    (mapping) =>
      mapping.namasteCode.display.toLowerCase().includes(lowercaseQuery) ||
      mapping.namasteCode.code.toLowerCase().includes(lowercaseQuery) ||
      mapping.icd11TM2?.display.toLowerCase().includes(lowercaseQuery) ||
      mapping.icd11Biomedicine?.display.toLowerCase().includes(lowercaseQuery)
  );
};

// Helper function to get confidence color class
export const getConfidenceColor = (confidence: number): string => {
  if (confidence >= 0.9) return "bg-success text-success-foreground";
  if (confidence >= 0.75) return "bg-primary text-primary-foreground";
  if (confidence >= 0.6) return "bg-warning text-warning-foreground";
  return "bg-muted text-muted-foreground";
};

// Helper function to get equivalence badge
export const getEquivalenceBadge = (equivalence: string): string => {
  const map: Record<string, string> = {
    equivalent: "≡",
    equal: "=",
    wider: "⊃",
    subsumes: "⊇",
    narrower: "⊂",
    specializes: "⊆",
    inexact: "≈",
    unmatched: "∅",
    disjoint: "⊥",
  };
  return map[equivalence] || "?";
};
