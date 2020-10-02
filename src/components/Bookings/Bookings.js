import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Main/Main';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useContext(UserContext)

    useEffect(() => {
        fetch('http://localhost:4000/patients?email=' + user.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setBookings(data))
    }, [])
    return (
        <div>
            <h2>You have {bookings.length} bookings</h2>
            {
                bookings.map(book => <li>Name: {book.name} date: {book.date} time: {book.time} doctor: {book.doctor}</li>)
            }
        </div>
    );
};

export default Bookings;