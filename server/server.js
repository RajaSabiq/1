//--------------- Import ---------------
const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json;
const cors = require('cors')
const fileUpload = require('express-fileupload');


// App Configuration
const PORT = process.env.PORT || 4000;
const protocol = process.env.PROTOCOL || 'http';
const host = process.env.HOST || 'localhost';

const server = http.createServer(app)

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '.env' });
}

//--------------- Configure Env ---------------
require('dotenv').config();

//--------------- Middelware ---------------
app.use(express.static('public')) // set public directory
app.use('/property', express.static('public/profiles/')); // route for accessing profile images
app.use('/thumbnail', express.static('public/thumbnail/')); // route for accessing thumbnail images
app.use('/assets', express.static('public/assets/')); // route for accessing assets images
app.use(bodyParser.json({ limit: '50mb' })); // setting Request size
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // setting Request size
app.use(express.json());
// app.use(cors()) // allow cors
app.use(cors({    // allow cors from any region
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    origin: '*'
}))
app.use(fileUpload({
    useTempFiles: false,
    tempFileDir: 'public'
}))

//--------------- Database Connect, Authenticate & Sync Tables ---------------
require('./connection/authenticate_and_sync');

//--------------- Controller ---------------
const userController = require('./controllers/user');
const categoryController = require('./controllers/category');
const adminController = require('./controllers/admin');
const assetController = require('./controllers/asset');
const commentController = require('./controllers/comments');
const replycommentController = require('./controllers/reply_comment');
const likeController = require('./controllers/likes');
const followingController = require('./controllers/follow');
const viewsController = require('./controllers/views');

// User Routes
app.use(userController);
app.use(categoryController);
app.use(adminController);
app.use(assetController);
app.use(commentController);
app.use(replycommentController);
app.use(likeController);
app.use(followingController);
app.use(viewsController);

//--------------- Server Listening ---------------
server.listen(process.env.PORT, () => console.log(`Server is running on ${protocol}://${host}:${PORT}`));
