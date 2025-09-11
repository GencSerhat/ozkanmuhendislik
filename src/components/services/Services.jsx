// src/sections/Services/Services.jsx
import React from "react";
import styles from "./Services.module.css";

export default function Services() {
  const leftImage = "/images/services-left-image.png"; // public/ içine koy

  // İstatistik kartları (öne çıkan değerler)
  const stats = [
    { value: "48s", label: "İçinde Teklif", caption: "Ücretsiz keşif sonrası" },
    { value: "2yıl", label: "Montaj Garantisi", caption: "Yazılı güvence" },
    { value: "%30+", label: "Enerji Tasarrufu", caption: "Hibrit çözümlerle" },
    { value: "%98", label: "Memnuniyet", caption: "Müşteri geri bildirimi" },
  ];

  // Hizmet maddeleri (checklist)
  const checklist = [
    "Doğal gaz dönüşümü: proje, onay ve güvenlik standartları",
    "Isı pompası: kapasite hesabı, kurulum ve optimizasyon",
    "Güneş enerjisi entegrasyonu: PV/termal çözümler",
    "Tesisat, devreye alma ve periyodik bakım planı",
  ];

  return (
    <section id="services" className={styles.ourServices}>
      <div className={styles.container}>
        <div className={styles.row}>
          {/* Sol görsel */}
          <div
            className={styles.colLeft}
            data-animate="fade-left"
            data-duration="1s"
            data-delay="0.2s"
          >
            <div className={styles.leftImage}>
              <img
                src={leftImage}
                alt="Mühendislik hizmetlerimiz için keşif ve analiz"
                loading="lazy"
              />
            </div>
          </div>

          {/* Sağ içerik */}
          <div
            className={styles.colRight}
            data-animate="fade-right"
            data-duration="1s"
            data-delay="0.2s"
          >
            <div className={styles.sectionHeading}>
              <h2>
                Enerji Verimli <em>Mühendislik</em> Hizmetleri &nbsp;
                <span>Proje</span> Yönetimi
              </h2>
              <p>
                Doğal gaz dönüşümü, ısı pompası ve güneş enerjisi entegrasyonlarında
                keşiften devreye almaya kadar uçtan uca çözüm sunuyoruz. Resmi süreçler,
                güvenlik standartları ve performans optimizasyonu tek elden yönetilir.
              </p>
            </div>

            {/* İstatistik kartları */}
            <div className={styles.statsGrid}>
              {stats.map((s) => (
                <div
                  key={s.label}
                  className={styles.statCard}
                  data-animate="fade"
                  data-duration="0.8s"
                >
                  <div className={styles.statValue}>{s.value}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                  <div className={styles.statCaption}>{s.caption}</div>
                </div>
              ))}
            </div>

            {/* Checklist */}
            <ul className={styles.checklist}>
              {checklist.map((item) => (
                <li className={styles.checklistItem} key={item}>
                  <span aria-hidden="true" className={styles.checkIcon}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* (Opsiyonel) CTA satırı */}
            {/* <div className={styles.ctaRow}>
              <a href="#contact" className={styles.ctaPrimary}>Keşif Talep Et</a>
              <a href="https://wa.me/905XXXXXXXXX" target="_blank" rel="noreferrer" className={styles.ctaGhost}>WhatsApp’tan Yaz</a>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
