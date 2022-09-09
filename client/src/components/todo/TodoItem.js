import React, { useState } from "react";

const TodoItem = (props) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [newTodo, setNewTodo] = useState(props.todo.todo);
  const toggle = (e) => {
    e.preventDefault();
    if (toggleEdit) {
      const tempTodo = props.todo;
      tempTodo.todo = newTodo;
      props.save(tempTodo);
      setToggleEdit(false);
    } else setToggleEdit(true);
  };

  const handle = (e) => {
    e.preventDefault();
    props.delete(props.todo);
  };
  if (!toggleEdit) {
    return (
      <>
        <section className='text-gray-600 body-font'>
          <div className='container my-3 mx-auto'>
            <div className='lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto'>
              <h1 className='flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900'>
                {props.todo.todo}
              </h1>
              <button
                onClick={toggle}
                className='mr-10 flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0'
              >
                Edit
              </button>
              <button
                onClick={handle}
                className='flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0'
              >
                Delete
              </button>
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return (
      <>
        <section className='text-gray-600 body-font'>
          <div className='container my-3 mx-auto'>
            <div className='flex justify-around mx-auto'>
              <input
                value={newTodo}
                onChange={(e) => {
                  setNewTodo(e.target.value);
                }}
                type='text'
                id='name'
                name='name'
                className='w-4/6 bg-gray-100 bg-opacity-50 rounded border border-gray-300 py-1 px-3'
              />
              <button
                onClick={toggle}
                className='mr-10 flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0'
              >
                Save
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default TodoItem;
