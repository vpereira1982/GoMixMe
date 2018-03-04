import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Cropper from 'react-cropper';
import APIcall from '../apicall/ajax.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changePw, changeEmail } from './actions';
import { TextInput }  from './formComponents/InputForms.jsx';
import FileInput from './formComponents/FileInputClass.jsx';
import createImgSrc from './helperFunctions/createImgSrc.js';

import '../css/cropper.css';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cropResult: null,
      cropFile: null,
      firstname: '',
      lastname: '',
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.props.handleChange.bind(this);
    this.handleLogin = this.props.handleLogin.bind(this);
    this.cropImage = this.cropImage.bind(this);
  }


  cropImage() {
    if (!this.cropper.getCroppedCanvas()) { return };

    // convert dataURI -> Blob -> File
    let canvas = this.cropper.getCroppedCanvas();

    canvas.toBlob((blob) => {
      this.setState({
        cropResult: canvas.toDataURL(),
        cropFile:
          new File([blob], 'croppedImg.png', {type: 'image/png', lastModified: Date.now()})
      });
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let formElement = document.getElementById('form');
    let formData = new FormData(formElement);

    // append the new Cropped Image file to the FormData
    formData.append('imageCropped', this.state.cropFile, 'croppedImg.png');
    // send FORM to API
    APIcall.post(formData, '/api', () => {
      // Send email && pw to Redux Store so handleLogin can log this user
      this.props.changeEmail(this.state.email);
      this.props.changePw(this.state.pw);
      this.handleLogin();
    });
  }


  render() {
    const {
      firstname,
      lastname,
      cropResult
    } = this.state;

    const {
      email,
      pw,
      profilePic
    } = this.props

    return (
      <div className="col-md-4 col-md-offset-4 bg-primary signup">
        <h2> Sign Up </h2> <br />
        <form method="POST" onSubmit={this.handleFormSubmit} encType="multipart/form-data" id="form">
          <div className="form-group">
            {TextInput('firstname', 'text', 'First Name', this.handleChange, firstname, true)}
          </div>
          <div className="form-group">
            {TextInput('lastname', 'text', 'Last Name', this.handleChange, lastname, true)}
          </div>
          <div className="form-group">
            {TextInput('pw', 'password', 'Password', this.props.changePw, pw, true)}
          </div>
          <div className="form-group">
            {TextInput('email', 'text', 'Email', this.props.changeEmail, email, true)}
          </div>
          <div className="form-group">
          {/* this is the UPLOAD AUDIO button. */}
            <label htmlFor="file">Upload Music</label>
            <input
              type="file"
              name="audiofile"
              className="form-control form-control-lg"
              id="file"
              accept="application/x-zip-compressed,audio/*"
            />
            <br />
            <div className="form-group">
              <select className="custom-select btn btn-success dropdown-toggle" name="genre" required>
                <option value="">Favorite Genre</option>
                <option value="Blues">Blues</option>
                <option value="Classical">Classical</option>
                <option value="Country">Country</option>
                <option value="Electronic">Electronic</option>
                <option value="Rock">Rock</option>
                <option value="Grunge">Grunge</option>
                <option value="Pop">Pop</option>
                <option value="Metal">Metal</option>
                <option value="Jazz">Jazz</option>
              </select>
            </div>
            <div>
              <div style={{ width: '45%' }}>
              {/* this is the UPLOAD IMAGE button */}
                <label htmlFor='image' className='btn btn-info'>Upload Profile Photo</label>
                <FileInput
                  name={"image"}
                  cssId={"image"}
                  style={{visibility: "hidden"}}
                  accept={"image/x-png,image/gif,image/jpeg"}
                  require={true}
                />
                <Cropper
                  style={{ height: 100, width: 50 }}
                  aspectRatio={1}
                  preview="img-preview"
                  zoomable={false}
                  scalable={false}
                  guides={false}
                  src={this.props.profilePic}
                  ref={(cropper) => {this.cropper = cropper}}
                />
              </div>
              <div>
                {/* this is the CROP FILE  button */}
                <button type="button" className='btn btn-danger' onClick={this.cropImage}>
                  Crop Image
                </button>
                <br />
                <img style={{ width: '20%', border: 'solid 0.5 grey' }} src={cropResult} />
              </div>
              <br style={{ clear: 'both' }} />
            </div>
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    )
  }
}

const MapStateToProps = (state) => {
  const { profilePic, email, pw } = state.userDetails;

  return {
    profilePic,
    email,
    pw
  }
}

export default connect(MapStateToProps, { changePw, changeEmail })(Signup);