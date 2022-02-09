const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./app/config/db.config');
const google = require('./app/lib/google');
const linkedIn = require('./app/lib/linkedIn')
const serp = require('./app/lib/serp')
const form = require('./app/lib/form')
const puppeteer = require('./app/lib/puppeteer-job');

const app = express();

require('dotenv').config();

var corsOptions = {
    origin: 'http://127.0.0.1:8000'
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const db = require('./app/models');
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(err => {
        console.log("Cannot connect to database!", err);
        process.exit();
    });

    //linkedIn.getLinkedInJobs()
//puppeteer.getScreenShot()
google.getJobs()
serp.getGoogleJobs()
linkedIn.getLinkedInJobs()

app.get('/', (req, res) => {
    res.json({ message: "Hello World" });
});

app.get('/googlejobs', (req, res) => {
    google.getGoogleJobs()
})


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server Is Running in ${PORT}...`);
});