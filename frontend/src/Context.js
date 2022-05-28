import React from "react";
import axios from "axios";
import { io } from "socket.io-client";

export const myContext = React.createContext({});

const Context = (props) => {
  const [userObject, setUserObject] = React.useState();

  const [socket, setSocket] = React.useState();
  const url = "http://localhost:9000";
  // let navigate = useNavigate();

  React.useEffect(() => {
    const socket = io.connect(url);
    setSocket((prevSocket) => socket);

    // required to clean up memory leaks! Close if socket dismounts
    return () => {
      socket.disconnect();
    };
  // }, [setSocket]);
  }, []);

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
