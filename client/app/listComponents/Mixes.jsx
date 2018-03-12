import React from 'react';
import ReactDOM from 'react-dom';
import Mix from './Mix.jsx';

const Mixes = (props) => {
  return (
    <div>
      {props.mixes.map((each, i) =>
        <Mix key={each.id} mixDetails={each} />
      )}
    </div>
  )
}

export default Mixes;