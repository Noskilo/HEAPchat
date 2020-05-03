import React, { useCallback } from "react";
import styles from "./Login.module.css";
import { withRouter } from "react-router-dom";
import { auth } from "../../../../firebase";

function Login({ setShowRegister, history }) {
  const login = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await auth.signInWithEmailAndPassword(email.value, password.value);
        history.push("/chat");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div className={styles.loginContainer}>
      <h1>
        <span className="heap-font" style={{ fontSize: "3rem" }}>
          HEAP
        </span>
        chat!
      </h1>
      <h2>
        Just one{" "}
        <strong className="heap-font" style={{ fontSize: "1.2rem" }}>
          BIG
        </strong>{" "}
        chat room.
      </h2>
      <form onSubmit={login} className={styles.loginForm}>
        <label>
          Email
          <input spellCheck={false} type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>

        <button className={styles.loginButton} type="submit">
          Login
        </button>
        <div
          className="heap-font"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.2rem",
          }}
        >
          OR
        </div>

        <button
          onClick={() => setShowRegister(true)}
          className={styles.registerButton}
          type="button"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default withRouter(Login);
