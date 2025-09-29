import { FHIRCondition } from "@/types/terminology";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Calendar, User } from "lucide-react";
import { format } from "date-fns";

interface ProblemListViewProps {
  conditions: FHIRCondition[];
  onDelete?: (index: number) => void;
}

export function ProblemListView({ conditions, onDelete }: ProblemListViewProps) {
  if (conditions.length === 0) {
    return (
      <div className="flex items-center justify-center p-12 border-2 border-dashed rounded-lg">
        <div className="text-center space-y-2">
          <p className="text-muted-foreground">No conditions in problem list</p>
          <p className="text-xs text-muted-foreground">
            Search and add conditions from the Search & Map tab
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Patient Problem List</h2>
        <Badge variant="outline">{conditions.length} Condition{conditions.length !== 1 ? 's' : ''}</Badge>
      </div>

      {conditions.map((condition, index) => (
        <Card key={index} className="p-4 shadow-clinical">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-foreground">
                  {condition.code.text}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {condition.code.coding.map((coding, idx) => (
                    <Badge key={idx} variant="outline" className="font-mono text-xs">
                      {coding.code}
                    </Badge>
                  ))}
                </div>
              </div>
              {onDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{condition.subject.reference}</span>
              </div>
              {condition.onsetDateTime && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Onset: {format(new Date(condition.onsetDateTime), 'PP')}</span>
                </div>
              )}
            </div>

            {condition.note && condition.note.length > 0 && (
              <div className="p-3 rounded-lg bg-muted/30 text-sm">
                <p className="text-muted-foreground">{condition.note[0].text}</p>
              </div>
            )}

            <div className="flex gap-2 pt-2 border-t">
              <Badge variant="secondary" className="text-xs">
                {condition.clinicalStatus.coding[0].display}
              </Badge>
              {condition.verificationStatus && (
                <Badge variant="secondary" className="text-xs">
                  {condition.verificationStatus.coding[0].display}
                </Badge>
              )}
              <Badge variant="outline" className="text-xs">
                Recorded: {format(new Date(condition.recordedDate!), 'PP')}
              </Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
