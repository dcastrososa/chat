import React from "react";
import NewMessageForm from "./../component/NewMessageForm";
import { getCookie } from "../../../uitl/util";

const Conversation = props => {
    const { conversation } = props;
    const { messages } = conversation;
    const userIdLoggued = parseInt(getCookie("iduser"));

    return (
        <div>
            <h1 style={{textAlign: "justify"}}>{conversation.user_third.email}</h1>

            <div style={{width: "80%", height: 380, overflow: "auto"}}>
                {orderArrayByDate(messages, "created_at").map( message => (
                    message.user_send.id === userIdLoggued ? 
                        <div key={message.id}> <MessageOwn message={message} />  </div>
                        : 
                        <div key={message.id}><MessageThird message={message} /> </div>
                ))}
            </div>

            <NewMessageForm conversation_id={conversation.id} />
        </div>
    )
};

// helper

const MessageOwn = ({message}) => (
    <div style={{width: "70%", borderRadius: "20px", padding: "15px", marginBottom: "15px", backgroundColor: "#3578e5", float: "right", color: "#fff"}}>{message.text}</div>
);

const MessageThird = ({message}) => (
    <div style={{width: "70%", borderRadius: "20px", padding: "15px", marginBottom: "15px", backgroundColor: "#f1f0f0", float: "left", color: "#444950"}}>{message.text}</div>
);

const orderArrayByDate = (array, key) => {
    array.sort(function (a, b) {
      let dateA = new Date(a[key]).getTime()
      let dateB = new Date(b[key]).getTime()
      return dateA > dateB ? 1 : -1;
    })
    return array;
};

export default Conversation;
