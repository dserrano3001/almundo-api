import * as express from "express";
import { HotelCtrl } from "../controllers/hotel.ctrl";
import * as Qs from "qs";

const bodyParser = require('body-parser');
const router: express.Router = express.Router();

router.get('/hotels', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    let q = (req.qs) ? Qs.parse(req.qs) : {};
    const hotels = await HotelCtrl.getAll(q);
    res.status(200).json({
      data: hotels,
      result: true
    });
  } catch (error) {
    res.status(500).json({
      data: error,
      result: false
    });
  }
});

router.get('/hotels/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const hotel = await HotelCtrl.getId(req.params.id);
    res.status(200).json({
      data: hotel,
      result: true
    });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({
      data: error,
      result: false
    });
  }
});

router.post('/hotels', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const hotel = await HotelCtrl.post(req.body);
    res.status(200).json({
      data: hotel,
      result: true
    });
  } catch (error) {
    res.status(500).json({
      data: error,
      result: false
    });
  }
});

router.put('/hotels/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const hotel = await HotelCtrl.update(req.params.id, req.body);
    res.status(200).json({
      data: hotel,
      result: true
    });
  } catch (error) {
    res.status(500).json({
      data: error,
      result: false
    });
  }
});


router.delete('/hotels/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const hotel = await HotelCtrl.delete(req.params.id);
    res.status(200).json({
      data: null,
      result: true
    });
  } catch (error) {
    res.status(500).json({
      data: error,
      result: false
    });
  }
});


export = router;