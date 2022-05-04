const expressAsyncHandler = require("express-async-handler");
const axios = require("axios");
const data = require("../models/languages");
const translate = require("@vitalets/google-translate-api");
const e = require("express");

// todo: might need a proxy 
// https://www.npmjs.com/package/@vitalets/google-translate-api
const translateMessage = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  const { q, target, source } = req.body;

  try {
    // instead of using google translate api from rapidapi (over quota...)
    // we switch to google translate api from vitalets.
    const translation = await translate(q, { from: source, to: target });
    
    // todo: add the auto correct from 
    // https://www.npmjs.com/package/@vitalets/google-translate-api
    console.log(translation);
    console.log(translation.text);
    // if(translation.from.language.didYouMean) {
    //   res.status(200).json(translation.text);

    // } else {
    //   res.status(200).json(translation.text);
    // }


    res.status(200).json(translation.text);
  } catch (error) {
    console.log(`Unable to translate message: ${error}`);
    res.status(500).send(`Unable to translate message: ${error}`);
  }
});

const getLanguages = expressAsyncHandler(async (req, res) => {

  try {
    // const response = await axios.get(data)
    // const languages = response.data
    const languages = data
    // console.log(languages)
    res.status(201).json(languages)
  } catch (error) {
    console.log(`Unable to get languages: ${error}`)
    res.status(500).send(`Unable to get languages: ${error}`)
  }

})

module.exports = { translateMessage, getLanguages };
