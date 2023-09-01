import express from 'express';
import { getNormalPlaces, getNormalPlace } from '../controllers/normalController.js';

const router = express.Router();


router.get('/normal-places', getNormalPlaces)
router.get('/normal-place/:id', getNormalPlace)

export default router