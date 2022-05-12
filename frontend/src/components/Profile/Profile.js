import React from 'react'

import { myContext } from "../../Context";

const Profile = (props) => {
  const {userObject} = React.useContext(myContext);
  console.log(userObject)
  return (
    <>
      <p>PROFILE PAGE</p>
      {userObject && (
        <>
          <p>{userObject.user._id}</p>
          <p>{userObject.user.email}</p>
          <img src={userObject.user.photo} />
        </>
      )}
    </>
  )
}

export default Profile