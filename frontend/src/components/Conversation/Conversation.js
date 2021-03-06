import React from "react";
import { MdSend } from "react-icons/md";
import ButtonGroup from "../Components/ButtonGroup";

import "./Conversation.scss";
import Translate from "./Translate";

const Conversation = ({ socket, form: { username, room } }) => {
  const [languages, setLanguages] = React.useState([])
  const [source, setSource] = React.useState("en")
  const [target, setTarget] = React.useState("fr")
  const sourceRef = React.useRef("en")
  const targetRef = React.useRef("fr")
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const endOfMessagesRef = React.useRef(null);

  // have to use ref because useEffect doesn't render the new state of tolerance. Some kind of closure thing. google it.
  const [tolerance, setTolerance] = React.useState(2);
  const toleranceRef = React.useRef(2);

  const sendMessage = async () => {
    const formatTime = () => {
      let current = new Date();
      let hours = current.getHours();
      let minutes = current.getMinutes();
      let ampm = hours >= 12 ? "pm" : "am";
      hours %= 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      return `${hours}:${minutes} ${ampm}`;
    };
    const currentDate = await formatTime();
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
    const url = "http://localhost:9000/api/translate";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // q: toBeTranslated,
        q: toTranslate,
        source: source, // set english text as default
        target: target,
      }),
    };

    // console.log(formData)
    // console.log(source, target)

    const res = await fetch(url, requestOptions);
    const data = await res.json();
    // console.log(data);
    return data;
  };

  const getTranslation = async (
    toBeTranslated,
    source = "en",
    target,
    tolerance
  ) => {
    if (parseInt(tolerance) === 0) return toBeTranslated;

    const splitStr = toBeTranslated.split(" ");
    const numberOfWords = splitStr.length;
    // console.log(tolerance, numberOfWords);

    // check tolerance if number or percentage
    let tol = tolerance;
    if (tol === "25%") {
      // tol = (parseInt(tolarance.split("%")[0]))/100.0 // = 0.25
      tol = numberOfWords / 4;
    } else if (tol === "50%") {
      tol = numberOfWords / 2;
    } else if (tol === "100%") {
      // translate it all.
      // console.log(`source: ${source}, target: ${target}`)
      console.log(`source: ${source}, target: ${target}, tolerance: ${tol}`)

      const data = await translate(toBeTranslated, source, target);
      console.log(data)
      return data;
    }
    
    // console.log(tol);
    // if (tol > numberOfWords) return toBeTranslated;
    if (tol >= numberOfWords) tol = numberOfWords;

    // parseTranslation
    let randomIndexArr = [];
    let randomToBeTranslated = [];

    // add t unique numbers to an array that we can use later.
    while (randomIndexArr.length < tol) {
      let randomIndex = Math.floor(Math.random() * numberOfWords);
      if (randomIndexArr.indexOf(randomIndex) === -1)
        randomIndexArr.push(randomIndex);
    }
    randomIndexArr.sort((a, b) => a - b);
    // console.log(randomIndexArr);

    // push random words to a new array to be translated
    for (let i = 0; i < tol; i++) {
      randomToBeTranslated.push(splitStr[randomIndexArr[i]]);
    }

    // console.log(randomToBeTranslated);

    const randomToBeTranslatedStr = randomToBeTranslated.join("=");
    // console.log(randomToBeTranslatedStr);

    const data = await translate(randomToBeTranslatedStr, source, target);

    const splitData = data.split("=").map((item) => {
      return item.trim();
    });
    // console.log(splitData)

    for (let i = 0; i < tol; i++) {
      splitStr[randomIndexArr[i]] = splitData[i];
    }

    // console.log(splitStr)
    // console.log(splitStr.join(' '))
    // handleTranslate(splitStr.join(' '))
    return splitStr.join(" ");
  };

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
      console.log(data);
      console.log(`source: ${sourceRef.current}, target: ${targetRef.current}, tolerance: ${toleranceRef.current}`)
      const newData = await getTranslation(
        data.message,
        sourceRef.current,
        targetRef.current,
        toleranceRef.current
      );
      console.log(newData);
      data.message = newData;
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  };

  React.useEffect(() => {
    getMessages();
  }, [socket]);

  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
  };
  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleTranslate = (translatedMessage) => {
    // console.log(`translated message from child: ${translatedMessage}`);
    setMessage((prevMessage) => translatedMessage);
    // sendMessage(); // if user wants to send immediately, use this!
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleTolerance = (event) => {
    let tol;
    if (event.target.value === "25%") {
      tol = "25%";
      // tol = Math.floor(10 / 4.0); // (max/4)
    } else if (event.target.value === "50%") {
      tol = "50%";
      // tol = 10 / 2.0;
    } else if (event.target.value === "100%") {
      tol = "100%";
    } else {
      tol = event.target.value;
    }
    // console.log(tol);
    setTolerance((prevTolerance) => tol);
    toleranceRef.current = tol;
    // console.log(toleranceRef.current);
  };

  const handleSource = (event) => {
    sourceRef.current = event.target.value
    setSource(prevSource => event.target.value)
    // console.log(event.target.value)
  }
  const handleTarget = (event) => {
    targetRef.current = event.target.value
    setTarget(prevTarget => event.target.value)
    // console.log(event.target.value)
  }

  const handleLanguages = async (languageList) => {
    // const langlist = languageList
    setLanguages(prevLanguages => languageList)
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
            <div ref={endOfMessagesRef} />
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
          <div><label>Incoming:</label></div>
          <label>Source: </label>
          <select
            name="source"
            value={source}
            onChange={handleSource}
            // disabled
          >
            {languages && 
              languages.map((language) => {
                return (
                  <option key={language.language} value={language.language}>
                    {language.name}, {language.language.toUpperCase()}
                  </option>
                );
              })
            }
            {/* <option name="language" value={formData.value}>English</option> */}
          </select>
          <label>Target: </label>
          <select
            name="target"
            value={target}
            onChange={handleTarget}
          >
            {languages && 
              languages.map((language) => {
                return (
                  <option key={language.language} value={language.language}>
                    {language.name}, {language.language.toUpperCase()}
                  </option>
                );
              })
            }
            {/* <option name="language" value={formData.value}>English</option> */}
          </select>
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
          <ButtonGroup buttons={["25%", "50%", "100%"]} handleTolerance={handleTolerance} />
          <Translate handleLanguages={handleLanguages} handleTranslate={handleTranslate} />
        </div>
      </div>
    </div>
  );
};

export default Conversation;
