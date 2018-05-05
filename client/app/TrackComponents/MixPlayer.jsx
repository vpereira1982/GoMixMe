import React from 'react';
import ReactDOM from 'react-dom';

class MixPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: '0:00',
      duration: 0
    }
  }

  componentDidMount() {
    const audioMix = this.props.audio;

    audioMix.onloadedmetadata = () => {
      const duration = parseInt(audioMix.duration);
      const displayDuration = Math.floor(duration/60) + ':' + parseInt(duration % 60);
      this.setState({ duration: displayDuration });
    };

    setInterval(() => {
      const currentTimeInt = Math.round(audioMix.currentTime);
      const minutes = Math.floor(currentTimeInt / 60);
      const seconds = Math.abs(Math.floor((minutes * 60) - currentTimeInt));
      this.setState({
        currentTime: minutes  + ':' + (seconds < 10 ? "0" + seconds : seconds)
      });
    }, 1000);
  }

  render () {
    const { duration, currentTime } = this.state;
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