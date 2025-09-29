import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { TerminologyMapping } from "@/types/terminology";
import { Plus, Save, X } from "lucide-react";
import { toast } from "sonner";

interface ProblemListCreatorProps {
  mapping: TerminologyMapping;
  onSave?: (condition: any) => void;
  onCancel?: () => void;
}

export function ProblemListCreator({ mapping, onSave, onCancel }: ProblemListCreatorProps) {
  const [patientId, setPatientId] = useState("");
  const [onsetDate, setOnsetDate] = useState("");
  const [clinicalNotes, setClinicalNotes] = useState("");

  const handleSave = () => {
    if (!patientId) {
      toast.error("Patient ID is required");
      return;
    }

    const condition = {
      resourceType: "Condition",
      clinicalStatus: {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
            code: "active",
            display: "Active",
          },
        ],
      },
      verificationStatus: {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/condition-ver-status",
            code: "confirmed",
            display: "Confirmed",
          },
        ],
      },
      category: [
        {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/condition-category",
              code: "problem-list-item",
              display: "Problem List Item",
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: mapping.namasteCode.system,
            code: mapping.namasteCode.code,
            display: mapping.namasteCode.display,
          },
          ...(mapping.icd11TM2
            ? [
                {
                  system: "http://id.who.int/icd11/mms",
                  code: mapping.icd11TM2.code,
                  display: mapping.icd11TM2.display,
                },
              ]
            : []),
          ...(mapping.icd11Biomedicine
            ? [
                {
                  system: "http://id.who.int/icd11/mms",
                  code: mapping.icd11Biomedicine.code,
                  display: mapping.icd11Biomedicine.display,
                },
              ]
            : []),
        ],
        text: mapping.namasteCode.display,
      },
      subject: {
        reference: `Patient/${patientId}`,
      },
      onsetDateTime: onsetDate,
      recordedDate: new Date().toISOString(),
      note: clinicalNotes
        ? [
            {
              text: clinicalNotes,
            },
          ]
        : undefined,
    };

    if (onSave) {
      onSave(condition);
    }

    toast.success("Condition added to problem list", {
      description: `Dual-coded with ${mapping.icd11TM2?.code || ""} ${mapping.icd11Biomedicine?.code || ""}`,
    });
  };

  return (
    <Card className="p-6 shadow-clinical">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Create Problem List Entry</h3>
          {onCancel && (
            <Button variant="ghost" size="icon" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Selected Mapping Summary */}
        <div className="p-4 rounded-lg bg-muted/50 space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs">
              {mapping.namasteCode.code}
            </Badge>
            {mapping.icd11TM2 && (
              <Badge variant="outline" className="font-mono text-xs">
                {mapping.icd11TM2.code}
              </Badge>
            )}
            {mapping.icd11Biomedicine && (
              <Badge variant="outline" className="font-mono text-xs">
                {mapping.icd11Biomedicine.code}
              </Badge>
            )}
          </div>
          <p className="text-sm font-medium">{mapping.namasteCode.display}</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patientId">Patient ID *</Label>
            <Input
              id="patientId"
              placeholder="e.g., ABHA-1234-5678-9012"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              ABHA (Ayushman Bharat Health Account) or local patient identifier
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="onsetDate">Onset Date</Label>
            <Input
              id="onsetDate"
              type="date"
              value={onsetDate}
              onChange={(e) => setOnsetDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clinicalNotes">Clinical Notes</Label>
            <Textarea
              id="clinicalNotes"
              placeholder="Additional clinical observations or context..."
              value={clinicalNotes}
              onChange={(e) => setClinicalNotes(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        {/* FHIR Preview */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">FHIR R4 Structure Preview</Label>
          <div className="p-3 rounded-lg bg-muted/30 border text-xs font-mono overflow-x-auto">
            <pre className="text-muted-foreground">
              {JSON.stringify(
                {
                  resourceType: "Condition",
                  code: {
                    coding: [
                      { system: "NAMASTE", code: mapping.namasteCode.code },
                      { system: "ICD-11", code: mapping.icd11TM2?.code || "..." },
                    ],
                  },
                  subject: { reference: `Patient/${patientId || "[ID]"}` },
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button onClick={handleSave} className="flex-1" size="lg">
            <Save className="mr-2 h-4 w-4" />
            Save to Problem List
          </Button>
          {onCancel && (
            <Button onClick={onCancel} variant="outline" size="lg">
              Cancel
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
