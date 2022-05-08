import React from "react";
import axios from "axios";

export const myContext = React.createContext({});

const Context = (props) => {
  const [userObject, setUserObject] = React.useState();

  React.useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        "http://localhost:9000/api/users/profile",
        { withCredentials: true }
      );
      console.log(response);
      if (response.data) {
        setUserObject((prevUserObject) => response.data);
      }
    };
    getUser();
  }, []);

  return (
    <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
  );
};

export default Context;
