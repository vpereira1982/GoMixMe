import React from 'react';

const MixUpload = (props) => (
  <div className="form-group mix">
    <p><strong>Step 2:</strong> Upload your Mixed track</p>
    <input
      type="file"
      className="form-control form-control-lg"
      name="mixFile"
      accept="application/x-zip-compressed,audio/*"
      onChange={props.handleForm}
      />
  </div>
);

export default MixUpload;