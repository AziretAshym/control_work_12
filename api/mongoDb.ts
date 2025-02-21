import { Db, MongoClient } from "mongodb";

let db: Db;
let client: MongoClient;

const connect = async () => {
  client = await MongoClient.connect("mongodb://localhost");
  db = client.db("");
};

const disconnect = async () => {
  await client.close();
};

const MongoDb = {
  connect,
  disconnect,
  getDb: () => db,
};

export default MongoDb;
