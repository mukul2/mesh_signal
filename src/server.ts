import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import { initMeetingServer } from './lib/meeting-server';
import router from './routes';

const PORT = 8081;
const app = express();
const server = http.createServer(app);

initMeetingServer(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin:'*',
  preflightContinue: false,
};

//use cors middleware
router.use(cors(options));

//add your routes

//enable pre-flight
router.options('*', cors(options));




//app.use(cors());

app.get('/echo', (req, res) => {
  res.send('Echo From server');
});

app.use(router);

server.listen(PORT, () => {
  console.log(`Server started at port : ${PORT}`);
});
