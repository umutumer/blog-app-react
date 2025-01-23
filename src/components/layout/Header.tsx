import React from 'react';
import { Link } from 'react-router';
import { Button } from '../ui/Button';

const Header = () => {
  return (
    <header className="w-full h-24 flex justify-center">
      <nav className="w-[70%] h-full flex items-center justify-between px-4">
        <Link to={'/'}>
          <h1 className="font-bold text-blue-900 md:text-2xl text-xl hover:mb-2 duration-300">
            BLOG <span className="text-pink-600">APP</span>
          </h1>
        </Link>
        <Link to={'/admin'}>
          <div className="relative group">
            <Button
              variant={'default'}
              size={'default'}
              className="scale-100 hover:scale-105 hover:shadow-md hover:shadow-pink-400"
            >
              PANEL
            </Button>
          </div>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
