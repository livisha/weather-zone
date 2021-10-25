import React from "react";
import "./home.css";
import Weather from "../WEATHER/weather";

// Home function component with HandleLogout function passed from App.js and displaying the weather details.
// Navbar using the bootstrap styling features and handleLogout function passed from 
// App.js component for sign-out using firebase inbuilt function.
const Home = ({handleLogout}) => {
    return (
        <div className="home-container">
            {/* nav bar using bootstrap */}
            <nav className="navbar navbar-expand-lg navbar-dark shadow-5-strong ">
                <div className="container-fluid">
                    <p className="navbar-brand">WeatherZone</p>
                    <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    >
                    <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        </li>
                    </ul>
                    </div>
                    <button className="btn btn-outline-success" type="submit" onClick={handleLogout}>Logout</button>
                </div>
            </nav>
        {/* Weather component called*/}
        <Weather />
    </div>
    );
}

// exported as Home
export default Home;


