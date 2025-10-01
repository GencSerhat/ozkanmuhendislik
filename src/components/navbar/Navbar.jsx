import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
function Navbar() {
  const [open, setOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menu = [
    { href: "#top", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#about", label: "About Us" },

    { href: "#portfolio", label: "Portfolio" },
    { href: "#blog", label: "Blog" },
    { href: "#contact", label: "Message Us" },
  ];

  return (
    <>
      <header
        className={`${styles.headerArea} ${sticky ? styles.headerSticky : ""}`}
        role="banner"
      >
        <a href="#content" className={styles.skipLink}>
          İçeriğe Atla
        </a>

        <div className={styles.container}>
          <nav className={styles.mainNav} aria-label="Primary">
            {/* Logo Start  */}
            <a
              href="#top"
              className={styles.logo}
              aria-label="Özkan Mühendislik ana sayfa"
            >
              <span className={styles.brand}>
                ÖZKAN<span>MÜHENDİSLİK</span>
              </span>
            </a>
            {/* Logo End */}
            {/* MOBİL MENU BUTONU  */}

            <button
              type="button"
              className={styles.menuTrigger}
              aria-controls="primary-menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className={styles.srOnly}>Menüyü aç/kapat</span>
              <span>Menu</span>
            </button>

            {/* Menu Start */}

            <ul
              id="primary-menu"
              className={`${styles.nav} ${open ? styles.open : ""}`}
            >
              {menu.map((item) => (
                <li key={item.href} className={styles.scrollToSection}>
                  <a href={item.href} onClick={() => setOpen(false)}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li className={styles.scrollToSection}>
                <a
                  href="#contact"
                  className={styles.mainRedButton}
                  onClick={() => setOpen(false)}
                >
                  Contact Now
                </a>
              </li>
            </ul>

            {/* Menu End */}
          </nav>
        </div>
      </header>
      {/*Hheader Area End */}
    </>
  );
}

export default Navbar;
