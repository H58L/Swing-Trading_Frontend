import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0B1932] text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-5">
        {/* Programs Section */}
        <div>
          <h3 className="font-bold mb-4">Programs</h3>
          <ul>
            <li className="mb-2">Corporate</li>
            <li className="mb-2">One to One</li>
            <li>Consulting</li>
          </ul>
        </div>

        {/* Service Section */}
        <div>
          <h3 className="font-bold mb-4">Service</h3>
          <ul>
            <li className="mb-2">Training</li>
            <li className="mb-2">Coaching</li>
            <li>Consulting</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="font-bold mb-4">Contact</h3>
          <ul>
            <li className="mb-2">Home</li>
            <li className="mb-2">About</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="font-bold mb-4">Newsletter</h3>
          <form className="flex space-x-2 mb-4">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-grow p-2 rounded text-black"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
            >
              Subscribe
            </button>
          </form>

          {/* Social Media Icons */}
          <div className="flex space-x-3 mb-4">
            <a href="#">
              <img src="whatsapp-icon.png" alt="WhatsApp" className="w-6" />
            </a>
            <a href="#">
              <img src="youtube-icon.png" alt="YouTube" className="w-6" />
            </a>
            <a href="#">
              <img src="instagram-icon.png" alt="Instagram" className="w-6" />
            </a>
            <a href="#">
              <img src="facebook-icon.png" alt="Facebook" className="w-6" />
            </a>
            <a href="#">
              <img src="linkedin-icon.png" alt="LinkedIn" className="w-6" />
            </a>
            <a href="#">
              <img src="twitter-icon.png" alt="Twitter" className="w-6" />
            </a>
          </div>

          {/* Contact Info */}
          <p>Mobile: +917892474250</p>
          <p>
            Email:{" "}
            <a
              href="mailto:santhosh@crosscultureconnects.com"
              className="text-orange-500 hover:underline"
            >
              santhosh@crosscultureconnects.com
            </a>
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-600 pt-4 text-center">
        <p className="mb-4">
          © {new Date().getFullYear()} crosscultureconnects.com
        </p>
        <ul className="flex justify-center space-x-6">
          <li>
            <a href="#" className="hover:underline">
              Contact Us
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Terms & Conditions
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Cancellation & Refund Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Shipping & Delivery Policy
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
