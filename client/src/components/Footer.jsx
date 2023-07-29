
import React from "react";

const Footer = () => {
  return (
    <footer className=" py-6 bg-gray-50">
      <div className="container mx-auto flex flex-wrap justify-center">
        <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-6">
          <h4 className="text-lg font-bold mb-3">About Us</h4>
          <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vestibulum eros ac mauris tempus, ac semper eros tincidunt.</p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-6">
          <h4 className="text-lg font-bold mb-3">Links</h4>
          <ul className="text-sm">
            <li className="mb-2"><a href="#">Home</a></li>
            <li className="mb-2"><a href="#">Products</a></li>
            <li className="mb-2"><a href="#">Services</a></li>
            <li className="mb-2"><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-6">
          <h4 className="text-lg font-bold mb-3">Social Media</h4>
          <ul className="text-sm">
            <li className="mb-2"><a href="#">Facebook</a></li>
            <li className="mb-2"><a href="#">Twitter</a></li>
            <li className="mb-2"><a href="#">Instagram</a></li>
            <li className="mb-2"><a href="#">LinkedIn</a></li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-6">
          <h4 className="text-lg font-bold mb-3">Contact Us</h4>
          <p className="text-sm">123 Main Street, City, Country</p>
          <p className="text-sm">info@example.com</p>
          <p className="text-sm">Phone: 123-456-7890</p>
        </div>
      </div>
      <div className="container mx-auto mt-6 text-center">
        <p className="text-sm">© {new Date().getFullYear()} Aanglo. All rights reserved.</p>
      </div>
    </footer>
  );
};


export default Footer