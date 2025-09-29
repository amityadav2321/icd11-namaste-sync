import { useState } from "react";
import { TerminologySearch } from "@/components/TerminologySearch";
import { ProblemListCreator } from "@/components/ProblemListCreator";
import { ProblemListView } from "@/components/ProblemListView";
import { AuditTrail } from "@/components/AuditTrail";
import { TerminologyMapping, FHIRCondition } from "@/types/terminology";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Activity, FileSearch, FileText, History, Import } from "lucide-react";

const Index = () => {
  const [selectedMapping, setSelectedMapping] = useState<TerminologyMapping | null>(null);
  const [showProblemListCreator, setShowProblemListCreator] = useState(false);
  const [savedConditions, setSavedConditions] = useState<FHIRCondition[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Toggle function
  const handleToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleSelectMapping = (mapping: TerminologyMapping) => {
    setSelectedMapping(mapping);
    setShowProblemListCreator(true);
  };

  const handleSaveCondition = (condition: FHIRCondition) => {
    setSavedConditions([...savedConditions, condition]);
    setShowProblemListCreator(false);
    setSelectedMapping(null);
    toast.success("Condition saved to problem list");
  };

  const handleDeleteCondition = (index: number) => {
    setSavedConditions(savedConditions.filter((_, i) => i !== index));
    toast.success("Condition removed from problem list");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 animate-gradient">
      <div className="bg-background/80 backdrop-blur-lg min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b bg-card/70 backdrop-blur-md shadow-lg">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
                NAMASTE ↔ ICD-11 Terminology Service
              </h1>
              <p className="text-sm text-muted-foreground">
                FHIR R4 Compliant | India EHR Standards 2016
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs flex cursor-pointer items-center">
                <Activity className="mr-1 h-3 w-3 " /> OAuth 2.0 ABHA
              </Badge>
              <Badge variant="outline" className="text-xs cursor-pointer font-mono">v1.0.0-alpha</Badge>
              <button
                onClick={handleToggle}
                className="px-4 py-1 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-lg shadow hover:scale-105 transition-transform duration-200"
              >
                {isLoggedIn ? "Logout" : "Login"}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 flex-1">
          <Tabs defaultValue="search" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
              <TabsTrigger value="search" className="gap-2">
                <FileSearch className="h-4 w-4" /> Search
              </TabsTrigger>
              <TabsTrigger value="problem-list" className="gap-2">
                <FileText className="h-4 w-4" /> Problem List
              </TabsTrigger>
              <TabsTrigger value="audit" className="gap-2">
                <History className="h-4 w-4" /> Audit Trail
              </TabsTrigger>
            </TabsList>

            {/* Search Tab */}
        <TabsContent value="search" className="space-y-6">
  <div className="flex flex-col lg:flex-row gap-8 items-stretch">
    
    
    {/* Left: Search Box */}
<div className="flex-1">
  <TerminologySearch onSelectMapping={handleSelectMapping} />

  {/* Placeholder content when nothing is selected */}
  {!showProblemListCreator && !selectedMapping && (
    <div className="mt-6 p-6 border rounded-lg bg-card/50 text-muted-foreground text-center">
      <p className="mb-2 font-semibold">Start typing to search terminologies</p>
      <p className="text-sm">
        You can search for conditions, diseases, or medical concepts.
      </p>
      <p className="text-xs mt-2">Popular searches: Jwara, Sandhivata, Vata Vyadhi</p>
    </div>
  )}

  {showProblemListCreator && selectedMapping && (
    <ProblemListCreator
      mapping={selectedMapping}
      onSave={handleSaveCondition}
      onCancel={() => setShowProblemListCreator(false)}
    />
  )}
</div>


    {/* Right: Doctor Illustration */}
    <div className="flex-1  flex justify-center items-center">
      <img
        src="/Doctor.png"
        alt="Doctor"
        className="rounded-xl shadow-lg object-contain w-full max-h-[500px]"
      />
    </div>
    
  </div>
</TabsContent>





            <TabsContent value="problem-list">
              <ProblemListView conditions={savedConditions} onDelete={handleDeleteCondition} />
            </TabsContent>

            <TabsContent value="audit">
              <AuditTrail />
            </TabsContent>
          </Tabs>
        </main>

        {/* Footer */}
        <footer className="border-t mt-12 py-6 bg-card/70 backdrop-blur-md">
          <div className="container mx-auto px-4 text-sm text-muted-foreground grid grid-cols-1 md:grid-cols-3 gap-6">
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
        </footer>
      </div>
    </div>
  );
};

export default Index;
