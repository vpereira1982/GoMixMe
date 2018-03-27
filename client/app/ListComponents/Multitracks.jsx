import React from 'react';
import ReactDOM from 'react-dom';
import Multitrack from './Multitrack.jsx';

const Multitracks = (props) => (
  <div>
    {props.multitracks.map((each, i) =>
      <Multitrack key={each.id} multiDetails={each} />
    )}
  </div>
)


export default Multitracks;