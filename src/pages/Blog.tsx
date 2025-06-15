
import React from "react";
import { SeoHead } from "@/components/SeoHead";

const posts = [
  {
    title: "Understanding South Africa’s 2025/26 Electricity Tariffs: What’s Changed?",
    slug: "2025-tariffs-explained",
    excerpt: "Get the latest on how Eskom's 2025/26 tariff increases affect prepaid and postpaid users. Learn which provinces are most impacted, the new block rates, and strategies to minimize your bill.",
    date: "2025-06-15",
    author: "EskomCalc Pro Team",
    keywords: "Eskom, electricity, tariffs, 2025, South Africa, kWh, prepaid, budgeting, costs",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "5 Proven Ways to Lower Your Electricity Bill and Save in 2025",
    slug: "lower-your-electricity-bill-2025",
    excerpt: "From off-peak power use to tariff selection, discover expert-backed, practical tips to cut your energy bill this year.",
    date: "2025-05-10",
    author: "Kabelo Kako",
    keywords: "saving, tips, electricity, South Africa, off-peak, time-of-use, savings, home, 2025",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Inclining Block Tariffs vs. Time-of-Use: Which is Better for You?",
    slug: "block-vs-tou-tariffs-southafrica",
    excerpt: "Compare the pros and cons of block tariffs and time-of-use plans so you can maximize savings and avoid bill shock.",
    date: "2025-04-25",
    author: "EskomCalc Research",
    keywords: "inclining block, time of use, tariffs, comparison, Eskom, savings, plans, tips",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "How to Read Your Eskom Bill: A Simple Guide",
    slug: "how-to-read-eskom-bill-guide",
    excerpt: "Many South Africans find electricity bills confusing. We break down exactly what each line means and how to spot hidden fees.",
    date: "2025-04-11",
    author: "Nomfundo M.",
    keywords: "Eskom bill, guide, understanding, reading, costs, tips, South Africa",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80"
  }
];

export const BlogHead: React.FC = () => (
  <SeoHead
    title="EskomCalc Blog – Latest Energy Insights, Tariff Tips & News (2025/26)"
    description="Read the top South African energy tips, detailed Eskom tariff analysis, cost-saving advice, and breaking news. Updated for the 2025/26 electricity year."
    keywords="Eskom, blog, energy, electricity, insights, tariff tips, news, South Africa, prepaid"
    canonicalUrl="https://preview--eskom-unit-oracle.lovable.app/blog"
  />
);

export default function Blog() {
  return (
    <>
      <BlogHead />
      <main className="min-h-screen pt-14 bg-gradient-to-br from-white via-blue-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <section className="max-w-5xl mx-auto px-4 py-10">
          <h1 className="text-4xl font-playfair font-bold mb-6 text-slate-900 dark:text-white">
            EskomCalc Pro Blog & Tips
          </h1>
          <p className="mb-7 text-lg text-slate-600 dark:text-slate-200">
            The latest South African electricity news, tariff analysis, and expert tips to help you lower your energy costs in 2025 and beyond.
          </p>
          <div className="grid md:grid-cols-2 gap-7">
            {posts.map((post, idx) => (
              <article
                key={idx}
                itemScope
                itemType="http://schema.org/BlogPosting"
                className="rounded-2xl overflow-hidden bg-white/80 dark:bg-slate-800/80 shadow-lg hover:shadow-2xl border border-primary/10 backdrop-blur-lg transition-all flex flex-col"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-52 w-full object-cover"
                  itemProp="image"
                />
                <div className="p-5 flex flex-col flex-1">
                  <header>
                    <h2 className="font-playfair text-2xl font-bold mb-1 text-primary" itemProp="headline">{post.title}</h2>
                    <p className="text-sm text-slate-500 mb-2">
                      <time dateTime={post.date} itemProp="datePublished">{post.date}</time> &middot; By <span itemProp="author">{post.author}</span>
                    </p>
                  </header>
                  <section className="flex-1">
                    <meta itemProp="keywords" content={post.keywords} />
                    <p className="text-base text-gray-700 dark:text-gray-200 mb-3" itemProp="description">{post.excerpt}</p>
                  </section>
                  <a
                    href={`/blog/${post.slug}`}
                    className="ml-auto rounded-lg px-5 py-2 font-semibold text-primary bg-primary/10 hover:bg-primary/20 transition mt-auto"
                    aria-label={`Read more about ${post.title}`}
                  >
                    Read more
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
