import { useState } from "react";
import { TerminologySearch } from "@/components/TerminologySearch";
import { DualCodeDisplay } from "@/components/DualCodeDisplay";
import { ProblemListCreator } from "@/components/ProblemListCreator";
import { AuditTrail } from "@/components/AuditTrail";
import { TerminologyMapping } from "@/types/terminology";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Activity, FileSearch, FileText, History } from "lucide-react";

const Index = () => {
  const [selectedMapping, setSelectedMapping] = useState<TerminologyMapping | null>(null);
  const [showProblemListCreator, setShowProblemListCreator] = useState(false);

  const handleSelectMapping = (mapping: TerminologyMapping) => {
    setSelectedMapping(mapping);
    setShowProblemListCreator(false);
  };

  const handleAddToProblemList = () => {
    setShowProblemListCreator(true);
  };

  const handleSaveCondition = (condition: any) => {
    console.log("Saving condition:", condition);
    setShowProblemListCreator(false);
    setSelectedMapping(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                NAMASTE ↔ ICD-11 Terminology Service
              </h1>
              <p className="text-sm text-muted-foreground">
                FHIR R4 Compliant | India EHR Standards 2016
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                <Activity className="mr-1 h-3 w-3" />
                OAuth 2.0 ABHA
              </Badge>
              <Badge variant="outline" className="text-xs font-mono">
                v1.0.0-alpha
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="search" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
            <TabsTrigger value="search" className="gap-2">
              <FileSearch className="h-4 w-4" />
              Search & Map
            </TabsTrigger>
            <TabsTrigger value="problem-list" className="gap-2" disabled={!selectedMapping}>
              <FileText className="h-4 w-4" />
              Problem List
            </TabsTrigger>
            <TabsTrigger value="audit" className="gap-2">
              <History className="h-4 w-4" />
              Audit Trail
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <TerminologySearch onSelectMapping={handleSelectMapping} />
              </div>
              <div>
                {selectedMapping && !showProblemListCreator && (
                  <DualCodeDisplay
                    mapping={selectedMapping}
                    onAddToProblemList={handleAddToProblemList}
                  />
                )}
                {showProblemListCreator && selectedMapping && (
                  <ProblemListCreator
                    mapping={selectedMapping}
                    onSave={handleSaveCondition}
                    onCancel={() => setShowProblemListCreator(false)}
                  />
                )}
                {!selectedMapping && (
                  <div className="h-full flex items-center justify-center p-8 border-2 border-dashed rounded-lg">
                    <div className="text-center space-y-2">
                      <FileSearch className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Search for a NAMASTE term to view dual-code mapping
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="problem-list" className="space-y-6">
            {selectedMapping && (
              <ProblemListCreator
                mapping={selectedMapping}
                onSave={handleSaveCondition}
              />
            )}
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <AuditTrail />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Standards Compliance</h4>
              <ul className="space-y-1">
                <li>✓ FHIR R4 CodeSystem & ConceptMap</li>
                <li>✓ OAuth 2.0 ABHA Token Verification</li>
                <li>✓ ISO 22600 Consent Metadata</li>
                <li>✓ SNOMED/LOINC Semantics Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Integration</h4>
              <ul className="space-y-1">
                <li>• WHO ICD-11 API Synchronization</li>
                <li>• TM2 + Biomedicine Coverage</li>
                <li>• RESTful Terminology Services</li>
                <li>• FHIR Bundle Ingest Endpoint</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">About</h4>
              <p className="text-xs leading-relaxed">
                Lightweight FHIR-compliant micro-service for dual-coding traditional medicine
                (NAMASTE) and biomedical (ICD-11) diagnoses in Indian healthcare systems.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
