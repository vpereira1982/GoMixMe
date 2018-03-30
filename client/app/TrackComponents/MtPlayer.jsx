import React from 'react';
import ReactDOM from 'react-dom';
import MtEachTrack from './MtEachTrack.jsx';

export default (props) => {
  let audio = document.createElement('audio');

  return (
    <div className="porra">
      <ul className="list-group">
      {props.playlist.map((track, i) =>
        <MtEachTrack track={track} key={i} audio={audio} />)
      }
      </ul>
    </div>
  )
}
