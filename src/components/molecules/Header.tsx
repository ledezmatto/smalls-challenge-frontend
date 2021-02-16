import React, {useState} from "react";
import { useHistory, useLocation } from "react-router";

import '../../styles/styles.css'
import 'bootstrap/dist/css/bootstrap.css';

import LogoSvg from "../../assets/images/logo.svg";
import MenuToggler from "../../assets/images/menu-toggler.svg";

const Header = () => {
	
	const [showMenu, setShowMenu] = useState('');

    const history = useHistory();
    const location = useLocation();

	const showHideMenu = () =>{
		showMenu === '' ? setShowMenu(' show') : setShowMenu('')
	}
    return (
	    <div className="header">
	        <div className="header-fixed">
	            <div className="container-fluid pl-120 pr-120">
	                <div className="row d-flex align-items-center">
	                    <div className="col-lg-3 col-md-4 col-6">
	                        <div className="logo">
	                            <a href="/"><img src={LogoSvg} alt="" className="img-fluid" /></a>
	                        </div>
	                    </div>

	                    <div className="col-lg-9 col-md-8 col-6 d-flex justify-content-end position-static">
	                        <div className="nav-menu-cover">
	                            <ul className={"nav nav-menu" + showMenu}>
	                            	{location.pathname !== '/my-favs' && (
	                                	<li><p style={{cursor:'pointer'}} onClick={()=> history.push('/my-favs')}>My Favourites</p></li>
	                            	)}
	                            	{location.pathname !== '/' && (
	                                	<li><p style={{cursor:'pointer'}} onClick={()=> history.push('/')}>Home</p></li>
	                            	)}
	                            </ul>
	                        </div>

	                        <div className="mobile-menu-cover">
	                            <ul className="nav mobile-nav-menu">
	                                <li className="nav-menu-toggle">
	                                    <img src={MenuToggler} onClick={()=> showHideMenu()} alt="" className="img-fluid svg" />
	                                </li>
	                            </ul>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
    );
};

export default Header;
