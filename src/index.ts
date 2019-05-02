declare global {
  namespace Express {
    interface Request {
      qs?: any;
    }
  }
}

const fs = require('fs');

const contents = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf8'))[process.env.NODE_ENV || 'development'];

const bodyParser = require('body-parser');

export const confApp: IConfigApp = contents;

import * as express from "express";
import { sequelize } from "./sequelize";
import { IConfigApp } from "configApp";
import { initRoute } from "./routes/routes";
var compression = require('compression');

// Our Express APP config
(async () =>{
  const app = express();

  app.use(compression({
    level: 9
  }));

  app.use('/files-bucket', express.static(__dirname + '/upload_images', {
    maxAge: 1444444
  }));

  app.use("/", express.static(__dirname + '/www', {
    maxAge: 1444444
  }));

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json());

  app.use('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.url.indexOf("?") > -1) {
      req.qs = req.url.split('?')[1];
    }
    next();
  });

  await sequelize.sync({force: false, alter: false});
  initRoute(app);

  app.listen(confApp.port, () => {
    console.log('app listen port ' + confApp.port);
  });
})()
