import React, { useCallback } from "react";
import styles from "./Register.module.css";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../../../firebase";
import InfoCircle from "../../../../components/InfoCircle/InfoCircle";

function Register({ setShowRegister, history }) {
  const register = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password, displayName } = event.target.elements;

      if (email.value && password.value && displayName.value) {
        try {
          await auth.createUserWithEmailAndPassword(
            email.value,
            password.value
          );

          await auth.currentUser.updateProfile({
            displayName: displayName.value,
          });
          history.push("/chat");
        } catch (error) {
          alert(error);
        }
      }
    },
    [history]
  );

  return (
    <div className={styles.registerContainer}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => setShowRegister(false)}
          style={{
            border: "0",
            userSelect: "none",
            outline: "none",
            cursor: "pointer",
            background: "transparent",
            fontSize: "1.5rem",
            marginRight: "0.5rem",
            display: "flex",
          }}
          type="button"
          aria-label="Back to Login"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1>Sign Up</h1>
      </div>

      <h2>Sign up now and join the conversation.</h2>
      <form onSubmit={register} className={styles.registerForm} disabled={true}>
        <label>
          Email
          <input
            spellCheck={false}
            type="email"
            name="email"
            id="email"
            required
          />
        </label>
        <label>
          Password
          <input type="password" name="password" id="password" required />
        </label>

        <label>
          Display Name
          <InfoCircle message="This name will be visible to everyone in the chat." />
          <input spellCheck={false} type="text" name="displayName" required />
        </label>

        <button className={styles.registerButton} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default withRouter(Register);
