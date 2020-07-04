const express = require('express');
const bodyParser = require('body-parser');
const deviceRouter = require('./routes/deviceis-routes');

const mongoose = require('mongoose');
const cors = require('cors');

var url = process.env.MONGO_URL;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('mongo connection successful'))
    .catch((err) => console.error(err));

const app = express();

app.use('*', cors());
app.use(bodyParser.json());
app.use('/device', deviceRouter);

var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

app.listen(server_port, server_host, () => {
    console.log('Listening on port %d', server_port);
})