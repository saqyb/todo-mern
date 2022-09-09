import React, { useState, useEffect } from "react";
import InputTodo from "./InputTodo";
import TodoItem from "./TodoItem";
import * as uuid from "uuid";
const Todo = (props) => {
  const email = props.email;

  const [todoArr, setTodoArr] = useState([{ id: uuid.v4(), todo: "Item-1" }]);

  const getTodo = async (email) => {
    try {
      const res = await fetch("/getList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await res.json();
      if (res.status === 200) {
        setTodoArr(data);
      } else {
        console.log("Failed to fetch Todo");
      }
      console.log("status code: ", res.status); // 200
      if (!res.ok) {
        console.log(res);
        throw new Error(`Error! status: ${res.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const PostData = async (todo) => {
    const userEmail = props.email;
    console.log("Post Data func");
    const res = await fetch("/addTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        todo,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("Failed to add Todo");
    } else {
      console.log(res.status);
    }
  };
  const UpdateData = async (todos) => {
    const userEmail = props.email;
    console.log("Post Data func");
    const res = await fetch("/updateTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        todos,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("Failed to add Todo");
    } else {
      console.log(res.status);
    }
  };
  const DeleteData = async (todo) => {
    const userEmail = props.email;
    console.log("delete Data func");
    console.log(todo);
    const res = await fetch("/deleteTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        todo,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("Failed to delete Todo");
    } else {
      console.log(res.status);
    }
  };
  const addTodo = (item) => {
    const todo = { id: uuid.v4(), todo: item };
    PostData(todo);
    setTodoArr([todo, ...todoArr]);
  };
  const saveTodo = (item) => {
    const temp = todoArr.find((x) => x.id == item.id);
    const index = todoArr.indexOf(temp);
    todoArr[index] = item;
    UpdateData(todoArr);
  };
  const deleteTodo = (item) => {
    const index = todoArr.indexOf(item);
    const tempArr = [...todoArr];
    tempArr.splice(index, 1);
    DeleteData(todoArr[index]);
    setTodoArr([...tempArr]);
  };
  useEffect(() => {
    setTimeout(getTodo(props.email), 1000);
  }, []);

  return (
    <>
      <InputTodo addTodo={addTodo}></InputTodo>
      {todoArr.map((item) => {
        return (
          <>
            <TodoItem
              todo={item}
              save={saveTodo}
              delete={deleteTodo}
            ></TodoItem>
          </>
        );
      })}
    </>
  );
};
export default Todo;
