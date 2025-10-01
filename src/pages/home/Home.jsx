import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/hero/Hero";
import Services from "../../components/services/Services.jsx";
import AboutUs from "../../components/aboutUs/AboutUs.jsx";
import Portfolio from "../../components/portfolio/Portfolio";
import Blog from "../../components/blog/Blog.jsx";
import Contact from "../../components/contact/Contact.jsx";
import Footer from "../../components/footer/Footer.jsx";


function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <AboutUs />
      
      <Portfolio />
      <Blog />
      <Contact />
      <Footer/>
    </>
  );
}

export default Home;
