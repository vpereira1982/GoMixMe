import React from 'react';
import ReactDOM from 'react-dom';
import Multitrack from './Multitrack.jsx';

const Multitracks = (props) => {
  return (
    <div>
      {props.multitracks.map((each, i) =>
        <Multitrack key={each.id} multiDetails={each} />
      )}
    </div>
  )
}

export default Multitracks;