import React from 'react';
import ReactDOM from 'react-dom';

export default (props) => {
  const play = () => {
    let audioElem = props.audio;
    let thisTrack = props.track.url.replace(/ /g, "%20");
    let prevPauseIcon = document.querySelector('.pause');

    // if there is already an audio src, pause;
    audioElem.src ? audioElem.pause() : null;

    if (prevPauseIcon) {
      // if paused icon exists, remove its pause class and change to play icon
      prevPauseIcon.classList.remove('pause');
      prevPauseIcon.innerHTML = 'play_circle_outline';
    }

    // if this src is NOT the same track as current audio src, play
    if (thisTrack !== audioElem.src) {
      audioElem.src = props.track.url;
      audioElem.play();

      // if it's playing, icon should change to 'pause'
      let currIcon = document.getElementsByClassName('lil_play_icon')[Number(props.index)]
      currIcon.innerHTML = 'pause_circle_outline'
      currIcon.classList.add('pause');
    }
  }

  return (
      <li className="list-group-item list-item-hover" id={props.index} onClick={play}>
        <a href="javascript:void(0)">
          <i className="lil_play_icon material-icons mr-3 align-bottom">play_circle_outline</i>
        </a>
      {props.track.title}
      </li>
  )
}
