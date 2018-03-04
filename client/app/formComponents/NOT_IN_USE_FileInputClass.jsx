import React from 'react';
import ReactDOM from 'react-dom';
import { createImgSrc }  from '../helperFunctions/createImgSrc.js';
import { connect } from 'react-redux';
import { handleUploadImage } from '../actions';

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleImageFile = this.handleImageFile.bind(this);
  }

  handleImageFile (e) {
    let imageFile = e.target.files[0];

    createImgSrc(imageFile, (result) => {
      this.props.handleUploadImage(result);
    });
  }

  render() {
    return (
      <input
        type="file"
        id={this.props.cssId}
        name={`${this.props.name}`}
        className="imgUploadInput form-control form-control-lg"
        onChange={this.handleImageFile}
        required={this.props.require}
        accept={this.props.accept}
        style={this.props.style}
      />
    )
  }
}

export default connect(null, { handleUploadImage } )(FileInput);
