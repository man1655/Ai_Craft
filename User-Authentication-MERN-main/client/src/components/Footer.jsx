import React from 'react';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-bold mb-4 text-lg">CareerCraft AI</h3>
          <p className="text-gray-400">Empowering your career journey with AI-driven tools and insights.</p>
          <div className="flex space-x-4 mt-6">
            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-white">
              <Twitter className="w-6 h-6" />
            </a>  
            <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-white">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://github.com" aria-label="GitHub" className="hover:text-white">
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>123 AI Lane, Tech City</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-blue-600" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-blue-600" />
              <span>support@careercraft.ai</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#features" className="hover:text-white">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-white">How It Works</a></li>
            <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
            <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Subscribe</h4>
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded bg-gray-800 border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded font-semibold hover:shadow-lg transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="mt-12 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} CareerCraft AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
