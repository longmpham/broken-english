app.post('/', async (req, res) => {
  console.log(req.body)
  const q = req.body.q;
  // console.log(`q is: ${q}`);
  // const options = { 
  //   method: 'POST',
  //   url: 'https://translation.googleapis.com/language/translate/v2',
  //   form: { 
  //     key: process.env.TRANSLATE,
  //     q: q,
  //     target: 'en' 
  //   } 
  // };
  // res.json({test: "test"});
  res.json("thisisatest");
  // request(options, (error, response, body) => {
  //   if (error) throw new Error(error);
  //   console.log(body);
  //   // res.send(body);
  // });
})