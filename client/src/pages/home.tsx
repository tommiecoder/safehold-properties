import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PropertyCard from "@/components/property-card";
import SearchFilters from "@/components/search-filters";
import LeadCaptureForm from "@/components/lead-capture-form";
import type { Property, Testimonial } from "@shared/schema";
import {
  ArrowRight,
  Star,
  Home as HomeIcon,
  Building,
  Users,
} from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();
  const { data: featuredProperties, isLoading: propertiesLoading } = useQuery<
    Property[]
  >({
    queryKey: ["/api/properties/featured"],
  });

  const { data: testimonials, isLoading: testimonialsLoading } = useQuery<
    Testimonial[]
  >({
    queryKey: ["/api/testimonials/featured"],
  });

  const handleViewDetails = (property: Property) => {
    setLocation(`/properties/${property.id}`);
  };

  const stats = [
    { label: "Happy Clients", value: "75+" },
    { label: "Properties Sold", value: "100+" },
    { label: "Years Experience", value: "5" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center parallax">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
          }}
        >
          <div className="absolute inset-0 gradient-overlay"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-4xl w-full">
            <h1 className="font-dm-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight animate-slide-up">
              Find Your Perfect Home in Lagos
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 animate-slide-up leading-relaxed" style={{ animationDelay: "0.2s" }}>
              Premium properties in prime locations. Your dream home awaits in the heart of Lagos.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-slide-up w-full sm:w-auto" style={{ animationDelay: "0.4s" }}>
              <Button
                asChild
                className="btn-premium px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold w-full sm:w-auto"
              >
                <Link href="/properties">Explore Properties</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-slate-blue backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold w-full sm:w-auto"
              >
                <Link href="/contact">Schedule Viewing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-dm-serif text-4xl md:text-5xl text-rich-black mb-4">
              Featured Investment Opportunities
            </h2>
            <p className="text-xl text-slate-blue max-w-3xl mx-auto">
              Carefully curated properties that offer exceptional returns and
              long-term value appreciation
            </p>
          </div>

          {propertiesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-96 bg-gray-200 animate-pulse rounded-2xl shadow-luxury"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties?.map((property, index) => (
                <div
                  key={property.id}
                  className="animate-fade-in hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PropertyCard
                    property={property}
                    onViewDetails={handleViewDetails}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="btn-premium text-white font-semibold text-lg hover-lift rounded-xl"
            >
              <Link href="/properties">
                View All Properties <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Property Search */}
      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-dm-serif text-4xl md:text-5xl text-rich-black mb-4">
              Find Your Perfect Investment
            </h2>
            <p className="text-xl text-slate-blue">
              Advanced search tools to discover properties that match your
              criteria
            </p>
          </div>

          <SearchFilters
            onSearch={(filters) => {
              // Navigate to properties page with filters
              window.location.href = `/properties?${new URLSearchParams(
                Object.entries(filters).reduce(
                  (acc, [key, value]) => {
                    if (value) acc[key] = String(value);
                    return acc;
                  },
                  {} as Record<string, string>,
                ),
              )}`;
            }}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-dm-serif text-3xl md:text-4xl text-primary-orange mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-blue font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Services */}
      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-dm-serif text-4xl md:text-5xl text-rich-black mb-4">
              Our Key Services
            </h2>
            <p className="text-xl text-slate-blue">
              Comprehensive real estate solutions tailored to your investment
              goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1: Dream Home */}
            <Card
              className="bg-white hover-lift shadow-luxury group animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 animate-glow">
                  <HomeIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-dm-serif text-2xl text-rich-black mb-4">
                  Discover Your Dream Home
                </h3>
                <p className="text-slate-blue leading-relaxed mb-6">
                  Find the perfect residential property that matches your
                  lifestyle and budget. From luxury apartments to family homes
                  across Nigeria and beyond.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-white transition-all duration-300 rounded-lg"
                >
                  <Link href="/properties?propertyType=residential">
                    Browse Homes
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Service 2: Commercial Properties */}
            <Card
              className="bg-white hover-lift shadow-luxury group animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 animate-glow">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-dm-serif text-2xl text-rich-black mb-4">
                  Invest in Prime Commercial Properties
                </h3>
                <p className="text-slate-blue leading-relaxed mb-6">
                  Build wealth through strategic commercial real estate
                  investments. Office buildings, retail spaces, and mixed-use
                  developments in high-growth areas.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-white transition-all duration-300 rounded-lg"
                >
                  <Link href="/properties?propertyType=commercial">
                    View Commercial
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Service 3: Expert Guidance */}
            <Card
              className="bg-white hover-lift shadow-luxury group animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 animate-glow">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-dm-serif text-2xl text-rich-black mb-4">
                  Get Expert Investment Guidance
                </h3>
                <p className="text-slate-blue leading-relaxed mb-6">
                  Receive personalized consultation from our experienced team.
                  Market analysis, investment strategies, and ongoing support
                  for your portfolio.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-white transition-all duration-300 rounded-lg"
                >
                  <Link href="/contact">Schedule Consultation</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-dm-serif text-4xl md:text-5xl text-rich-black mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-slate-blue">
              Real experiences from satisfied investors who trust Safehold
              Properties
            </p>
          </div>

          {testimonialsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-white rounded-2xl animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials?.map((testimonial) => (
                <Card key={testimonial.id} className="bg-white hover-lift shadow-luxury">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="font-semibold text-rich-black text-lg">
                          {testimonial.name}
                        </div>
                        <div className="text-slate-blue text-sm">
                          {testimonial.role}
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-primary-orange text-primary-orange"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="relative rounded-lg overflow-hidden bg-gray-100">
                      <video
                        src={testimonial.content}
                        controls
                        className="w-full h-64 object-cover"
                        preload="metadata"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-dm-serif text-4xl md:text-5xl text-white mb-6">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Schedule a consultation with our experts and discover the perfect
            property investment for your portfolio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-orange-gradient text-white hover:shadow-xl transition-all duration-300 font-semibold"
            >
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-slate-blue bg-white/10 backdrop-blur-sm"
            >
              <Link href="/properties">Browse Properties</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}