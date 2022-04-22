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
      source: "en" // english default
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
      // console.log(data)
      // console.log(data.data.languages)
      // console.log(data.data.languages[26]) // returns "fr"
      setLanguages(data.data.languages)
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          language: data.data.languages[26].language,
        }
      })
    }
    getLanguages();

  },[])

  const translate = async (toTranslate, source = "en", target) => {
    const url = "http://localhost:9000/api/translate"
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          // q: formData.message,
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

  const getTranslation = async () => {

    // parseTranslation
    const splitStr = formData.message.split(' ')
    const numberOfWords = splitStr.length
    let tol = props.tolerance
    let randomIndexArr = []
    let randomToBeTranslated = []

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

    
    
    // let newStringToTranslate = ""
    // randomToBeTranslated.forEach(element => {
    //   newStringToTranslate += `=${element.word}`
    // });
    const randomToBeTranslatedStr = randomToBeTranslated.join('=')
    console.log(randomToBeTranslatedStr)







    const data = await translate(randomToBeTranslatedStr, formData.source, formData.language)

    // const url = "http://localhost:9000/api/translate"
    // const requestOptions = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(
    //     {
    //       // q: formData.message,
    //       q: randomToBeTranslatedStr,
    //       target: formData.language,
    //       source: "en" // set english text as default
    //     }
    //   ),
    // }

    // console.log(formData)

    // const res = await fetch(url, requestOptions)
    // const data = await res.json()
    // console.log(data)
    // if using Google API directly (via RapidAPI), use below and set the messages accordingly.
    // const translatedMessageFromGoogle = data.data.translations[0].translatedText
    // setTranslatedMessage(data)
    // props.handleTranslate(data)

    
    const splitData = await data.split('=').map((item) => {
      return item.trim();
    })
    // console.log(splitData)
    
    for (let i = 0; i < tol; i++) {
      splitStr[randomIndexArr[i]] = splitData[i]
    }
    
    // console.log(splitStr)
    // console.log(splitStr.join(' '))
    setTranslatedMessage(splitStr.join(' '))
    props.handleTranslate(splitStr.join(' '))




  }

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
      <form onSubmit={handleSubmit} className="translate-send-form">
        <input
          className="translate-send"
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
        <button type="submit" className="btn btn-icon"><MdSend /></button>
      </form>
      <p>Your translated message below...</p>
      <h2>{translatedMessage}</h2>
    </div>
  );
};

export default Translate;
