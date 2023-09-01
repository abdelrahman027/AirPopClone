import UserModel from "../models/user.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import ImageDownloader from 'image-downloader';
import * as url from 'url';
import path from 'path'
import multer from 'multer'
import fs from 'fs';
import PlacesModel from "../models/places.js";
import BookingsModel from "../models/Booking.js";


const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'bestintheworld'

export const registerPost = async (req, res, next) => {
    const { username, email, password } = req.body;

    try
    {
        const user = await UserModel.create(
            {
                username,
                email,
                password: bcrypt.hashSync(password, bcryptSalt)
            })
        res.status(201).json({ user })
    } catch (err)
    {
        console.log(err)
        res.status(422).json(err)
    }
};

export const loginPost = async (req, res, next) => {
    const { email, password } = req.body
    try
    {
        const user = await UserModel.findOne({ email: email })
        if (user)
        {
            const passOk = bcrypt.compareSync(password, user.password)
            if (passOk)
            {
                jwt.sign({ email: user.email, id: user._id }, jwtSecret, {}, (err, token) => {
                    if (err) throw err
                    res.cookie('token', token).json(user)

                })
            } else
            {
                res.status(422).json('pass incorrect')
            }
        } else
        {
            res.status(422).json('not found')
        }
    }
    catch (err)
    {
        console.log(err)
        res.status(500).json(err)
    }
};

export const profileGet = (req, res, next) => {
    const { token } = req.cookies;
    if (token)
    {
        jwt.verify(token, jwtSecret, {}, async (err, { id }) => {
            if (err) throw err
            const { username, email, _id } = await UserModel.findById(id)
            res.json({ username, email, _id })
        })
    } else
    {

        res.json(null)
    }
};

export const logoutPost = (req, res, next) => {
    res.cookie('token', '').json(true)
};



export const uploadLinkPost = async (req, res, next) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg'
    await ImageDownloader.image({
        url: link,
        dest: path.join(__dirname, '..', 'uploads', newName)
    });
    res.json(newName)
};

export const uploadPost = (req, res, next) => {
    const uploadedFiles = [];
    req.files.forEach(file => {
        const { path, originalname } = file
        const extension = originalname.split('.')[1]
        const newPath = path + "." + extension
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace("uploads/", ""))
    });
    res.json(uploadedFiles)
};

export const postPlaces = async (req, res, next) => {
    const { token } = req.cookies
    const { title, address, photos,
        description, perks, extraInfo,
        checkIn, checkout, maxGuests, price } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, { id }) => {
        if (err) throw err;
        const placeDoc = await PlacesModel.create({
            owner: id,
            title,
            address,
            photos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkout,
            maxGuests,
            price
        })
        res.json(placeDoc)
    })
};

export const getPlaces = async (req, res, next) => {
    const { token } = req.cookies
    jwt.verify(token, jwtSecret, {}, async (err, { id }) => {
        if (err) throw err;
        const userPlaces = await PlacesModel.find({ owner: id })

        res.json(userPlaces)
    })
};

export const getPlace = async (req, res, next) => {
    const { id } = req.params;
    const place = await PlacesModel.findById(id);
    res.json(place)
};


export const putPlace = async (req, res, next) => {
    const { token } = req.cookies;
    const { id, title, address, photos,
        description, perks, extraInfo,
        checkIn, checkout, maxGuests, price } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;


        const placeDoc = await PlacesModel.findById(id);
        if (userData.id === placeDoc.owner.toString())
        {
            placeDoc.$set({ title, address, photos, description, perks, extraInfo, checkIn, checkout, maxGuests, price })
            await placeDoc.save()
            res.status(201).json('Place Updated')
        } else
        {
            res.status(501).json('user not authorized')
        }

    })
};

export const postBooking = (req, res, next) => {
    const { checkIn, checkOut, guests, name, phone, place, price } = req.body;
    const { token } = req.cookies
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err
        const bookingDoc = await BookingsModel.create({
            place,
            user: userData.id,
            checkIn,
            checkOut,
            guests,
            name,
            phone,
            price
        })
        res.json(bookingDoc)
    })

};

export const getBookings = async (req, res, next) => {
    const { token } = req.cookies
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const bookingsDoc = await BookingsModel.find({ user: userData.id }).populate('place')
        if (!bookingsDoc)
        {
            res.json(404).json('There is no Booking here')
        }
        res.json(bookingsDoc)
    })
}
