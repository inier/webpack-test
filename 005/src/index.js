var messages = require('./component/messages/index');

var app = document.getElementById('app');
var newMessage = () => (`hi 005<p>${messages.hi},${messages.event}</p>`);
app.innerHTML = newMessage();
if (module.hot) {
    //启用热重载
    module
        .hot
        .accept();
}