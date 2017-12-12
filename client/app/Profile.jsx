import React from 'react';
import ReactDOM from 'react-dom';
import Results from './Results.jsx';
import ReactAudioPlayer from 'react-audio-player';

const Profile = (props) => {
  let profile = {
    firstname: props.profileAttributes.firstname,
    lastname: props.profileAttributes.lastname,
    genre: props.profileAttributes.genre,
    file: props.profileAttributes.file.slice(14),
    filepath: 'userfiles/' + props.profileAttributes.file
  }

  return (
    <div className='border-1 profile'>
      <ul>
        <li>{profile.firstname} {profile.lastname}</li>
        <li>{profile.genre}</li>
        <li><a href={profile.filepath}> {profile.file}</a></li>
        <ReactAudioPlayer src={profile.filepath} controls />
      </ul>
    </div>
  )
}


export default Profile;
