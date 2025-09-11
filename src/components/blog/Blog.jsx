import { useEffect, useRef } from "react";
import styles from "./Blog.module.css";

/** Demo verileri — istersen props ile dışarıdan besleyebilirsin */
const featuredPost = {
  date: "24 Mar 2021",
  author: "TemplateMo",
  category: "Branding",
  title: "Bodrum–Milas Doğal Gaz Dönüşümü Projesi",
  excerpt:
    "Apartman ve müstakil yapılarda doğal gaza güvenli geçiş: keşif, projelendirme, onay ve montaj süreçlerinde yönetmeliğe uygun uygulama; test ve devreye alma adımlarıyla eksiksiz teslim.",
  cover: "/images/big-blog-thumb.jpg",
  href: "#",
};

const posts = [
  {
    date: "18 Mar 2021",
    title: "Villa Tipi Isı Pompası Kurulumu – Bodrum",
    excerpt:
      "Yüksek verimli ısı pompası ile 4 mevsim ısıtma/soğutma; hidrolik denge tankı, yerden ısıtma entegrasyonu ve enerji tasarrufu odaklı kurulum.",
    thumb: "/images/blog-thumb-01.jpg",
    href: "#",
  },
  {
    date: "14 Mar 2021",
    title: "10 kWp Çatı GES – Milas",
    excerpt:
      "Monokristal paneller, invertör seçimi ve tek hat şemasıyla anahtar teslim güneş enerjisi kurulumu; keşiften üretim takibine.",
    thumb: "/images/blog-thumb-01.jpg",
    href: "#",
  },
  {
    date: "06 Mar 2021",
    title: "Mekanik Tesisat Optimizasyonu – Merkezi Isıtma",
    excerpt:
      "Pompa seçimleri, dengeleme vanaları ve kolektör düzeniyle verimi artıran uygulamalar; bakım ve test planı dahil.",
    thumb: "/images/blog-thumb-01.jpg",
    href: "#",
  },
];

export default function Blog() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const els = root.querySelectorAll(`.${styles.reveal}`);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.show);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="blog" className={styles.blog} ref={sectionRef}>
      <div className={styles.container}>
        {/* Üst başlık satırı */}
        <div className={styles.headerRow}>
          <div className={`${styles.sectionHeading} ${styles.reveal}`} style={{ transitionDelay: "0.25s" }}>
            <h2>
              Devam Eden <em>Projelerimiz</em> ve Son <span>Güncellemeler</span>
            </h2>
          </div>

          <div className={`${styles.topDec} ${styles.reveal}`} style={{ transitionDelay: "0.25s" }}>
            <img src="/images/blog-dec.png" alt="" aria-hidden="true" />
          </div>
        </div>

        {/* İçerik: sol büyük kart + sağ liste */}
        <div className={styles.grid}>
          {/* Sol: Öne çıkan */}
          <article className={`${styles.leftCard} ${styles.reveal}`} style={{ transitionDelay: "0.25s" }}>
            <div className={styles.leftImage}>
              <a href={featuredPost.href} aria-label={featuredPost.title}>
                <img src={featuredPost.cover} alt="Workspace Desktop" loading="lazy" />
              </a>

              {/* Beyaz içerik kartı: sol-alt köşe, üstte kalsın */}
              <div className={styles.info}>
                <div className={styles.innerContent}>
                  <ul className={styles.meta}>
                    <li>{featuredPost.date}</li>
                    <li>{featuredPost.author}</li>
                    <li>{featuredPost.category}</li>
                  </ul>

                  <a href={featuredPost.href} className={styles.titleLink}>
                    <h4>{featuredPost.title}</h4>
                  </a>

                  <p>{featuredPost.excerpt}</p>

                  <a href={featuredPost.href} className={styles.primaryBtn}>
                    Discover More
                  </a>
                </div>
              </div>
            </div>
          </article>

          {/* Sağ: Liste */}
          <aside className={`${styles.rightList} ${styles.reveal}`} style={{ transitionDelay: "0.3s" }}>
            <ul className={styles.listUl}>
              {posts.map((p) => (
                <li key={p.title} className={styles.listItem}>
                  <div className={styles.listLeft}>
                    <span className={styles.date}>{p.date}</span>
                    <a href={p.href} className={styles.titleLink}>
                      <h4>{p.title}</h4>
                    </a>
                    <p>{p.excerpt}</p>
                  </div>
                  <div className={styles.listRight}>
                    <a href={p.href} aria-label={p.title} className={styles.thumb}>
                      <img src={p.thumb} alt="" loading="lazy" />
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
