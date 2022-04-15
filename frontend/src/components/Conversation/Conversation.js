import React from 'react'
import { useParams } from 'react-router-dom'

const Conversation = () => {



  
  const mockData = [
    {
      id: 1,
      name: "Bob",
      message: "Bob's message",
      date: new Date('April 13, 2022 22:30:00')
    },
    {
      id: 2,
      name: "John",
      message: "John's message",
      date: new Date('April 1, 2022 03:24:00')
    },
    {
      id: 3,
      name: "Jane",
      message: "Jane's message",
      date: new Date('January 13, 2022 22:30:00')
    },
    {
      id: 4,
      name: "Sally",
      message: "Sally's message",
      date: new Date('November 17, 2001 03:24:00')
    },
  ]

  const { id } = useParams()
  console.log(id)
  const foundUser = mockData.find(user => user.id.toString() === id)
  console.log(foundUser)

  return (
    <div>
      <p>{foundUser.message}</p>
    </div>
  )
}

export default Conversation