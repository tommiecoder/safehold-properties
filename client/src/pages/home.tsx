import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PropertyCard from "@/components/property-card";
import SearchFilters from "@/components/search-filters";
import LeadCaptureForm from "@/components/lead-capture-form";
import type { Property, Testimonial } from "@shared/schema";
import { ArrowRight, Star, Home as HomeIcon, Building, Users } from "lucide-react";

export default function Home() {
  const { data: featuredProperties, isLoading: propertiesLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties/featured"],
  });

  const { data: testimonials, isLoading: testimonialsLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials/featured"],
  });

  const stats = [
    { label: "Properties Sold", value: "500+" },
    { label: "Investment Volume", value: "₦50B+" },
    { label: "Happy Clients", value: "300+" },
    { label: "Years Experience", value: "15" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        >
          <div className="absolute inset-0 bg-rich-black/40"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-dm-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
                Your Gateway to <span className="text-primary-orange">Premium</span> Nigerian Real Estate
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 font-light leading-relaxed">
                Expert investment guidance for discerning buyers in Lagos, Abuja, Abeokuta, Asaba, and South Africa. 
                Build generational wealth through strategic property investments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-orange-gradient text-white hover:shadow-xl transition-all duration-300 font-semibold text-lg">
                  <Link href="/properties">
                    View Properties <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-rich-black">
                  <Link href="/contact">
                    Schedule Consultation
                  </Link>
                </Button>
              </div>
            </div>
            
            <div>
              <LeadCaptureForm className="max-w-lg ml-auto" />
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
              Carefully curated properties that offer exceptional returns and long-term value appreciation
            </p>
          </div>

          {propertiesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-2xl"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties?.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-orange-gradient text-white hover:shadow-xl transition-all duration-300 font-semibold text-lg">
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
              Advanced search tools to discover properties that match your criteria
            </p>
          </div>

          <SearchFilters 
            onSearch={(filters) => {
              // Navigate to properties page with filters
              window.location.href = `/properties?${new URLSearchParams(Object.entries(filters).reduce((acc, [key, value]) => {
                if (value) acc[key] = String(value);
                return acc;
              }, {} as Record<string, string>))}`;
            }}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
              Comprehensive real estate solutions tailored to your investment goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1: Dream Home */}
            <Card className="bg-white hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <HomeIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-dm-serif text-2xl text-rich-black mb-4">
                  Discover Your Dream Home
                </h3>
                <p className="text-slate-blue leading-relaxed mb-6">
                  Find the perfect residential property that matches your lifestyle and budget. From luxury apartments to family homes across Nigeria and South Africa.
                </p>
                <Button asChild variant="outline" className="border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-white">
                  <Link href="/properties?propertyType=residential">
                    Browse Homes
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Service 2: Commercial Properties */}
            <Card className="bg-white hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-dm-serif text-2xl text-rich-black mb-4">
                  Invest in Prime Commercial Properties
                </h3>
                <p className="text-slate-blue leading-relaxed mb-6">
                  Build wealth through strategic commercial real estate investments. Office buildings, retail spaces, and mixed-use developments in high-growth areas.
                </p>
                <Button asChild variant="outline" className="border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-white">
                  <Link href="/properties?propertyType=commercial">
                    View Commercial
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Service 3: Expert Guidance */}
            <Card className="bg-white hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-dm-serif text-2xl text-rich-black mb-4">
                  Get Expert Investment Guidance
                </h3>
                <p className="text-slate-blue leading-relaxed mb-6">
                  Receive personalized consultation from our experienced team. Market analysis, investment strategies, and ongoing support for your portfolio.
                </p>
                <Button asChild variant="outline" className="border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-white">
                  <Link href="/contact">
                    Schedule Consultation
                  </Link>
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
              Real experiences from satisfied investors who trust Safehold Properties
            </p>
          </div>

          {testimonialsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-white rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials?.map((testimonial) => (
                <Card key={testimonial.id} className="bg-white">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <div className="font-semibold text-rich-black">{testimonial.name}</div>
                        <div className="text-slate-blue text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary-orange text-primary-orange" />
                      ))}
                    </div>
                    <p className="text-slate-blue leading-relaxed">{testimonial.content}</p>
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
            Schedule a consultation with our experts and discover the perfect property investment for your portfolio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-orange-gradient text-white hover:shadow-xl transition-all duration-300 font-semibold">
              <Link href="/contact">
                Schedule Consultation
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-blue">
              <Link href="/properties">
                Browse Properties
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
