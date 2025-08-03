import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MapPin, Bed, Bath, Square, Calendar, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from "@/lib/constants";
import type { Property } from "@shared/schema";

export default function PropertyDetail() {
  const { id } = useParams();
  
  const { data: property, isLoading } = useQuery<Property>({
    queryKey: ['/api/properties', id],
    enabled: !!id
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleWhatsAppInquiry = () => {
    const message = `${WHATSAPP_MESSAGE}. I'm interested in the property: ${property?.title} (${formatPrice(property?.price || 0)})`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-rich-black mb-4">Property Not Found</h1>
            <Link href="/properties">
              <Button variant="outline">Back to Properties</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/properties">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Properties
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery and Details */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="mb-6">
              <img
                src={property.images?.[0] || "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800"}
                alt={property.title}
                className="w-full h-96 object-cover rounded-xl shadow-luxury"
              />
            </div>

            {/* Image Grid */}
            {property.images && property.images.length > 1 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {property.images.slice(1, 9).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${property.title} - Image ${index + 2}`}
                    className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </div>
            )}

            {/* Property Details */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h1 className="font-dm-serif text-3xl text-rich-black mb-4">
                  {property.title}
                </h1>
                
                <div className="flex items-center gap-2 text-slate-blue mb-4">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{property.location}</span>
                </div>

                <div className="flex items-center gap-6 mb-6">
                  {property.bedrooms && property.bedrooms > 0 && (
                    <div className="flex items-center gap-2">
                      <Bed className="w-5 h-5 text-slate-blue" />
                      <span className="text-slate-blue">{property.bedrooms} Bedrooms</span>
                    </div>
                  )}
                  {property.bathrooms && property.bathrooms > 0 && (
                    <div className="flex items-center gap-2">
                      <Bath className="w-5 h-5 text-slate-blue" />
                      <span className="text-slate-blue">{property.bathrooms} Bathrooms</span>
                    </div>
                  )}
                  {property.area && (
                    <div className="flex items-center gap-2">
                      <Square className="w-5 h-5 text-slate-blue" />
                      <span className="text-slate-blue">{property.area} sqm</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-6">
                  {property.featured && (
                    <Badge className="bg-orange-gradient text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <Badge variant="outline" className="capitalize">
                    {property.propertyType}
                  </Badge>
                </div>

                {property.description && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-rich-black mb-3">Description</h3>
                    <p className="text-slate-blue leading-relaxed whitespace-pre-line">
                      {property.description}
                    </p>
                  </div>
                )}

                {property.amenities && property.amenities.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-rich-black mb-3">Features & Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary-orange rounded-full"></div>
                          <span className="text-slate-blue text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Price Card */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="font-dm-serif text-4xl text-rich-black mb-2">
                      {formatPrice(property.price)}
                    </div>
                    <div className="text-slate-blue">Total Price</div>
                  </div>

                  <Separator className="mb-6" />

                  <div className="space-y-4">
                    <Button
                      onClick={handleWhatsAppInquiry}
                      className="w-full bg-orange-gradient text-white hover:shadow-orange transition-all duration-300"
                      size="lg"
                    >
                      Contact via WhatsApp
                    </Button>
                    
                    <Link href="/contact">
                      <Button variant="outline" className="w-full" size="lg">
                        Schedule Viewing
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Property Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-rich-black mb-4">Property Information</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-blue">Property Type</span>
                      <span className="text-rich-black capitalize">{property.propertyType}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-slate-blue">Location</span>
                      <span className="text-rich-black">{property.location}</span>
                    </div>
                    
                    {property.bedrooms && (
                      <div className="flex justify-between">
                        <span className="text-slate-blue">Bedrooms</span>
                        <span className="text-rich-black">{property.bedrooms}</span>
                      </div>
                    )}
                    
                    {property.bathrooms && (
                      <div className="flex justify-between">
                        <span className="text-slate-blue">Bathrooms</span>
                        <span className="text-rich-black">{property.bathrooms}</span>
                      </div>
                    )}
                    
                    {property.area && (
                      <div className="flex justify-between">
                        <span className="text-slate-blue">Area</span>
                        <span className="text-rich-black">{property.area} sqm</span>
                      </div>
                    )}

                    <Separator className="my-4" />
                    
                    <div className="flex items-center gap-2 text-green-600">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm">Verified Property</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}