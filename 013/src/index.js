import face from './component/Face/index';
var style = require('./style/index.css');
var appStyle = require('./style/app.scss');
import $ from 'jquery';

var app = document.getElementById('app');
var newMessage = () => (`hi 013!!!<p>${face}<img src="${face}"></p>`);

var tBtns = () => (`    
<div id="menu">        
<button id="loadPage1">Load1</button>        
<button id="loadPage2">Load2</button>    
</div>    
<div id="content">        
<h1>home</h1>    
</div>`);

const newEnvStr = () => (`<div class="${style.box}">    
    DEV:${DEVELOPMENT.toString()}<br>    
    PRO:${PRODUCTION.toString()}<br>
</div>`);

$('#app').css('background', '#ff0');

app.innerHTML = newEnvStr() + newMessage() + tBtns();

document
    .getElementById('loadPage1')
    .addEventListener('click', () => {
        //System.import 会令每个可能的模块都产生一个独立的块（chunk）。
        System
            .import ('./component/page1/index')
            .then(pageModule => {
                document
                    .getElementById('content')
                    .innerHTML = pageModule.default;
            })
    });
document
    .getElementById('loadPage2')
    .addEventListener('click', () => {
        System
            .import ('./component/page2/index')
            .then(pageModule => {
                document
                    .getElementById('content')
                    .innerHTML = pageModule.default;
            })
    });

if (DEVELOPMENT) {
    if (module.hot) {
        //启用热重载
        module
            .hot
            .accept();
    }
}