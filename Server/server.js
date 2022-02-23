const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const config = require('./app/config/db.config');
const getGoogleJobs = require('./app/lib/getGoogleJobs');
const getLinkedInJobs = require('./app/lib/getLinkedInJobs');
const checkPortfolio = require('./app/lib/checkPortfolio');
const getGmail = require('./app/lib/getGmail')
const serp = require('./app/lib/serp');
const form = require('./app/lib/form');
const repository = require('./app/repositories/JobRepository')
const Job = require('./app/models/Job')
const app = express();
const url = `https://www.googleapis.com/gmail/v1/users/somebody%40gmail.com/messages/1534c30da00b36af?key=${process.env.GMAIL_API_KEY}`;

require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/')));

// const db = require('./app/models');
// db.mongoose.connect(db.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => {
//         console.log("Connected to database!");
//     })
//     .catch(err => {
//         console.log("Cannot connect to database!", err);
//         process.exit();
//     });

//************* Create Database Connection ************//

mongoose.connect(config.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to database!");
})
    .catch(err => {
        console.log("Cannot connect to database!", err);
        process.exit();
    });


checkPortfolio.startPortfolio();
getGoogleJobs.startGetGoogleJobs();
getLinkedInJobs.startGetLinkedInJobs();

    
app.get('/api/gmail', (req, res) => {
    //var mail;
   getGmail.getGmail(messages => {
     var mail = messages
      //console.log('EMAIL:'+mail)
      cb(mail)
   })


cb(mail =>{
    console.log(mail)
})
});

app.get('/api/portfolio', (req, res) => {
    const date = new Date().getDay()
    res.sendFile(__dirname + `/screenshots/status-pic${date}.png`)
});

app.get('/api/googlejobs', (req, res) => {
    repository.findAllGoogle().then(function (jobs) {
        res.json(jobs);
    }).catch((error) => console.log(error));
});


app.get('/api/linkedin-jobs', (req, res) => {
    repository.findAllLinkedIn().then(function (jobs) {
        res.json(jobs);
    }).catch((error) => console.log(error));
});


app.get('/api/linkedinjobs', (req, res) => {
    linkedIn.getLinkedInJobs().then(function (info) {
        res.json(info)
    });

})

app.get('/api/serpjobs', (req, res) => {
    const SerpApi = require('google-search-results-nodejs');
    const search = new SerpApi.GoogleSearch("d2498eb38600b5fef854d9462c8f8b1ec0cda0b4d06b3cd4e2fbbe08379730a3");
    const params = {
        engine: "google_jobs",
        google_domain: "google.com",
        q: "junior software developers",
        hl: "en",
        gl: "us",
        uule: "&uule=w+CAIQICIHQXRsYW50YQ",
        lrad: "2000",
        start: "0"
    };

    const callback = function (data) {
        let string = "Computer Science";
        let myJobs = data.jobs_results
        myJobs.forEach((job) => {
            if (job.description.includes(string) || job.title.includes("No Experience Required"))
                console.log("Name: ", job.company_name, ", Title: ", job.title)
        })
        res.json(myJobs)
    };

    search.json(params, callback);


})

app.put('/api/:id', (req, res) => {
    const { id } = req.params;
    const job = { saved: true };
    repository.updateById(id, job)
        .then(res.status(200).json([]))
        .catch((error) => console.log(error));
});

app.get('/api/savedjobs', (req, res) => {
    repository.findSaved().then(function (jobs) {
        res.json(jobs);
    }).catch((error) => console.log(error));
});

app.delete('/api/:id', (req, res) => {
    const { id } = req.params;
    repository.deleteById(id).then((ok) => {
        console.log(ok);
        console.log(`Deleted record with id: ${id}`);
        res.status(200).json([]);
    }).catch((error) => console.log(error));
});

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server Is Running in ${PORT}...`);
});