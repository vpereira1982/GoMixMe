import React from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { createImgSrc }  from './helperFunctions/createImgSrc.js';
import Cropper from 'react-cropper';
import '../css/cropper.css';

class Settings extends React.Component {
  constructor (props) {
    super(props);
    this.currentPic = `https://gomixme.s3.us-east-2.amazonaws.com/${props.profilepic}`;
    this.state = {
      pw: '',
      genre: this.props.genre,
      email: this.props.email,
      description: this.props.description,
      firstname: this.props.firstname,
      lastname: this.props.lastname,
      profilePic: `https://gomixme.s3.us-east-2.amazonaws.com/${props.profilepic}`,
      cropResult: `https://gomixme.s3.us-east-2.amazonaws.com/${props.profilepic}`,
      cropFile: null
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleImgFile = this.handleImgFile.bind(this);
    this.handleChange = this.props.handleChange.bind(this);
    this.cropImage = this.cropImage.bind(this);
  }

  componentDidMount() {
    const userGenre = document.querySelectorAll('option');

    for (let each of userGenre) {
      if (each.value === this.props.genre) {
        each.setAttribute('selected', 'true');
        break;
      }
    }
  }

  handleImgFile(e) {
    const imageFile = e.target.files[0];

    createImgSrc(imageFile, (result) => {
      this.setState({ profilePic: result });
    });
  }

  cropImage() {
    // convert dataURI -> Blob -> File
    const canvas = this.cropper.getCroppedCanvas();

    canvas.toBlob((blob) => {
      this.setState({
        cropResult: canvas.toDataURL(),
        cropFile: new File([blob], 'croppedImg.png', {type: 'image/png', lastModified: Date.now()})
      });
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const formElement = document.getElementById('settingsForm');
    const formData = new FormData(formElement);

    // append the new Cropped file to the FormData
    formData.append('id', this.props.id);
    formData.append('imageCropped', this.state.cropFile, 'croppedImg.png');

    // send FORM to API
    axios.post('/api/updateUser', formData).then((res) => {
      document.querySelector('.alert').classList.remove('invisible');
      setTimeout(() => location.pathname = "/", 3000);
    });
  }

  render() {
    const {
      profilePic,
      cropResult,
      email,
      pw,
      cropFile,
      description,
      firstname,
      lastname,
      genre
    } = this.state;

    return (
      <div className="bg-light">
        <div className="container bg-white content-body">
          <form method="POST" onSubmit={this.handleFormSubmit} encType="multipart/form-data" id="settingsForm">
            <div className="row">
              <div className="col-4 mt-2 mb-2">
                <Cropper
                  style={{ height: 300, width: 300 }}
                  aspectRatio={1}
                  zoomable={false}
                  scalable={false}
                  guides={false}
                  src={profilePic}
                  ref={(cropper) => { this.cropper = cropper }}
                />
                <div className="form-group">

                {/* UPLOAD IMAGE button */}
                  <label htmlFor='image' className='btn btn-info mt-2 mb-2'>Upload Profile Photo</label>
                  <input
                    name="image"
                    type="file"
                    id="image"
                    onChange={this.handleImgFile}
                    className="form-control d-none"
                    accept="image/x-png,image/gif,image/jpeg"
                  />

                {/* CROP FILE  button */}
                  <button type="button" className='btn btn-danger mb-3 d-block' onClick={this.cropImage} required>
                    Crop Image
                  </button>
                  <img className="cropped-img-preview" src={this.state.cropResult} />
                </div>
              </div>
              <div className="col-8">
                <h3 className="profile-headline">Settings</h3>
                <h5 className="font-weight-light mt-4 mb-4">Favorite Genre:

                {/* GENRE SELECTOR DROPDOWN */}
                <select className="dropdown-toggle artwork-genre ml-3" name="genre" required>
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
                </h5>
              </div>
            </div>
          <div className="row">
            <div className="col-12">
                <div className="form-group input-sm">
                  <input
                    name="firstname"
                    type="text"
                    className="form-control"
                    maxlength="15"
                    minlength="3"
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
                    className="form-control"
                    maxlength="15"
                    minlength="3"
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
                    className="form-control"
                    maxlength="15"
                    minlength="3"
                    onChange={this.handleChange}
                    placeholder="Change Password"
                    value={pw}
                  />
                </div>
                <div className="form-group">
                  <input
                    name="email"
                    type="text"
                    className="form-control"
                    maxlength="40"
                    minlength="10"
                    onChange={this.handleChange}
                    placeholder="Email"
                    value={email}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="description"
                    type="text"
                    className="form-control"
                    maxlength="350"
                    rows="5" cols="25"
                    onChange={this.handleChange}
                    placeholder="Tell us a bit about yourself"
                    value={description}
                  />
                </div>
                <button type="submit" className="btn btn-success btn-lg mt-3 mb-3">
                  Submit Changes
                </button>
              </div>
            </div>
          </form>
          <div className="alert alert-success invisible">
            Your profile is getting updated! Please wait...
          </div>
        </div>
      </div>
    )
  }
}

const MapStateToProps = (state) => (state.userDetails);

export default connect(MapStateToProps, null)(Settings);
