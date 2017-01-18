// import { Client } from '..//database/db'

// const client = Client.connect();

export class controllerUrl{
  static async create(req, res, next) {
    console.log(req.body);
    // console.log(req.params);
    let refer = req.body.referId;
    let date = new Date();
    let url = req.params.url;

    console.log(refer);
    console.log(date);
    console.log(url);


    // console.log(client);
    res.send('miao')
    next()
  }
}
// $ curl --data-binary '{"referId":"io sono un id"}' http://127.0.0.1:3000/v1/url/miao.org
