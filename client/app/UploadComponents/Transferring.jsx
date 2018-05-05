import React from 'react';
import ReactDOM from 'react-dom';
import '../../css/loading.css';

const Transferring = () => {
  setTimeout(() => {
    const smallText = document.querySelector('small');
    smallText.innerHTML = "This may take a while.."
  }, 10000);

  return (
    <div className="bg-light">
      <div className="container bg-white content-body">
        <div className="sampleContainer">
          <h3 className="text-center">Uploading</h3>
          <small className="text-center d-block"> </small>
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