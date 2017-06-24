var messages = require('./component/messages/index');

var app = document.getElementById('app');
app.innerHTML = "hi 002<p>" + messages.hi + ',' + messages.event + "</p>";