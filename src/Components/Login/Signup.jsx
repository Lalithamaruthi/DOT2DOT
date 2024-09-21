import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Google_Logo from "./google.png";
import FB_Logo from "./Facebook_Logo_2023.png";
import AppleLogo from "./Apple-Logo.png";
import OtpInput from "react-otp-input";
import { useUserAuth } from "../../AuthContex/AuthContext";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase/Firebse";
import { updateProfile } from "firebase/auth";
import "./LoginSignup.css";
function Signup() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const LoginContainer = () => {
    const [showOTPFields, setShowOTPFields] = useState(false);
    const [phone, setPhone] = useState("");
    const [disableButton, setButtonDisable] = useState(false);
    const [otp, setOTP] = useState("");
    const [result, setResult] = useState(null);
    const { googleLogin, facebookLogin, setUpRecaptcha } = useUserAuth();

    const handleGoogleLogin = () => {
      try {
        googleLogin("user");
      } catch (error) {
        console.log("Error");
      }
    };

    const handleFacebookLogin = async () => {
      await facebookLogin("user");
    };

    const handleGetOTP = async (e) => {
      e.preventDefault();
      if (phone === "" || phone === null) {
        alert("Enter valid phone number");
        return;
      }
      try {
        setButtonDisable(true);
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("phoneNumber", "==", phone));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0) {
          const response = await setUpRecaptcha(phone);
          setResult(response);
          setShowOTPFields(true);
        } else {
          alert("User not exists. Please signup...");
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setButtonDisable(false);
      }
    };

    const handleVerify = async (e) => {
      e.preventDefault();
      if (otp === "" || otp === null) {
        alert("Enter otp");
        return;
      }
      try {
        setButtonDisable(true);
        await result.confirm(otp);
        // const response = await result.confirm(otp);
        // const user = response.user;
        // const userRef = doc(db, "users", user.uid);
        // await updateDoc(userRef, {
        //   lastActivityTime: serverTimestamp(),
        // });
        const previousRoute = sessionStorage.getItem("previousRoute");
        if (previousRoute) {
          sessionStorage.removeItem("previousRoute");
          navigate(previousRoute);
        } else {
          navigate("/");
        }
      } catch (err) {
        alert("Invalid OTP");
        console.log(err.message);
      } finally {
        setButtonDisable(false);
      }
    };

    return (
      <div className="signup-container">
        <div className="signup-top-section">
          <h1 id="signup-header-line">Login Here</h1>
          <label id="signup-header-quote">Happy to have you again..</label>
        </div>
        <div className="signup-input-fields">
          <PhoneInput
            className="react-phone-input"
            defaultCountry="IN"
            value={phone}
            onChange={setPhone}
            placeholder="Enter Phone Number"
          />
          {showOTPFields ? (
            <OtpInput
              value={otp}
              onChange={setOTP}
              numInputs={6}
              renderSeparator={<span>&nbsp;</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    border: "1px solid pink",
                    maxWidth: "20px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "auto",
                    fontSize: "18px",
                    margin: "0 2px",
                    textAlign: "center",
                  }}
                />
              )}
            />
          ) : (
            <div id="recaptcha-container" />
          )}
        </div>
        <div className="signup-buttons-section">
          {!showOTPFields ? (
            <button onClick={handleGetOTP}>Get OTP</button>
          ) : (
            <>
              <button disabled={disableButton} onClick={handleVerify}>
                Verify
              </button>
            </>
          )}
          <label onClick={() => setIsLogin(false)}>
            {"Don't have an account?"} <br />
            Click here to signup
          </label>
        </div>
        <div className="signup-other-options">
          <label>Or continue with</label>
          <div className="signup-options-logos">
            <img src={Google_Logo} onClick={handleGoogleLogin} alt="" />
            <img src={AppleLogo} alt="" />
            <img src={FB_Logo} onClick={handleFacebookLogin} alt="" />
          </div>
        </div>
        <button onClick={() => navigate("/")} className="signup-back-button">
          Back
        </button>
      </div>
    );
  };

  const SignupContainer = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [showOTPFields, setShowOTPFields] = useState(false);
    const [phone, setPhone] = useState("");
    const [disableButton, setButtonDisable] = useState(false);
    const [otp, setOTP] = useState("");
    const [result, setResult] = useState(null);
    const { googleLogin, facebookLogin, setUpRecaptcha } = useUserAuth();

    const handleGoogleLogin = () => {
      try {
        googleLogin("user");
      } catch (error) {
        console.log("Error");
      }
    };

    const handleFacebookLogin = async () => {
      await facebookLogin("user");
    };

    const handleGetOTP = async (e) => {
      e.preventDefault();
      if (firstName === "" || firstName === null) {
        alert("Enter first name");
        return;
      }
      if (lastName === "" || lastName === null) {
        alert("Enter last name");
        return;
      }
      if (phone === "" || phone === null) {
        alert("Enter valid phone number");
        return;
      }
      try {
        setButtonDisable(true);
        setButtonDisable(true);
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("phoneNumber", "==", phone));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length === 0) {
          const response = await setUpRecaptcha(phone);
          setResult(response);
          setShowOTPFields(true);
        } else {
          alert("User exists. Please login...");
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setButtonDisable(false);
      }
    };

    const handleVerify = async (e) => {
      e.preventDefault();
      if (otp === "" || otp === null) {
        alert("Enter otp");
        return;
      }
      try {
        setButtonDisable(true);
        const response = await result.confirm(otp);
        const user = response.user;
        const userRef = doc(db, "users", user.uid);
        updateProfile(user, {
          displayName: firstName + " " + lastName,
        })
          .then(async () => {
            await setDoc(userRef, {
              firstName: firstName,
              lastName: lastName,
              phoneNumber: phone,
              createdOn: serverTimestamp(),
              role: "user",
              // lastActivityTime: serverTimestamp(),
            });
          })
          .catch((error) => {
            console.log(error);
          });
        navigate("/");
      } catch (err) {
        alert("Invalid OTP");
        console.log(err.message);
      } finally {
        setButtonDisable(false);
      }
    };

    return (
      <div className="signup-container">
        <div className="signup-top-section">
          <h1 id="signup-header-line">Create Account</h1>
        </div>
        <div className="signup-input-fields">
          <input
            type="text"
            placeholder="First name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <PhoneInput
            className="react-phone-input"
            defaultCountry="IN"
            value={phone}
            onChange={setPhone}
            placeholder="Enter Phone Number"
          />
          {showOTPFields ? (
            <OtpInput
              value={otp}
              onChange={setOTP}
              numInputs={6}
              renderSeparator={<span>&nbsp;</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    border: "1px solid pink",
                    maxWidth: "20px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "auto",
                    fontSize: "18px",
                    margin: "0 2px",
                    textAlign: "center",
                  }}
                />
              )}
            />
          ) : (
            <div id="recaptcha-container" />
          )}
        </div>
        <div className="signup-buttons-section">
          {!showOTPFields ? (
            <button onClick={handleGetOTP}>Get OTP</button>
          ) : (
            <button disabled={disableButton} onClick={handleVerify}>
              Verify
            </button>
          )}
          <label onClick={() => setIsLogin(true)}>
            Already have an account? <br />
            Click here to login
          </label>
        </div>
        <div className="signup-other-options">
          <label>Or continue with</label>
          <div className="signup-options-logos">
            <img src={Google_Logo} onClick={handleGoogleLogin} alt="" />
            <img src={AppleLogo} alt="" />
            <img src={FB_Logo} onClick={handleFacebookLogin} alt="" />
          </div>
        </div>
        <button onClick={() => navigate("/")} className="signup-back-button">
          Back
        </button>
      </div>
    );
  };

  return (
    <div className="signup-wrapper">
      {isLogin ? <LoginContainer /> : <SignupContainer />}
    </div>
  );
}

export default Signup;
