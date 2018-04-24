import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Cropper from 'react-cropper';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { createImgSrc }  from './helperFunctions/createImgSrc.js';
import '../css/cropper.css';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.defaultImg = '../../images/default-profile.jpg';
    this.state = {
      profilePic: this.defaultImg,
      cropResult: this.defaultImg,
      cropFile: null,
      displayname: '',
      description: ''
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleImgFile = this.handleImgFile.bind(this);
    this.handleChange = this.props.handleChange.bind(this);
    this.handleLogin = this.props.handleLogin.bind(this);
    this.cropImage = this.cropImage.bind(this);
  }

  handleImgFile(e) {
    let imageFile = e.target.files[0];
    createImgSrc(imageFile, (result) => {
      this.setState({ profilePic: result });
    });
  }

  cropImage() {
    // convert dataURI -> Blob -> File
    let canvas = this.cropper.getCroppedCanvas();

    canvas.toBlob((blob) => {
      this.setState({
        cropResult: canvas.toDataURL(),
        cropFile: new File([blob], 'croppedImg.png', {type: 'image/png', lastModified: Date.now()})
      });
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let formElement = document.getElementById('form');
    let formData = new FormData(formElement);
    let userInfo = this.props.userInfo;
    document.querySelector('#submitReg').innerHTML = 'Saving..'

    // append the new Cropped file to the FormData
    formData.append('firstname', userInfo.firstname);
    formData.append('lastname', userInfo.lastname);
    formData.append('pw', userInfo.pw);
    formData.append('email', userInfo.email);
    formData.append('imageCropped', this.state.cropFile, 'croppedImg.png');

    // send FORM to API
    axios.post('/api/newUser', formData)
      .then((res) => {
        // hold a few secs so AWSS3 saves the profile pic
        setTimeout(() => this.handleLogin(null, userInfo.email, userInfo.pw), 3000);
      })
      .catch((err) => {
        alert('Displayname and/or email already exist.');
        location.reload();
      })
  }

  render() {
    const {
      firstname,
      lastname,
      displayname,
      pw,
      email,
      description,
      cropResult,
      profilePic
    } = this.state;

    return (
      <div className="col-md-6 offset-md-3 signup text-white bg-navy">
        <h2> Sign Up </h2> <br />
        <form method="POST" onSubmit={this.handleFormSubmit} encType="multipart/form-data" id="form">
          <div className="form-group">
            <input
              name="displayname"
              maxLength="12"
              minLength="3"
              type="text"
              className="form-control"
              onChange={this.handleChange}
              placeholder="Display Name"
              value={displayname}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              type="text"
              maxLength="350"
              className="form-control"
              rows="5" cols="25"
              onChange={this.handleChange}
              placeholder="Tell us a bit about yourself"
              value={description}
              required
            />
          </div>

          {/* SELECT FAV GENRE DDOWN. */}
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

          {/* UPLOAD IMAGE button */}
          <div className="form-group p-2 pb-4 signup-pic">
            <h3 className="mt-2 mb-4"> Profile picture </h3>
            <Cropper
              style={{ height: 300, width: 300 }}
              aspectRatio={1}
              zoomable={false}
              scalable={false}
              guides={false}
              src={profilePic}
              ref={(cropper) => {this.cropper = cropper}}
            />
            <label htmlFor='image' className='btn btn-info mb-3 mt-3'>Upload Profile Image</label>
            <input
              name="image"
              type="file"
              id="image"
              onChange={this.handleImgFile}
              className="form-control d-none"
              accept="image/x-png,image/gif,image/jpeg"
            />

            {/* CROP FILE  button */}
            <button type="button" className='btn btn-danger mt-2 mb-1 d-block' onClick={this.cropImage} required>
              Crop Image
            </button>
            <br />
            <h6 className="text-light">Preview</h6>
            <img className="cropped-img-preview border" src={cropResult} />
          </div>
          <hr />
          <button id="submitReg" type="submit" className="btn btn-success btn-lg mt-3">Submit</button>
        </form>
      </div>
    )
  }
}

export default Signup;