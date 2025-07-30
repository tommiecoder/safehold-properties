import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function About() {
  const stats = [
    { label: "Properties Sold", value: "500+" },
    { label: "Investment Volume", value: "₦50B+" },
    { label: "Happy Clients", value: "300+" },
    { label: "Years Experience", value: "15" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-dm-serif text-4xl md:text-5xl text-rich-black mb-6">
              Building Wealth Through Strategic Real Estate Investments
            </h1>
            <p className="text-xl text-slate-blue max-w-3xl mx-auto leading-relaxed">
              Founded with a vision to democratize premium real estate investment in Nigeria, 
              Safehold Properties has guided hundreds of investors toward building generational wealth.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-dm-serif text-4xl text-rich-black mb-6">Our Story</h2>
              <p className="text-lg text-slate-blue mb-6 leading-relaxed">
                Founded with a vision to democratize premium real estate investment in Nigeria, Safehold Properties 
                has guided hundreds of investors toward building generational wealth through strategic property acquisitions.
              </p>
              <p className="text-lg text-slate-blue mb-6 leading-relaxed">
                Our founder, a seasoned investment advisor with over 15 years in the financial markets, recognized 
                the untapped potential in Nigeria's real estate sector and expanded our reach to serve discerning 
                investors across West Africa and beyond.
              </p>
              <p className="text-lg text-slate-blue mb-8 leading-relaxed">
                Today, we pride ourselves on providing personalized service, expert market insights, and access to 
                premium properties that deliver exceptional returns. Our commitment to transparency, integrity, and 
                client success has made us the trusted partner for real estate investment in Nigeria.
              </p>

              <Button asChild size="lg" className="bg-orange-gradient text-white hover:shadow-xl transition-all duration-300 font-semibold">
                <Link href="/contact">
                  Schedule a Consultation
                </Link>
              </Button>
            </div>

            <div className="space-y-6">
              <img
                src="/images/founder-profile.jpg"
                alt="Founder profile"
                className="rounded-2xl shadow-lg w-full object-cover object-center"
                style={{
                  imageRendering: 'crisp-edges',
                  filter: 'contrast(1.1) brightness(1.05) saturate(1.1)',
                  maxHeight: '600px'
                }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card>
              <CardContent className="p-8">
                <h3 className="font-dm-serif text-2xl text-rich-black mb-4">Our Mission</h3>
                <p className="text-slate-blue leading-relaxed">
                  To empower individuals and families to build lasting wealth through strategic real estate investments, 
                  providing expert guidance, premium properties, and personalized service that exceeds expectations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="font-dm-serif text-2xl text-rich-black mb-4">Our Vision</h3>
                <p className="text-slate-blue leading-relaxed">
                  To be the leading real estate investment platform in West Africa, known for our integrity, 
                  market expertise, and commitment to helping our clients achieve their financial goals through 
                  strategic property investments.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-slate-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-dm-serif text-4xl text-white mb-4">Our Track Record</h2>
            <p className="text-xl text-white/90">Numbers that speak to our success and client satisfaction</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-dm-serif text-3xl md:text-4xl text-primary-orange mb-2">
                  {stat.value}
                </div>
                <div className="text-white font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-dm-serif text-4xl text-rich-black mb-4">Our Values</h2>
            <p className="text-xl text-slate-blue">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary-orange" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="font-dm-serif text-xl text-rich-black mb-4">Excellence</h3>
                <p className="text-slate-blue">
                  We strive for excellence in every property we curate and every service we provide to our clients.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary-orange" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L9 9l-8 0 6.5 4.7L5 22l7-5.1L19 22l-2.5-8.3L23 9l-8 0-3-8z"/>
                  </svg>
                </div>
                <h3 className="font-dm-serif text-xl text-rich-black mb-4">Integrity</h3>
                <p className="text-slate-blue">
                  Transparency and honesty form the foundation of all our client relationships and business practices.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary-orange" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16.6c-.8 0-1.54.4-2 1.05L12 14l-2.6-4.95C8.94 8.4 8.2 8 7.4 8H5.46c-.8 0-1.49.59-1.42 1.37L6.5 16H9v6h2v-6h2v6h7z"/>
                  </svg>
                </div>
                <h3 className="font-dm-serif text-xl text-rich-black mb-4">Partnership</h3>
                <p className="text-slate-blue">
                  We view every client relationship as a long-term partnership built on mutual trust and success.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-dm-serif text-4xl text-rich-black mb-6">
            Ready to Partner with Us?
          </h2>
          <p className="text-xl text-slate-blue mb-8">
            Let's discuss how we can help you achieve your real estate investment goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-orange-gradient text-white hover:shadow-xl transition-all duration-300 font-semibold">
              <Link href="/contact">
                Schedule Consultation
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
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