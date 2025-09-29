import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TerminologyMapping } from "@/types/terminology";
import { getConfidenceColor, getEquivalenceBadge } from "@/data/mockTerminology";
import { ArrowRight, CheckCircle2, AlertCircle, FileText } from "lucide-react";

interface DualCodeDisplayProps {
  mapping: TerminologyMapping;
  onAddToProblemList?: () => void;
}

export function DualCodeDisplay({ mapping, onAddToProblemList }: DualCodeDisplayProps) {
  return (
    <Card className="p-6 shadow-clinical">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Dual-Code Terminology Mapping</h3>
            <div className="flex items-center gap-2">
              <Badge className={getConfidenceColor(mapping.confidence)}>
                {Math.round(mapping.confidence * 100)}% confidence
              </Badge>
              <Badge variant="outline" className="font-mono">
                {getEquivalenceBadge(mapping.equivalence)} {mapping.equivalence}
              </Badge>
            </div>
          </div>
          {mapping.confidence >= 0.9 ? (
            <CheckCircle2 className="h-6 w-6 text-success" />
          ) : (
            <AlertCircle className="h-6 w-6 text-warning" />
          )}
        </div>

        {/* NAMASTE Term */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-1 bg-gradient-accent rounded-full" />
            <h4 className="font-semibold text-sm text-muted-foreground">NAMASTE Term</h4>
          </div>
          <div className="ml-4 space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono">
                {mapping.namasteCode.code}
              </Badge>
            </div>
            <p className="text-base font-medium">{mapping.namasteCode.display}</p>
            {mapping.namasteCode.definition && (
              <p className="text-sm text-muted-foreground">{mapping.namasteCode.definition}</p>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </div>

        {/* ICD-11 Codes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* TM2 */}
          {mapping.icd11TM2 && (
            <div className="space-y-3 p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2">
                <div className="h-8 w-1 bg-gradient-primary rounded-full" />
                <h4 className="font-semibold text-sm">ICD-11 Traditional Medicine (TM2)</h4>
              </div>
              <div className="ml-4 space-y-2">
                <Badge variant="outline" className="font-mono">
                  {mapping.icd11TM2.code}
                </Badge>
                <p className="text-sm font-medium">{mapping.icd11TM2.display}</p>
                {mapping.icd11TM2.foundationUri && (
                  <p className="text-xs text-muted-foreground font-mono break-all">
                    {mapping.icd11TM2.foundationUri}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Biomedicine */}
          {mapping.icd11Biomedicine && (
            <div className="space-y-3 p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2">
                <div className="h-8 w-1 bg-gradient-success rounded-full" />
                <h4 className="font-semibold text-sm">ICD-11 Biomedicine</h4>
              </div>
              <div className="ml-4 space-y-2">
                <Badge variant="outline" className="font-mono">
                  {mapping.icd11Biomedicine.code}
                </Badge>
                <p className="text-sm font-medium">{mapping.icd11Biomedicine.display}</p>
                {mapping.icd11Biomedicine.foundationUri && (
                  <p className="text-xs text-muted-foreground font-mono break-all">
                    {mapping.icd11Biomedicine.foundationUri}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Provenance */}
        <div className="pt-4 border-t space-y-2">
          <h4 className="font-semibold text-sm text-muted-foreground">Provenance</h4>
          <div className="text-sm space-y-1">
            {mapping.provenance.author && (
              <p>
                <span className="text-muted-foreground">Verified by:</span>{" "}
                {mapping.provenance.author}
              </p>
            )}
            {mapping.provenance.organization && (
              <p>
                <span className="text-muted-foreground">Organization:</span>{" "}
                {mapping.provenance.organization}
              </p>
            )}
            {mapping.provenance.verificationMethod && (
              <p>
                <span className="text-muted-foreground">Method:</span>{" "}
                {mapping.provenance.verificationMethod}
              </p>
            )}
            <p>
              <span className="text-muted-foreground">Last verified:</span>{" "}
              {new Date(mapping.lastVerified).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Actions */}
        {onAddToProblemList && (
          <div className="pt-4 border-t">
            <Button onClick={onAddToProblemList} className="w-full" size="lg">
              <FileText className="mr-2 h-4 w-4" />
              Add to Patient Problem List
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
