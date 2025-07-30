import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import type { TeamMember } from "@shared/schema";

export default function Team() {
  const { data: teamMembers, isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-dm-serif text-4xl md:text-5xl text-rich-black mb-6">
              Our Expert Team
            </h1>
            <p className="text-xl text-slate-blue max-w-3xl mx-auto">
              Meet the professionals who make your real estate investment dreams a reality
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center">
                  <Skeleton className="w-full h-64 rounded-2xl mb-6" />
                  <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                  <Skeleton className="h-4 w-1/2 mx-auto mb-4" />
                  <div className="flex justify-center space-x-4">
                    <Skeleton className="h-6 w-6 rounded" />
                    <Skeleton className="h-6 w-6 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers?.map((member) => (
                <Card key={member.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <div className="p-6 text-center">
                      <h3 className="font-dm-serif text-xl text-rich-black mb-2">
                        {member.name}
                      </h3>
                      <p className="text-slate-blue mb-4">{member.role}</p>
                      {member.bio && (
                        <p className="text-sm text-slate-blue/80 mb-4 leading-relaxed">
                          {member.bio}
                        </p>
                      )}
                      <div className="flex justify-center space-x-4">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            className="text-slate-blue hover:text-primary-orange transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                        )}
                        {member.twitter && (
                          <a
                            href={member.twitter}
                            className="text-slate-blue hover:text-primary-orange transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-dm-serif text-4xl text-rich-black mb-6">Leadership Excellence</h2>
              <p className="text-lg text-slate-blue mb-6 leading-relaxed">
                Our leadership team brings together decades of combined experience in real estate, 
                finance, and investment advisory. Each member is committed to delivering exceptional 
                results for our clients.
              </p>
              <p className="text-lg text-slate-blue mb-8 leading-relaxed">
                With deep market knowledge and a passion for helping clients achieve their financial goals, 
                our team provides the expertise and guidance necessary to navigate Nigeria's dynamic 
                real estate landscape.
              </p>
              
              <Button asChild size="lg" className="bg-orange-gradient text-white hover:shadow-xl transition-all duration-300 font-semibold">
                <Link href="/contact">
                  Meet with Our Team
                </Link>
              </Button>
            </div>

            <div className="space-y-6">
              <Card className="bg-off-white">
                <CardContent className="p-8">
                  <h3 className="font-dm-serif text-2xl text-rich-black mb-4">Our Approach</h3>
                  <p className="text-slate-blue leading-relaxed">
                    We believe in building long-term relationships with our clients, providing personalized 
                    service, and maintaining the highest standards of professionalism in every interaction.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-off-white">
                <CardContent className="p-8">
                  <h3 className="font-dm-serif text-2xl text-rich-black mb-4">Client-Centric Focus</h3>
                  <p className="text-slate-blue leading-relaxed">
                    Every decision we make is guided by what's best for our clients. We take the time to 
                    understand your goals and tailor our services to meet your specific needs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-dm-serif text-4xl text-white mb-6">
            Work with Nigeria's Leading Real Estate Experts
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Our experienced team is ready to help you find the perfect investment opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-orange-gradient text-white hover:shadow-xl transition-all duration-300 font-semibold">
              <Link href="/contact">
                Schedule Consultation
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-blue">
              <Link href="/properties">
                View Properties
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
