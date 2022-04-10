import React from "react";

const App = () => {

  const [translatedMessage, setTranslatedMessage] = React.useState("")
  const [formData, setFormData] = React.useState(
    {
      message: "",
    }
  );

  const getTranslation = async () => {
    const url = "http://localhost:9000/api/translate"
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          q: formData.message
        }
      ),
    }
    

    const res = await fetch(url, requestOptions)
    // console.log(`res: ${res}`)
    const data = await res.json()
    let translatedMessageFromGoogle = data.data.translations[0].translatedText
    setTranslatedMessage(translatedMessageFromGoogle)
    console.log(translatedMessageFromGoogle)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(formData.message === "") {
      alert("message is empty")
      return
    }
    // console.log(formData)
    console.log("success! Form submitted")

    // call fetch here?
    getTranslation(formData.message)
  }

  const handleChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
        // console.log(e.target.value)
      }
    })
  }

  return (
    <div>
      <h1>Type in your message here</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={formData.message}
          name="message"
          onChange={handleChange}
          type="text"
          placeholder="type your message here"
        />
        <button type="submit">Submit</button>
      </form>
      <h2>{translatedMessage}</h2>
    </div>
  );
};

export default App;
