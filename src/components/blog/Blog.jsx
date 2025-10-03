import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Blog.module.css";

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
  } catch {
    return iso;
  }
}

export default function Blog() {
  const sectionRef = useRef(null);

  const [featuredPost, setFeaturedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // (debug) IO'yu tamamen atla
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const els = root.querySelectorAll(`.${styles.reveal}`);
    els.forEach((el) => el.classList.add(styles.show));
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const q = new URLSearchParams({
          populate: "*",
          "pagination[limit]": "50", // yeterince kayıt alalım
        }).toString();

        const res = await fetch(`${STRAPI_URL}/api/posts?${q}`);
        if (!res.ok) {
          const txt = await res.text();
          console.error("Strapi error:", res.status, txt);
          setLoading(false);
          return;
        }

        const json = await res.json();
        const items = json?.data || [];
        if (!items.length) {
          setFeaturedPost(null);
          setPosts([]);
          setLoading(false);
          return;
        }

        const mapped = items.map((it) => {
          const a = it.attributes ?? it ?? {};
          return {
            date: a.date ?? a.Date ?? "",
            title: a.title ?? a.Title ?? "",
            excerpt: a.excerpt ?? a.Excerpt ?? "",
            author: a.author ?? a.Author ?? "",
            category: a.category ?? a.Category ?? "",
            slug: a.slug ?? a.Slug ?? "",
            featured: (a.featured ?? a.Featured ?? false) === true,
            cover: getMediaUrl(a.cover ?? a.Cover),
            thumb: getMediaUrl(a.thumb ?? a.Thumb),
            order: Number(a.order ?? a.Order ?? 1000),
            createdAt: a.createdAt ?? a.CreatedAt ?? null,
          };
        });

        // const f = mapped.find((m) => m.featured) || mapped[0] || null;
        // const rest = mapped.filter((m) => m !== f).slice(0, 3);
        // 1) order ASC, 2) createdAt DESC
        const sorted = mapped.sort((x, y) => {
          const byOrder = x.order - y.order;
          if (byOrder !== 0) return byOrder;
          const dx = x.createdAt ? new Date(x.createdAt).getTime() : 0;
          const dy = y.createdAt ? new Date(y.createdAt).getTime() : 0;
          return dy - dx;
        });

        // Öne çıkan varsa onu sola; yoksa ilk öğe
        const f = sorted.find((m) => m.featured) || sorted[0] || null;
        const rest = sorted.filter((m) => m !== f).slice(0, 3);

        if (f) {
          setFeaturedPost({
            date: formatDate(f.date),
            author: f.author,
            category: f.category,
            title: f.title,
            excerpt: f.excerpt,
            cover: f.cover,
            href: `/blog/${f.slug || ""}`,
          });
        }
        setPosts(
          rest.map((p) => ({
            date: formatDate(p.date),
            title: p.title,
            excerpt: p.excerpt,
            thumb: p.thumb,
            href: `/blog/${p.slug || ""}`,
          }))
        );
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <section
        id="blog"
        className={styles.blog}
        ref={sectionRef}
        style={{ background: "#f7f9fc", color: "#111", padding: "40px 0" }} // debug
      >
        <div className={styles.container}>
          <div className={styles.headerRow}>
            <div className={styles.sectionHeading}>
              <h2>
                Devam Eden <em>Projelerimiz</em> ve Son{" "}
                <span>Güncellemeler</span>
              </h2>
            </div>
          </div>
          <p style={{ opacity: 0.7 }}>Yükleniyor…</p>
        </div>
      </section>
    );
  }

  // Boş-durum
  if (!featuredPost && posts.length === 0) {
    return (
      <section
        id="blog"
        className={styles.blog}
        ref={sectionRef}
        style={{ background: "#f7f9fc", color: "#111", padding: "40px 0" }} // debug
      >
        <div className={styles.container}>
          <div className={styles.headerRow}>
            <div className={styles.sectionHeading}>
              <h2>
                Devam Eden <em>Projelerimiz</em> ve Son{" "}
                <span>Güncellemeler</span>
              </h2>
            </div>
          </div>
          <p style={{ opacity: 0.8 }}>Henüz yayınlanmış içerik bulunamadı.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="blog"
      className={styles.blog}
      ref={sectionRef}
      style={{ background: "#f7f9fc", color: "#111", padding: "40px 0" }} // debug
    >
      <div className={styles.container}>
        {/* Üst başlık */}
        <div className={styles.headerRow}>
          <div
            className={`${styles.sectionHeading} ${styles.reveal}`}
            style={{ transitionDelay: "0.25s", opacity: 1, transform: "none" }} // debug
          >
            <h2>
              Devam Eden <em>Projelerimiz</em> ve Son <span>Güncellemeler</span>
            </h2>
          </div>

          <div
            className={`${styles.topDec} ${styles.reveal}`}
            style={{ transitionDelay: "0.25s", opacity: 1, transform: "none" }} // debug
          >
            <img src="/images/blog-dec.png" alt="" aria-hidden="true" />
          </div>
        </div>

        {/* İçerik: sol büyük kart + sağ liste */}
        <div className={styles.grid}>
          {/* Sol: Öne çıkan */}
          {featuredPost && (
            <article
              className={`${styles.leftCard} ${styles.reveal}`}
              style={{
                transitionDelay: "0.25s",
                opacity: 1,
                transform: "none",
                minHeight: 320,
              }} // debug
            >
              <div
                className={styles.leftImage}
                style={{ position: "relative" }}
              >
                <a href={featuredPost.href} aria-label={featuredPost.title}>
                  {featuredPost.cover ? (
                    <img
                      src={featuredPost.cover}
                      alt={featuredPost.title}
                      loading="lazy"
                      style={{
                        display: "block",
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  ) : null}
                </a>

                {/* Beyaz içerik kartı */}
                <div
                  className={styles.info}
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    zIndex: 5, // debug: üste al
                    background: "#fff", // debug: okunurluk
                    color: "#111",
                    width: "85%",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                    borderRadius: 16,
                    padding: 20,
                  }}
                >
                  <div className={styles.innerContent}>
                    <ul
                      className={styles.meta}
                      style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
                    >
                      <li>{featuredPost.date}</li>
                      {featuredPost.author && <li>{featuredPost.author}</li>}
                      {featuredPost.category && (
                        <li>{featuredPost.category}</li>
                      )}
                    </ul>

                    <a
                      href={featuredPost.href}
                      className={styles.titleLink}
                      style={{ textDecoration: "none" }}
                    >
                      <h4 style={{ margin: "6px 0 8px" }}>
                        {featuredPost.title}
                      </h4>
                    </a>

                    {featuredPost.excerpt && (
                      <p style={{ margin: 0 }}>{featuredPost.excerpt}</p>
                    )}

                    <a
                      href={featuredPost.href}
                      className={styles.primaryBtn}
                      style={{ marginTop: 12, display: "inline-block" }}
                    >
                      Discover More
                    </a>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Sağ: Liste */}
          <aside
            className={`${styles.rightList} ${styles.reveal}`}
            style={{ transitionDelay: "0.3s", opacity: 1, transform: "none" }} // debug
          >
            <ul
              className={styles.listUl}
              style={{ listStyle: "none", margin: 0, padding: 0 }}
            >
              {posts.map((p) => (
                <li
                  key={p.title}
                  className={styles.listItem}
                  style={{ gap: 16, alignItems: "center", minHeight: 100 }}
                >
                  <div className={styles.listLeft} style={{ flex: 1 }}>
                    <span className={styles.date} style={{ opacity: 0.8 }}>
                      {p.date}
                    </span>
                    <a
                      href={p.href}
                      className={styles.titleLink}
                      style={{ textDecoration: "none" }}
                    >
                      <h4 style={{ margin: "6px 0 8px" }}>{p.title}</h4>
                    </a>
                    <p style={{ margin: 0 }}>{p.excerpt}</p>
                  </div>
                  <div className={styles.listRight}>
                    <a
                      href={p.href}
                      aria-label={p.title}
                      className={styles.thumb}
                    >
                      {p.thumb ? (
                        <img
                          src={p.thumb}
                          alt={p.title}
                          loading="lazy"
                          style={{
                            display: "block",
                            width: 120,
                            height: "auto",
                            borderRadius: 12,
                          }}
                        />
                      ) : null}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
