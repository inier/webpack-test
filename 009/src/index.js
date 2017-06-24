var messages = require('./component/Message/index');
import face from './component/Face/index';
import content from './component/Content/index';
import Button from './component/Button/index';

var app = document.getElementById('app');
var newMessage = () => (`hi 009<p>${messages.hi},${messages.event}</p><p>${face}<img src="${face}"> </p><p> ${content}<img src="${content}"></p>`);
var newButtonDom = () => (Button.button);

const newEnvStr = () => (`    
    DEV:${DEVELOPMENT.toString()}<br>    
    PRO:${PRODUCTION.toString()}<br><br>
`);

app.innerHTML = newEnvStr() + newMessage() + newButtonDom();
Button.attachEl();

if (DEVELOPMENT) {
    if (module.hot) {
        //启用热重载
        module
            .hot
            .accept();
    }
}