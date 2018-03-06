import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Cropper from 'react-cropper';
import APIcall from '../apicall';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changePw, changeEmail } from './actions';
import { createImgSrc }  from './helperFunctions/createImgSrc.js';
import '../css/cropper.css';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic: '../../images/default-profile.jpg',
      cropResult: null,
      cropFile: null,
      firstname: '',
      lastname: '',
      email: '',
      pw: ''
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
      this.setState({
        profilePic: result
      });
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

    // append the new Cropped Image file to the FormData
    formData.append('imageCropped', this.state.cropFile, 'croppedImg.png');
    // send FORM to API


    axios.post('/api', formData).then((res) => {
      // Dispatch email && pw to Redux Store so handleLogin() can log the new user
      this.props.changeEmail(this.state.email);
      this.props.changePw(this.state.pw);
      this.handleLogin();
    })

/*    APIcall.post(formData, '/api', () => {
      // Dispatch email && pw to Redux Store so handleLogin() can log the new user
      this.props.changeEmail(this.state.email);
      this.props.changePw(this.state.pw);
      this.handleLogin();
    });*/
  }

  render() {
    const {
      firstname,
      lastname,
      pw,
      email,
      cropResult,
      profilePic
    } = this.state;

    return (
      <div className="col-md-4 col-md-offset-4 bg-primary signup">
        <h2> Sign Up </h2> <br />
        <form method="POST" onSubmit={this.handleFormSubmit} encType="multipart/form-data" id="form">
          <div className="form-group">
            <input
              name="firstname"
              type="text"
              className="form-control form-control-lg"
              onChange={this.handleChange}
              placeholder="First Name"
              value={firstname}
              required
              />
          </div>
          <div className="form-group">
            <input
              name="lastname"
              type="text"
              className="form-control form-control-lg"
              onChange={this.handleChange}
              placeholder="Last Name"
              value={lastname}
              required
              />
          </div>
          <div className="form-group">
            <input
              name="pw"
              type="password"
              className="form-control form-control-lg"
              onChange={this.handleChange}
              placeholder="Password"
              value={pw}
              required
              />
          </div>
          <div className="form-group">
            <input
              name="email"
              type="text"
              className="form-control form-control-lg"
              onChange={this.handleChange}
              placeholder="Email"
              value={email}
              required
              />
          </div>
          <div className="form-group">
          {/* UPLOAD AUDIO button. */}
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
              {/* UPLOAD IMAGE button */}
                <label htmlFor='image' className='btn btn-info'>Upload Profile Photo</label>
                <input
                  name="image"
                  type="file"
                  id="image"
                  style={{visibility: "hidden"}}
                  onChange={this.handleImgFile}
                  className="imgUploadInput form-control form-control-lg"
                  accept="image/x-png,image/gif,image/jpeg"
                />
                <Cropper
                  style={{ height: 400, width: 400 }}
                  aspectRatio={1}
                  preview="img-preview"
                  zoomable={false}
                  scalable={false}
                  guides={false}
                  src={profilePic}
                  ref={(cropper) => {this.cropper = cropper}}
                />
              </div>
              <div>
                {/* CROP FILE  button */}
                <button type="button" className='btn btn-danger' onClick={this.cropImage}>Crop Image</button>
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

export default connect(null, { changePw, changeEmail })(Signup);