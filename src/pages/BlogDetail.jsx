// src/pages/BlogDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

/** Strapi URL */
const RAW_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";
const STRAPI_URL = RAW_URL.replace(/\/+$/, "");

/** ---- Helpers ---- */
function getMediaUrl(media) {
  const url = media?.data?.attributes?.url ?? media?.url ?? null;
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}
function formatDate(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

/** ---- Rich Text (Strapi blok) renderer ---- */
function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}
function renderLeaf(leaf, key) {
  let content = leaf.text ?? "";
  if (leaf.bold) content = <strong key={key}>{content}</strong>;
  if (leaf.italic) content = <em key={key}>{content}</em>;
  if (leaf.underline) content = <u key={key}>{content}</u>;
  if (leaf.code) content = <code key={key}>{content}</code>;
  return content;
}
function renderChildren(nodes = []) {
  return nodes.map((n, i) => {
    if (Object.prototype.hasOwnProperty.call(n, "text")) {
      return <span key={i}>{renderLeaf(n, i)}</span>;
    }
    return renderNode(n, i);
  });
}
function renderNode(node, key) {
  const t = node.type || node.format || "paragraph";
  switch (t) {
    case "heading":
    case "h1":
    case "heading-one":
      return <h1 key={key}>{renderChildren(node.children)}</h1>;
    case "h2":
    case "heading-two":
      return <h2 key={key}>{renderChildren(node.children)}</h2>;
    case "h3":
    case "heading-three":
      return <h3 key={key}>{renderChildren(node.children)}</h3>;
    case "h4":
    case "heading-four":
      return <h4 key={key}>{renderChildren(node.children)}</h4>;
    case "bulleted-list":
    case "unordered-list":
    case "ul":
      return (
        <ul key={key}>
          {(node.children || []).map((li, i) => (
            <li key={i}>{renderChildren(li.children)}</li>
          ))}
        </ul>
      );
    case "numbered-list":
    case "ordered-list":
    case "ol":
      return (
        <ol key={key}>
          {(node.children || []).map((li, i) => (
            <li key={i}>{renderChildren(li.children)}</li>
          ))}
        </ol>
      );
    case "list-item":
      return <li key={key}>{renderChildren(node.children)}</li>;
    case "quote":
    case "block-quote":
      return <blockquote key={key}>{renderChildren(node.children)}</blockquote>;
    case "link": {
      const href = node.url || "#";
      const safeHref = href.startsWith("http") ? href : href.startsWith("/") ? `${STRAPI_URL}${href}` : href;
      return (
        <a key={key} href={safeHref} target={node.newTab ? "_blank" : "_self"} rel="noopener noreferrer">
          {renderChildren(node.children)}
        </a>
      );
    }
    case "image": {
      const url = node.url || node.src;
      if (!url) return null;
      const full = url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
      return (
        <p key={key}>
          <img src={full} alt={node.alt || ""} style={{ maxWidth: "100%", height: "auto" }} />
        </p>
      );
    }
    default:
      return <p key={key}>{renderChildren(node.children)}</p>;
  }
}
function RenderContent({ data }) {
  // Düz HTML / string
  if (isNonEmptyString(data)) {
    return (
      <article
        style={{ marginTop: 16, color: "#1f2937", lineHeight: 1.8, fontSize: 17 }}
        dangerouslySetInnerHTML={{ __html: data }}
      />
    );
  }
  // Dizi (bloklar)
  if (Array.isArray(data)) {
    return (
      <article style={{ marginTop: 16, color: "#1f2937", lineHeight: 1.8, fontSize: 17 }}>
        {data.map((node, i) => renderNode(node, i))}
      </article>
    );
  }
  // Obje (blocks/content/children içeriyorsa)
  if (data && typeof data === "object") {
    const blocks = data.blocks || data.content || data.children;
    if (Array.isArray(blocks)) {
      return (
        <article style={{ marginTop: 16, color: "#1f2937", lineHeight: 1.8, fontSize: 17 }}>
          {blocks.map((node, i) => renderNode(node, i))}
        </article>
      );
    }
  }
  return null;
}

/** ---- Page ---- */
export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      try {
        // 1) Slug ile dene
        const q = new URLSearchParams({
          "filters[slug][$eq]": slug,
          populate: "*",
          "pagination[limit]": "1",
        }).toString();

        let res = await fetch(`${STRAPI_URL}/api/posts?${q}`);
        let json = null;

        if (res.ok) {
          json = await res.json();
        } else {
          // 2) Yedek: hepsini çekip front-end'te bul
          const res2 = await fetch(`${STRAPI_URL}/api/posts?populate=*`);
          if (res2.ok) json = await res2.json();
        }

        const arr = json?.data || [];
        const found =
          arr.find((it) => {
            const a = it.attributes ?? it ?? {};
            const s = a.slug ?? a.Slug ?? "";
            return s === slug;
          }) || null;

        if (found) {
          const a = found.attributes ?? found ?? {};
          setPost({
            title: a.title ?? a.Title ?? "",
            date: formatDate(a.date ?? a.Date ?? ""),
            author: a.author ?? a.Author ?? "",
            category: a.category ?? a.Category ?? "",
            excerpt: a.excerpt ?? a.Excerpt ?? "",
            content: a.content ?? a.Content ?? a.body ?? a.Body ?? "",
            cover: getMediaUrl(a.cover ?? a.Cover),
            thumb: getMediaUrl(a.thumb ?? a.Thumb),
          });
        } else {
          setPost(null);
        }
      } catch (e) {
        console.error(e);
        setPost(null);
      } finally {
        setLoading(false);
      }
    }
    run();
  }, [slug]);

  if (loading) {
    return (
      <main style={{ width: "min(900px,92%)", margin: "40px auto" }}>
        <p style={{ opacity: 0.7 }}>Yükleniyor…</p>
      </main>
    );
  }

  if (!post) {
    return (
      <main style={{ width: "min(900px,92%)", margin: "40px auto" }}>
        <h1>İçerik bulunamadı</h1>
        <p>
          Aradığınız yazı bulunamadı. <Link to="/blog">Blog listesine dön</Link>
        </p>
      </main>
    );
  }

  return (
   <>
   <Navbar/>
    <main style={{ width: "min(900px,92%)", margin: "48px auto" }}>
      {/* Kapak görseli */}
      {post.cover ? (
        <div
          style={{
            marginBottom: 24,
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
          }}
        >
          <img
            src={post.cover}
            alt={post.title}
            style={{ display: "block", width: "100%", height: "auto" }}
            loading="lazy"
          />
        </div>
      ) : null}

      {/* Başlık + meta */}
      <h1 style={{ margin: "0 0 10px", lineHeight: 1.25 }}>{post.title}</h1>
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          color: "#64748b",
          fontSize: 14,
          marginBottom: 24,
        }}
      >
        {post.date && <span>{post.date}</span>}
        {post.author && <span>• {post.author}</span>}
        {post.category && <span>• {post.category}</span>}
      </div>

      {/* Özet */}
      {post.excerpt && (
        <p style={{ fontSize: 18, lineHeight: 1.7, color: "#334155" }}>{post.excerpt}</p>
      )}

      {/* İçerik (string veya blok) */}
      <RenderContent data={post.content} />

      <div style={{ marginTop: 32 }}>
        <Link to="/blog" style={{ textDecoration: "none", color: "#2563eb" }}>
          ← Bloga geri dön
        </Link>
      </div>
    </main>
   </>
  );
}
