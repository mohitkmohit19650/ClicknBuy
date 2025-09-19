import React, { useState } from 'react'
import { NavLink } from "react-router-dom";
import { Button,  Navbar, Container, Nav } from 'react-bootstrap';
import { BsGeoAltFill } from "react-icons/bs";
import { IoMdArrowDropdown, IoMdHeartEmpty } from "react-icons/io";
import { IoCart } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useCartHook } from '../context/CartContext';

const AppNavbar = ({location, getLocation, openDropdown, setOpenDropdown}) => {
  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown)
  }
 const {cartItem} = useCartHook();
  return (
    <>
      <Navbar bg="white" variant="white" expand="lg">
        <Container>
          <div className='flex gap-2 items-center relative'>
            <Navbar.Brand as={NavLink} to={'/'}>ClicknBuy</Navbar.Brand>
            <div className='flex gap-1 items-center'>
              <BsGeoAltFill className="text-red-500" />
              <span className='font-semibold text-xs'>
                {location ? <span>{location.state} <br />{location.country}</span> : "Add Address"}
              </span>
              <IoMdArrowDropdown onClick={toggleDropdown} className='cursor-pointer'/>
            </div>
            {
              openDropdown ? 
              <div className='toggle-dropdown'>
                <span>change location</span>
                <Button onClick={getLocation} variant="danger" className='mt-2 h-[40px]'>Detect my location</Button>
                <RxCross2 onClick={toggleDropdown} className='absolute top-2 right-2 cursor-pointer' />
              </div> : null
            }
          </div>
          <Nav className="ml-auto align-center items-center gap-x-3">
            <Nav.Link as={NavLink} to="/" className="text-red-500 font-bold border-b-2 border-red-500 transition-all">Home</Nav.Link>
            <Nav.Link as={NavLink} to={'/products'} className={({ isActive }) =>
              isActive
                ? "text-red-500 font-bold border-b-2 border-red-500 transition-all"
                : "text-gray-700 hover:text-red-500"
            }>Products</Nav.Link>
            <Nav.Link as={NavLink} to={'/about'} className={({ isActive }) =>
              isActive
                ? "text-red-500 font-bold border-b-2 border-red-500 transition-all"
                : "text-gray-700 hover:text-red-500"
            }>About</Nav.Link>
            <Nav.Link as={NavLink} to={'/contact'} className={({ isActive }) =>
              isActive
                ? "text-red-500 font-bold border-b-2 border-red-500 transition-all"
                : "text-gray-700 hover:text-red-500"
            }>Contact</Nav.Link>
            <Nav.Link className='!bg-gray-200 rounded-full'><IoMdHeartEmpty /></Nav.Link>
            <Nav.Link as={NavLink} to={'/cart'} className='h-7 w-7 relative'><IoCart /><span className='bg-red-500 px-1 rounded-full text-white absolute -top-1 -right-1 text-xs'>{cartItem.length}</span></Nav.Link>
          </Nav> 
        </Container>
      </Navbar>
    </>
  )
}

export default AppNavbar