
import { Link } from "react-router-dom";
import logoSrc from "../../assets/logo.svg";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-sage-100 border-t border-sage-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logoSrc} alt="Stitch It Forward Logo" className="h-8 w-8" />
              <span className="font-display text-lg font-bold text-forest-800">
                Stitch It <span className="text-terracotta-600">Forward</span>
              </span>
            </Link>
            <p className="text-sm text-forest-600 mb-4">
              Using AI to revolutionize sustainable fashion by offering creative upcycling solutions to reduce textile waste.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-forest-600 hover:text-terracotta-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-forest-600 hover:text-terracotta-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-forest-600 hover:text-terracotta-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-forest-600 hover:text-terracotta-600 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-display text-forest-800 font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-forest-600 hover:text-terracotta-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/upload" className="text-sm text-forest-600 hover:text-terracotta-600 transition-colors">
                  Upload Garment
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm text-forest-600 hover:text-terracotta-600 transition-colors">
                  Community Gallery
                </Link>
              </li>
              <li>
                <Link to="/tailors" className="text-sm text-forest-600 hover:text-terracotta-600 transition-colors">
                  Find Tailors
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="font-display text-forest-800 font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-forest-600 hover:text-terracotta-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-forest-600 hover:text-terracotta-600 transition-colors">
                  Sustainability Impact
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-forest-600 hover:text-terracotta-600 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-forest-600 hover:text-terracotta-600 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-display text-forest-800 font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-sm text-forest-600">
                Email: hello@stitchitforward.com
              </li>
              <li className="text-sm text-forest-600">
                Location: Global
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-sage-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-forest-600 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Stitch It Forward. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="#" className="text-xs text-forest-600 hover:text-terracotta-600 transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-xs text-forest-600 hover:text-terracotta-600 transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="text-xs text-forest-600 hover:text-terracotta-600 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
