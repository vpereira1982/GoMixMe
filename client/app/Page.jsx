import React from 'react';
import ReactDOM from 'react-dom';
import Multitracks from './listComponents/Multitracks.jsx';
import Mixes from './listComponents/Mixes.jsx';


const Page = (props) => (
  <div className="row">
    <div className="col-5">
      <h1 className="display-4 header-custom mt-3">Mixes</h1>
      <Mixes mixes={props.tracklist.mixes} />
    </div>
    <div className="col-1">
      <div className="row">
        <div className="col-6 border-right border-main"></div>
      </div>
    </div>
    <div className="col-5">
      <h1 className="display-4 header-custom mt-3">Multitrack Sessions</h1>
      <Multitracks multitracks={props.tracklist.multitracks} />
    </div>
  </div>
);

export default Page;