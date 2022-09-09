import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Todo from "./todo/Todo";
import { userContext } from "../reducer/UseReducer";

const Home = () => {
  const { currentUser, setCurrentUser } = useContext(userContext);
  const navigate = useNavigate();

  const callHome = async () => {
    try {
      const res = await fetch("/authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCurrentUser(data);
      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log("Error");
      console.log(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    callHome();
  }, []);

  if (currentUser) {
    return (
      <>
        <form method='GET'>
          <Todo user={currentUser} email={currentUser.email}></Todo>
        </form>
      </>
    );
  } else {
    navigate("/login");
  }
};

export default Home;
