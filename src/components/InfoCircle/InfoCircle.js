import React, { useState } from "react";
import styles from "./InfoCircle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function InfoCircle(props) {
  const [tooltipVisible, setTooltipVisibility] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        display: "inline",
        cursor: "pointer",
      }}
    >
      <FontAwesomeIcon
        onMouseOver={() => setTooltipVisibility(true)}
        onMouseOut={() => setTooltipVisibility(false)}
        style={{ fontSize: "0.9rem", marginLeft: "1rem", color: "var(--color4)" }}
        icon={faInfoCircle}
      />
      <div
        style={{ opacity: tooltipVisible ? 1 : 0 }}
        className={styles.infoMessage}
      >
        {props.message}
      </div>
    </div>
  );
}

export default InfoCircle;
