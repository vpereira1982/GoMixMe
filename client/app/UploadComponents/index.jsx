import React from 'react';
import ReactDOM from 'react-dom';
import Cropper from 'react-cropper';
import MixUpload from './MixUpload.jsx';
import MultitrackUpload from './MultitrackUpload.jsx';
import UploadInfo from './UploadInfo.jsx';
import handleConditionalForm from '../helperFunctions/handleCondForm.js'
import '../../css/upload.css';


class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: null,
      isMix: null,
      isFirstPageComplete: null
    };
    this.handleFormData = this.handleFormData.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    this.setState({
      isMix: (e.target.value === 'Mix' ? true : false)
    });
    handleConditionalForm(e);
  }

  handleFormData(e) {
    e.preventDefault();
    this.setState({
      isFirstPageComplete: true,
      formData: new FormData(document.querySelector('#Form'))
    });
  }

  render() {
    const { isFirstPageComplete } = this.state;

    if (!isFirstPageComplete) {
      return (
        <div className="bg-light">
          <div className="container bg-white content-body">
            <h2 className="pageHeader header-custom">Upload Audio</h2>
            <form method="POST" id="Form" onSubmit={this.handleFormData} encType="multipart/form-data">
              <div className="form-group">
                <p>
                  <strong>Step 1:</strong>
                  Do you want to upload a Multitrack Session (i.e. several files) or a Mix?
                </p>
                <select
                  className="form-control btn btn-success dropdown-toggle"
                  name="type"
                  onChange={this.handleSelect}
                  required>
                  <option className="defaultOption" defaultValue>Select Option</option>
                  <option value="Mix">Mix</option>
                  <option value="Multitrack">Multitrack</option>
                </select>
              </div>
              {/* Step2 for Mix Uploads */}
              <MixUpload handleForm={handleConditionalForm} />
              {/* Step2 for Multitracks */}
              <MultitrackUpload handleForm={handleConditionalForm} />
              <button type="button" id="button" className="btn btn-success">
                Continue
              </button>
            </form>
          </div>
        </div>
      )
    }

    // Route user to the Upload details page after Page 1 is completed.
    if (isFirstPageComplete) {
      return (
        <UploadInfo
          handleChange={this.props.handleChange}
          formData={this.state.formData}
          isMix={this.state.isMix}
          customHistory={this.props.customHistory}
        />
      )
    }
  }
}


export default Upload;