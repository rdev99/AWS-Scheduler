import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import demo_scheduler from './routes/demo_scheduler';
import auth_router from './routes/auth_router';
import {initTable} from './dbops';


const app=express();

initTable();

app.use(cors());
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// app.set('view engine','html');

app.use(session({
    resave : false,
    saveUninitialized : true,
    secret : 'ganganchura'
}))

app.use('/',demo_scheduler);
app.use('/',auth_router);
const PORT = 8081

app.listen(PORT,() =>console.log(`Server Started on ${PORT}`));