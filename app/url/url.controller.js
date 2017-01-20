import { Client } from '..//database/db'




import pg from "pg";
import { POSTGRES_INFO } from "../../infoDb";

// const client = Client.connect();

export class controllerUrl{
  static async create(req, res, next) {
    let results = [];
    let DateNow = new Date();
    if(!!!req.body.referId || !!!req.query.url || !!!req.body.gender || !!!req.body.notaType || !!!req.body.acquiredIn || !!!req.body.geoInfo) {
      res.status(400).json({'error': 'Missing att'});
      return next();
    }
     pg.connect(POSTGRES_INFO, (err, client, done) => {
      if(err) {
        res.status(500).json({success: false, data: err});
        done();
        return next();
      }
      client.query('INSERT INTO pg_url(refer, created, url, gender, notatype, acquiredIn, geoinfo) values($1, $2, $3, $4, $5, $6, $7)',
      [ req.body.referId, DateNow, req.query.url, req.body.gender, req.body.notaType, req.body.acquiredIn, req.body.geoInfo]);
      const query = client.query('SELECT * FROM pg_url ORDER BY _id ASC');

      query.on('row', (row) => {
        results.push(row);
      });
      query.on('end', () => {
        res.status(201).json(results);
        done();
        return next();
      });
    });
  }

  static async readAll(req, res, next){
    let result = [];
    pg.connect(POSTGRES_INFO, (err,client,done)=>{
      if(err){
        res.status(500).json({success: false, data: err});
        done();
        return next();
      };
      const query = client.query('SELECT * FROM pg_url ORDER BY _id ASC');
      query.on('row', (row) => {
        result.push(row);
      });
      query.on('end', ()=>{
        res.status(201).json(result);
        done();
        return next();
      });
    });
  }

  static async readSingle(req, res, next){
    let result = [];
    console.log('miao');
    console.log(req.params.urlId);
    if (!!!req.params.urlId){
      res.status(400).json({'error': 'Missing id'});
       return next();
     }

     let urlId = req.params.urlId;

     pg.connect(POSTGRES_INFO, (err, client, done)=>{
       if(err){
         res.status(500).json({success:false, data:err});
         done();
         return next();
       };

       //TypeError: self.values.map is not a function
    //  const query=client.query('SELECT * FROM pg_url WHERE _id=($1)', urlId);
    //    query.on('row', (row)=>{
    //      result.push(row);
    //    });
    //    query.on('end', ()=>{
    //      res.status(201).json(result);
    //      done();
    //      return next();
    //    });
     });

   }

}

// curl -H "Content-type: application/json" --data-binary '{"referId":"io sono un id", "gender" : "m", "notaType": "Banner", "acquiredIn" : "03/07/2016", "geoInfo": "Pescara"}' http://127.0.0.1:3000/api/v1/url/link?url=miao.org/
