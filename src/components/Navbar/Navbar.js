import { Button } from '@material-ui/core';
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const Navbar = () => {
    const history = useHistory();
    const handleClick = (to) => {
        history.push(`/${to}`)
    }
    return (
        <div>
            <Button onClick={() => handleClick('home')}>Home</Button>
            <Button onClick={() => handleClick('about')}>About</Button>
            <Button onClick={() => handleClick('services')}>Dental Services</Button>
            <Button onClick={() => handleClick('reviews')}>Reviews</Button>
            <Button onClick={() => handleClick('blog')}>Blog</Button>
            <Button onClick={() => handleClick('login')}>Login</Button>
        </div>
    );
};

export default Navbar;