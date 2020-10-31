import React from "react";
import checkImg from "../../assets/images/check.png";
import vehicleImg from "../../assets/images/vehicle.png";
import priceTagImg from "../../assets/images/pricetag.png";

const Features = () => {
  const features = (
    <>
      <div className="feature feature-1">
        <div className="feature-content">
          <div className="feature-icon">
            <img src={checkImg} alt="تضمین اصالت کالا" />
          </div>
          <h3 className="feature-title">تضمین اصالت کالا</h3>
          <p className="feature-desc">
            لورم ایپسوم متن ساختگی با تولید سادگی مفهوم از صنعت چاپ و با استفاده
          </p>
        </div>
      </div>
      <div className="feature feature-2">
        <div className="feature-content">
          <div className="feature-icon">
            <img src={vehicleImg} alt="ارسال رایگان" />
          </div>
          <h3 className="feature-title">ارسال رایگان</h3>
          <p className="feature-desc">
            لورم ایپسوم متن ساختگی با تولید سادگی مفهوم از صنعت چاپ و با استفاده
          </p>
        </div>
      </div>
      <div className="feature feature-3">
        <div className="feature-content">
          <div className="feature-icon">
            <img src={priceTagImg} alt="تضمین بهترین قیمتا" />
          </div>
          <h3 className="feature-title">تضمین بهترین قیمت</h3>
          <p className="feature-desc">
            لورم ایپسوم متن ساختگی با تولید سادگی مفهوم از صنعت چاپ و با استفاده
          </p>
        </div>
      </div>
    </>
  );

  return <div className="features-section">{features}</div>;
};

export default Features;
