import { Fragment, useEffect, useState } from "react"
import AccountNav from "../AccountNav"
import axios from "axios";
import format from 'date-fns/format'
import { Link } from "react-router-dom";
import DataInfo from "../../components/DataInfo";


const Bookings = () => {
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        axios.get('/bookings').then(({ data }) => {
            setBookings(data)

        })
    }, [])
    return (

        <Fragment>
            <AccountNav />
            <div className="">
                {bookings?.length > 0 && (
                    bookings.map((booking) => (
                        <Link to={'/account/bookings/' + booking._id} key={booking._id} className=" mx-auto mt-8 cursor-pointer flex gap-3 items-center mb-3 w-3/4 rounded-2xl bg-gray-100 overflow-hidden" >
                            <div className="w-48 overflow-hidden">
                                <img src={'http://localhost:3000/uploads/' + booking.place.photos[0]} alt="photo" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-xl border-b-2 mb-2 p-2 ">
                                    {`Booking in: ${booking.place.title}`}
                                </h2>
                                <div className="text-sm flex gap-2">
                                    From:
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w- h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                    </svg>

                                    <span className="underline hover:no-underline font-semibold">{format(new Date(booking.checkIn), 'MM/dd/yyyy')}</span> To:
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                    </svg>

                                    <span className="underline  hover:no-underline font-semibold">${format(new Date(booking.checkOut), 'MM/dd/yyyy')}</span>
                                </div>
                                <DataInfo booking={booking} />
                            </div>
                        </Link>
                    ))
                )}

            </div>
        </Fragment>
    )
}

export default Bookings