import Promise from 'core-js/es6/promise';
import 'isomorphic-fetch';

// Style
import './app.scss';

fetch('https://api.unsplash.com//photos/random', {
  method: 'GET',
  headers: {
    'Accept-Version': 'v1',
    Authorization: `Client-ID a04c2b5488ec14158ffea259aeba4a953a1609529953d7e2ec5842534a62b025`
  }
})
.then(res => res.json())
.then((res) => {
  document.getElementsByTagName('body')[0].style.backgroundImage = `url("${res.urls.regular}")`;
});