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
    // TODO: Buraya mail gönderme/endpoint entegrasyonu eklenecek
    // Şimdilik sadece basit bir durum simülasyonu:
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
              <h2>Feel Free To Send Us a Message About Your Website Needs</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                doer ket eismod tempor incididunt ut labore et dolores
              </p>
              <div className={styles.PhoneInfo}>
                <h4>
                  For any enquiry, Call Us:{" "}
                  <span className={styles.Phone}>
                    <span aria-hidden="true">📞</span>{" "}
                    <a href="tel:0100200340">010-020-0340</a>
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
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
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
                      Surname
                    </label>
                    <input
                      type="text"
                      name="surname"
                      id="surname"
                      placeholder="Surname"
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
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Your Email"
                      required
                      value={form.email}
                      onChange={handleChange}
                    />
                  </fieldset>
                </div>

                <div className={styles.ColFull}>
                  <fieldset className={styles.Fieldset}>
                    <label htmlFor="message" className="sr-only">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      className={styles.Textarea}
                      placeholder="Message"
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
                      Send Message
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
                  Mesajınız alındı. Teşekkürler!
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
