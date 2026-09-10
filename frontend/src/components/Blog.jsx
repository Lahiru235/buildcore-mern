import { useEffect, useState } from "react";
import { getBlogPosts } from "../api/api";

const fallbackPosts = [
  {
    title: "5 Questions to Ask Before You Hire a Contractor",
    excerpt:
      "Not all builders are built the same. Ensure your investment is safe by querying licensing, warranty programs, insurance coverage, and engineering credentials before any deposit is made.",
    category: "Featured Guide",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
    featured: true,
  },
  {
    title: "Cost Management in Modern Infrastructure Projects",
    excerpt:
      "Strategies for keeping large-scale civil projects on budget without compromising materials or safety standards.",
    category: "Finance",
  },
  {
    title: "Understanding Concrete Curing Times & Climate Impact",
    excerpt:
      "How humidity, heat, and material composition affect the strength and reliability of poured concrete structures.",
    category: "Engineering",
  },
  {
    title: "Safety Standard Protocols on Active High-Rise Sites",
    excerpt:
      "A look at the layered safety compliance procedures Buildcore enforces across every active vertical construction site.",
    category: "Compliance",
  },
];

export default function Blog() {
  const [posts, setPosts] = useState(fallbackPosts);

  useEffect(() => {
    getBlogPosts()
      .then((data) => data.length && setPosts(data))
      .catch(() => setPosts(fallbackPosts));
  }, []);

  const featured = posts.find((p) => p.featured) || posts[0];
  const rest = posts.filter((p) => p !== featured).slice(0, 3);

  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Insights & Updates</span>
          <h2>Latest From Buildcore</h2>
          <p>
            Expert perspectives on commercial civil engineering, safety
            compliance, and construction practices.
          </p>
        </div>

        <div className="blog-grid">
          {featured && (
            <div className="blog-feature">
              {featured.image && (
                <img src={featured.image} alt={featured.title} />
              )}
              <div className="blog-feature-body">
                <span className="blog-category">
                  {featured.category?.toUpperCase()}
                </span>
                <h3>{featured.title}</h3>
                <p>{featured.excerpt}</p>
                <a href="#contact" className="read-link">
                  Read Full Guide →
                </a>
              </div>
            </div>
          )}

          <div className="blog-list">
            {rest.map((post) => (
              <div className="blog-list-item" key={post.title}>
                <span className="blog-category">
                  {post.category?.toUpperCase()}
                </span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <a href="#contact" className="read-link">
                  Read Article →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
