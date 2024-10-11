'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import Logo from '../../app/logo.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose, IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'; // Import arrow icons
import { Button } from '../button';

export default function Navbar() {
  // State for menu open/close
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // Track the currently open accordion
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Function to toggle accordion section, ensuring only one is open at a time
  const toggleAccordion = (section: string) => {
    setOpenSection(prev => (prev === section ? null : section)); // Close if it's already open, otherwise open the new one
  };

  return (
    <nav className= {`${isMenuOpen ? '' : 'sticky'} top-0 bg-white shadow-md p-4  z-50`}>
      <div className='container mx-auto flex justify-between items-center'>
        {/* Logo */}
        <div>
          <Image src={Logo} alt='logo' className='w-36 h-14' />
        </div>

        {/* Hamburger Icon for mobile */}
        <div className='md:hidden'>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='text-3xl'>
            {isMenuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
          </button>
        </div>

        {/* Nav Links */}
        <ul
          className={`md:flex md:items-center absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent transition-transform duration-300 ease-in-out z-40 ${
            isMenuOpen ? 'min-h-screen translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
        >
          <li className='p-4 md:p-0 md:ml-8'>
            <a href='#' className='text-gray-700 hover:text-orange-700'>Home</a>
            <hr className='w-full h-[0.5] mt-5 bg-gray-400 md:hidden'></hr>
          </li>

          {/* Accordion for Shop */}
          <li className='p-4 md:p-0 md:ml-8 relative'>
            <button
              onClick={() => toggleAccordion('shop')}
              className={`text-gray-700 hover:text-orange-700 flex items-center ${
                openSection === 'shop' ? 'text-orange-700' : ''
              }`}
            >
              Shop
              {openSection === 'shop' ? (
                <IoIosArrowUp className='ml-2 text-orange-700' />
              ) : (
                <IoIosArrowDown className='ml-2' />
              )}
            </button>
            <ul
              className={`transition-all duration-500 overflow-hidden ${
                openSection === 'shop' ? 'max-h-40 max-w-52 md:shadow-md md:w-52 p-2' : 'max-h-0 max-w-0 '
              } md:absolute mt-2  bg-white space-y-5  w-full `}
            >
              <li>
                <a
                  href='#'
                  className='text-gray-600 hover:text-orange-700 hover:bg-orange-100 transition-colors duration-300 p-2 block rounded-md'
                >
                  Product 1
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-600 hover:text-orange-700 hover:bg-orange-100 transition-colors duration-300 p-2 block rounded-md'
                >
                  Product 2
                </a>
              </li>
            </ul>
            {openSection !== 'shop' && (
              <hr className='w-full h-[0.5] mt-5 bg-gray-400 md:hidden'></hr>
            )}
          </li>

          {/* Accordion for Booking */}
          <li className='p-4 md:p-0 md:ml-8 relative'>
            <button
              onClick={() => toggleAccordion('booking')}
              className={`text-gray-700 hover:text-orange-700 flex items-center ${
                openSection === 'booking' ? 'text-orange-700' : ''
              }`}
            >
              Booking
              {openSection === 'booking' ? (
                <IoIosArrowUp className='ml-2 text-orange-700' />
              ) : (
                <IoIosArrowDown className='ml-2' />
              )}
            </button>
            <ul
              className={`transition-all duration-500 overflow-hidden ${
                openSection === 'booking' ?'max-h-40 max-w-52 md:shadow-md md:w-52 p-2' : 'max-h-0 max-w-0'
              } md:absolute mt-2 bg-white  space-y-5 w-full `}
            >
              <li>
                <a
                  href='#'
                  className='text-gray-600 hover:text-orange-700 hover:bg-orange-100 transition-colors duration-300 p-2 block rounded-md'
                >
                  Product 1
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-600 hover:text-orange-700 hover:bg-orange-100 transition-colors duration-300 p-2 block rounded-md'
                >
                  Product 2
                </a>
              </li>
            </ul>
            {openSection !== 'booking' && (
              <hr className='w-full h-[0.5] mt-5 bg-gray-400 md:hidden'></hr>
            )}
          </li>

          {/* Accordion for Support */}
          <li className='p-4 md:p-0 md:ml-8 relative'>
            <button
              onClick={() => toggleAccordion('support')}
              className={`text-gray-700 hover:text-orange-700 flex items-center ${
                openSection === 'support' ? 'text-orange-700' : ''
              }`}
            >
              Support
              {openSection === 'support' ? (
                <IoIosArrowUp className='ml-2 text-orange-700' />
              ) : (
                <IoIosArrowDown className='ml-2' />
              )}
            </button>
            <ul
              className={`transition-all duration-500 overflow-hidden ${
                openSection === 'support' ? 'max-h-40 max-w-52 md:shadow-md p-2 md:w-56' : 'max-h-0 max-w-0'
              } md:absolute mt-2  bg-white  space-y-5  w-full`}
            >
              <li>
                <a
                  href='#'
                  className='text-gray-600 hover:text-orange-700 hover:bg-orange-100 transition-colors duration-300 p-2 block rounded-md'
                >
                  Product 1
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-600 hover:text-orange-700 hover:bg-orange-100 transition-colors duration-300 p-2 block rounded-md'
                >
                  Product 2
                </a>
              </li>
            </ul>
            {openSection !== 'support' && (
              <hr className='w-full h-[0.5] mt-5 bg-gray-400 md:hidden'></hr>
            )}
          </li>

          <li className='p-4 md:p-0 md:ml-8'>
            <a href='#' className='text-gray-700  hover:text-orange-700'>About</a>
          </li>

          <li className='p-2 md:p-0 md:ml-8'>
            <Button link='/auth/signin' className='bg-white border border-b border-[#556D4C] text-green-950 rounded-md'>
              Login
            </Button>
          </li>
          <li className='p-2 md:p-0 md:ml-2'>
            <Button link='/auth/signup' className='bg-[#556D4C] border border-b border-white text-white rounded-md'>
              Sign Up
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
