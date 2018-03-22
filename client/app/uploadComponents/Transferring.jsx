import React from 'react';
import ReactDOM from 'react-dom';
import '../../css/loading.css';

const Transferring = () => {
  return (
    <div className="bg-light">
      <div className="container bg-white content-body">
        <div className="sampleContainer">
          <h3 className="text-center"> Uploading... </h3>
          <div className="loader">
              <br/>
              <span className="dot dot_1"></span>
              <span className="dot dot_2"></span>
              <span className="dot dot_3"></span>
              <span className="dot dot_4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Transferring;