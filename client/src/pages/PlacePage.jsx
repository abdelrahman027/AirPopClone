import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BookingWidget from "../components/BookingWidget"
import AddressLink from "../components/AddressLink"


const PlacePage = () => {
    const { id } = useParams()
    const [place, setPlace] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false)



    useEffect(() => {
        if (!id) return
        axios.get('/normal-place/' + id).then(({ data }) => {
            setPlace(data)
        })
    }, [id])
    // console.log(place.photos)
    if (!place) return

    if (showAllPhotos)
    {
        return (
            <div className="absolute inset-0 bg-white min-h-screen min-w-screen" >
                <div className="grid gap-4 p-8">
                    <h1 className="text-3xl" >{place.title}</h1>
                    <button className="fixed right-6 px-4 py-2 flex gap-1 bg-gray-200 rounded-2xl w-fit hover:bg-primary hover:text-white" onClick={() => setShowAllPhotos(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Close
                    </button>
                    {place?.photos?.length > 0 && place.photos.map((photo, index) => (
                        <div key={index + '/' + photo} className="w-full">
                            <img className="w-full" src={"http://localhost:3000/uploads/" + photo} alt="photo" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    return (
        <>
            <div className="">
                <hr className="mt-2" />
                <div>
                    <h1 className="text-2xl mt-2">{place?.title}</h1>
                    <AddressLink place={place} />
                </div>
                {place.photos && (
                    <div className="relative">
                        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                            {/* First Image */}
                            <div>
                                <div>
                                    <img className="aspect-square cursor-pointer object-cover" src={'http://localhost:3000/uploads/' + place.photos[0]} alt="pic" />
                                </div>
                            </div>
                            {/* Other 2 Images */}
                            <div className="grid" >
                                <img className="aspect-square cursor-pointer object-cover" src={'http://localhost:3000/uploads/' + place.photos[1]} alt="pic" />
                                <div className="over-flow-hidden">
                                    <img className="aspect-square cursor-pointer object-cover relative top-2" src={'http://localhost:3000/uploads/' + place.photos[2]} alt="pic" />
                                </div>
                            </div>
                        </div>
                        <button className="btn_primary flex gap-1 absolute bottom-2 right-2 w-auto"
                            onClick={() => setShowAllPhotos(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>

                            Show More
                        </button>
                    </div>
                )}
                <div className="mt-8 bg-gray-100 p-8 flex-col md:flex-row rounded-2xl flex  gap-2">
                    <div className="basis-[70%]">
                        <h1 className="text-2xl mt-2">Description</h1>
                        <p className="mb-4">
                            {place.description}
                        </p>
                        <h1 className="text-2xl mt-2">Extra Info</h1>

                        <p className="mb-2">{place.extraInfo}</p>
                        <h1 className="text-2xl">Perks</h1>
                        <ul className="list-disc flex gap-5">
                            {place?.perks?.length > 0 && (place?.perks.map((perk, index) => (
                                <li key={index + '/' + perk}>{perk.toUpperCase()}</li>
                            )))}
                        </ul>
                    </div>
                    <BookingWidget place={place} />
                </div>
            </div >
        </>
    )
}

export default PlacePage