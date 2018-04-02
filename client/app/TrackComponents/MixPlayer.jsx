import React from 'React';
import ReactDOM from 'React-DOM';

class MixPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: '0:00',
      duration: 0
    }
  }

  componentWillMount() {
    let audioMix = this.props.audio;

    audioMix.onloadedmetadata = () => {
      let duration = parseInt(audioMix.duration);
      let displayDuration = Math.floor(duration/60) + ':' + parseInt(duration % 60);
      this.setState({ duration: displayDuration });
    };

    setInterval(() => {
      let currentTimeInt = Math.round(audioMix.currentTime);
      let minutes = Math.floor(currentTimeInt / 60);

      let seconds = Math.abs(
        Math.floor((minutes * 60) - currentTimeInt));
      console.log(currentTimeInt, minutes, seconds)

      this.setState({
        currentTime: minutes  + ':' + (seconds < 10 ? "0" + seconds : seconds)
      });
    }, 1000);
  }

  render () {
    let { duration, currentTime } = this.state;
    return (
      <div className="mix_player">
        <span className="ml-3 font-weight-light">
            {duration ?
              `${this.state.currentTime} / ${this.state.duration}`:
              `${this.props.playlist[0].title}`
            }
        </span>
      </div>
    )
  }
}

export default MixPlayer;