import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AuditEvent } from "@/types/terminology";
import { Clock, User, Activity, Eye, Edit, FileText } from "lucide-react";

const mockAuditEvents: AuditEvent[] = [
  {
    id: "ae-001",
    timestamp: "2025-09-29T10:23:45Z",
    action: "create-condition",
    user: { id: "user-001", name: "Dr. Priya Sharma", role: "Clinician" },
    resource: { type: "Condition", id: "cond-123" },
    details: "Created problem list entry with dual coding: NM.B02.015 + MG26",
  },
  {
    id: "ae-002",
    timestamp: "2025-09-29T10:18:22Z",
    action: "search",
    user: { id: "user-001", name: "Dr. Priya Sharma", role: "Clinician" },
    details: 'Searched for "Jwara" - 1 results found',
  },
  {
    id: "ae-003",
    timestamp: "2025-09-29T09:45:12Z",
    action: "translate",
    user: { id: "user-002", name: "Dr. Rajesh Kumar", role: "Terminology Expert" },
    resource: { type: "ConceptMap", id: "nm-002" },
    details: "Translated NAMASTE term NM.A01.002 to ICD-11 TM2 DB91",
  },
  {
    id: "ae-004",
    timestamp: "2025-09-29T09:12:05Z",
    action: "update-mapping",
    user: { id: "user-002", name: "Dr. Rajesh Kumar", role: "Terminology Expert" },
    resource: { type: "ConceptMap", id: "nm-003" },
    details: "Updated mapping confidence from 0.65 to 0.68 for NM.A01.003",
  },
  {
    id: "ae-005",
    timestamp: "2025-09-29T08:55:30Z",
    action: "view",
    user: { id: "user-003", name: "Dr. Anita Desai", role: "Clinician" },
    resource: { type: "CodeSystem", id: "namaste-v2.1" },
    details: "Viewed NAMASTE CodeSystem version 2.1",
  },
];

const getActionIcon = (action: string) => {
  switch (action) {
    case "search":
      return <Activity className="h-4 w-4" />;
    case "translate":
      return <FileText className="h-4 w-4" />;
    case "create-condition":
      return <FileText className="h-4 w-4" />;
    case "update-mapping":
      return <Edit className="h-4 w-4" />;
    case "view":
      return <Eye className="h-4 w-4" />;
    default:
      return <Activity className="h-4 w-4" />;
  }
};

const getActionColor = (action: string) => {
  switch (action) {
    case "create-condition":
      return "bg-success text-success-foreground";
    case "update-mapping":
      return "bg-warning text-warning-foreground";
    case "translate":
      return "bg-primary text-primary-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export function AuditTrail() {
  return (
    <Card className="p-6 shadow-clinical">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Audit Trail</h3>
          <Badge variant="outline" className="font-mono">
            ISO 22600 Compliant
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground">
          All terminology operations are logged for India EHR 2016 standards compliance
        </p>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {mockAuditEvents.map((event) => (
              <div
                key={event.id}
                className="p-4 rounded-lg border bg-card hover:shadow-card transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${getActionColor(event.action)}`}>
                    {getActionIcon(event.action)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {event.action.replace("-", " ").toUpperCase()}
                      </Badge>
                      {event.resource && (
                        <Badge variant="secondary" className="text-xs font-mono">
                          {event.resource.type}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm font-medium">{event.details}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>
                          {event.user.name} ({event.user.role})
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(event.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
}
