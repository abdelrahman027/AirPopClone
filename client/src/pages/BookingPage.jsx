import { useParams } from "react-router-dom"
import AccountNav from "./AccountNav"
import { useEffect, useState } from "react"
import axios from "axios";
import AddressLink from "../components/AddressLink";
import DataInfo from "../components/DataInfo";


const BookingPage = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null)
    useEffect(() => {
        if (id)
        {
            axios.get('/bookings').then(({ data }) => {
                let myBooking = data.find(({ _id }) => _id === id)
                if (myBooking)
                {
                    setBooking(myBooking)
                }
            })
        }
    }, [id])
    console.log(booking)
    if (!booking) return ''
    return (
        <div className="my-8">
            <AccountNav />
            <h1 className="text-3xl mt-2">{booking.place.title}</h1>
            <AddressLink place={booking.place} />
            <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
                <DataInfo booking={booking} />
            </div>
            <div className="grid grid-cols-2">
                <div>
                    <img src={"http://localhost:3000/uploads/" + booking.place.photos[0]} alt="" />
                </div>
                <div>
                    <img src={"http://localhost:3000/uploads/" + booking.place.photos[1]} alt="" />
                </div>
                <div>
                    <img src={"http://localhost:3000/uploads/" + booking.place.photos[2]} alt="" />
                </div>
                <div>
                    <img src={"http://localhost:3000/uploads/" + booking.place.photos[3]} alt="" />
                </div>
            </div>
        </div>
    )
}

export default BookingPage