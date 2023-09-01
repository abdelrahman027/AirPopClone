
import { Link, } from "react-router-dom"


import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";


const Accommodations = () => {
    const [places, setPlaces] = useState('')


    useEffect(() => {
        axios.get('/places').then(({ data }) => {
            setPlaces(data)
        })
    }, [])


    return (
        <div>
            <AccountNav />
            <div className="text-start mt-16">
                <Link to={'/account/accommodations/new'} className="btn_primary inline-flex gap-2 w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                        className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    Add New Place


                </Link>
            </div>

            <div className="mt-4">
                {places.length > 0 && places.map((place, index) => (
                    <Link
                        className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl hover:bg-gray-200 transition-all duration-200 items-center mt-2"
                        key={place._id} to={'/account/accommodations/' + place._id} >
                        <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                            {place.photos.length > 0 &&
                                <img src={'http://localhost:3000/uploads/' + place.photos[0]} alt={index + 'pic'} />
                            }
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl" >{place.title}</h2>
                            <p className="text-sm mt-2" >{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div >
    )
}

export default Accommodations