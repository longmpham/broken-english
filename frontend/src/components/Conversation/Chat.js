import React from 'react'
import io from "socket.io-client"

// global socket so that react doesnt refresh it (for now? => useEffect?)
const url = "http://localhost:9000"
const socket = io.connect(url)

const Chat = () => {

  // socket connection

  const [form, setForm] = React.useState({
    username: "",
    room: "",
  })

  const joinRoom = () => {
    if(form.username === "" && form.room === "") console.log("fields are empty. not able to join")


  }

  const handleChange = ((event) => {
    setForm(prevForm => {
      return {
        ...prevForm,
        [event.target.name]: event.target.value,
      }
    })
  })

  const handleSubmit = ((event) => {
    event.preventDefault()
    console.log(form)
    console.log("joining chat room")
  })

  return (
    <div>
      <h1>Let's Chat!</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={form.username} placeholder="username..." onChange={handleChange}></input>
        <input type="text" name="room" value={form.room} placeholder="room id..." onChange={handleChange}></input>
        <button type="submit">Start Chatting</button>
      </form>
    </div>
  )
}

export default Chat