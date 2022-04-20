# Getting Started with Create React App

This project is going to be an on-going learning experience to build a peer to peer chat application.

This app is designed to have a conversation between one another but allow the user to see a translated message from Google Translate API

The sender will have the choice to send the message via a translation or in english (or whatever they would normally send). The receiver will see either of the message sent.

Due to the API being not really free to translate, the original idea will be stunted until I can afford it.

~~The sender will send it (most likely in English for now), and the receiver will have the option of receiving the input in their language of choice (whatever Google can offer/translate successfully).~~

~~The receiver will have a "tolerance" bar to set the level of translated messages (beginner, intermediate, advanced, fluent). My hopes is that when the messages goes through to the receiver, the function will randomly select (at first) words in the sent message and translate them based on the tolernace set, hence, Broken English.~~

# Development Pictures...

### Update 1:

My first message translated using RapidAPI - Google Translate. Unforunately this is limited to 500 calls / month... so this may get annoying...

![my first translated message!](./devImages/firstTranslatedMessage.png)

### Update 2:

I attempted to use socketio and i finished what I wanted to do. I can translate and send any message desired with GoogleTranslate API. My next action is to figure out user logins properly and tie it in with socketio
![Sockets and Translations!](./devImages/socketandtranslate.png)

### Update 3:

The attempt is complete and I have my chat app. There's a caveat, the login/register isn't really functional yet and I'm figuring out how to do the backend now. I think the frontend is good to start!
![CSS Chat and Translation!](./devImages/addedCSSToChat.png)

### Update 4:

So because I'm out of my quota for RapidAPI's 500 API call quota... and I'm a poor learner, I decided to use https://www.npmjs.com/package/@vitalets/google-translate-api which translates my sentences at an unlimited rate! I think its a WIN WIN. I changed my code a bit to make sure I can still call Google Translate's API, so I just have to change a couple of things if I want to switch back. I don't think I'll be going back anytime soon... 500 api calls is a joke, and free is free!
![Changed API. Nothing changed](./devImages/updatedAPItoUnlimtedUse.png)