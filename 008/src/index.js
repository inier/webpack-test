var messages = require('./component/Message/index');
import face from './component/Face/index';
import content from './component/Content/index';
import Button from './component/Button/index';

var app = document.getElementById('app');
var newMessage = () => (`hi 008<p>${messages.hi},${messages.event}</p><p>${face}<img src="${face}"> </p><p> ${content}<img src="${content}"></p>`);
var newButtonDom = () => (Button.button);
app.innerHTML = newMessage() + newButtonDom();

Button.attachEl();

if (module.hot) {
    //启用热重载
    module
        .hot
        .accept();
}