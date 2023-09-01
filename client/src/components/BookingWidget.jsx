/* eslint-disable react/prop-types */

import { useState } from "react"
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import axios from "axios";
import { Navigate } from "react-router-dom";

const BookingWidget = ({ place }) => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState(null)

    let numNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))

    const handleBooking = async () => {
        const response = await axios.post('/booking', { checkIn, checkOut, guests, name, phone, place: place._id, price: numNights * place.price });
        const bookingId = response.data._id;
        setRedirect('/account/bookings/' + bookingId);
    }

    if (redirect)
    {
        return <Navigate to={redirect} />
    }

    return (
        <div className="bg-white p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price: ${place.price} / per night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex flex-col md:flex-row">
                    <div className="py-3 px-4">
                        <label>Check In:</label>
                        <input type="date" name="checkIn" id="checkIn"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                        />
                    </div>
                    <div className="border-l py-3 px-4">
                        <label>Check Out:</label>
                        <input type="date" name="checkOut" id="checkOut"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                        />
                    </div>
                </div>
                <div className="py-3 px-4 border-t text-center">
                    <label>Max Guests:</label>
                    <input type="number" name="maxGuest" id="maxGuest"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-1/4 border ml-3 px-2 py-4 rounded-2xl" />
                </div>
                {checkIn && checkOut && (
                    <div className="py-3 px-4 border-t">
                        <div className="py-3 px-4 ">
                            <label>Your Name</label>
                            <input type="text" name="maxGuest" id="maxGuest"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border px-2 py-4 rounded-2xl"
                                placeholder="ENTER YOUR NAME" />
                        </div>
                        <div className="py-3 px-4 ">
                            <label>Your Phone</label>
                            <input type="telephone" name="maxGuest" id="maxGuest"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full border px-2 py-4 rounded-2xl"
                                placeholder="ENTER YOUR PHONE"
                            />
                        </div>
                    </div>
                )}
            </div>
            <button className="btn_primary mt-2"
                onClick={handleBooking}
            >
                Book this
                {checkIn && checkOut && (
                    <span className="ml-1">${numNights * place.price} {numNights}<sup>night/s</sup></span>
                )}
            </button>
        </div>
    )
}

export default BookingWidget