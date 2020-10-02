import { Button } from '@material-ui/core';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();
    const handleClick = () => {
        history.push('/appointment')
    }
    return (
        <div>
            <h1>Your New Smile <br/> Starts Here </h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br/> Officia illo aspernatur corporis eligendi quos quo ipsum <br/> accusantium corrupti culpa laudantium.</p>
            <Button onClick={handleClick} variant="contained" color="primary">
                  GET APPOINTMENT
            </Button>
        </div>
    );
};

export default Home;