import React from 'react';
import ReactDOM from 'react-dom';
import Results from './results.jsx';
import ReactAudioPlayer from 'react-audio-player';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.profile = {
      firstname: props.profileAttributes.firstname,
      lastname: props.profileAttributes.lastname,
      genre: props.profileAttributes.genre,
      file: props.profileAttributes.file.slice(14),
      filepath: 'userfiles/' + props.profileAttributes.file
    }
  }

  render() {
    return (
      <div className='border-1 profile'>
        <ul>
          <li>{this.profile.firstname} {this.profile.lastname}</li>
          <li>{this.profile.genre}</li>
          <li><a href={this.profile.filepath}> {this.profile.file}</a></li>
          <ReactAudioPlayer src={this.profile.filepath} controls />
        </ul>
      </div>
      )
  }
}
export default Profile;
