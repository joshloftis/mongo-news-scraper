// Importing requirements
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const scrapeRoutes = require('./routes/scrape-routes');
const htmlRoutes = require('./routes/html-routes');
const apiRoutes = require('./routes/api-routes');

require('dotenv').config({ path: '.env' });

// Defining the port
const PORT = process.env.PORT || 3000;
// Setting the app up to use express
const app = express();

// Enabling better loggging with morgan
app.use(morgan('dev'));

// Setting the app up to parse submitted data from the front end
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Setting the app up to use the public folder for frontend styles & js
app.use(express.static('public'));

const MONGODB_URI = process.env.MONGODB_URI;

// Setting up mongoose
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true,
});

// Setting the app up to use handlebars as the templating agent
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Setting the app up to use the routes
// app.use(scrapeRoutes);
app.use(htmlRoutes);
app.use('/api', apiRoutes);

// Setting the app up to listen on the specified PORT
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
