import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import Services from './components/services/Services';
import AboutUs from './components/aboutUs/AboutUs';
import Portfolio from './components/portfolio/Portfolio';
import Blog from './components/blog/Blog';
import Contact from './components/contact/Contact';
import './App.css';

function App() {


  return (
    <>
      <Navbar/>
      <Hero/>
     <AboutUs/>
     <Services/>
     <Portfolio/>
     <Blog/>
     <Contact/>
    </>
  )
}

export default App
