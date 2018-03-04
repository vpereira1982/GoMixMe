import React from 'react';

const MultitrackUpload = (props) => (
  <div>
    <div className="form-group multitrack">
      <p><strong>Step 2:</strong> Before you upload your entire multitrack session. Please upload a 15-30s mixdown/bounce so other users can get an idea of your song</p>
      <input
        type="file"
        className="form-control form-control-lg"
        name="SessionPreviewFile"
        accept="application/x-zip-compressed,audio/*"
        onChange={props.handleForm}
        />
    </div>
    <div className="form-group multitrack">
      <p><strong>Step 3:</strong> Now it's time to upload your Audio files! But first, please confirm all tracks will be syncronized when mixers load them in their Digital Audio Workstations</p>
      <label>
        <input
          type="checkbox"
          name="isSessionSynced"
          onChange={props.handleForm}
          />
          {' I confirm all tracks were prepared to start at the same time'}
      </label>
    </div>
    <div className="form-group multitrack">
      <p><strong>Step 4:</strong> Almost there! Now you can select all your Audio track for upload. </p>
      <input
        type="file"
        className="form-control form-control-lg"
        name="SessionFiles"
        accept="application/x-zip-compressed,audio/*"
        multiple
        onChange={props.handleForm}
         />
    </div>
  </div>
)

export default MultitrackUpload;