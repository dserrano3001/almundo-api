import * as express from "express";
import { ItemCtrl } from "../controllers/item.ctrl";

const router: express.Router = express.Router();

router.get('/items', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const items = await ItemCtrl.getAll(req.query.q);
    res.status(200).json({
      data: items,
      result: true
    });
  } catch (error) {
    res.status(500).json({
      data: error,
      result: false
    });
  }
});

router.get('/items/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const item = await ItemCtrl.getId(req.params.id);

    if (!item) {
      res.status(404).json({
        data: null,
        result: false
      });
    } else {
      res.status(200).json({
        data: item,
        result: true
      });
    }
  } catch (error) {
    res.status(500).json({
      data: error,
      result: false
    });
  }
});

export = router;