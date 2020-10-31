import React from "react";
import Navbar from "./Navbar";
import MainSearch from "./MainSearch";
import Features from "./Features";
import "../../StyleSheets/header.css";

const Header = ({ display, spaces }) => {
  return (
    <>
      <div className="blank-space-60"></div>
      {display.navbar ? (
        <>
          <Navbar />
          {[...Array(spaces.navbar)].map((space, i) => (
            <div key={i} className="blank-space-120"></div>
          ))}
        </>
      ) : null}
      {display.mainSearch ? (
        <>
          <MainSearch />
          {[...Array(spaces.mainSearch)].map((space, i) => (
            <div key={i} className="blank-space-120"></div>
          ))}
        </>
      ) : null}
      {display.features ? (
        <>
          <Features />
          {[...Array(spaces.features)].map((space, i) => (
            <div key={i} className="blank-space-120"></div>
          ))}
        </>
      ) : null}
    </>
  );
};

export default Header;
