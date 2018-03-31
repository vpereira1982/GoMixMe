import React from 'react';
import ReactDOM from 'react-dom';
import MtEachTrack from './MtEachTrack.jsx';

export default (props) => {
  // track-player class keeps player at bottom. No need for that with MTracks
  let parentNode = document.getElementById('track-player');
  if (parentNode) {
    parentNode.className = "col-12";
  }

  return (
    <div>
      <ul className="list-group-flush" style={{"height": "200px", "width": "90%", "overflow": "auto"}}>
      {props.playlist.map((track, i) =>
        <MtEachTrack index={i} track={track} key={i} audio={props.audio} />)
      }
      </ul>
    </div>
  )
}
