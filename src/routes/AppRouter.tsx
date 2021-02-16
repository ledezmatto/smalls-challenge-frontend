import React from "react";
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";

import PostScreen from "../pages/posts";
import FavPostScreen from "../pages/favs";
import Header from '../components/molecules/Header';
import Footer from '../components/molecules/Footer';
import '../styles/styles.css'

export const AppRouter = () => {

	let rutas = <Redirect to="/" />;
    rutas = (
        <Switch>
            <Route path="/" exact component={PostScreen} />
            <Route path="/my-favs" exact component={FavPostScreen} />
            <Redirect to="/" />
        </Switch>
    );
    
    return (
        <Router>				
	        <div className="body">
                <Header/>
                <div style={{ margin: "20px" }}>
                	{rutas}
                </div>
                <Footer/>
	        </div>
        </Router>
    );
};
