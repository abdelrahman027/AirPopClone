import PlacesModel from "../models/places.js"
export const getNormalPlaces = async (req, res, next) => {
    try
    {
        const allPlaces = await PlacesModel.find();
        if (!allPlaces)
        {
            res.status(500).json('no places found')
        }
        res.status(200).json(allPlaces)
    }
    catch (err)
    {
        console.log(err)
    }
}

export const getNormalPlace = async (req, res, next) => {
    const { id } = req.params
    const response = await PlacesModel.findById(id)
    res.json(response)
}