import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { LOCATIONS, PROPERTY_TYPES, PRICE_RANGES, BEDROOM_OPTIONS, BATHROOM_OPTIONS } from "@/lib/constants";

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void;
  className?: string;
}

export interface SearchFilters {
  propertyType?: string;
  location?: string;
  priceRange?: { min: number; max?: number };
  bedrooms?: number;
  bathrooms?: number;
}

export default function SearchFilters({ onSearch, className }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({});

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handlePriceRangeChange = (value: string) => {
    const range = PRICE_RANGES.find(r => r.label === value);
    if (range) {
      setFilters(prev => ({
        ...prev,
        priceRange: { min: range.min, max: range.max }
      }));
    }
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <Card className={`shadow-luxury ${className}`}>
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="propertyType">Property Type</Label>
            <Select
              value={filters.propertyType || "all"}
              onValueChange={(value) => handleFilterChange('propertyType', value === "all" ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {PROPERTY_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select
              value={filters.location || "all"}
              onValueChange={(value) => handleFilterChange('location', value === "all" ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {LOCATIONS.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priceRange">Price Range</Label>
            <Select
              value={filters.priceRange ? PRICE_RANGES.find(r => r.min === filters.priceRange?.min)?.label || "any" : "any"}
              onValueChange={(value) => {
                if (value === "any") {
                  setFilters(prev => ({ ...prev, priceRange: undefined }));
                } else {
                  handlePriceRangeChange(value);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Price</SelectItem>
                {PRICE_RANGES.map((range) => (
                  <SelectItem key={range.label} value={range.label}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Select
              value={filters.bedrooms?.toString() || "any"}
              onValueChange={(value) => handleFilterChange('bedrooms', value === "any" ? undefined : parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                {BEDROOM_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Select
              value={filters.bathrooms?.toString() || "any"}
              onValueChange={(value) => handleFilterChange('bathrooms', value === "any" ? undefined : parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                {BATHROOM_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button onClick={handleSearch} className="btn-premium text-white font-semibold text-lg px-12 py-4 rounded-xl hover-lift">
            <Search className="w-4 h-4 mr-2" />
            Search Properties
          </Button>
          <Button onClick={clearFilters} variant="outline" className="px-8 py-4 rounded-xl border-slate-blue text-slate-blue hover:bg-slate-blue hover:text-white transition-all duration-300">
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
