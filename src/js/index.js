//import react into the bundle
import React from "react";
import ReactDOM from "react-dom/client";
import '@fortawesome/fontawesome-free/css/all.min.css'; // importé fontawesome luego de instalarlo

// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import Home from "./component/home.jsx";
import Timer from "./component/timer.js";

//render your react application
ReactDOM.createRoot(document.getElementById('app')).render(<Timer/>);

