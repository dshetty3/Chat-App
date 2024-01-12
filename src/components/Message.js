import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const getMessageTime = () => {
    const messageDate = message.date.toDate(); 
    const now = new Date();
  
    const timeDiff = now - messageDate;
    const secondsAgo = Math.floor(timeDiff / 1000);
  
    if (secondsAgo < 60) {
      return "just now";
    } else {
      const minutesAgo = Math.floor(secondsAgo / 60);
  
      if (minutesAgo < 60) {
        return `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
      } else {
        const hoursAgo = Math.floor(minutesAgo / 60);
  
        if (hoursAgo < 24) {
          return `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
        } else {
          const daysAgo = Math.floor(hoursAgo / 24);
          return `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
        }
      }
    }
  };

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>{getMessageTime()}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
