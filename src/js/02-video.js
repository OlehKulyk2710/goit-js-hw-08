import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeRef = document.querySelector('iframe');
const player = new Player(iframeRef);

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate(data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
}

const currentPlayerTime =
  localStorage.getItem('videoplayer-current-time') === null
    ? 0
    : localStorage.getItem('videoplayer-current-time');

player.setCurrentTime(currentPlayerTime);

// console.log('currentPlayerTime:', currentPlayerTime);
