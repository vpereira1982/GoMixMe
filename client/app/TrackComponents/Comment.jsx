import React from 'react';
import ReactDOM from 'react-dom';
import calcTime from '../helperFunctions/calcElapsedTime.js'

const Comment = (props) => {
  const userPic = `http://127.0.0.1:8080/userfiles/${props.line.profilepic}`;

  return (
    <div>
      <img className="track-img-comment" src={userPic} />
      <small className="float-right text-muted font-italic">{calcTime(props.line.dt)}</small>
      <h6 className="small">{props.line.displayname}</h6>
      <p className="font-weight-light small">{props.line.comment}</p>
    </div>
  )
}

export default Comment;