import React from 'react';
import ReactDOM from 'react-dom';
import Comment from './Comment.jsx';

const Comments = (props) => (
  <div>
    {props.comments.map(each =>
      <Comment key={each.id} line={each} />
    )}
  </div>
)

export default Comments;