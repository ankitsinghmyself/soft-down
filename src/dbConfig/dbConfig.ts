import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.once("open", () => {
      console.log(">>> DB is connected");
    })
    connection.on("error", (err) => {   
        console.log('mongo connection error', err);
        process.exit();
    });
    ;
  } catch (error) {
    console.log(">>> DB is not connected", error);
  }
}
