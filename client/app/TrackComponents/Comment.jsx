import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import calcTime from '../helperFunctions/calcElapsedTime.js'

const Comment = (props) => {
  const userPic = `https://gomixme.s3.us-east-2.amazonaws.com/${props.line.profilepic}`;

  return (
    <div>
      <img className="track-img-comment" src={userPic} />
      <small className="float-right text-muted font-italic">{calcTime(props.line.dt)}</small>
      <Link to={`/${props.line.displayname}`}>
        <h6 className="small">{props.line.displayname}</h6>
      </Link>
      <p className="font-weight-light small">{props.line.comment}</p>
    </div>
  )
}

export default Comment;