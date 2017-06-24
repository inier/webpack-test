var messages = require('./component/messages/index');
import face from './component/face/index';
import content from './component/content/index';

var app = document.getElementById('app');
var newMessage = () => (`hi 006<p>${messages.hi},${messages.event}</p><p>${face}<img src="${face}"> </p><p> ${content}<img src="${content}"></p>`);
app.innerHTML = newMessage();

if (module.hot) {
    //启用热重载
    module
        .hot
        .accept();
}