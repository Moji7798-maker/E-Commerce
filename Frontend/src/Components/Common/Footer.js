import React from "react";
import Info from "./Info";
import Rights from "./Rights";
import "../../StyleSheets/contact-us.css";

const Footer = ({ display, space = false, contactRef }) => {
  return (
    <>
      {space && <div className="blank-space-60"></div>}

      {display.info ? (
        <>
          <Info contactRef={contactRef} />
        </>
      ) : null}
      {display.rights ? (
        <>
          <Rights />
        </>
      ) : null}
    </>
  );
};

export default Footer;
