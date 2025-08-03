import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import PropertyCard from "@/components/property-card";
import SearchFilters, { type SearchFilters as SearchFiltersType } from "@/components/search-filters";
import type { Property } from "@shared/schema";

export default function Properties() {
  const [searchFilters, setSearchFilters] = useState<SearchFiltersType>({});

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties/search", searchFilters],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      if (searchFilters.propertyType) params.append('propertyType', searchFilters.propertyType);
      if (searchFilters.location) params.append('location', searchFilters.location);
      if (searchFilters.priceRange?.min) params.append('minPrice', searchFilters.priceRange.min.toString());
      if (searchFilters.priceRange?.max) params.append('maxPrice', searchFilters.priceRange.max.toString());
      if (searchFilters.bedrooms) params.append('bedrooms', searchFilters.bedrooms.toString());
      if (searchFilters.bathrooms) params.append('bathrooms', searchFilters.bathrooms.toString());

      const response = await fetch(`/api/properties/search?${params}`);
      if (!response.ok) throw new Error('Failed to fetch properties');
      return response.json();
    },
  });

  const handleSearch = (filters: SearchFiltersType) => {
    setSearchFilters(filters);
  };

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-dm-serif text-4xl md:text-5xl text-rich-black mb-4">
              Premium Properties
            </h1>
            <p className="text-xl text-slate-blue max-w-3xl mx-auto">
              Discover exceptional real estate investment opportunities across Nigeria and beyond
            </p>
          </div>
        </div>
      </section>

      {/* Search Filters */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchFilters onSearch={handleSearch} />
        </div>
      </section>

      {/* Properties Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-dm-serif text-2xl text-rich-black">
              {properties ? `${properties.length} Properties Found` : 'Loading Properties...'}
            </h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-2xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : properties && properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-slate-blue text-lg mb-4">
                No properties found matching your criteria
              </div>
              <p className="text-slate-blue/80">
                Try adjusting your search filters or browse all properties
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
