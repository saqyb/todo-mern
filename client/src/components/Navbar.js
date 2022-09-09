import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { userContext } from "../reducer/UseReducer";

const Navbar = () => {
  const { currentUser } = useContext(userContext);
  const RenderMenu = () => {
    if (currentUser) {
      return (
        <>
          <NavLink to='/logout'>
            <button className='inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0'>
              Logout
            </button>
          </NavLink>
        </>
      );
    } else {
      return (
        <>
          <NavLink to='/login' className='mr-5 hover:text-gray-900'>
            Login
          </NavLink>
          <NavLink to='/signup' className='mr-5 hover:text-gray-900'>
            Sign Up
          </NavLink>
        </>
      );
    }
  };
  return (
    <>
      <header className='text-gray-600 body-font'>
        <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
          <a
            href='./'
            className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'
          >
            <span className='ml-3 text-xl'>Tailblocks</span>
          </a>
          <nav className='md:ml-auto flex flex-wrap items-center text-base justify-center'>
            <RenderMenu></RenderMenu>
          </nav>
        </div>
      </header>
    </>
  );
};
export default Navbar;
