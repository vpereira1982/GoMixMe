import React from 'react';
import ReactDOM from 'react-dom';
import AudioPlayer from 'react-audio-player';
import { Link } from 'react-router-dom';

const Mix = (props) => {
  const {
    artist,
    title,
    description,
    displayname,
    file,
    genre,
    image,
    id,
    userId
  } = props.mixDetails
  const filePath = '../../userfiles/' + JSON.parse(file).filename;
  const imgPath = '../../userfiles/' + JSON.parse(image).filename;

  return (
    <div className="clearfix mt-3 mb-4">
      <Link to={`/mix/${id}`}>
        <img className="float-left artwork-thumbnail" src={imgPath} />
        <h6 className="lead font-weight-bold">
          {title}
        </h6>
        <p className="lead">{artist}</p>
      </Link>
      <p className="artwork-user">
        <i className="user-icon material-icons align-bottom pr-1">person</i>{displayname}
      </p>
      <p><span className="artwork-genre">{genre}</span></p>
      <AudioPlayer className="" src={filePath} controls />
    </div>
  )
}


export default Mix;
