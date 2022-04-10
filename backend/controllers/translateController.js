const expressAsyncHandler = require("express-async-handler");
const axios = require("axios");


const translateMessage = expressAsyncHandler(async (req,res) => {
  console.log(req.body)
  const q = req.body.q;
  const encodedParams = new URLSearchParams()
  encodedParams.append("q", q);
  encodedParams.append("target", "es");
  encodedParams.append("source", "en"); 
  const url = "https://google-translate1.p.rapidapi.com/language/translate/v2"
  const options = { 
    method: 'POST',
    url: url,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
      'X-RapidAPI-Key': '33f1715bdamsh74b4838bbaaff5ap1381c4jsne7a041ab0a2f'
    },
    data: encodedParams,
  };

  let translatedMessage
  try {
    const res = await axios.request(options)
    translatedMessage = res.data
    console.log(translatedMessage)
  } catch (error) {
    console.log(`Unable to translate message: ${error}`)
  }


  res.status(200).json(translatedMessage);
})

module.exports = { translateMessage }