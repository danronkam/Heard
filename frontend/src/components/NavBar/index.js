import "./index.css"
import { useHistory, useLocation } from "react-router-dom";

const NavBar = () => {
    const history = useHistory();
    const location = useLocation();
    

    return (
        <>
            <div className="nav-bar">
                <div id="nav-back-arrow" className="fa-solid fa-angle-left" onClick={() => history.goBack()}></div>
                <div id="nav-home-icon" className="fa-solid fa-house" onClick={() => history.push("/home")}></div>
                { location.pathname === "/account" ? 
                 <div id="nav-profile-icon" className="fa-solid fa-gear" onClick={() => history.push("/settings")}></div>  :
                <div id="nav-profile-icon" className="fa-solid fa-user" onClick={() => history.push("/account")}></div> }
            </div>
        </>
    )
}

export default NavBar;