
import React from "react";

// SEO meta tags
export const BlogHead: React.FC = () => (
  <>
    <title>Eskom Blog - Energy Insights, Tips & News</title>
    <meta name="description" content="Read the latest insights, tips, and power news from the EskomCalc Pro blog team. Stay up to date with all things energy." />
    <meta name="keywords" content="Eskom, blog, energy, electricity, insights, tips, news, South Africa" />
    <meta property="og:title" content="Eskom Blog - Energy Insights, Tips & News" />
    <meta property="og:description" content="Read the latest insights, tips, and power news from the EskomCalc Pro blog team. Stay up to date with all things energy." />
    <meta property="og:type" content="website" />
  </>
);

const demoPosts = [
  {
    title: "Understanding South Africa's Energy Mix in 2025",
    excerpt: "How renewables, coal, and innovation form the backbone of the national grid.",
    date: "2025-06-15",
    author: "EskomCalc Team",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "5 Tips to Lower Your Electricity Bill This Winter",
    excerpt: "Small changes in your home can have a big impact on savings.",
    date: "2025-05-10",
    author: "Kabelo Kako",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
  }
];

export default function Blog() {
  return (
    <main className="min-h-screen pt-14 bg-gradient-to-br from-white via-blue-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-playfair font-bold mb-6 text-slate-900 dark:text-white">
          EskomCalc Pro Blog
        </h1>
        <p className="mb-7 text-lg text-slate-600 dark:text-slate-200">
          The latest news and helpful tips about energy, Eskom tariffs, and more!
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {demoPosts.map((post, idx) => (
            <article key={idx} className="rounded-2xl overflow-hidden bg-white/60 dark:bg-slate-800/80 shadow-lg hover:shadow-2xl border border-primary/10 backdrop-blur-lg transition-all flex flex-col">
              <img src={post.image} alt={post.title} className="h-48 w-full object-cover" />
              <div className="p-5 flex flex-col flex-1">
                <h2 className="font-playfair text-2xl font-bold mb-1 text-primary">{post.title}</h2>
                <p className="text-sm text-slate-500 mb-3">{post.date} &middot; By {post.author}</p>
                <p className="flex-1 text-base text-gray-700 dark:text-gray-200 mb-3">{post.excerpt}</p>
                <button
                  className="ml-auto rounded-lg px-4 py-2 font-semibold text-primary bg-primary/10 hover:bg-primary/20 transition mt-auto"
                >
                  Read more
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
