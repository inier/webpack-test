import face from './component/Face/index';
var style = require('./style/index.css');
var appStyle = require('./style/app.scss');

var app = document.getElementById('app');
var newMessage = () => (`hi 012!!!<p>${face}<img src="${face}"></p>`);

const newEnvStr = () => (`<div class="${style.box}">    
    DEV:${DEVELOPMENT.toString()}<br>    
    PRO:${PRODUCTION.toString()}<br>
</div>`);

app.innerHTML = newEnvStr() + newMessage();

if (DEVELOPMENT) {
    if (module.hot) {
        //启用热重载
        module
            .hot
            .accept();
    }
}