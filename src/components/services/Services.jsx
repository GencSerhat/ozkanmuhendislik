// import React, { useEffect, useState } from "react";
// import styles from "./Services.module.css";

// // VITE_STRAPI_URL yoksa otomatik localhost:1337 kullan
// const RAW_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";
// // Sondaki slash'ı kaldır
// const STRAPI_URL = RAW_URL.replace(/\/+$/, "");
// const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN;

// function getMediaUrl(url) {
//   if (!url) return "";
//   return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
// }

// export default function Services() {
//   const [leftImage, setLeftImage] = useState("/images/about-left-image.png");
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");

//   useEffect(() => {
//     async function fetchServices() {
//       try {
//         // Şu an tarayıcıda çalışan endpoint ile birebir aynı
//         const url = `${STRAPI_URL}/api/services?populate=*`;
//         const headers = STRAPI_TOKEN
//           ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
//           : undefined;

//         const res = await fetch(url, { headers });
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const json = await res.json();

//         // Strapi v5: data.attributes olabilir veya data düz obje gelebilir
//         const node = json?.data;
//         const attrs = node?.attributes ?? node ?? {};
//         const list = Array.isArray(attrs?.items) ? attrs.items : [];

//         const mapped = list.map((it, idx) => {
//           const iconUrl = it?.icon?.data?.attributes?.url || "";
//           const imageUrl = it?.image?.data?.attributes?.url || "";
//           const altText =
//             it?.icon?.data?.attributes?.alternativeText ||
//             it?.image?.data?.attributes?.alternativeText ||
//             it?.title ||
//             "service";

//           return {
//             icon: getMediaUrl(iconUrl || imageUrl),
//             alt: altText,
//             title: it?.title || "",
//             text: it?.summary || "",
//             delay: 0.5 + idx * 0.2,
//           };
//         });

//         // Sol büyük görsel: ilk item'ın image'ı varsa onu kullan
//         const firstImg = list?.[0]?.image?.data?.attributes?.url || "";
//         if (firstImg) setLeftImage(getMediaUrl(firstImg));

//         setItems(mapped);
//       } catch (e) {
//         setErr(e.message || "Fetch error");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchServices();
//   }, []);

//   if (loading) {
//     return (
//       <section id="services" className={styles.aboutUs}>
//         <div className={styles.container}>
//           <div className={styles.row}>
//             <div className={styles.colLeft}>
//               <div className={styles.leftImage}>Yükleniyor…</div>
//             </div>
//             <div className={styles.colRight}>Yükleniyor…</div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (err) {
//     return (
//       <section id="services" className={styles.aboutUs}>
//         <div className={styles.container}>
//           <p>Hata: {err}</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section id="services" className={styles.aboutUs}>
//       <div className={styles.container}>
//         <div className={styles.row}>
//           {/* Sol görsel sütunu */}
//           <div className={styles.colLeft}>
//             <div
//               className={styles.leftImage}
//               data-animate="fade"
//               data-duration="1s"
//               data-delay="0.2s"
//             >
//               <img src={leftImage} alt="Hizmetler görseli" loading="lazy" />
//             </div>
//           </div>

//           {/* Sağ hizmet/özellik sütunu */}
//           <div className={styles.colRight}>
//             <div className={styles.services}>
//               <div className={styles.grid}>
//                 {items.map((it) => (
//                   <div key={it.title} className={styles.gridCol}>
//                     <div
//                       className={styles.item}
//                       data-animate="fade"
//                       data-duration="1s"
//                       data-delay={`${it.delay}s`}
//                     >
//                       <div className={styles.icon}>
//                         {it.icon ? (
//                           <img src={it.icon} alt={it.alt} loading="lazy" />
//                         ) : null}
//                       </div>
//                       <div className={styles.rightText}>
//                         <h4>{it.title}</h4>
//                         <p>{it.text}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 {items.length === 0 && (
//                   <div className={styles.gridCol}>
//                     <div className={styles.item}>
//                       <div className={styles.rightText}>
//                         <p>Henüz hizmet eklenmemiş.</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//           {/* /Sağ sütun */}
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useEffect, useState } from "react";
import styles from "./Services.module.css";

// VITE_STRAPI_URL yoksa otomatik localhost:1337 kullan
const RAW_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";
const STRAPI_URL = RAW_URL.replace(/\/+$/, "");
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN;

function getMediaUrl(url) {
  if (!url) return "";
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

export default function Services() {
  const [leftImage, setLeftImage] = useState("/images/about-left-image.png");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function fetchServices() {
      try {
        // Medyayı (icon,image) kesin çek
       const url = `${STRAPI_URL}/api/services?populate[items][populate]=*`;
        const headers = STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : undefined;

        const res = await fetch(url, { headers });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        // v5: data.attributes olabilir veya data düz obje gelebilir
        const node = json?.data;
        const attrs = node?.attributes ?? node ?? {};
        const list = Array.isArray(attrs?.items) ? attrs.items : [];

        const mapped = list.map((it, idx) => {
          const iconUrl =
            it?.icon?.data?.attributes?.url || it?.icon?.url || "";
          const imageUrl =
            it?.image?.data?.attributes?.url || it?.image?.url || "";
          const altText =
            it?.icon?.data?.attributes?.alternativeText ||
            it?.image?.data?.attributes?.alternativeText ||
            it?.title ||
            "service";

          return {
            icon: getMediaUrl(iconUrl || imageUrl),
            alt: altText,
            title: it?.title || "",
            text: it?.summary || "",
            delay: 0.5 + idx * 0.2,
          };
        });

        // Sol görsel: ilk item'ın image'ını kullan (varsa)
        const firstImg =
          list?.[0]?.image?.data?.attributes?.url ||
          list?.[0]?.image?.url ||
          "";
        if (firstImg) setLeftImage(getMediaUrl(firstImg));

        setItems(mapped);
      } catch (e) {
        setErr(e.message || "Fetch error");
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  if (loading) {
    return (
      <section id="services" className={styles.aboutUs}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.colLeft}>
              <div className={styles.leftImage}>Yükleniyor…</div>
            </div>
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
        </div>
      </section>
    );
  }

  return (
    <section id="services" className={styles.aboutUs}>
      <div className={styles.container}>
        <div className={styles.row}>
          {/* Sol görsel sütunu */}
          <div className={styles.colLeft}>
            <div
              className={styles.leftImage}
              data-animate="fade"
              data-duration="1s"
              data-delay="0.2s"
            >
              <img src={leftImage} alt="Hizmetler görseli" loading="lazy" />
            </div>
          </div>

          {/* Sağ hizmet/özellik sütunu */}
          <div className={styles.colRight}>
            <div className={styles.services}>
              <div className={styles.grid}>
                {items.map((it) => (
                  <div key={it.title} className={styles.gridCol}>
                    <div
                      className={styles.item}
                      data-animate="fade"
                      data-duration="1s"
                      data-delay={`${it.delay}s`}
                    >
                      <div className={styles.icon}>
                        {it.icon ? <img src={it.icon} alt={it.alt} loading="lazy" /> : null}
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
                      <div className={styles.rightText}>
                        <p>Henüz hizmet eklenmemiş.</p>
                      </div>
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
