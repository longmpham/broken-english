import React from "react";
import { MdSend } from "react-icons/md";

import "./Conversation.scss";
import Translate from "./Translate";

// const Conversation = ({ socket, form: { username, room } }) => {
const Conversation = ({ socket, form: { username, room } }) => {
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const messagesEndRef = React.useRef(null);
  const [tolerance, setTolerance] = React.useState(0);

  const sendMessage = async () => {
    const currentDate =
      new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
    const messageData = {
      room: room,
      author: username,
      message: message,
      time: currentDate,
    };

    console.log(messageData);
    await socket.emit("send_chat", messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
  };

  const translate = async (toTranslate, source = "en", target) => {
    const url = "http://localhost:9000/api/translate"
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          // q: toBeTranslated,
          q: toTranslate,
          source: source, // set english text as default
          target: target,
        }
      ),
    }

    // console.log(formData)

    const res = await fetch(url, requestOptions)
    const data = await res.json()
    console.log(data)
    return data
  }

  const getTranslation = async (toBeTranslated, source = "en", target, tolerance) => {

    // parseTranslation
    const splitStr = toBeTranslated.split(' ')
    const numberOfWords = splitStr.length
    let tol = 3 //tolerance
    let randomIndexArr = []
    let randomToBeTranslated = []
    console.log(tol)

    // add t unique numbers to an array that we can use later.
    while(randomIndexArr.length < tol) {
      let randomIndex = Math.floor(Math.random() * numberOfWords);
      if(randomIndexArr.indexOf(randomIndex) === -1) randomIndexArr.push(randomIndex)
    }
    randomIndexArr.sort((a,b) => a-b)
    console.log(randomIndexArr)

    // push random words to a new array to be translated
    for (let i = 0; i < tol; i++) {
      randomToBeTranslated.push(splitStr[randomIndexArr[i]])
    }

    console.log(randomToBeTranslated)

    const randomToBeTranslatedStr = randomToBeTranslated.join('=')
    console.log(randomToBeTranslatedStr)

    const data = await translate(randomToBeTranslatedStr, source, target)

    const splitData = data.split('=').map((item) => {
      return item.trim();
    })
    // console.log(splitData)
    
    for (let i = 0; i < tol; i++) {
      splitStr[randomIndexArr[i]] = splitData[i]
    }
    
    // console.log(splitStr)
    // console.log(splitStr.join(' '))
    // handleTranslate(splitStr.join(' '))
    return splitStr.join(' ')

  }

  const handleChange = (event) => {
    setMessage((prevMessage) => event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let validated = validateMessage();
    if (validated) {
      sendMessage();
      setMessage((prevMessage) => "");
    }
  };

  const validateMessage = () => {
    if (message === "") {
      console.log("Nothing was written");
      return false;
    }
    return true;
  };

  const getMessages = async (data) => {
    socket.on("broadcast_data", async (data) => {
      // data comes here when it gets texted to receiver.
      console.log(data)
      const newData = await getTranslation(data.message, "en", "fr", tolerance)
      // console.log(newData)
      data.message = newData
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  };


  // this works with .then()
  // const getMessages = async (data) => {
  //   socket.on("broadcast_data", (data) => {
  //     // data comes here when it gets texted to receiver.
  //     console.log(data)
  //     const newData = getTranslation(data.message, "en", "fr", tolerance).then((d)=>{
  //       console.log(d)
  //       data.message = d
  //       setTimeout(() => {
  //         setMessages((prevMessages) => [...prevMessages, data]);
  //       },3000)
  //       setTimeout(() => {
  //         console.log(messages)
  //       },6000)
  //     })
  //     // console.log(newData)
  //     // const newNewData = () => [{...data, message: newData}]
  //     // setMessages((prevMessages) => [...prevMessages, newNewData]);
  //   });
  // };

  React.useEffect( () => {
    getMessages();
  }, [socket]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleTranslate = (translatedMessage) => {
    console.log(`translated message from child: ${translatedMessage}`);
    setMessage(translatedMessage);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleTolerance = (event) => {
    setTolerance(prevTolerance => event.target.value)
  }

  return (
    <div className="conversation-container">
      <div className="conversation-window">
        <div className="conversation-header">
          <h1>Live in Room: {room}</h1>
        </div>
        <div id="conversation-body" className="conversation-body">
          <ul className="conversation-messages">
            {messages.map((msg, index) => {
              return (
                <li key={index} id={username === msg.author ? "me" : "other"}>
                  <div className="message-content">
                    <p>{msg.message}</p>
                  </div>
                  <div className="message-meta">
                    <p>{msg.author}</p>
                    <p>{msg.time}</p>
                  </div>
                </li>
              );
            })}
            <div ref={messagesEndRef} />
          </ul>
        </div>
        <div className="conversation-footer">
          {/* input */}
          <form onSubmit={handleSubmit} className="conversation-send-form">
            <input
              className="conversation-send"
              type="text"
              name="message"
              value={message}
              placeholder={`Say Hello, ${username}`}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              autoComplete="off"
            ></input>
            <button type="submit" className="btn btn-icon">
              <MdSend />
            </button>
          </form>
          <div className="conversation-slider-container">
            <input
              className="conversation-tolerance-slider"
              type="range"
              min="0"
              // max={message.split(" ").length}
              max="10"
              value={tolerance}
              onChange={handleTolerance}
            ></input>
            <div className="tolerance-bubble">{tolerance}</div>
          </div>
          {/* <Translate handleTranslate={handleTranslate} tolerance={tolerance}/> */}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
