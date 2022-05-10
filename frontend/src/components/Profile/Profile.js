import React from 'react'

import { myContext } from "../../Context";

const Profile = (props) => {
  const userObject = React.useContext(myContext);
  console.log(userObject)
  return (
    <>
      <p>PROFILE PAGE</p>
      {userObject && (
        <p>{userObject.user._id}</p>

      )}
    </>
  )
}

export default Profile