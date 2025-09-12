// src/components/Contact/Contact.jsx
import { useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ ok: false, error: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.surname || !form.email || !form.message) {
      setStatus({ ok: false, error: "Lütfen tüm alanları doldurun." });
      return;
    }
    setStatus({ ok: true, error: "" });
  };

  return (
    <section id="contact" className={`${styles.Contact} ${styles.Section}`}>
      <div className={styles.Container}>
        <div className={styles.Row}>
          {/* Sol kolon: başlık ve telefon */}
          <div className={styles.ColLeft}>
            <div className={styles.SectionHeading}>
              <h2>Isı Pompası, Doğalgaz Dönüşümü, Güneş Enerjisi ve Mekanik Tesisat İçin Keşif &amp; Teklif Alın</h2>
              <p>
                Muğla Milas–Bodrum ve çevresinde; ısı pompası sistemleri, doğalgaz dönüşümü, yerden ısıtma, 
                merkezi ısıtma/soğutma (VRF/VRV), güneş enerjisi (PV/termal) ve mekanik tesisat projelendirme–uygulama
                hizmetleri veriyoruz. Mühendislik bakışıyla enerji verimliliğini artırıp işletme maliyetlerini düşüren
                çözümler sunuyoruz. Formu doldurun; uygun tarih için keşif randevunuzu oluşturalım ve net fiyat teklifinizi paylaşalım.
              </p>
              <div className={styles.PhoneInfo}>
                <h4>
                  Teknik destek ve randevu için arayın:{" "}
                  <span className={styles.Phone}>
                    <span aria-hidden="true">📞</span>{" "}
                    <a href="tel:+905444200309">+90 544 420 03 09</a>
                  </span>
                </h4>
              </div>
            </div>
          </div>

          {/* Sağ kolon: form */}
          <div className={styles.ColRight}>
            <form id="contact-form" onSubmit={handleSubmit} noValidate>
              <div className={styles.FormGrid}>
                <div className={styles.ColHalf}>
                  <fieldset className={styles.Fieldset}>
                    <label htmlFor="name" className="sr-only">
                      Ad
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Adınız"
                      autoComplete="on"
                      required
                      value={form.name}
                      onChange={handleChange}
                    />
                  </fieldset>
                </div>

                <div className={styles.ColHalf}>
                  <fieldset className={styles.Fieldset}>
                    <label htmlFor="surname" className="sr-only">
                      Soyad
                    </label>
                    <input
                      type="text"
                      name="surname"
                      id="surname"
                      placeholder="Soyadınız"
                      autoComplete="on"
                      required
                      value={form.surname}
                      onChange={handleChange}
                    />
                  </fieldset>
                </div>

                <div className={styles.ColFull}>
                  <fieldset className={styles.Fieldset}>
                    <label htmlFor="email" className="sr-only">
                      E-posta
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="E-posta adresiniz"
                      required
                      value={form.email}
                      onChange={handleChange}
                    />
                  </fieldset>
                </div>

                <div className={styles.ColFull}>
                  <fieldset className={styles.Fieldset}>
                    <label htmlFor="message" className="sr-only">
                      Mesaj
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      className={styles.Textarea}
                      placeholder="Kısaca ihtiyacınızı yazın (ör. ısı pompası kapasite hesabı, doğalgaz dönüşümü, yerden ısıtma, VRF/VRV, güneş enerjisi, tesisat projelendirme)"
                      required
                      value={form.message}
                      onChange={handleChange}
                    />
                  </fieldset>
                </div>

                <div className={styles.ColFull}>
                  <fieldset className={styles.Fieldset}>
                    <button
                      type="submit"
                      id="form-submit"
                      className={styles.MainButton}
                    >
                      Mesajı Gönder
                    </button>
                  </fieldset>
                </div>
              </div>

              {/* Dekor görsel (konumlandırmayı CSS ile yapacağız) */}
              <div className={styles.ContactDec} aria-hidden="true">
                <img
                  src="/images/contact-decoration.png"
                  alt=""
                  loading="lazy"
                />
              </div>

              {/* Basit durum mesajı */}
              {status.error && (
                <p className={styles.ErrorMsg}>{status.error}</p>
              )}
              {status.ok && (
                <p className={styles.SuccessMsg}>
                  Mesajınız alındı. En kısa sürede sizinle iletişime geçeceğiz.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
