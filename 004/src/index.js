var messages = require('./component/messages/index');

var app = document.getElementById('app');
app.innerHTML = "hi 004<p>" + messages.hi + ',' + messages.event + "</p>";

if (module.hot) {
    //启用热重载
    module
        .hot
        .accept();
}