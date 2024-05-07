import './style.css';
import TabAbout from './js/tab-about'
import TabHome from './js/tab-home'
import TabMenu from './js/tab-menu'

const __render = (key = 'home') => {
    const element = document.getElementById('content');
    element.textContent = ''
    if(key === 'home'){
        element.appendChild(TabHome())
        element.classList.remove('background-white')
    } else if(key === 'menu') {
        element.appendChild(TabMenu())
        element.classList.add('background-white')
    } else {
        element.appendChild(TabAbout())
        element.classList.add('background-white')
    }

}

function initialScreen() {
    __render()
    const elementHome = document.querySelector('.home');
    elementHome.onclick = function(){ __render('home'); };
    const elementMenu = document.querySelector('.menu');
    elementMenu.onclick = function(){ __render('menu'); };
    const elementAbout = document.querySelector('.about');
    elementAbout.onclick = function(){ __render('about'); };
}

initialScreen()

