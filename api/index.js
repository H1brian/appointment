import express from 'express'
import 'dotenv/config';

const app = express();

app.use(express.json()); 

// Connect to the server
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});