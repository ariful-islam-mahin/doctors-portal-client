import { Button } from '@material-ui/core';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();
    const handleClick = (path) => {
        history.push(`/${path}`)
    }
    return (
        <div className='px-3'>
            <h1>Your New Smile <br/> Starts Here </h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br/> Officia illo aspernatur corporis eligendi quos quo ipsum <br/> accusantium corrupti culpa laudantium.</p>
            <Button onClick={() => handleClick('appointment')} variant="contained" color="primary">
                  GET APPOINTMENT
            </Button>
            <Button className='ml-3' onClick={() => handleClick('bookings')} variant="contained" color="primary">
                  Bookings
            </Button>
        </div>
    );
};

export default Home;