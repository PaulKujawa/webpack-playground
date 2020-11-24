import './index.css'
// import _ from 'lodash';

// webpack copies image to /dist, hashes filename, and returns URL
import ImageDogeUrl from './assets/doge.jpg';

function component() {
    const root = document.createElement('div');
    root.classList.add('root');
    
    const header = document.createElement('div');
    header.innerHTML = 'Hello Webpack'; //_.join(['Hello', 'webpack'], ' ');
    header.classList.add('header')
    root.appendChild(header);
    
    const image = new Image (200, 200);
    image.src = ImageDogeUrl;
    root.appendChild(image);
    
    return root;
  }
  
document.body.appendChild(component());