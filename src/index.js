import Promise from 'core-js/es6/promise';
import 'isomorphic-fetch';

// Style
import './app.scss';

function getPhotoQuote() {
  Promise.all([
    // Unsplash
    fetch('https://api.unsplash.com/photos/random?orientation=landscape', {
      method: 'GET',
      headers: {
        'Accept-Version': 'v1',
        Authorization: `Client-ID a04c2b5488ec14158ffea259aeba4a953a1609529953d7e2ec5842534a62b025`,
      }
    })
    .then(res => res.json()),
    // Mashape
    fetch('https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1', {
      method: 'GET',
      headers: {
        'X-Mashape-Key': 'GSsVv2gcn2msh0cMXiCm0bbUQj1Kp1dUVbrjsnSham6TBdN2Du',
        Accept: 'application/json',
      }
    })
    .then(res => res.json()),
  ]).then((responses) => {
    const image  = responses[0];
    const  text = responses[1];
    const authorEl = document.getElementsByClassName('Quote-author')[0]
    const photographerEl = document.getElementsByClassName('App-photographer')[0];
    const { user: {name: photographerName, links: { html: photographerLink } } } = image;
    const utmParams = 'utm_source=inglkruiz&utm_medium=referral&utm_campaign=api-credit';
    
    document.getElementsByTagName('body')[0].style.backgroundImage = `url("${image.urls.regular}")`;

    fetch(image.links.download_location, {
      method: 'GET',
      headers: {
        'Accept-Version': 'v1',
        Authorization: `Client-ID a04c2b5488ec14158ffea259aeba4a953a1609529953d7e2ec5842534a62b025`,
      }
    })


    document.getElementsByClassName('Quote-text')[0].innerHTML = `"${text.quote}"`;
    authorEl.setAttribute('title', text.author);
    authorEl.innerHTML = text.author;

    photographerEl.setAttribute('href', `${photographerLink}?${utmParams}`);
    photographerEl.innerHTML= photographerName;

    document.getElementsByClassName('App-downloadPhoto')[0].setAttribute('href', `${image.links.download}?${utmParams}`);
  });
}


const DOMReadyPromise = (function promise() {
  if (document.readyState !== 'loading') {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    document.addEventListener('DOMContentLoaded', () => {
      resolve();
    });
  });
}());

DOMReadyPromise.then(() => {
  getPhotoQuote();
  document.getElementById('getQuoteBtn').addEventListener('click', getPhotoQuote);
})
