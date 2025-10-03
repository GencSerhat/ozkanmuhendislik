import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const RAW_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";
const STRAPI_URL = RAW_URL.replace(/\/+$/, "");

function getMediaUrl(media) {
  const url = media?.data?.attributes?.url ?? media?.url ?? null;
  if (!url) return null;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}
function formatDate(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch { return iso; }
}

export default function BlogList() {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Basit: hepsini çek, client-side sırala (order ASC, createdAt DESC)
        const q = new URLSearchParams({
          populate: "*",
          "pagination[limit]": "200",
        }).toString();
        const res = await fetch(`${STRAPI_URL}/api/posts?${q}`);
        if (!res.ok) {
          console.error("Strapi list error:", res.status, await res.text());
          setLoading(false);
          return;
        }
        const json = await res.json();
        const arr = (json?.data || []).map((it) => {
          const a = it.attributes ?? it ?? {};
          const slug = a.slug ?? a.Slug ?? "";
          return {
            title: a.title ?? a.Title ?? "",
            date: a.date ?? a.Date ?? "",
            excerpt: a.excerpt ?? a.Excerpt ?? "",
            author: a.author ?? a.Author ?? "",
            category: a.category ?? a.Category ?? "",
            cover: getMediaUrl(a.cover ?? a.Cover),
            thumb: getMediaUrl(a.thumb ?? a.Thumb),
            order: Number(a.order ?? a.Order ?? 1000),
            createdAt: a.createdAt ?? a.CreatedAt ?? null,
            href: slug ? `/blog/${slug}` : "/blog",
          };
        });

        const sorted = arr.sort((x, y) => {
          const byOrder = x.order - y.order;
          if (byOrder !== 0) return byOrder;
          const dx = x.createdAt ? new Date(x.createdAt).getTime() : 0;
          const dy = y.createdAt ? new Date(y.createdAt).getTime() : 0;
          return dy - dx;
        });

        setItems(sorted);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <main style={{ width: "min(1100px,92%)", margin: "48px auto" }}>
        <h1 style={{ margin: 0 }}>Blog</h1>
        <p style={{ opacity: 0.7 }}>Yükleniyor…</p>
      </main>
    );
  }

  return (
   
   <>
   <Navbar/>
    <main style={{ width: "min(1100px,92%)", margin: "48px auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 16 }}>
        <h1 style={{ margin: 0 }}>Blog</h1>
        <small style={{ color: "#64748b" }}>{items.length} içerik</small>
      </header>

      {/* Liste */}
      <ul style={{ listStyle: "none", padding: 0, margin: "24px 0 0", display: "grid", gap: 24 }}>
        {items.slice(0, visible).map((p, i) => (
          <li key={i} style={{
            display: "grid",
            gridTemplateColumns: "160px 1fr",
            gap: 24,
            alignItems: "center",
            background: "#fff",
            borderRadius: 16,
            padding: 16,
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)"
          }}>
            <Link to={p.href} aria-label={p.title} style={{
              display: "block",
              width: 160, height: 120,
              borderRadius: 14, overflow: "hidden", background: "#f1f5f9"
            }}>
              {p.thumb ? (
                <img src={p.thumb} alt={p.title} loading="lazy"
                     style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              ) : null}
            </Link>

            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", color: "#94a3b8", fontSize: 13 }}>
                {p.date && <span>{formatDate(p.date)}</span>}
                {p.author && <span>• {p.author}</span>}
                {p.category && <span>• {p.category}</span>}
              </div>

              <Link to={p.href} style={{ textDecoration: "none", color: "inherit" }}>
                <h3 style={{ margin: "6px 0 6px", lineHeight: 1.35 }}>{p.title}</h3>
              </Link>

              {p.excerpt && <p style={{ margin: 0, color: "#334155", lineHeight: 1.6 }}>{p.excerpt}</p>}
            </div>
          </li>
        ))}
      </ul>

      {/* Daha fazla */}
      {visible < items.length && (
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <button onClick={() => setVisible((v) => v + 8)}
                  style={{
                    background: "#1e5aff", color: "#fff",
                    border: 0, borderRadius: 10, padding: "10px 18px",
                    cursor: "pointer", fontWeight: 600
                  }}>
            Daha Fazla Göster
          </button>
        </div>
      )}
    </main>
 
   </>
    );
}
