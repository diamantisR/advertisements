import express from 'express';
import * as AdvertisementsController from '../controllers/advertisements';
var request = require('request');

const router = express.Router();

// GET all advertisements
router.get('/', AdvertisementsController.getAdvertisements);

// GET a single advertisement
router.get('/:advertisementId', AdvertisementsController.getAdvertisement);

// POST a new advertisement
router.post('/', AdvertisementsController.createAdvertisement);

// UPDATE a advertisement
router.patch('/:advertisementId', AdvertisementsController.updateAdvertisement);

// DELETE a advertisement
router.delete(
  '/:advertisementId',
  AdvertisementsController.deleteAdvertisement
);

export default router;
