import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Bed, Bath, Square } from "lucide-react";
import type { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
  onViewDetails?: (property: Property) => void;
}

export default function PropertyCard({ property, onViewDetails }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getBadgeVariant = () => {
    if (property.featured) return "default";
    if (property.propertyType === "commercial") return "secondary";
    return "outline";
  };

  const getBadgeText = () => {
    if (property.featured) return "Featured";
    if (property.propertyType === "commercial") return "Commercial";
    if (property.propertyType === "land") return "Land";
    return "New";
  };

  return (
    <Card className="overflow-hidden shadow-luxury hover-lift transition-all duration-400">
      <div className="relative group">
        <img
          src={property.images?.[0] || "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"}
          alt={property.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 left-4">
          <Badge 
            variant={getBadgeVariant()}
            className={property.featured ? "bg-orange-gradient text-white shadow-orange animate-glow" : "glass-card"}
          >
            {getBadgeText()}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-slate-blue text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {property.location}
          </div>
        </div>
        
        <h3 className="font-dm-serif text-xl text-rich-black mb-2 line-clamp-2">
          {property.title}
        </h3>
        
        <div className="flex items-center gap-4 text-slate-blue text-sm mb-4">
          {property.bedrooms && property.bedrooms > 0 && (
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              {property.bedrooms} bed
            </div>
          )}
          {property.bathrooms && property.bathrooms > 0 && (
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              {property.bathrooms} bath
            </div>
          )}
          {property.area && (
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              {property.area} sqm
            </div>
          )}
        </div>

        {property.amenities && property.amenities.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {property.amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="text-xs text-slate-blue">
                  +{property.amenities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="font-dm-serif text-2xl text-rich-black">
            {formatPrice(property.price)}
          </span>
          <Button
            onClick={() => onViewDetails?.(property)}
            className="bg-orange-gradient text-white hover:shadow-orange transition-all duration-300 rounded-lg"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
