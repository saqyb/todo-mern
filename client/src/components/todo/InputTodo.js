import React, { useState } from "react";

const InputTodo = (props) => {
  const [newTodo, setNewTodo] = useState("");
  const handle = (e) => {
    console.log(newTodo);
    e.preventDefault();
    props.addTodo(newTodo);
    setNewTodo("");
  };
  return (
    <>
      <section className='text-gray-600 body-font relative'>
        <div className='container px-3 py-4 mx-auto'>
          <div className=' flex justify-center'>
            <div className='p-2 w-8/12'>
              <input
                value={newTodo}
                onChange={(e) => {
                  setNewTodo(e.target.value);
                }}
                type='text'
                id='name'
                name='name'
                className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 py-1 px-3'
              />
            </div>
          </div>
          <div className='p-2 w-full'>
            <button
              className='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'
              onClick={handle}
            >
              Add Todo
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default InputTodo;
