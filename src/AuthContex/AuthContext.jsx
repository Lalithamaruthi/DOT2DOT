import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  RecaptchaVerifier,
  onAuthStateChanged,
  signInWithPhoneNumber,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/Firebse";
import { useNavigate } from "react-router-dom";

//eslint-disable-next-line
export const userAuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setUpRecaptcha = async (number) => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          // size: "invisible",
          // callback: () => {
          //   console.log("recaptcha resolved..");
          // },
        }
      );
      return signInWithPhoneNumber(auth, number, recaptchaVerifier);
    } catch (error) {
      console.error(error);
    }
  };

  const googleLogin = async (role) => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider(auth);
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      const userRef = doc(db, "users", user.uid);
      const docSnapshot = await getDoc(userRef);
      if (!docSnapshot.exists()) {
        await setDoc(userRef, {
          firstName: user.displayName.split(" ")[0],
          lastName: user.displayName.split(" ")[1],
          phoneNumber: user.phoneNumber,
          createdOn: serverTimestamp(),
          role: role,
        });
      }
      navigate("/");
      return userCredential;
    } catch (error) {
      console.log("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  function logout() {
    return signOut(auth);
  }

  const facebookLogin = async (role) => {
    setLoading(true);
    try {
      const provider = new FacebookAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      console.log(role);
      navigate("/");
      return userCredential;
    } catch (error) {
      console.log("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
    // eslint-disable-next-line
  }, []);

  const value = {
    currentUser,
    setUpRecaptcha,
    logout,
    googleLogin,
    facebookLogin,
  };
  return (
    <userAuthContext.Provider value={value}>
      {!loading && children}
    </userAuthContext.Provider>
  );
}

//eslint-disable-next-line
export function useUserAuth() {
  return useContext(userAuthContext);
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
