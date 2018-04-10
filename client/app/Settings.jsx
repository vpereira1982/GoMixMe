import React from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createImgSrc }  from './helperFunctions/createImgSrc.js';
import Cropper from 'react-cropper';
import '../css/cropper.css';

class Settings extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      pw: '',
      cropResult: props.userDetails.profilepic,
      cropFile: null
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleImgFile = this.handleImgFile.bind(this);
    this.handleChange = this.props.handleChange.bind(this);
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
    axios.post('/api/newuser', formData).then((res) => {
      // Dispatch email && pw to Redux State so handleLogin() can log the new user
      this.props.updateEmail(this.state.email);
      this.props.updatePw(this.state.pw);
      this.handleLogin();
    })
  }


  render() {
    const {
      profilepic,
      firstname,
      lastname,
      displayname,
      description,
      email,
      genre
    } = this.props.userDetails;

    const {
      cropResult,
      pw,
      cropFile
    } = this.state;

    console.log(this.props.userDetails)
    return (
        <div className="bg-light">
          <div className="container bg-white content-body">
            <div className="row">
              <div className="col-4 mt-2 mb-2">
                <img className="rounded track-main-img border" src={`http://localhost:8080/userfiles/${profilepic}`} />
              </div>
              <div className="col-8">
                <h3 className="profile-headline">Settings</h3>
                <h5 className="font-weight-light mt-4 mb-4">Favorite Genre:
                  <span className="artwork-genre ml-3">{genre}</span>
                </h5>
              </div>
            </div>
          <div className="row">
            <div className="col-12">
              <form method="POST" onSubmit={this.handleFormSubmit} encType="multipart/form-data" id="form">
                <div className="form-group input-sm">
                  <input
                    name="firstname"
                    type="text"
                    className="form-control"
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
                    onChange={this.handleChange}
                    placeholder="New Password"
                    value={pw}
                    required
                    />
                </div>
                <div className="form-group">
                  <input
                    name="email"
                    type="text"
                    className="form-control"
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
                    rows="5" cols="25"
                    onChange={this.handleChange}
                    placeholder="Tell us a bit about yourself"
                    value={description}
                    required
                    />
                </div>
                <div className="form-group">
                {/* GENRE DROPDOWN */}
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
                  <div className="form-group">
                  {/* UPLOAD IMAGE button */}
                    <label htmlFor='image' className='btn btn-info'>Upload Profile Photo</label>
                    <input
                      name="image"
                      type="file"
                      id="image"
                      onChange={this.handleImgFile}
                      className="form-control invisible"
                      accept="image/x-png,image/gif,image/jpeg"
                    />
                    <Cropper
                      style={{ height: 300, width: 300 }}
                      aspectRatio={1}
                      zoomable={false}
                      scalable={false}
                      guides={false}
                      src={profilepic}
                      ref={(cropper) => {this.cropper = cropper}}
                    />
                  {/* CROP FILE  button */}
                    <button type="button" className='btn btn-danger mt-3 mb-3' onClick={this.cropImage} required>
                      Crop Image
                    </button>
                    <br />
                    <img className="cropped-img-preview " src={cropResult} />
                  </div>
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const MapStateToProps = (state) => {
  return {
    userDetails: state.userDetails
  }
}

export default connect(MapStateToProps, null)(Settings);