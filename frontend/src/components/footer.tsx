import React from 'react';
import { Link } from 'react-router-dom';
import { MdMarkEmailUnread } from "react-icons/md";
import { FaPhoneVolume, FaFacebook, FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
    const phoneNumbers = [
        { number: "+254726725069" },
        { number: "+254717584848" }
      ];
    
      const email = "lelannbookshop@gmail.com";
    
    return (
        <>
            <footer className="footer bg-gray-700 mt-auto ">
                <div className="container">
                    <div className="flex justify-between mt-6 p-6 mx-auto">
                        <div className="col-md-4">
                            <h2 style={{ color: '#FFD399',  fontWeight: "bolder", fontSize: "16px"}} >Quick Links</h2>
                            <ul className='pt-2'>
                                <li><Link to="/faq">Frequently asked  questions</Link></li>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h3  style={{ color: '#FFD399', fontWeight: "bolder", fontSize: "16px"}} >Follow Us</h3>
                            <ul className='flex justify-center space-x-3 text-xl pt-2'>
                                <li><a href="https://www.facebook.com"><FaFacebook /></a></li>
                                <li><a href="https://www.twitter.com"><FaXTwitter /></a></li>
                                <li><a href="https://www.instagram.com"><FaInstagram /></a></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h3  style={{ color: '#FFD399',  fontWeight: "bolder", fontSize: "16px"}} >Contact Us</h3>
                            <ul className="pt-2">
                            {phoneNumbers.map((phone, index) => (
                            <li key={index} className="flex items-center space-x-2">
                                <FaPhoneVolume />
                                <a href={`tel:${phone.number}`} className="hover:underline">
                                {phone.number}
                                </a>
                            </li>
                            ))}
                            <li className="flex items-center space-x-2">
                            <MdMarkEmailUnread />
                            <a href={`mailto:${email}`} className="hover:underline">
                                {email}
                            </a>
                            </li>
                        </ul>
                        </div>
                    </div>

                    <div>
                        <p className="text-center pb-2"  style={{ color: '#FFD399'}} > &copy; 2024 Lelann Bookshop. All Rights Reserved</p>
                    </div>
                </div>
      
            </footer>
        </>
    );
};

export default Footer;