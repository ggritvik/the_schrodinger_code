
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Upload, Image, Users, MapPin } from "lucide-react";
import { Button } from "./button";
import logoSrc from "../../assets/logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoSrc} alt="Stitch It Forward Logo" className="h-10 w-10" />
            <span className="font-display text-xl font-bold text-forest-800">
              Stitch It <span className="text-terracotta-600">Forward</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-forest-700 hover:text-forest-900 font-medium">
              Home
            </Link>
            <Link to="/upload" className="text-forest-700 hover:text-forest-900 font-medium">
              Upload
            </Link>
            <Link to="/gallery" className="text-forest-700 hover:text-forest-900 font-medium">
              Gallery
            </Link>
            <Link to="/tailors" className="text-forest-700 hover:text-forest-900 font-medium">
              Tailors
            </Link>
            <Link to="/about" className="text-forest-700 hover:text-forest-900 font-medium">
              About
            </Link>
            <Button asChild variant="default" className="bg-terracotta-600 hover:bg-terracotta-700 text-white">
              <Link to="/upload">Get Started</Link>
            </Button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <button 
            className="md:hidden text-forest-700 hover:text-forest-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm shadow-sm">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-sage-100"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/upload" 
              className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-sage-100"
              onClick={() => setIsOpen(false)}
            >
              <Upload size={18} />
              Upload
            </Link>
            <Link 
              to="/gallery" 
              className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-sage-100"
              onClick={() => setIsOpen(false)}
            >
              <Image size={18} />
              Gallery
            </Link>
            <Link 
              to="/tailors" 
              className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-sage-100"
              onClick={() => setIsOpen(false)}
            >
              <MapPin size={18} />
              Tailors
            </Link>
            <Link 
              to="/about" 
              className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-sage-100"
              onClick={() => setIsOpen(false)}
            >
              <Users size={18} />
              About
            </Link>
            <Button 
              asChild 
              variant="default" 
              className="bg-terracotta-600 hover:bg-terracotta-700 text-white mt-2"
            >
              <Link to="/upload" onClick={() => setIsOpen(false)}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
