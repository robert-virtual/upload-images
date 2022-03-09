const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.DATABASE_URL);

exports.getCollection = async (collection) => {
  let conn = await client.connect();
  let db = conn.db("storeimagesdb");
  return db.collection(collection);
};
