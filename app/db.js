import pg from "pg";
import { POSTGRES_INFO } from "../infoDb";

pg.connect(POSTGRES_INFO, onConnect);

const onConnect = (err, client, done) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  client.end();
}
