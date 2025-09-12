// src/components/Footer/Footer.jsx
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.Footer}>
      <div className={styles.Container}>
        <p className={styles.Text}>
          © {year} Serhat Genç · KaryaSoft. Tüm hakları saklıdır.
          <br />
          Tasarım &amp; Geliştirme: Serhat Genç / KaryaSoft
          <a
            rel="nofollow"
            href="https://templatemo.com"
            target="_blank"
           
            className={styles.Link}
          >
        
          </a>
        </p>
      </div>
    </footer>
  );
}
