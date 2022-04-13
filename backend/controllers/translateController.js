const expressAsyncHandler = require("express-async-handler");
const axios = require("axios");


const translateMessage = expressAsyncHandler(async (req,res) => {
  console.log(req.body)
  const { q, target, source } = req.body;
  const encodedParams = new URLSearchParams()
  encodedParams.append("q", q);
  encodedParams.append("target", target);
  encodedParams.append("source", source); 
  const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2'
  const options = { 
    method: 'POST',
    url: url,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options)
    const translatedMessage = response.data
    // console.log(translatedMessage)
    console.log(translatedMessage.translations)
    res.status(200).json(translatedMessage);
  } catch (error) {
    console.log(`Unable to translate message: ${error}`)
    res.status(500).send(`Unable to translate message: ${error}`)
  }
})

const getLanguages = expressAsyncHandler(async (req, res) => {

  const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages'
  const options = {
    method: 'GET',
    url: url,
    params: {target: 'en'},
    headers: {
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY
    }
  };


//   axios.request(options).then(function (response) {
//     console.log(response.data);
//     res.status(200).json(response.data)
//   }).catch(function (error) {
//     console.error(error);
//   });

  try {
    const response = await axios.request(options)
    const languages = response.data
    // console.log(languages)
    res.status(201).json(languages)
  } catch (error) {
    console.log(`Unable to get languages: ${error}`)
    res.status(500).send(`Unable to get languages: ${error}`)
  }
})

module.exports = { translateMessage, getLanguages }