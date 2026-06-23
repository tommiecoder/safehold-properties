import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import { useSEO } from "@/hooks/use-seo";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  useSEO({
    title: post
      ? `${post.title} | Safehold Properties Blog`
      : "Post Not Found | Safehold Properties",
    description: post?.excerpt,
    canonical: post ? `${window.location.origin}/blog/${post.slug}` : undefined,
  });

  if (!post) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-dm-serif text-3xl text-rich-black mb-4">
            Article Not Found
          </h1>
          <p className="text-slate-blue mb-8">
            This blog post doesn't exist or may have been moved.
          </p>
          <Button asChild className="bg-orange-gradient text-white">
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-off-white">
      {/* Featured Image Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
          <Badge className="bg-orange-gradient text-white mb-4">{post.category}</Badge>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link href="/blog">
            <Button variant="ghost" className="mb-6 -ml-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          <h1 className="font-dm-serif text-3xl md:text-4xl lg:text-5xl text-rich-black mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-slate-blue mb-8 pb-8 border-b border-silver-gray">
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {formatDate(post.publishDate)}
            </span>
            <span className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {post.author}
            </span>
          </div>
        </div>

        <div
          className="prose prose-lg max-w-none text-slate-blue leading-relaxed
            prose-headings:font-dm-serif prose-headings:text-rich-black
            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
            prose-p:mb-4 prose-p:leading-relaxed
            prose-ul:my-4 prose-li:mb-2
            prose-a:text-primary-orange prose-a:no-underline hover:prose-a:underline
            prose-strong:text-rich-black"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Internal Links */}
        <div className="mt-12 p-6 bg-white rounded-2xl shadow-luxury">
          <h3 className="font-dm-serif text-xl text-rich-black mb-4">
            Explore Ajah & Lekki Properties
          </h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              className="bg-orange-gradient text-white hover:shadow-lg transition-all duration-300"
            >
              <Link href="/properties">Browse All Properties</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-slate-blue text-slate-blue hover:bg-slate-blue hover:text-white transition-all duration-300"
            >
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-dm-serif text-3xl text-rich-black mb-8">
              More Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((related) => (
                <div key={related.slug} className="group">
                  <img
                    src={related.featuredImage}
                    alt={related.title}
                    className="w-full h-40 object-cover rounded-xl mb-4 group-hover:opacity-90 transition-opacity"
                  />
                  <Badge className="bg-orange-gradient text-white mb-2 text-xs">
                    {related.category}
                  </Badge>
                  <h3 className="font-dm-serif text-lg text-rich-black mb-2 leading-snug">
                    {related.title}
                  </h3>
                  <Link
                    href={`/blog/${related.slug}`}
                    className="text-primary-orange text-sm font-medium hover:underline"
                  >
                    Read Article →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
