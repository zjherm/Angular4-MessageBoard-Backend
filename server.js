var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var messages = [{text: 'some text', owner: 'Tim'},{text: 'other message', owner: 'Jane'}];

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

var api = express.Router();

api.get('/messages', (req, res) => {
    res.json(messages);
})

api.get('/messages/:user', (req, res) => {
	var user = req.params.user;
	console.log(req.params)
	var result = messages.filter(message => message.owner == user);

    res.json(result);
})

api.post('/messages', (req, res) => {
    messages.push(req.body);
    res.json(req.body);
})

app.use('/api', api);

app.listen(63145);