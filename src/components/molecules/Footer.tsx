import React from "react";
import '../../styles/styles.css'
import 'bootstrap/dist/css/bootstrap.css';
import LogoSvg from "../../assets/images/logo.svg";

const Footer = () => {
	
    return (
	    <div className="footer-container d-flex align-items-center">
	        <div className="container">
	            <div className="row align-items-center footer">
	                <div className="offset-md-4 col-md-4 d-flex justify-content-center">
	                    <a href="#"><img src={LogoSvg} alt="" className="img-fluid"/></a>
	                </div>
	                <div className="col-md-4 order-md-3">
	                    <div className="text-center text-md-right">
	                        <p>© {new Date().getFullYear()} <a href="https://www.linkedin.com/in/ledezma/" target="_blank">Abel Ledezma Matto</a></p>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
    );
};

export default Footer;