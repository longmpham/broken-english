import React from 'react'
// import { useNavigate } from "react-router-dom"

const ConversationList = () => {

  // let navigate = useNavigate()

  const mockData = [
    {
      id: 1,
      name: "Bob",
      message: "some message",
      date: new Date('April 13, 2022 22:30:00')
    },
    {
      id: 2,
      name: "John",
      message: "some message",
      date: new Date('April 1, 2022 03:24:00')
    },
    {
      id: 3,
      name: "Jane",
      message: "some message",
      date: new Date('January 13, 2022 22:30:00')
    },
    {
      id: 4,
      name: "Sally",
      message: "some message",
      date: new Date('November 17, 2001 03:24:00')
    },
  ]

  const formatTime = (date) => {
    let deltaTime = (date.getTime() - Date.now()) / 1000 // return in seconds
    const DIVISIONS = [
      { amount: 60, name: 'seconds' },
      { amount: 60, name: 'minutes' },
      { amount: 24, name: 'hours' },
      { amount: 7, name: 'days' },
      { amount: 4.34524, name: 'weeks' },
      { amount: 12, name: 'months' },
      { amount: Number.POSITIVE_INFINITY, name: 'years' }
    ]
    const formatter = new Intl.RelativeTimeFormat(`en`, { numeric: "auto", style: `narrow`, }) //numeric = [auto|always]
    for (let i = 0; i <= DIVISIONS.length; i++) {
      const division = DIVISIONS[i]
      if (Math.abs(deltaTime) < division.amount) {
        return formatter.format(Math.round(deltaTime), division.name)
      }
      deltaTime /= division.amount
    }

    // const deltaDays = (date.getTime() - Date.now()) / (1000 * 3600 * 24)
    // const formatter = new Intl.RelativeTimeFormat(`en`, { style: `narrow`, })
    // const relativeTime = formatter.format(Math.round(deltaTime), relativeTimeType)
    // console.log(relativeTime)
    // return relativeTime

  }

  return (
    <div className="conversations-container">
        {mockData.map((data) => {
          return (
            <div key={data.id} className="conversations-row">
              <h1>icon</h1>
              <p>{data.name}</p>
              <p>{data.message}</p>
              <p>{formatTime(data.date)}</p>
              {/* <button onClick={() => { navigate(`/conversation/${data.id}`)}}>CHAT</button> */}
            </div>
            
          )
        })}
    </div>
  )
}

export default ConversationList