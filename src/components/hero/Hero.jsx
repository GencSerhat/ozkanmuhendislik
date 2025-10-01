// import { useEffect, useState, useRef } from "react";
// import styles from "./Hero.module.css";

// //Görseli public klasöründen çekeceğiz.

// const DEFAULT_IMG = "/images/banner-right-image.png";

// //props ile başlık / metin görseli değiştirebiliriz

// function Hero({
//   kicker="DOĞAL GAZ DÖNÜŞÜMÜ • ISI POMPASI • TESİSAT",
//   titleBefore="Eviniz ve İşletmeniz için",
//   titleEm="Doğalgaz Dönüşümü",
//   titleAfter="&",
//   titleSpan="Isı Pompası",
//   titleTail=" Mühendisliği",
//   description="Makine mühendisliği ekibimizle keşif, projelendirme, ruhsat ve montajı uçtan uca yönetiyoruz. Doğalgaz (doğal gaz) dönüşümü, kombi/merkezi sistem dönüşümü, tesisat yenileme, baca projeleri ve güneş enerjisi entegrasyonunda hızlı, güvenli ve mevzuata uygun çözümler sunuyoruz.",
//   ctaText="Ücretsiz Keşif Talep Et",
//   ctaHref="#contact",
//   imageSrc = DEFAULT_IMG,
  
// }) {
//   const rootRef = useRef(null);
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const el = rootRef.current;
//     if (!el) return;

//     //ekrana gelince animasyın başlasın
//     const io = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((e) => {
//           if (e.isIntersecting) {
//             setVisible(true);
//             io.disconnect();
//           }
//         });
//       },
//       { threshold: 0.2 }
//     );
//     io.observe(el);
//     return () => io.disconnect();
//   }, []);
//   const handleCta = (e) => {
//     if (onCtaClick) {
//       e.preventDefault();
//       onCtaClick();
//     }
//   };
//   return (
//     <>
//       <section
//         ref={rootRef}
//         id="top"
//         className={`${styles.hero} ${visible ? styles.isVisible : ""}`}
//         aria-label="Hero section"
//       >
//         <div className={styles.container}>
//           <div className={styles.grid}>
//             {/* sol içerik */}
//             <div className={styles.left}>
//               <div className={styles.headerText}>
//                 <p className={styles.kicker}>{kicker}</p>
//                 <h1 className={styles.title}>
//                   {titleBefore}{<br/>}
//                   <em className={styles.em}>{titleEm}</em> {titleAfter}{" "}
//                   <span className={styles.span}>{titleSpan}</span>
//                   {titleTail}
//                 </h1>
//                 <p className={styles.desc}>
//                   {description}{" "}
//                   {/* <a
//                     href="https://templatemo.com/page/1"
//                     target="_blank"
//                     rel="noreferrer"
//                     className={styles.link}
//                   >
//                     TemplateMo
//                   </a> */}
                  
//                 </p>
//                 {/* CTA Butonu */}
//             <div>
//                 <a href={ctaHref} className={styles.mainButton} onClick={handleCta}>
//                   {ctaText}
//                 </a>
//               </div>
//               </div>
//             </div>

//             {/* Sağ Görsel */}

//             <div className={styles.right}>
//               <div className={styles.imageWrap}>
//                 {/* Public klasörü: /images/banner-right-image.png */}
//                 <img
//                   src={imageSrc}
//                   alt="team meeting"
//                   className={styles.image}
//                   loading="eager"
//                   width="560"
//                   height="520"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
// export default Hero;

// src/components/Hero/Hero.jsx
import { useEffect, useState, useRef } from "react";
import styles from "./Hero.module.css";

// Görseli public klasöründen çekeceğiz (fallback)
const DEFAULT_IMG = "/images/banner-right-image.png";

export default function Hero({
  kicker = "DOĞAL GAZ DÖNÜŞÜMÜ • ISI POMPASI • TESİSAT",
  titleBefore = "Eviniz ve İşletmeniz için",
  titleEm = "Doğalgaz Dönüşümü",
  titleAfter = "&",
  titleSpan = "Isı Pompası",
  titleTail = " Mühendisliği",
  description = "Makine mühendisliği ekibimizle keşif, projelendirme, ruhsat ve montajı uçtan uca yönetiyoruz. Doğalgaz (doğal gaz) dönüşümü, kombi/merkezi sistem dönüşümü, tesisat yenileme, baca projeleri ve güneş enerjisi entegrasyonunda hızlı, güvenli ve mevzuata uygun çözümler sunuyoruz.",
  ctaText = "Ücretsiz Keşif Talep Et",
  ctaHref = "#contact",
  imageSrc = DEFAULT_IMG,
  onCtaClick, // opsiyonel callback
}) {
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hero, setHero] = useState(null);

  const API_URL = import.meta.env.VITE_STRAPI_URL;
  const TOKEN = import.meta.env.VITE_STRAPI_TOKEN;

  // Strapi medya URL yardımcı fonksiyonu
  const mediaUrl = (m) => {
    if (!m) return null;
    // Strapi v5 REST single-type için genelde { url } döner.
    const url = m.url || m?.data?.attributes?.url;
    if (!url) return null;
    return url.startsWith("http") ? url : `${API_URL}${url}`;
  };

  useEffect(() => {
    // ekrana gelince animasyon
    const el = rootRef.current;
    if (el) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              setVisible(true);
              io.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );
      io.observe(el);
      return () => io.disconnect();
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/hero?populate=*`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });
        const json = await res.json();
        setHero(json.data ?? null);
      } catch (err) {
        console.error("HERO_FETCH_ERROR", err);
      }
    })();
  }, [API_URL, TOKEN]);

  // Strapi’den geldiyse props’ları override et
  const titleEmFinal = hero?.titleBefore ?? titleEm;
  const titleSpanFinal = hero?.titleAfter ?? titleSpan;
  const descFinal = hero?.subtitle ?? description;

  const primary = hero?.primaryCta || null;
  const ctaTextFinal = primary?.label ?? ctaText;
  const ctaHrefFinal = primary?.url ?? ctaHref;
  const ctaExternal = primary?.external ?? false;

  const imageSrcFinal = mediaUrl(hero?.bgImage) || imageSrc;

  const handleCta = (e) => {
    if (onCtaClick) {
      e.preventDefault();
      onCtaClick();
    }
  };

  return (
    <section
      ref={rootRef}
      id="top"
      className={`${styles.hero} ${visible ? styles.isVisible : ""}`}
      aria-label="Hero section"
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Sol içerik */}
          <div className={styles.left}>
            <div className={styles.headerText}>
              <p className={styles.kicker}>{kicker}</p>
              <h1 className={styles.title}>
                {titleBefore}
                <br />
                <em className={styles.em}>{titleEmFinal}</em> {titleAfter}{" "}
                <span className={styles.span}>{titleSpanFinal}</span>
                {titleTail}
              </h1>

              {descFinal && <p className={styles.desc}>{descFinal}</p>}

              {/* CTA Butonu */}
              <div>
                <a
                  href={ctaHrefFinal}
                  className={styles.mainButton}
                  onClick={handleCta}
                  {...(ctaExternal
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                >
                  {ctaTextFinal}
                </a>
              </div>
            </div>
          </div>

          {/* Sağ Görsel */}
          <div className={styles.right}>
            <div className={styles.imageWrap}>
              <img
                src={imageSrcFinal}
                alt="Özkan Mühendislik"
                className={styles.image}
                loading="eager"
                width="560"
                height="520"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
