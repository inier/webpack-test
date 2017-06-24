var messages = require('./component/Message/index');
import face from './component/Face/index';
import content from './component/Content/index';
import Button from './component/Button/index';

var app = document.getElementById('app');
var newMessage = () => (`hi 010<p>${messages.hi},${messages.event}</p><p>${face}<img src="${face}"> </p><p> ${content}<img src="${content}"></p>`);
var newButtonDom = () => (Button.button);
var style = require('./style/index.css');

const newEnvStr = () => (`<div class="${style.box}">    
    DEV:${DEVELOPMENT.toString()}<br>    
    PRO:${PRODUCTION.toString()}<br>
</div>`);

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