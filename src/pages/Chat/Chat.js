import React from "react";
import styles from "./Chat.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faSmile,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import ChatMessage from "../../components/ChatMessage/ChatMessage";
import { auth, db } from "../../firebase";
import { AuthContext } from "../../providers/Auth";

export default class Chat extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = { chatMessages: [], messageQueue: [], timeout: null };
    this.messagesEndRef = React.createRef();
  }

  componentDidMount() {
    const latestMessages = db
      .ref("messages")
      .orderByChild("time")
      .limitToLast(100);
    latestMessages.once("value").then((snapshot) => {
      const messages = snapshot.val();

      if (messages) {
        this.setState({
          chatMessages: Object.keys(messages).map((key) => messages[key]),
        });
      }
    });

    const ref = db.ref("messages");
    ref.on("child_added", (snapshot) => {
      const newMessage = snapshot.val();
      this.setState({
        chatMessages: [...this.state.chatMessages, newMessage],
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.messageQueue.length > 0 &&
      prevState.messageQueue.length !== this.state.messageQueue.length
    ) {
      clearTimeout(this.state.timeout);
      const submitTimeout = setTimeout(this.sendMessages, 200);
      this.setState({
        timeout: submitTimeout,
      });
    }

    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  sendMessages = () => {
    const { currentUser } = this.context;

    if (this.state.messageQueue.length > 0) {
      const newMessage = {
        time: moment(),
        type: "text",
        content: this.state.messageQueue.join("\n"),
        from: currentUser.displayName,
        uid: currentUser.uid,
      };

      const ref = db.ref("messages");
      ref.push().set({ ...newMessage, time: newMessage.time.unix() });

      this.setState({
        messageQueue: [],
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { message } = event.target.elements;
    if (!message.value) {
      return;
    }

    this.setState({
      messageQueue: [...this.state.messageQueue, message.value],
    });

    event.target.reset();
  };

  logout = () => {
    auth.signOut();
  };

  render() {
    const { currentUser } = this.context;

    return (
      <div className={styles.backgroundPattern}>
        <div className={styles.container}>
          <div className={styles.chatWindow}>
            <div className={styles.header}>
              
              <h1>{currentUser.displayName}</h1>
              <button
                onClick={this.logout}
                aria-label="Logout"
                className={styles.flatButton}
                type="button"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </div>
            <div className={styles.messagesWindow}>
              <div style={{ marginTop: "auto" }}>
                {this.state.chatMessages.map((chatMessage, index) => {
                  return <ChatMessage key={index} {...chatMessage} />;
                })}
              </div>
              <div ref={this.messagesEndRef}></div>
            </div>

            <form onSubmit={this.handleSubmit} className={styles.messageForm}>
              <button
                aria-label="Emoji"
                className={styles.flatButton}
                type="button"
              >
                <FontAwesomeIcon icon={faSmile} />
              </button>
              <input
                aria-label="Text Message Input"
                name="message"
                placeholder="Type a message..."
                className={styles.messageInput}
                type="text"
              />

              <button
                aria-label="Send"
                className={styles.flatButton}
                type="submit"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
