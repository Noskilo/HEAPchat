import React, { useContext } from "react";
import styles from "./ChatMessage.module.css";
import moment from "moment";
import { AuthContext } from "../../providers/Auth";

function ChatMessage({ from, content, time, uid }) {
  const { currentUser } = useContext(AuthContext);
  time = moment.isMoment(time) ? time : moment.unix(time);

  let chatBubbleClasses = [styles.chatBubble];
  let bubbleContainerClasses = [styles.bubbleContainer];

  if (uid !== currentUser.uid) {
    chatBubbleClasses.push(styles.leftBubble);
    bubbleContainerClasses.push(styles.left);
  } else {
    chatBubbleClasses.push(styles.rightBubble);
    bubbleContainerClasses.push(styles.right);
  }

  chatBubbleClasses = chatBubbleClasses.join(" ");
  bubbleContainerClasses = bubbleContainerClasses.join(" ");
  return (
    <div className={bubbleContainerClasses}>
      <div className={chatBubbleClasses}>
        {from && uid !== currentUser.uid && <h1>{from}</h1>}
        <p>{content}</p>
        <span className={styles.timestamp}>{time.format("hh:mm a")}</span>
      </div>
    </div>
  );
}

export default ChatMessage;
