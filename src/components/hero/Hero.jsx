import { useEffect, useState, useRef } from "react";
import styles from "./Hero.module.css";

//Görseli public klasöründen çekeceğiz.

const DEFAULT_IMG = "/images/banner-right-image.png";

//props ile başlık / metin görseli değiştirebiliriz

function Hero({
  kicker="DOĞAL GAZ DÖNÜŞÜMÜ • ISI POMPASI • TESİSAT",
  titleBefore="Eviniz ve İşletmeniz için",
  titleEm="Doğalgaz Dönüşümü",
  titleAfter="&",
  titleSpan="Isı Pompası",
  titleTail=" Mühendisliği",
  description="Makine mühendisliği ekibimizle keşif, projelendirme, ruhsat ve montajı uçtan uca yönetiyoruz. Doğalgaz (doğal gaz) dönüşümü, kombi/merkezi sistem dönüşümü, tesisat yenileme, baca projeleri ve güneş enerjisi entegrasyonunda hızlı, güvenli ve mevzuata uygun çözümler sunuyoruz.",
  ctaText="Ücretsiz Keşif Talep Et",
  ctaHref="#contact",
  imageSrc = DEFAULT_IMG,
  
}) {
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    //ekrana gelince animasyın başlasın
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
  }, []);
  const handleCta = (e) => {
    if (onCtaClick) {
      e.preventDefault();
      onCtaClick();
    }
  };
  return (
    <>
      <section
        ref={rootRef}
        id="top"
        className={`${styles.hero} ${visible ? styles.isVisible : ""}`}
        aria-label="Hero section"
      >
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* sol içerik */}
            <div className={styles.left}>
              <div className={styles.headerText}>
                <p className={styles.kicker}>{kicker}</p>
                <h1 className={styles.title}>
                  {titleBefore}{<br/>}
                  <em className={styles.em}>{titleEm}</em> {titleAfter}{" "}
                  <span className={styles.span}>{titleSpan}</span>
                  {titleTail}
                </h1>
                <p className={styles.desc}>
                  {description}{" "}
                  {/* <a
                    href="https://templatemo.com/page/1"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.link}
                  >
                    TemplateMo
                  </a> */}
                  
                </p>
                {/* CTA Butonu */}
            <div>
                <a href={ctaHref} className={styles.mainButton} onClick={handleCta}>
                  {ctaText}
                </a>
              </div>
              </div>
            </div>

            {/* Sağ Görsel */}

            <div className={styles.right}>
              <div className={styles.imageWrap}>
                {/* Public klasörü: /images/banner-right-image.png */}
                <img
                  src={imageSrc}
                  alt="team meeting"
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
    </>
  );
}
export default Hero;
