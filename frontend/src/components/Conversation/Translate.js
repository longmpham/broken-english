import React from "react";
import { MdSend } from "react-icons/md";
import "./Conversation.scss";

const Translate = (props) => {
  const [translatedMessage, setTranslatedMessage] = React.useState("");
  const [languages, setLanguages] = React.useState([]);
  const [form, setFormData] = React.useState(
    {
      message: "",
    },
    {
      source: "en", // english default
    },
    {
      target: "fr", // french default
    }
  );

  // call the languages google can translate
  React.useEffect(() => {
    const getLanguages = async () => {
      const url = "http://localhost:9000/api/translate";
      const res = await fetch(url);
      const data = await res.json();
      // console.log(data)
      // console.log(data.data.languages)
      // console.log(data.data.languages[26]) // returns "fr"
      let languageList = data.data.languages;
      props.handleLanguages(languageList);
      setLanguages((prevLanguages) => languageList);
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          target: data.data.languages[26].language, // "fr"
        };
      });
      // return data.data.languages
    };
    getLanguages();
  }, []);

  const translate = async (toTranslate, source = "en", target) => {
    const url = "http://localhost:9000/api/translate";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // q: form.message,
        q: toTranslate,
        source: source, // set english text as default
        target: target,
      }),
    };

    console.log(form);

    const res = await fetch(url, requestOptions);
    const data = await res.json();
    console.log(data);
    return data;
  };

  const getTranslation = async () => {
    const data = await translate(form.message, form.source, form.target);

    // const url = "http://localhost:9000/api/translate"
    // const requestOptions = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(
    //     {
    //       // q: form.message,
    //       q: randomToBeTranslatedStr,
    //       target: form.target,
    //       source: "en" // set english text as default
    //     }
    //   ),
    // }

    // console.log(form)

    // const res = await fetch(url, requestOptions)
    // const data = await res.json()
    // console.log(data)
    // if using Google API directly (via RapidAPI), use below and set the messages accordingly.
    // const translatedMessageFromGoogle = data.data.translations[0].translatedText
    // setTranslatedMessage(data)
    // props.handleTranslate(data)

    // console.log(data);
    setTranslatedMessage(data);
    props.handleTranslate(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.message === "") {
      alert("message is empty");
      return;
    }
    // console.log(form)
    console.log("success! Form submitted");
    getTranslation();
  };

  const handleChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="translate-send-form">
        <input
          className="translate-send"
          value={form.message}
          name="message"
          onChange={handleChange}
          type="text"
          placeholder="Translate a message here..."
        />
        <select name="target" value={form.target} onChange={handleChange}>
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
        <button type="submit" className="btn btn-icon">
          <MdSend />
        </button>
      </form>
      <p>Your translated message below...</p>
      <h2>{translatedMessage}</h2>
    </div>
  );
};

export default Translate;
