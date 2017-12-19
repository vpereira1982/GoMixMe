import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Cropper from 'react-cropper';
import Header from './Header.jsx';
import APIcall from '../apicall/ajax.js';
import UploadPage2 from './UploadPage2.jsx';

import '../css/upload.css';

class Upload extends React.Component {
  constructor(props) {
    console.log('this is props inside upload', props);
    super(props);
    this.state = {
      src: '../images/default-profile.jpg',
      cropResult: null,
      cropFile: null,
      isFirstPageComplete: false
    };

    this.formData;
    this.createFormData = this.createFormData.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  handleSelection(e) {
    let step;
    let select = document.querySelector('select');
    let optionSelected = document.querySelector('option');
    let button = document.getElementById('button');

    if (e.target.value === 'Mix' || optionSelected.value === 'Mix') {
      step = document.querySelector('.mix');
      select.innerHTML = '<option value="Mix">Mix</option>';
    } else if (e.target.value === 'Multitrack' || optionSelected.value === 'Multitrack') {
      step = document.querySelector('.multitrack');
      select.innerHTML = '<option>Multitrack</option>';
    }

    // If no further 'steps', button can 'submit' as the last element
    if (step) {
      step.setAttribute('required', '');
      step.className = 'form-group';
    } else {
      button.setAttribute('type', 'submit');
    }
  }

  createFormData(e) {
    e.preventDefault();

    if (!this.formData) {
      this.formData = new FormData(document.querySelector('#Form'));

      this.setState({isFirstPageComplete: true});
    } else {
      // append the new Cropped Image file to the FormData
      // TO DO: THIS NEEDS TO HAPPEN AFTER UPLOADPAGE2 IS COMPLETED! COMMENTING OUT FOR NOW:

      //UNCOMMENT: this.formData.append('imageCropped', this.state.cropFile, 'croppedImg.png');
    }
    // Send FORM to API
    // TO DO: THIS NEEDS TO HAPPEN AFTER UPLOADPAGE2 IS COMPLETED! COMMENTING OUT FOR NOW:
    //UNCOMMENT: APIcall.post(formData, '/api', () => { console.log('Form has been submitted') }, false);
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

  render() {
    if (!this.state.isFirstPageComplete) {
      return (
        <div>
          <Header firstname={this.props.userInfo.firstname} />
          <div className="container">
            <h2> Upload Audio </h2> <br />
            <form encType="multipart/form-data" id="Form" onSubmit={this.createFormData}>
              <div className="form-group">
                <p><strong>Step 1:</strong> Do you want to upload a Multitrack Session (i.e. several files) or a Mix? </p>
                <select
                  className="custom-select btn btn-success dropdown-toggle"
                  name="type"
                  onChange={this.handleSelection}
                  required>
                  <option className="defaultOption" defaultValue>Select Option</option>
                  <option value="Mix">Mix</option>
                  <option value="Multitrack">Multitrack</option>
                </select>
              </div>
              {/*Step2 for Mix Uploads Only*/}
              <div className="form-group mix">
                <p><strong>Step 2:</strong> Upload your Mixed track</p>
                <input
                  type="file"
                  className="form-control form-control-lg"
                  name="bounceFile"
                  accept="application/x-zip-compressed,audio/*"
                  onChange={this.handleSelection}
                  />
              </div>
              {/*Step2 and beyond for Multitracks*/}
              <div className="form-group multitrack">
                <p><strong>Step 2:</strong> Before you upload your entire multitrack session. Please upload a 15-30s mixdown/bounce so other users can get an idea of your song</p>
                <input
                  type="file"
                  className="form-control form-control-lg"
                  name="bounceFile"
                  accept="application/x-zip-compressed,audio/*"
                  onChange={this.handleSelection}
                  />
              </div>
              <div className="form-group multitrack">
                <p><strong>Step 3:</strong> Now it's time to upload your Audio files! But first, please confirm all tracks will be syncronized when mixers load them in their Digital Audio Workstations</p>
                <label>
                  <input
                    type="checkbox"
                    name="isSync"
                    onChange={this.handleSelection}
                    />
                    {' I confirm all tracks were prepared to start at the same time'}
                </label>
              </div>
              <div className="form-group multitrack">
                <p><strong>Step 4:</strong> Almost there! Now you can select all your Audio track for upload. </p>
                <input
                  type="file"
                  className="form-control form-control-lg"
                  name="sessionFiles"
                  accept="application/x-zip-compressed,audio/*"
                  onChange={this.handleSelection}
                   />
              </div>
              <button id="button" type="button" className="btn btn-success">Continue</button>
            </form>
          </div>
        </div>
        )
    }

    if (this.state.isFirstPageComplete) {
      return (
        <div>
          <Header firstname={this.props.userInfo.firstname} />
          <UploadPage2 />
        </div>
      )
    }
  }
}

export default Upload;