import React, { useState } from "react";
import styles from "./Welcome.module.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { auth } from "../../firebase";

function Welcome() {
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(true);

  auth.getRedirectResult().then(() => {
    setLoading(false);
  });

  if (loading) {
    return (
      <div className={styles.center}>
        <div className={styles.loadingioSpinnerGear}>
          <div className={styles.ldio}>
            <div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainGrid}>
        <div className={styles.welcomeImage}>
          <img style={{ maxWidth: "100%" }} src="/assets/sign-in.png" alt="" />
        </div>
        {showRegister ? (
          <Register setShowRegister={setShowRegister} />
        ) : (
          <Login setShowRegister={setShowRegister} />
        )}
      </div>
    </div>
  );
}

export default Welcome;
