import React from "react";
import "./Conversation.css"

const Conversation = ({ socket, form: { username, room } }) => {

  const [message, setMessage] = React.useState("")
  const [messages, setMessages] = React.useState([])

  const sendMessage = async () => {
    if(message === "") console.log("fields are empty. not able to join")

    const currentDate = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
    const messageData = {
      room: room,
      author: username,
      message: message,
      time: currentDate
    }

    console.log(messageData)
    await socket.emit("send_chat", messageData)
    setMessages(prevMessages => [
      ...prevMessages,
      messageData,
    ])
  }

  const handleChange = (event) => {
    setMessage(prevMessage => event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    sendMessage()
  }

  const getMessages = async (data) => {
    socket.on("broadcast_data", (data) => {
      setMessages(prevMessages => [
        ...prevMessages,
        data,
      ])
    })
  }

  React.useEffect( () => {
    getMessages()
  },[socket])

  return (
    <div>
      <div className="conversation-header">
        <h1>Private Conversation</h1>
      </div>
      <div className="conversation-body">
        <ul>
          {messages.map((msg,index) => {
            return(
              <li key={index}>
                <div className="message-content" id={username === msg.author ? "me" : "other"}>
                  <p>{msg.message}</p>
                </div>
                <div className="message-meta">
                  <p>{msg.author}</p>
                  <p>{msg.time}</p>
                </div> 
              </li>
            )
          })}
        </ul>
      </div>
      <div className="conversation-footer">
        {/* input */}
        <ul>
          
        </ul>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="message"
            value={message}
            placeholder="say hello!"
            onChange={handleChange}
            autoComplete="off"
          ></input>
          <button type="submit">SEND</button>
        </form>
      </div>
    </div>
  );
};

export default Conversation;
