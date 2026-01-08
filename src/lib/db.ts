import { connect } from "mongoose";

let cashed = global.mongoose;

if (!cashed) {
  cashed = global.mongoose = {
    conn: null,
    promise: null,
  };
}
const connectDb = async () => {
  if (cashed.conn) {
    console.log("Database connected")
    return cashed.conn;
  }
  if (!cashed.promise) {
    cashed.promise = connect(process.env.MONGODB_URI as string).then(
      (c) => c.connection
    );
  }
  try {
    cashed.conn = await cashed.promise;
  } catch (error) {
    throw error;
  }
  return cashed.conn;
};

export default connectDb;
