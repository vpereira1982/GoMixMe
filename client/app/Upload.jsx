import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import App from './App.jsx';
import Cropper from 'react-cropper';
import APIcall from '../apicall/ajax.js';
import multitrack from '../css/upload.css';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: '../images/default-profile.jpg',
      cropResult: null,
      cropFile: null
    };

    this.formSubmit = this.formSubmit.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  handleSelection(e) {
    if (e.target.value === 'Mix') {
      document.querySelector('.mix').className = 'form-group';
      document.querySelector('option[value="Multitrack"]').remove();
    } else {
      document.querySelector('.multitrack').className = 'form-group';
      document.querySelector('option[value="Mix"]').remove();
    }
  }

  onChange(e) {
    // 'get' and 'read' file from input field upload
    let file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(file);
  }

  cropImage() {
    if (this.cropper.getCroppedCanvas() === 'undefined') { return } ;

    // Convert dataURI -> Blob -> File
    let canvas = this.cropper.getCroppedCanvas();
    canvas.toBlob((blob) => {
      this.setState({
        cropResult: canvas.toDataURL(),
        cropFile: new File([blob], 'croppedImg.png', {type: 'image/png', lastModified: Date.now()})
      });
    });
  }

  formSubmit(e) {
    e.preventDefault();
    let formElement = document.getElementById('uploadForm');
    let formData = new FormData(formElement);

    // append the new Cropped Image file to the FormData
    formData.append('imageCropped', this.state.cropFile, 'croppedImg.png');

    // Send FORM to API
    APIcall.post(formData, '/api', () => { console.log('Form has been submitted') }, false);
    window.open('/');
  }

  render() {
    return (
      <div>
        <h2> Upload Audio </h2> <br />
        <form method="POST" onSubmit={this.formSubmit} encType="multipart/form-data" id="uploadForm">
          <div className="form-group">
            <p><strong>Step 1:</strong> Do you want to upload a Multitrack Session (i.e. several files) or a Mix? </p>
            <select className="custom-select btn btn-success dropdown-toggle" required name="type" onChange={this.handleSelection}>
              <option defaultValue>Select Option</option>
              <option value="Mix">Mix</option>
              <option value="Multitrack">Multitrack</option>
            </select>
          </div>
          {/*Step2 for Mix Uploads Only*/}
          <div className="form-group mix">
            <p><strong>Step 2:</strong> Upload your Mixed track!</p>
            <input
              type="file"
              className="form-control form-control-lg"
              name="bounceFile"
              accept="application/x-zip-compressed,audio/*" />
          </div>
          {/*Step2 and beyond for Multitracks*/}
          <div className="form-group multitrack">
            <p><strong>Step 2:</strong> Before you upload your entire multitrack session. Please upload a 15-30s mixdown/bounce so other users can get an idea of your song</p>
            <input
              type="file"
              className="form-control form-control-lg"
              name="bounceFile"
              accept="application/x-zip-compressed,audio/*" />
          </div>
          <div className="form-group multitrack">
            <p><strong>Step 3:</strong> Now it's time to upload your Audio files! But first, please confirm all tracks will be syncronized when mixers load them in their Digital Audio Workstations</p>
            <label>
              <input
                name="isSync"
                type="checkbox"
                onChange={this.handleInputChange} />
                {' I confirm all tracks were prepared to start at the same time'}
            </label>
          </div>
          <div className="form-group multitrack">
            <p><strong>Step 4:</strong> Almost there! Now you can select all your Audio track for upload. </p>
            <input
              type="file"
              className="form-control form-control-lg"
              name="sessionFiles"
              accept="application/x-zip-compressed,audio/*" />
          </div>
          <button type="submit" className="btn btn-success">Continue</button>
        </form>
      </div>
    )
  }
}

export default Upload;