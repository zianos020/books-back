// 1.req mongoose
const mongoose = require('mongoose');
// 2. create DB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected to DB');
} catch (error) {
    console.log(` can not Connected to DB ${error}`);

}};
// 3. export connectDB
module.exports = connectDB;


