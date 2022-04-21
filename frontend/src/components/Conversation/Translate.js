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

  const getTranslation = async () => {

    // parseTranslation
    const splitStr = formData.message.split(' ')
    const numberOfWords = splitStr.length
    let tol = props.tolerance
    
    let newArr = []

    // this adds a unique random number to array.
    while(newArr.length < tol) {
      let randomIndex = Math.floor(Math.random() * numberOfWords);
      if(newArr.indexOf(randomIndex) === -1) newArr.push(randomIndex)
    }

    let randItems = []
    for (let i = 0; i < newArr.length; i++) {
      randItems.push({index: newArr[i], word: splitStr[i]})
    }
    // for (let i = 0; i < tol; i++) {
      // built a new array of words randomly selected from splitStr

      // todo: create a randomizer but only grab the random number once.
    //   let randomIndex = Math.floor(Math.random() * numberOfWords);
    //   newArr.push({index: randomIndex, word: splitStr[randomIndex]})
    // }
    randItems.sort((a,b) => {
      return (a.index - b.index)
    })
    console.log(randItems)
    let newStringToTranslate = ""
    randItems.forEach(element => {
      newStringToTranslate += `=${element.word}`
    });
    const newTranslation = newStringToTranslate








    const url = "http://localhost:9000/api/translate"
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          // q: formData.message,
          q: newTranslation,
          target: formData.language,
          source: "en" // set english text as default
        }
      ),
    }

    console.log(formData)

    const res = await fetch(url, requestOptions)
    const data = await res.json()
    console.log(data)
    // if using Google API directly (via RapidAPI), use below and set the messages accordingly.
    // const translatedMessageFromGoogle = data.data.translations[0].translatedText
    setTranslatedMessage(data)
    props.handleTranslate(data)






    const splitData = data.split('= ')
    splitData.shift() // always returns a blank first index, so lets remove it.
    console.log(splitData) 
    
    const replacedStr = splitStr.map((str, i) => {

      if(randItems.length === 0) {
        return str
      }

      if (i === randItems[0].index) {
        randItems.shift()
        console.log('swapping', splitData[0].trim())
        const temp = splitData.shift()
        return temp.trim()
      }
      else {
        console.log('adding', str)
        return str
      }

    })

    
    console.log(replacedStr)
    replacedStr.join(' ')
    console.log(replacedStr.join(' '))
    setTranslatedMessage(replacedStr.join(' '))
    props.handleTranslate(replacedStr.join(' '))




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
