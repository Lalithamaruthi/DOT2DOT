import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../AuthContex/AuthContext";
import LOGO from "./Logo1.png";
import "./Navbar.css";
import img from "../../Images/ballon.png";

import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const navItems = [
  "Birthday",
  "Anniversary",
  "Kid's Decoration",
  "Flower Celebrations",
  "Festive Celebrations",
  "Decoration Combo",
];

const bottomNavItems = [
  "Decorations",
  "Best Offers",
  "Kids Birthday",
  "Anniversary",
  "Baby Shower",
  "Engagement",
  "Flower",
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(true);
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  const location = useLocation();
  const [path, setPaths] = useState("");

  useEffect(() => {
    const loc = location.pathname.split("/");
    var pathSegments = loc.pop();
    while (pathSegments === "" && loc.length > 0) {
      pathSegments = loc.pop();
    }
    setPaths(pathSegments);
  }, [location.pathname]);

  const { currentUser, logout } = useUserAuth();
  const navigate = useNavigate();

  const showButton = () => {
    setWindowInnerWidth(window.innerWidth);
  };

  const handleResize = () => {
    showButton();
    getContainerWidth();
  };

  useEffect(() => {
    showButton();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, []);

  const getContainerWidth = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 0, behavior: "smooth" });
      setContainerWidth(containerRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    getContainerWidth();
  }, [windowInnerWidth]);

  const scrollLeft = () => {
    if (containerRef.current) {
      const currentScrollLeft = containerRef.current.scrollLeft;
      let newScrollLeft;

      newScrollLeft = currentScrollLeft - containerWidth / 3;

      if (newScrollLeft < 0) {
        newScrollLeft = containerRef.current.scrollWidth - containerWidth;
      }

      containerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const currentScrollLeft = containerRef.current.scrollLeft;
      let newScrollLeft;

      newScrollLeft = currentScrollLeft + containerWidth / 3;

      if (newScrollLeft > containerRef.current.scrollWidth - containerWidth) {
        newScrollLeft = 0;
      }

      containerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  function SearchBar() {
    return (
      <div className="header-search-bar">
        <label>What are you celebrating ??</label>
        <SearchRoundedIcon />
      </div>
    );
  }

  return (
    <div className="navbar-body">
      <div className="navbar-top">
        <div className="navbar-header">
          <div className="header-logo" onClick={()=>navigate("/")}>
            <img src={LOGO} alt="LOGO" />
          </div>
          <div className="header-components">
            {currentUser ? (
              <div
                className="header-username"
                onClick={async () => {
                  alert("Logout");
                  await logout();
                }}
              >
                <PersonSharpIcon />
                <span>{currentUser?.displayName?.split(" ")[0]}</span>
              </div>
            ) : (
              <div
                className="header-username"
                onClick={() => navigate("/login")}
              >
                <PersonSharpIcon />
                <span>Login</span>
              </div>
            )}

            <div
              className="hamberger-button"
              onClick={() => setIsOpen(!isOpen)}
            >
              {!isOpen ? <CloseRoundedIcon /> : <MenuOpenRoundedIcon />}
            </div>
          </div>
        </div>
        <div className="bottom-searchbar-container">
          <SearchBar />
        </div>
        <nav className={`navbar ${isOpen ? "mbl-nav-collapse" : ""}`}>
          {navItems.map((item, index) => (
            <label key={index}>{item}</label>
          ))}
        </nav>
      </div>
      {path === "" && (
        <div className="navbar-bottom-slider-container">
          <div className="navbar-bottom-contents-changer" onClick={scrollLeft}>
            <ArrowBackIosRoundedIcon />
          </div>
          <div className="navbar-bottom-contents-container" ref={containerRef}>
            {bottomNavItems.map((label, index) => (
              <div key={index} className="navbar-bottom-contents-card">
                <img src={img} alt="" />
                <label>{label}</label>
              </div>
            ))}
          </div>
          <div className="navbar-bottom-contents-changer" onClick={scrollRight}>
            <ArrowForwardIosRoundedIcon />
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
