import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import AudioPlayer from 'react-responsive-audio-player';
import { connect } from 'react-redux';
import Loading from '../Loading.jsx';
import Comments from './Comments.jsx';
import '../../css/audioplayer.css';
import '../../css/track.css';


class TrackPage extends React.Component {
  constructor(props) {
    super(props);
    this.path = 'http://127.0.0.1:8080/userfiles/';
    this.state = {
      comments: null,
      trackInfo: null,
      newComment: ''
    }
    this.handleNewComment = this.handleNewComment.bind(this);
    this.handleChange = this.props.handleChange.bind(this);
  }

  componentDidMount() {
    const { type, uname, track } = this.props.match.params;
    const title = track.replace(/-/g, " ");
    const isMix = type === 'mix';

    axios.get('/api/trackDetails', { params: { isMix, uname, title } })
      .then(res => {
        this.setState({thisTrack: res.data[0]})

        const { isMix, id } = res.data[0];

        axios.get('/api/trackComments', { params: { isMix, id } })
        .then(res => {
          this.setState({comments: res.data});
        });
      })
  }

  handleNewComment(e) {
    e.preventDefault();
    // axios call will happen here..
  }

  render() {
    if (!this.state.thisTrack) {
      return <Loading />
    } else {
      const { thisTrack, comments, newComment } = this.state;
      const curUserPic = this.path + this.props.userPic;
      const uploaderPic = this.path + thisTrack.profilepic;
      const trackImg = this.path + JSON.parse(thisTrack.image).filename;
      const filePath = this.path + JSON.parse(thisTrack.file).filename;
      const playlist = [{url: filePath, title: `${thisTrack.artist} - ${thisTrack.title}`}];
      console.log(this.state.comments)
      return (
        <div className="bg-light">
          <div className="container bg-white content-body">
            <div className="row">
              <div className="col-8">
                <div className="row">
                  <div className="col-1">
                    <i className="header-custom material-icons track-play-icon">play_circle_filled</i>
                  </div>
                  <div className="col-11">
                    <span className="header-custom pl-1">{thisTrack.title}</span>
                    <small className="text-muted ml-2">Mix</small>
                  </div>
                </div>
                <div className="row">
                  <div className="offset-md-1 col-11">
                    <p className="track-play-info">Uploaded by:
                      <a href="#" className="font-weight-light pl-2">{thisTrack.displayname}</a>
                    </p>
                    <p><span className="artwork-genre">{thisTrack.genre}</span></p>
                  </div>
                </div>
                <div className="row">
                  <div className="track-player col-12">
                    <AudioPlayer playlist={playlist} />
                  </div>
                </div>
              </div>
              <div className="col-4">
                <img className="rounded float-right track-main-img" src={`${trackImg}`} />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-12">
                <form className="form-inline" onSubmit={this.handleNewComment} >
                  <div className="track-add-comment">
                    <img className="track-img-comment" src={`${curUserPic}`} />
                    <input
                      type="text"
                      className="track-input form-control mr-2"
                      name="newComment"
                      value={newComment}
                      onChange={this.handleChange}
                      placeholder="Add a Comment"
                    />
                  </div>
                </form>
                <hr/>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-2">
                <img className="track-uploader-img" src={`${uploaderPic}`} />
              </div>
              <div className="col-10">
                <div className="ml-4">
                  <h5 className="track-uploader">{thisTrack.displayname}'s Upload Details:</h5>
                  <p className="font-weight-light">{thisTrack.description}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-2">
              {/*This box only serves to move the comments below the descript box*/}
              </div>
              <div className="col-10">
                <div className="ml-4">
                  <hr/>
                  <h5 className="track-uploader mb-4">
                    {comments && comments.length ?
                      `${comments.length > 1 ? comments.length + ' Comments:' : '1 Comment'}` :
                      'No comments yet'
                    }
                  </h5>
                  {comments ? <Comments comments={comments} /> : 'No comments yet'}
                </div>
              </div>
            </div>

          </div>
        </div>
      )
    }
  }
}

const MapStateToProps = (state) => {
  return {
    userPic: state.userDetails.profilePic,
  };
}

export default connect(MapStateToProps, null)(TrackPage);