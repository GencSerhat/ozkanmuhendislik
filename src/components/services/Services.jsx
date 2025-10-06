
// src/sections/Services.jsx
import React, { useEffect, useState } from "react";
import styles from "./Services.module.css";

const RAW_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";
const STRAPI_URL = RAW_URL.replace(/\/+$/, "");
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN;

/* URL birleştirici */
function getMediaUrl(url) {
  if (!url) return "";
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}
/* İlk dolu URL adayını seç */
function pickUrl(...cands) {
  for (const c of cands) if (typeof c === "string" && c) return c;
  return "";
}

export default function Services() {
  const [leftImage, setLeftImage] = useState("/images/about-left-image.png");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const url = `${STRAPI_URL}/api/serviceses?populate=*`;
        const headers = STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : undefined;

        const res = await fetch(url, { headers });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        // Koleksiyon bekliyoruz: data: [ ... ]
        const list = Array.isArray(json?.data) ? json.data : [];
        const mapped = list.map((row, idx) => {
          const a = row.attributes ?? row ?? {};

          const icon = pickUrl(
            a.icon?.data?.attributes?.url, a.Icon?.data?.attributes?.url,
            a.icon?.url,                     a.Icon?.url,
            a.image?.data?.attributes?.url,  a.Image?.data?.attributes?.url,
            a.image?.url,                    a.Image?.url
          );
          const cover = pickUrl(
            a.cover?.data?.attributes?.url,  a.Cover?.data?.attributes?.url,
            a.cover?.url,                    a.Cover?.url,
            // cover yoksa icon/image ile doldur
            a.icon?.data?.attributes?.url,   a.Icon?.data?.attributes?.url,
            a.icon?.url,                     a.Icon?.url,
            a.image?.data?.attributes?.url,  a.Image?.data?.attributes?.url,
            a.image?.url,                    a.Image?.url
          );

          return {
            title: a.title ?? a.Title ?? "",
            text:  a.excerpt ?? a.Excerpt ?? a.summary ?? a.Summary ?? "",
            icon:  getMediaUrl(icon),
            cover: getMediaUrl(cover),
            order: Number(a.order ?? a.Order ?? 1000 + idx),
            createdAt: a.createdAt ?? a.CreatedAt ?? null,
          };
        });

        // Sıralama
        const sorted = mapped.sort((x, y) => {
          const byOrder = (x.order || 0) - (y.order || 0);
          if (byOrder !== 0) return byOrder;
          const dx = x.createdAt ? new Date(x.createdAt).getTime() : 0;
          const dy = y.createdAt ? new Date(y.createdAt).getTime() : 0;
          return dy - dx;
        });

        setItems(sorted);

        const firstVisual = sorted?.[0]?.cover || sorted?.[0]?.icon;
        if (firstVisual) setLeftImage(firstVisual);

        console.log("Services endpoint: /api/serviceses?populate=*");
        console.log("Services items:", sorted);
      } catch (e) {
        setErr(e.message || "Fetch error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <section id="services" className={styles.aboutUs}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.colLeft}><div className={styles.leftImage}>Yükleniyor…</div></div>
            <div className={styles.colRight}>Yükleniyor…</div>
          </div>
        </div>
      </section>
    );
  }

  if (err) {
    return (
      <section id="services" className={styles.aboutUs}>
        <div className={styles.container}>
          <p>Hata: {err}</p>
          <p style={{opacity:.8, fontSize:13}}>
            Public rolünde <b>Serviceses</b> için <b>find</b>/<b>findOne</b> açık mı? Kayıtlar <b>Published</b> mı?
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className={styles.aboutUs}>
      <div className={styles.container}>
        <div className={styles.row}>
          {/* Sol görsel */}
          <div className={styles.colLeft}>
            <div className={styles.leftImage}>
              <img src={leftImage} alt="Hizmetler görseli" loading="lazy" />
            </div>
          </div>

          {/* Sağ liste */}
          <div className={styles.colRight}>
            <div className={styles.services}>
              <div className={styles.grid}>
                {items.map((it, i) => (
                  <div key={`${it.title}-${i}`} className={styles.gridCol}>
                    <div className={styles.item}>
                      <div className={styles.icon}>
                        {it.icon ? (
                          <img src={it.icon} alt={it.title || "service"} loading="lazy" />
                        ) : it.cover ? (
                          <img src={it.cover} alt={it.title || "service"} loading="lazy" />
                        ) : null}
                      </div>
                      <div className={styles.rightText}>
                        <h4>{it.title}</h4>
                        <p>{it.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className={styles.gridCol}>
                    <div className={styles.item}>
                      <div className={styles.rightText}><p>Henüz hizmet eklenmemiş.</p></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* /Sağ sütun */}
        </div>
      </div>
    </section>
  );
}
