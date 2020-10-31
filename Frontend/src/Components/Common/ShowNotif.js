import React, { useState, useEffect } from "react";

const ShowNotif = ({ message }) => {
  const [show, setShow] = useState("show");
  useEffect(() => {
    setTimeout(() => {
      setShow("");
    }, 7000);
  }, []);
  return (
    <section className={`notif ${show}`} id="notif">
      <span className="arrow"></span>
      <div className="notif-content">
        <span className="message">{message}</span>
      </div>
    </section>
  );
};

export default ShowNotif;
