import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

const HomePage = () => {
    const [normalPlaces, setNormalPlaces] = useState([])

    useEffect(() => {
        axios.get('/normal-places').then(({ data }) => setNormalPlaces([...data]))

    }, [])

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-12 gap-6">
                {normalPlaces.map(place => (
                    <Link to={'/place/' + place._id} key={place._id} className="bg-gray-50 rounded-2xl cursor-pointer">
                        <div>
                            <img src={"http://localhost:3000/uploads/" + place.photos[0]} alt="photo" className="aspect-square object-cover rounded-2xl" />
                        </div>
                        <div className="p-1">
                            <h2 className="font-bold text-sm truncate">
                                {place.title}
                            </h2>
                            <p className="text-gray-400 text-sm">{place.address}</p>
                            <p className="text-gray-400 text-sm">Max Guests : {place.maxGuests}</p>
                            <p className="text-gray-400 text-sm">Night : <span className="font-bold text-black">{place.price}$</span></p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default HomePage