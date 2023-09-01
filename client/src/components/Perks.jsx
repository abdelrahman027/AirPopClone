/* eslint-disable react/prop-types */



const Perks = ({ perks, setPerks }) => {

    const handleCheck = (e) => {
        const { checked, name } = e.target;
        if (checked)
        {

            setPerks([...perks, name])
        } else
        {
            setPerks([...perks.filter(selectedName => selectedName != name)])
        }
    }
    return (
        <>
            <label className="border p-3 flex gap-2 rounded-2xl cursor-auto justify-center items-center">
                <input
                    className="accent-primary"
                    type="checkbox"
                    name="wifi"
                    id="wifi"
                    onChange={handleCheck}
                    checked={perks.includes('wifi')}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                </svg>
                {/*************  WIFI **********/}

                <span>WIFI</span>
            </label>
            <label className="border p-3 flex gap-2 rounded-2xl cursor-auto justify-center items-center">
                <input
                    className="accent-primary"
                    type="checkbox"
                    name="parking"
                    id="parking"
                    onChange={handleCheck}
                    checked={perks.includes('parking')}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
                {/*************  PARKING **********/}

                <span>Parking</span>
            </label>
            <label className="border p-3 flex gap-2 rounded-2xl cursor-auto justify-center items-center">
                <input
                    className="accent-primary"
                    type="checkbox"
                    name="tv"
                    id="tv"
                    onChange={handleCheck}
                    checked={perks.includes('tv')}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                </svg>
                {/*************  TV **********/}

                <span>TV</span>
            </label>
            <label className="border p-3 flex gap-2 rounded-2xl cursor-auto justify-center items-center">
                <input
                    className="accent-primary"
                    type="checkbox"
                    name="entrance"
                    id="entrance"
                    onChange={handleCheck}
                    checked={perks.includes('entrance')}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                {/*************  ENTRANCE **********/}

                <span>Entrance</span>
            </label>
            <label className="border p-3 flex gap-2 rounded-2xl cursor-auto justify-center items-center">
                <input
                    className="accent-primary"
                    type="checkbox"
                    name="pets"
                    id="pets"
                    onChange={handleCheck}
                    checked={perks.includes('pets')}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                </svg>
                {/*************  PETS **********/}

                <span>Pets</span>
            </label>
            <label className="border p-3 flex gap-2 rounded-2xl cursor-auto justify-center items-center">
                <input
                    className="accent-primary"
                    type="checkbox"
                    name="securityCamera"
                    id="securityCamera"
                    onChange={handleCheck}
                    checked={perks.includes('securityCamera')}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                </svg>

                <span>Security Camera</span>
            </label>
        </>
    )
}

export default Perks