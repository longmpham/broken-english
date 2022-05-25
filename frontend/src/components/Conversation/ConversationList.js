import React from "react";
// import { useNavigate } from "react-router-dom"

import "./ConversationList.scss"

const ConversationList = () => {
  // let navigate = useNavigate()
  const [showConversationId, setShowConversationId] = React.useState(0);

  const mockData = [
    {
      id: 1,
      photo: "some photo",
      user: {
        firstName: "Long",
        lastName: "Pham",
      },
      conversations: [
        {
          roomId: 0,
          receiver: "Billy",
          messages: [
            {
              author: "Long",
              message: "hello how are you",
              date: "1",
            },
            {
              author: "Billy",
              message: "doing good, how are you?",
              date: "2",
            },
            {
              author: "Long",
              message: "I'm fine, thank you!",
              date: "3",
            },
          ],
        },
        {
          roomId: 1,
          receiver: "Sally",
          messages: [
            {
              author: "Long",
              message: "hey girl whats up",
              date: "1",
            },
            {
              author: "Sally",
              message: "chilling, making food",
              date: "2",
            },
            {
              author: "Long",
              message: "Yum!!!",
              date: "3",
            },
          ],
        },
      ],
    },
  ];

  const formatTime = (date) => {
    let deltaTime = (date.getTime() - Date.now()) / 1000; // return in seconds
    const DIVISIONS = [
      { amount: 60, name: "seconds" },
      { amount: 60, name: "minutes" },
      { amount: 24, name: "hours" },
      { amount: 7, name: "days" },
      { amount: 4.34524, name: "weeks" },
      { amount: 12, name: "months" },
      { amount: Number.POSITIVE_INFINITY, name: "years" },
    ];
    const formatter = new Intl.RelativeTimeFormat(`en`, {
      numeric: "auto",
      style: `narrow`,
    }); //numeric = [auto|always]
    for (let i = 0; i <= DIVISIONS.length; i++) {
      const division = DIVISIONS[i];
      if (Math.abs(deltaTime) < division.amount) {
        return formatter.format(Math.round(deltaTime), division.name);
      }
      deltaTime /= division.amount;
    }

    // const deltaDays = (date.getTime() - Date.now()) / (1000 * 3600 * 24)
    // const formatter = new Intl.RelativeTimeFormat(`en`, { style: `narrow`, })
    // const relativeTime = formatter.format(Math.round(deltaTime), relativeTimeType)
    // console.log(relativeTime)
    // return relativeTime
  };

  const handleShowConversation = (roomId) => {
    console.log(roomId);
    setShowConversationId((prevShowConversationId) => {
      return roomId;
    });
  };

  return (
    <div className="conversations-container">
      {mockData.map((data) => {
        return (
          <>
            {mockData.map((data) => {
              return (
                <>
                  <div className="conversationList-header-container">
                    <p>create new conversation</p>
                    <p>I am user {data.id}</p>
                    <p>{data.photo}</p>
                    <p>setup menu burger</p>
                  </div>
                  <div className="conversationList-body-container" key={data.id}>
                    <span className="conversationList-conversations-container">
                      {data.conversations.map((conversation) => {
                        return (
                          <div
                            onClick={() =>
                              handleShowConversation(conversation.roomId)
                            }
                            className="conversation-container"
                            key={conversation}
                          >
                            {/* <p>{conversation.roomId}</p> */}
                            <p>{conversation.receiver}</p>
                          </div>
                        );
                      })}
                    </span>
                    <span className="conversationList-conversations-body-container">
                      {data.conversations[showConversationId].messages.map(
                        ({ author, message, date }) => {
                          return (
                            <div className="conversation-body-container" key={message + author + date}>
                              <p>{message}</p>
                              <p>{author}</p>
                              <p>{date}</p>
                            </div>
                          );
                        }
                      )}
                    </span>
                  </div>
                </>
              );
            })}
          </>

          // <div key={data.id} className="conversations-row">
          //   <h1>icon</h1>
          //   <p>{data.id}</p>
          //   {/* <p>{data.message}</p> */}
          //   {/* <p>{formatTime(data.date)}</p> */}
          //   {/* <button onClick={() => { navigate(`/conversation/${data.id}`)}}>CHAT</button> */}
          // </div>
        );
      })}
    </div>
  );
};

export default ConversationList;
