import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import "../../StyleSheets/activate.css";
import { activate, resend } from "./userApi";
import ShowNotif from "../Common/ShowNotif";
import { fixDigit, authenticate, isAuth } from "../../helperFunctions";
import { connect } from "react-redux";
import { setUserData } from "../../Store/actions/userActions";
import { Redirect } from "react-router-dom";

const Activate = ({ match, setUserData, user }) => {
  const [hash, setHash] = useState("");
  const [userId, setuserId] = useState("");
  const [textChange, setTextChange] = useState("فعال سازی اکانت");
  const [message, setMessage] = useState("");
  // const [countDown, setCountDown] = useState();
  const [timeLeft, setTimeLeft] = useState("۱:۰۰");
  const [disabled, setDisabled] = useState(true);
  const [btnDisplay, setBtnDisplay] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const startTimer = (seconds, countDown) => {
    clearInterval(countDown);
    const now = Date.now();
    let then = now + 1000 * seconds;
    displayTimeLeft(seconds);
    countDown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      if (secondsLeft < 0) {
        clearInterval(countDown);
        setDisabled(false);
        setBtnDisplay(true);
        return;
      }
      displayTimeLeft(secondsLeft);
    }, 1000);
  };

  useEffect(() => {
    const hash = match.params.hash;
    const userId = match.params.userId;
    if (hash && userId) {
      setHash(hash);
      setuserId(userId);
    }
    let countDown;
    startTimer(60, countDown);
  }, [match.params]);

  const displayTimeLeft = (secondsLeft) => {
    let minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    const display = `${seconds < 10 ? "۰" : ""}${fixDigit(seconds)}: ${fixDigit(
      minutes
    )}`;
    setTimeLeft(display);
  };

  const submitForm = (e) => {
    e.preventDefault();
    setTextChange("در حال فعال سازی");
    setRedirect(false);
    activate({ hash, userId })
      .then((data) => {
        console.log(data);
        if (data) {
          if (data.error) {
            setMessage(data.error);
            setTextChange("فعال سازی اکانت");
          } else {
            authenticate(data.token, () => {
              setUserData(data.user);
              setRedirect(true);
            });
          }
        }
      })
      .catch((err) => {
        setMessage("مشکلی پیش آمد. لطفا دوباره تلاش کنید.");
      });
  };

  const reSendEmail = (e) => {
    e.preventDefault();
    resend({ hash, userId }).then((data) => {
      if (data) {
        if (data.error) {
          setMessage(data.error);
        } else {
          setMessage(data.message);
        }
      }
    });
  };

  const redirectUser = (redirect) => {
    if (user && user.userInfo.role === 0) {
      return <Redirect to="/user/dashboard" />;
    } else {
      return <Redirect to="/admin/dashboard" />;
    }
  };

  const activationForm = (
    <form>
      <div className="activation-section">
        <div className="resend-email">
          <button onClick={reSendEmail} disabled={disabled ? "disabled" : ""}>
            <span>ارسال دوباره؟</span>
            <span
              className="remaining-time"
              style={{ display: btnDisplay ? "none" : "" }}
            >
              {timeLeft}
            </span>
          </button>
        </div>
        <button onClick={submitForm} className="shop-button activation-button">
          <i className="fas fa-user-plus"></i>
          <span>{textChange}</span>
        </button>
      </div>
    </form>
  );
  return (
    <>
      {isAuth()
        ? user.userInfo &&
          (user.userInfo.role === 0 ? (
            <Redirect to="/user/dashboard" />
          ) : (
            <Redirect to="/admin/dashboard" />
          ))
        : null}
      {redirect && redirectUser()}
      {message ? <ShowNotif message={message} /> : null}
      {hash && userId && (
        <>
          <Header
            display={{ navbar: false, mainSearch: false, features: false }}
            spaces={{ navbar: 1 }}
          />
          <section id="activation" className="activation">
            <div className="activation-content">{activationForm}</div>
          </section>
          <Footer display={{ rights: true, info: true }} />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { setUserData })(Activate);
