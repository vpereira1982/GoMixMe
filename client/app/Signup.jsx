import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import App from './App.jsx';
import Cropper from 'react-cropper';
import APIcall from '../apicall/ajax.js';
import '../css/cropper.css';
import { Link } from 'react-router-dom';


class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      src: '../images/default-profile.jpg',
      cropResult: null,
      cropFile: null
    };

    this.formSubmit = this.formSubmit.bind(this);
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

    // convert dataURI -> Blob -> File
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
    let formElement = document.getElementById('postform');
    let formData = new FormData(formElement);

    // append the new Cropped Image file to the FormData
    formData.append('imageCropped', this.state.cropFile, 'croppedImg.png');

    // send FORM to API
    APIcall.post(formData, '/api', () => { this.props.handleSubmit(e) }, false).bind(this);

    // auto-log user using the same handleSubmit as <Login />

  }

  render() {
    return (
      <div className="col-md-4 col-md-offset-4 bg-primary signup">
        <h2> Sign Up </h2> <br />
        <form method="POST" onSubmit={this.formSubmit} encType="multipart/form-data" id="postform">
          <div className="form-group">
            <input type="text" className="form-control form-control-lg" placeholder="First Name" required name="firstname"/>
          </div>
          <div className="form-group">
            <input type="text" className="form-control form-control-lg" placeholder="Last Name" required name="lastname"/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control form-control-lg" placeholder="Password" onChange={this.props.handleChange} value={this.props.pw} required name="pw"/>
          </div>
          <div className="form-group">
            <input type="text" className="form-control form-control-lg" placeholder="Email" onChange={this.props.handleChange} value={this.props.email} required name="email"/>
          </div>
          <div className="form-group">
          {/* this is the UPLOAD AUDIO button */}
            <label htmlFor="file">Upload Music</label>
            <input type="file" className="form-control form-control-lg" id="file" name="audiofile" accept="application/x-zip-compressed,audio/*" />
            <br />
            <div className="form-group">
              <select className="custom-select btn btn-success dropdown-toggle" required name="genre">
                <option defaultValue>Favorite Genre</option>
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
                <input
                  type="file"
                  onChange={this.onChange.bind(this)}
                  style={{"visibility":"hidden"}}
                  className='imgUploadInput form-control form-control-lg'
                  id='image'
                  name='image'
                  accept='image/x-png,image/gif,image/jpeg'
                  multiple
                />
                <Cropper
                  style={{ height: 200, width: '50%' }}
                  aspectRatio={4 / 3}
                  preview="img-preview"
                  guides={false}
                  src={this.state.src}
                  ref={cropper => { this.cropper = cropper; }}
                />
              </div>
              <div>
                {/* this is the CROP FILE  button */}
                <button type="button" className='btn btn-danger' onClick={this.cropImage.bind(this)}>
                  Crop Image
                </button>
                <br />
                <img style={{ width: '20%', border: 'solid 0.5 grey' }} src={this.state.cropResult} />
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


export default Signup;
