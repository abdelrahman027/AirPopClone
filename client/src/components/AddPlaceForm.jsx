import axios from 'axios';
import { Fragment, useEffect, useState } from 'react'
import Perks from './Perks';
import { Navigate, useParams } from 'react-router-dom';





const AddPlaceForm = () => {

    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [photos, setPhotos] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkout, setCheckout] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);
    const [price, setPrice] = useState(1);


    const { id } = useParams()


    useEffect(() => {
        if (!id) { return }
        axios.get('/places/' + id).then(({ data }) => {
            setTitle(data.title);
            setAddress(data.address);
            setPhotos(data.photos)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckout(data.checkout)
            setMaxGuests(data.maxGuests)
            setPrice(data.price)

        })
    }, [id])

    const addPicByLink = async (e) => {
        e.preventDefault();
        const { data: filename } = await axios.post('/upload-link', { link: imageUrl })
        setPhotos(prev => {
            return [...prev, filename]
        });
        setImageUrl('')
    };

    const handleUpload = (ev) => {
        const files = ev.target.files
        const data = new FormData();
        for (let i = 0; i < files.length; i++)
        {

            data.append('photos', files[i])

        }
        axios.post('/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(({ data: filenames }) => {
            setPhotos(prev => {
                return [...prev, ...filenames]
            });
        })
    };

    const handlePlace = async (e) => {

        e.preventDefault()

        const myData = {
            title, address, photos,
            description, perks, extraInfo,
            checkIn, checkout, maxGuests, price
        };

        if (id)
        {
            //update
            await axios.put('/places', { id, ...myData })

            setRedirect(true)
        } else
        {
            //add new
            await axios.post('/places', myData)
            setRedirect(true)
        }
    };

    if (redirect)
    {
        return <Navigate to={'/account/accommodations'} />
    }



    const removePhoto = (e, photo) => {
        e.preventDefault()
        setPhotos([...photos].filter(actual => actual !== photo))
    }

    const selectMain = (e, photo) => {
        e.preventDefault()
        const removedPhotos = [...photos].filter(actual => actual !== photo);
        const updatedPhotos = [photo, ...removedPhotos];
        setPhotos(updatedPhotos)
    }

    return (
        <Fragment>
            <form onSubmit={handlePlace}>
                {/*************  title **********/}

                <h2 className="text-xl mt-4 font-semibold">Title</h2>
                <p className="text-sm text-gray-400">Title for your place, should be short and catchy.</p>
                <input
                    type="text"
                    name="title"
                    id="title"
                    className="w-full border px-2 py-4 rounded-lg mb-4"
                    placeholder="Title E.g.:My Apartment"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                {/*************  address **********/}

                <h2 className="text-xl font-semibold">Address</h2>
                <p className="text-sm text-gray-400">Address for your place.</p>
                <input
                    type="text"
                    name="address"
                    id="address"
                    className="w-full border px-2 py-4 rounded-lg mb-4"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                {/*************  photos **********/}


                <h2 className="text-xl font-semibold">Photos</h2>
                <p className="text-sm text-gray-400">More equals better.</p>
                {/*************  URL **********/}

                <div className="flex items-center justify-start gap-2">
                    <input
                        type="text"
                        name="imageurl"
                        id="imageurl"
                        className="w-3/4 border px-2 py-4 rounded-lg mb-4"
                        placeholder="Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <button onClick={addPicByLink} className="bg-gray-300 px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-200">
                        Add URL
                    </button>
                </div>

                {/*************  upload Button **********/}

                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-2 gap-2">
                    <label className="border-gray-300 border border-dashed rounded-2xl h-32 p-8 hover:bg-gray-300 transition-all duration-150 hover:border-white hover:text-primary text-gray-400 font-bold text-2xl inline-flex justify-center cursor-pointer">
                        <input type="file" name="file" className="hidden" multiple onChange={handleUpload} id='<i class="fa fa-file-text-o" aria-hidden="true"></i>' />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                        </svg>

                    </label>
                    {photos.length > 0 && photos.map((photo, index) => (
                        <div key={index + "/place/pics"} className="h-32 relative flex">
                            <img className="rounded-2xl w-full object-cover " src={'http://localhost:3000/uploads/' + photo} alt="photo" />
                            <button onClick={(e) => removePhoto(e, photo)} className='absolute right-1 bottom-1 cursor-pointer hover:text-primary text-white bg-black rounded-xl opacity-60 hover:opacity-100 p-0.5'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>

                            </button>
                            <button onClick={(e) => selectMain(e, photo)} className='absolute left-1 bottom-1 cursor-pointer hover:text-primary text-white bg-black rounded-xl opacity-60 hover:opacity-100 p-0.5'>
                                {photo === photos[0] ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                </svg> :

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>}

                            </button>
                        </div>
                    ))}
                </div>

                {/*************  Description **********/}

                <h2 className="text-xl font-semibold mt-4">Description</h2>
                <p className="text-sm text-gray-400">Describe your place.</p>
                <textarea
                    className="w-full border my-1 py-2 px-3 rounded-2xl h-[140px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {/*************  Perks **********/}

                <h2 className="text-xl font-semibold mt-4">Perks</h2>
                <p className="text-sm text-gray-400">Select your perks.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2    ">
                    <Perks perks={perks} setPerks={setPerks} />
                </div>

                {/*************  extra Info **********/}

                <h2 className="text-xl font-semibold mt-4">Extra Info</h2>
                <p className="text-sm text-gray-400">House rules, etc.</p>
                <textarea
                    className="w-full border my-1 py-2 px-3 rounded-2xl h-[140px]"
                    value={extraInfo}
                    onChange={(e) => setExtraInfo(e.target.value)}
                />


                {/*************  CheckIn **********/}


                <h2 className="text-xl font-semibold mt-4">Check in & Check out</h2>
                <p className="text-sm text-gray-400">Add check in and out time.</p>
                <div className="grid sm:grid-cols-3 gap-2">
                    <div>
                        <h3>Check in Time</h3>
                        <input
                            className="w-full border px-2 py-4 rounded-lg" type="time" name="checkIn" id="checkIn"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                        />
                    </div>
                    {/*************  checkOut **********/}

                    <div>
                        <h3>Check out Time</h3>
                        <input
                            className="w-full border px-2 py-4 rounded-lg" type="time" name="checkOut" id="checkOut"
                            value={checkout}
                            onChange={(e) => setCheckout(e.target.value)}
                        />
                    </div>
                    <div>
                        {/*************  MaxGuests **********/}

                        <h3>Max Guests</h3>
                        <input
                            className="w-full border px-2 py-4 rounded-lg" min={1} type="number" name="maxGuests" id="maxGuests"
                            value={maxGuests}
                            onChange={(e) => setMaxGuests(e.target.value)}
                        />
                    </div>
                    <div>
                        {/*************  price **********/}

                        <h3>Price per Night</h3>
                        <input
                            className="w-full border px-2 py-4 rounded-lg" min={1} type="number" name="price" id="price" step={'0.01'}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                </div>
                <div className="my-8 w-1/2 mx-auto">
                    <button className="btn_primary">Save</button>
                </div>
            </form>
        </Fragment>
    )
}

export default AddPlaceForm