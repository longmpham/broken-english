import React from "react";
import axios from "axios";

export const myContext = React.createContext({});

const Context = (props) => {
  const [userObject, setUserObject] = React.useState();

  const getUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/users/profile",
        { withCredentials: true }
      );
      console.log(response.data);
      if (response.data) {
        setUserObject((prevUserObject) => response.data);
      }
    } catch (error) {
      console.log("Unable to fetch profile. Please login or register");
    }
  };
  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <myContext.Provider value={{userObject, getUser}}>{props.children}</myContext.Provider>
  );
};

export default Context;
