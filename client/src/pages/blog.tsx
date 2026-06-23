import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, User } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import { useSEO } from "@/hooks/use-seo";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Blog() {
  useSEO({
    title: "Real Estate Blog — Ajah & Lekki Property Insights | Safehold Properties",
    description:
      "Expert real estate insights, investment guides, and property market updates for Ajah, Lekki, and Lagos from Safehold Properties.",
    canonical: `${window.location.origin}/blog`,
  });

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-dm-serif text-4xl md:text-5xl text-rich-black mb-4">
              Real Estate Insights
            </h1>
            <p className="text-xl text-slate-blue max-w-3xl mx-auto">
              Expert guides, market updates, and investment tips for Ajah, Lekki and Lagos property buyers
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <Card
                key={post.slug}
                className="overflow-hidden shadow-luxury hover-lift transition-all duration-300 bg-white"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-orange-gradient text-white">
                      {post.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-slate-blue text-sm mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.publishDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </span>
                  </div>

                  <h2 className="font-dm-serif text-2xl text-rich-black mb-3 leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-slate-blue leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <Button
                    asChild
                    className="bg-orange-gradient text-white hover:shadow-lg transition-all duration-300 rounded-lg"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      Read More <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-dm-serif text-3xl md:text-4xl text-white mb-4">
            Ready to Find Your Property in Ajah or Lekki?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Our expert real estate agents are here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-orange-gradient text-white font-semibold hover:shadow-xl transition-all duration-300"
            >
              <Link href="/properties">Browse Properties</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-slate-blue bg-white/10 backdrop-blur-sm"
            >
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
