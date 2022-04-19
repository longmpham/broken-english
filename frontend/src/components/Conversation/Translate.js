import React from "react";
import { MdSend } from "react-icons/md"
import "./Conversation.scss";
const Translate = (props) => {


  const [translatedMessage, setTranslatedMessage] = React.useState("")
  const [languages, setLanguages] = React.useState()
  const [formData, setFormData] = React.useState(
    {
      message: "",
    },
    {
      language: "fr" // french default
    }
  );

  // call the languages google can translate 
  React.useEffect( () => {
    const getLanguages = async () => {
      const url = "http://localhost:9000/api/translate"
      const res = await fetch(url)
      const data = await res.json();
      // console.log(data.data.languages)
      console.log(data.data.languages[26]) // returns "fr"
      setLanguages(data.data.languages)
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          language: data.data.languages[0].language,
        }
      })
    }
    getLanguages();

  },[])

  const getTranslation = async () => {
    const url = "http://localhost:9000/api/translate"
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          q: formData.message,
          target: formData.language,
          source: "en" // set english text as default
        }
      ),
    }

    console.log(formData)

    const res = await fetch(url, requestOptions)
    const data = await res.json()
    let translatedMessageFromGoogle = data.data.translations[0].translatedText
    setTranslatedMessage(translatedMessageFromGoogle)
    props.handleTranslate(translatedMessageFromGoogle)
    console.log(translatedMessageFromGoogle)
  }

  // const mytesthandle = () => {
  //   props.handleTranslate("this is a test")
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(formData.message === "") {
      alert("message is empty")
      return
    }
    // console.log(formData)
    console.log("success! Form submitted")

    // call fetch here
    // mytesthandle()
    getTranslation()
  }

  const handleChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      }
    })
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit} className="conversation-send-form">
        <input
          className="conversation-send"
          value={formData.message}
          name="message"
          onChange={handleChange}
          type="text"
          placeholder="Translate a message here..."
          />
        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
          >
          {languages &&
            languages.map((language) => {
              return (
                <option key={language.language} value={language.language}>
                  {language.name}, {language.language.toUpperCase()}
                </option>
              );
            })}
          {/* <option name="language" value={formData.value}>English</option> */}
        </select>
        <button type="submit"><MdSend /></button>
      </form>
      <p>Your translated message below...</p>
      <h2>{translatedMessage}</h2>
    </div>
  );
};

export default Translate;
