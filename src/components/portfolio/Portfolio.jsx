import { useEffect, useRef } from "react";
import styles from "./Portfolio.module.css";

// İstersen bu veriyi props ile dışarıdan alabilirsin.
const items = [
  {
    title: "Doğal Gaz Dönüşümü",
    desc: "Mevcut sistemlerin doğal gaza güvenli ve yönetmeliklere uygun dönüşümü.",
    img: "/images/portfolio-image.png",
    href: "#",
  },
  {
    title: "Isı Pompası Kurulumları",
    desc: "Yüksek verimli ısı pompalarıyla 4 mevsim ısıtma/soğutma çözümleri.",
    img: "/images/portfolio-image.png",
    href: "#",
  },
  {
    title: "Güneş Enerjisi Sistemleri",
    desc: "Çatı ve arazi tipi GES projelendirme, kurulum ve devreye alma.",
    img: "/images/portfolio-image.png",
    href: "#",
  },
  {
    title: "Mekanik Tesisat Projelendirme",
    desc: "Isıtma, soğutma, havalandırma ve sıhhi tesisat projeleri.",
    img: "/images/portfolio-image.png",
    href: "#",
  },
];

export default function Portfolio() {
  const sectionRef = useRef(null);

  // Hero'da kullandığımız IntersectionObserver yaklaşımının küçük bir versiyonu
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const nodes = el.querySelectorAll(`.${styles.reveal}`);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.show);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="portfolio"
      className={styles.portfolio}
      ref={sectionRef}
      aria-labelledby="portfolio-heading"
    >
      <div className={styles.container}>
        <header
          className={`${styles.sectionHeading} ${styles.reveal}`}
          style={{ transitionDelay: "0.2s" }}
        >
          <h2 id="portfolio-heading">
            Portföyümüzde <em>neler var</em> ve <span>neler sunuyoruz</span>
          </h2>
        </header>

        <div className={styles.grid}>
          {items.map((it, i) => (
            <a
              key={it.title}
              href={it.href}
              className={`${styles.card} ${styles.reveal}`}
              style={{ transitionDelay: `${0.3 + i * 0.1}s` }}
              aria-label={`${it.title} – detayları görüntüle`}
            >
              <div className={styles.imageWrap}>
                <img src={it.img} alt={it.title} loading="lazy" />
              </div>
              <div className={styles.overlay}>
                <h4>{it.title}</h4>
                <p>{it.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

