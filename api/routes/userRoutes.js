import express from 'express';
import { registerPost, loginPost, profileGet, logoutPost, uploadLinkPost, uploadPost, postPlaces, getPlaces, getPlace, putPlace, postBooking, getBookings } from '../controllers/userController.js';
import multer from 'multer';
const router = express.Router();
const upload = multer({ dest: 'uploads/' })


router.post('/register', registerPost);
router.post('/login', loginPost);
router.get('/profile', profileGet);
router.post('/logout', logoutPost);
router.post('/upload-link', uploadLinkPost);
router.post('/upload', upload.array('photos', 10), uploadPost);
router.post('/places', postPlaces)
router.get('/places', getPlaces)
router.get('/places/:id', getPlace)
router.put('/places/', putPlace)
router.post('/booking', postBooking)
router.get('/bookings', getBookings)
export default router