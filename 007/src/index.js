var messages = require('./component/Message/index');
import face from './component/Face/index';
import content from './component/Content/index';

var app = document.getElementById('app');
var newMessage = () => (`hi 007<p>${messages.hi},${messages.event}</p><p>${face}<img src="${face}"> </p><p> ${content}<img src="${content}"></p>`);
app.innerHTML = newMessage();

if (module.hot) {
    //启用热重载
    module
        .hot
        .accept();
}