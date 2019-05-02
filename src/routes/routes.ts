import * as express from "express";

export function initRoute(app: express.Application) {
  let router: express.Router = express.Router();

  router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(200).json({
      data: 'ping',
      result: true
    });
  });
  
  router.use(require("./item.router"));
  app.use('/api', router);
}