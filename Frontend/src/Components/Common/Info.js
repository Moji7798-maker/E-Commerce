import React from "react";
import samandehiImg from "../../assets/images/samandehi.png";
import enamadImg from "../../assets/images/enamad.png";

const Info = ({ contactRef }) => {
  return (
    <section
      ref={contactRef}
      className="contactus-footer"
      id="contactus-footer"
    >
      <div className="container">
        <div className="contact-us">
          <div className="contact-us-title">
            <div>
              <span className="contact-us-icon custom-black"></span>
            </div>
            <div>
              <h1>با ما تماس بگیرید</h1>
              <p>برای ثبت سفارش و مشاوره با مشاوران ما تماس بگیرید!</p>
            </div>
          </div>
          <div className="contact-us-info">
            <div className="contact-us-phone">
              <span>
                <i className="fas fa-phone"></i>
              </span>
              <span>۰۲۱۰۰۰۰۰۰۰</span>
            </div>
            <div className="contact-us-email">
              <span>
                <i className="fas fa-at"></i>
              </span>
              <span>info@domain.com</span>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="about-us">
            <h1>درباره ما</h1>
            <p>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است.
            </p>
            <p>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است.
            </p>
          </div>
          <div className="quick-access">
            <h1>دسترسی سریع</h1>
            <ul>
              <li>خانه</li>
              <li>فروشگاه</li>
              <li>تماس با ما</li>
              <li>درباره ما</li>
            </ul>
          </div>
          <div className="others">
            <h1>عضویت در خبرنامه</h1>
            <div className="join-newsletter">
              <input type="text" placeholder="ایمیل خود را وارد کنید" />
              <button className="shop-button">عضویت</button>
            </div>
            <div className="electronic-symbol">
              <h1>نماد الکترونیکی</h1>
              <div className="namaads">
                <img src={enamadImg} alt="enamad" />
                <img src={samandehiImg} alt="samandehi" />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Info;
