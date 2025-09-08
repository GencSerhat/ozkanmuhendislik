// src/sections/About/About.jsx
import React from "react";
import styles from "./AboutUs.module.css";

function AboutUs () {

  // Görselleri /public/images/... altına koymanı öneriyorum.
  const leftImage = "/images/about-left-image.png";

  const items = [
    {
      icon: "/images/service-icon-01.png",
      alt: "Doğal gaz dönüşümü ikonu",
      title: "Doğal Gaz Dönüşümü",
      text:
        "Mevcut tesisatın doğalgaza uygun projelendirilmesi, cihaz seçimi, güvenlik ve resmi süreçlerin yönetimi.",
      delay: 0.5,
    },
    {
      icon: "/images/service-icon-02.png",
      alt: "Isı pompası ikonu",
      title: "Isı Pompası Sistemleri",
      text:
        "Doğru kapasite hesapları, verimli kurulum ve hibrit çözümlerle düşük işletme maliyeti.",
      delay: 0.7,
    },
    {
      icon: "/images/service-icon-03.png",
      alt: "Güneş enerjisi ikonu",
      title: "Güneş Enerjisi Entegrasyonu",
      text:
        "Isıtma-soğutma ve sıcak su ihtiyacına entegre PV/termal çözümlerle enerji tasarrufu.",
      delay: 0.9,
    },
    {
      icon: "/images/service-icon-04.png",
      alt: "Tesisat ve bakım ikonu",
      title: "Tesisat & Bakım",
      text:
        "Keşif, projelendirme, montaj, devreye alma ve periyodik bakım süreçleri tek elden.",
      delay: 1.1,
    },
  ];

  return (
    <section id="about" className={styles.aboutUs}>
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
              <img src={leftImage} alt="Doğal gaz dönüşüm kurulumu yapan ekip" loading="lazy" />
            </div>
          </div>

          {/* Sağ hizmet/özellik sütunu */}
          <div className={styles.colRight}>
            <div className={styles.services}>
              <div className={styles.grid}>
                {items.map((it, i) => (
                  <div key={it.title} className={styles.gridCol}>
                    <div
                      className={styles.item}
                      data-animate="fade"
                      data-duration="1s"
                      data-delay={`${it.delay}s`}
                    >
                      <div className={styles.icon}>
                        <img src={it.icon} alt={it.alt} loading="lazy" />
                      </div>
                      <div className={styles.rightText}>
                        <h4>{it.title}</h4>
                        <p>{it.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* /Sağ sütun */}
        </div>
      </div>
    </section>
  );
}

export default AboutUs;