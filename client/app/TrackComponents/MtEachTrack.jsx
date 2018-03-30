import React from 'react';
import ReactDOM from 'react-dom';

export default (props) => {
  let play = () => {
    let audio = props.audio;
    audio.src ? audio.pause() : null;
    audio.src = props.track.url;
    audio.play();
  }
  return (
     <li className="list-group-item" id={props.index} onClick={play}>{props.track.title}</li>
  )
}
