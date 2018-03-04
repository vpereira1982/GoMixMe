import React from 'react';
import ReactDOM from 'react-dom';
import { handleUploadImage } from '../actions';
import { createImgSrc } from '../helperFunctions/createImgSrc.js';
import Cropper from 'react-cropper';
import APIcall from '../../apicall';

class UploadDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: '../../images/default-profile.jpg',
      cropResult: null,
      cropFile: null,
      title: '',
      description: ''
    }
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.cropImage = this.cropImage.bind(this);
    this.handleChange = props.handleChange.bind(this);
    this.submitUpload = this.submitUpload.bind(this);
  }

  handleUploadImage(e) {
    let imageFile = e.target.files[0];
    createImgSrc(imageFile, (result) => {
      this.setState({
        imgSrc: result
      });
    });
  }

  cropImage() {
    // convert dataURI -> Blob -> File
    let canvas = this.cropper.getCroppedCanvas();
    canvas.toBlob((blob) => {
      this.setState({
        cropResult: canvas.toDataURL(),
        cropFile: new File(
          [blob], 'croppedImg.png', {type: 'image/png', lastModified: Date.now()}
        )
      });
    });
  }

  submitUpload(e) {
    e.preventDefault();
    let { formData, isMix } = this.props;
    let { cropFile, title, description } = this.state;

    formData.append('image', cropFile, 'croppedImg.png');
    formData.append('isMix', isMix);
    formData.append('title', title);
    formData.append('description', description);

    APIcall.post(formData, '/api', (res) => {
      console.log('Form has been submitted', res) }
    , false);
  }

  render() {
    const { cropResult, title, description } = this.state;
    const { isMix } = this.props;

    return (
      <div className="container">
        <form id="UploadFormInfo" onSubmit={this.submitUpload} encType="multipart/form-data">
          <h2>Share some info</h2>
          <br />
          <div className="form-group">
            <h5><label htmlFor="title">Title</label></h5>
            <input
              name="title"
              type="text"
              id="title"
              size="40"
              placeholder={isMix ? 'Name your Mix' : 'Name your Session'}
              onChange={this.handleChange}
              value={title}
            />
          </div>
          <div className="form-group">
            <h5><label htmlFor="title">Genre</label></h5>
            <select name="genre" className="custom-select btn btn-success dropdown-toggle" required>
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
            <h5><label htmlFor="description">Description:</label></h5>
            <textarea
              name="description"
              type="text"
              id="description"
              rows="5"
              cols="80"
              placeholder={isMix ? 'Describe your Mix' : 'Describe your Session'}
              onChange={this.handleChange}
              value={description}
            />
          </div>
          {/* UPLOAD IMAGE button */}
          <div className="form-group">
            <h6><label htmlFor="uploadImg">Upload Image File</label></h6>
            <input
              type="file"
              name="uploadImg"
              onChange={this.handleUploadImage}
              accept="image/x-png,image/gif,image/jpeg"
            />
            <Cropper
              style={{ height: 300, width: 300 }}
              aspectRatio={1}
              preview="img-preview"
              zoomable={false}
              scalable={false}
              guides={false}
              src={this.state.imgSrc}
              ref={(cropper) => { this.cropper = cropper }}
            />
            <img style={{ width: '10%', border: 'solid 0.5 grey' }} src={cropResult} />
            <button type="button" className='btn btn-danger' onClick={this.cropImage}>Crop Image</button>
          </div>
          <br />
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    )
  }
}

export default UploadDetails;
