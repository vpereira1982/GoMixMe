import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../Loading.jsx';
import Comments from './Comments.jsx';
import MultitrackPlayer from './MtPlayer.jsx';
import MixPlayer from './MixPlayer.jsx';
import createPlaylist from '../helperFunctions/genPlaylist.js';
import '../../css/track.css';

class TrackPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null,
      thisTrack: null,
      playButton: false,
      playlist: [],
      newComment: ''
    }
    this.audio = new Audio();
    this.playTime = 0;
    this.path = 'http://localhost:8080/userfiles/';
    this.handleNewComment = this.handleNewComment.bind(this);
    this.handleChange = this.props.handleChange.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.handleClickToPlay = this.handleClickToPlay.bind(this);
  }

  componentDidMount() {
    const { type, uname, track } = this.props.match.params;
    const title = track.replace(/-/g, " ");
    const isMix = type === 'mix';

    axios.get('/api/trackDetails', { params: { isMix, uname, title } })
      .then(res => {
        this.setState({
          thisTrack: res.data[0],
          playlist: createPlaylist(res.data[0])
        })
        this.pullComments(res.data[0])
      });
  }

  componentWillUnmount() {
    this.audio.pause();
    this.audio.removeAttribute('src');
  }

  pullComments(params) {
    axios.get('/api/trackComments', { params })
      .then(res => {
        this.setState({comments: res.data});
      });
  }

  handleNewComment(e) {
    e.preventDefault();
    if (this.state.newComment === '') return;

    const details = {
      comment: this.state.newComment,
      trackId: this.state.thisTrack.id,
      userId: this.props.userId,
      isMix: this.props.match.params.type === 'mix'
    }
    axios.post('/api/addNewComment', details)
      .then(res => {
        this.pullComments(details);
        this.setState({newComment: ''});
      });
  }

  handleClickToPlay(e) {
    // previewFile only exists for Multitracks
    let { file, previewFile } = this.state.thisTrack;
    let track = previewFile || file;
    let filePath = this.path + JSON.parse(track).filename;
    let icon = document.querySelector('.track-play-icon');

    if (this.audio.src) {
      this.playTime = this.audio.currentTime;
      this.audio.pause();
      this.audio.removeAttribute('src');
      icon.innerHTML = 'play_circle_filled';
    } else {
      this.audio.src = filePath;

      // if ongoing audio, update currentTime with what is stored
      this.audio.currentTime = this.playTime;
      this.audio.play();
      icon.innerHTML = 'pause_circle_filled';
    }
  }

  handleDownload() {
    let button = document.querySelector('.btn-custom');
    button.innerHTML = 'Processing...';

    // if <button> has a backgroundColor, it ran before so return.
    if (button.style.backgroundColor !== '') {
      button.style.backgroundColor = 'red';
      button.innerHTML = 'Already Downloaded';
      return;
    }

    axios({
      url: 'api/download',
      method: 'GET',
      params: this.state.playlist,
      responseType: 'blob'
    })
    .then(res => {
      // creates <a> tag w/ a 'download' attr and auto-clicks
      let url = URL.createObjectURL(res.data) // remove this
      let link = document.createElement('a');
      link.href = url;
      link.download = this.state.thisTrack.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // remove this
      button.innerHTML = 'Complete';
      button.style.backgroundColor = '#2A35CD';
    })
    // now delete the large file from server
    .then(res => axios.delete('/api/delete'));
  }


  render() {
    if (!this.state.thisTrack) {
      return <Loading />
    } else {
      const { thisTrack, comments, newComment, playlist } = this.state;
      const curUserPic = this.path + this.props.userPic;
      const uploaderPic = this.path + thisTrack.profilepic;
      const trackImg = this.path + JSON.parse(thisTrack.image).filename;
      return (
        <div className="bg-light">
          <div className="container bg-white content-body">
            <div className="row">
              <div className="col-8">
                <div className="row">
                  <div className="col-1">
                    <a href={"javascript:void(0)"} onClick={this.handleClickToPlay}>
                      <i className="header-custom material-icons track-play-icon">play_circle_filled</i>
                    </a>
                  </div>
                  <div className="col-11">
                    <span className="header-custom pl-1">{thisTrack.title}</span>
                    <small className="text-muted ml-2">{thisTrack.isMix ? 'Mix' : 'Multitrack'}</small>
                  </div>
                </div>

                <div className="row">
                  <div className="offset-md-1 col-11">
                    <p className="track-play-info">Uploaded by:
                      <Link to={`/${thisTrack.displayname}`}>
                        <span href="#" className="font-weight-light pl-2">{thisTrack.displayname}</span>
                      </Link>
                    </p>
                    <p><span className="artwork-genre">{thisTrack.genre}</span></p>
                    {thisTrack.isMix ?
                      null :
                      <button onClick={this.handleDownload} className="btn btn-custom mb-4 mt-2">
                        Download Files
                      </button>
                    }
                  </div>
                </div>

                <div className="row">
                  <div id="track-player" className="track-player col-12">
                    {thisTrack.isMix ?
                      <MixPlayer playlist={playlist} audio={this.audio} /> :
                      <MultitrackPlayer playlist={playlist} audio={this.audio} />
                    }
                  </div>
                </div>
              </div>
              <div className="col-4">
                <img className="float-right track-main-img" src={`${trackImg}`} />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-12">
                <form className="form-inline" onSubmit={this.handleNewComment} >
                  <div className="track-add-comment">
                    <img className="track-img-comment rounded" src={`${curUserPic}`} />
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
                <img className="track-uploader-img rounded" src={`${uploaderPic}`} />
              </div>
              <div className="col-10">
                <div className="ml-4">
                  <h5 className="track-uploader">{thisTrack.displayname}'s Track Details:</h5>
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
    userPic: state.userDetails.profilepic,
    userId: state.userDetails.id
  };
}

export default connect(MapStateToProps, null)(TrackPage);