import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TerminologyMapping } from "@/types/terminology";
import { searchMappings, getConfidenceColor, getEquivalenceBadge } from "@/data/mockTerminology";

interface TerminologySearchProps {
  onSelectMapping: (mapping: TerminologyMapping) => void;
}

export function TerminologySearch({ onSelectMapping }: TerminologySearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TerminologyMapping[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setIsSearching(true);

    // Simulate API delay
    setTimeout(() => {
      const searchResults = searchMappings(searchQuery);
      setResults(searchResults);
      setIsSearching(false);
    }, 300);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search NAMASTE terms, ICD-11 codes, or clinical concepts..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 h-12 text-base shadow-clinical"
        />
        {isSearching && (
          <div className="absolute right-3 top-3">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          </div>
        )}
      </div>

      {query && results.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Found {results.length} matching term{results.length !== 1 ? "s" : ""}
          </p>
          {results.map((mapping) => (
            <Card
              key={mapping.id}
              className="p-4 cursor-pointer hover:shadow-clinical transition-all hover:border-primary"
              onClick={() => onSelectMapping(mapping)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-xs">
                      {mapping.namasteCode.code}
                    </Badge>
                    <Badge className={getConfidenceColor(mapping.confidence)}>
                      {Math.round(mapping.confidence * 100)}% match
                    </Badge>
                    <Badge variant="secondary" className="font-mono">
                      {getEquivalenceBadge(mapping.equivalence)}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-base">{mapping.namasteCode.display}</h4>
                  {mapping.namasteCode.definition && (
                    <p className="text-sm text-muted-foreground">
                      {mapping.namasteCode.definition}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t grid grid-cols-1 md:grid-cols-2 gap-3">
                {mapping.icd11TM2 && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">ICD-11 TM2</p>
                    <p className="text-sm font-mono">{mapping.icd11TM2.code}</p>
                    <p className="text-sm">{mapping.icd11TM2.display}</p>
                  </div>
                )}
                {mapping.icd11Biomedicine && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      ICD-11 Biomedicine
                    </p>
                    <p className="text-sm font-mono">{mapping.icd11Biomedicine.code}</p>
                    <p className="text-sm">{mapping.icd11Biomedicine.display}</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {query && results.length === 0 && !isSearching && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No matching terminology found</p>
          <p className="text-sm text-muted-foreground mt-2">
            Try searching for Ayurvedic terms, symptoms, or ICD-11 codes
          </p>
        </Card>
      )}
    </div>
  );
}
