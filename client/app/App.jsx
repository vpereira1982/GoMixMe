import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Header from './Header.jsx';
import Main from './Main.jsx';
import Login from './Login.jsx';
import Upload from './UploadComponents/index.jsx';
import TrackPage from './TrackComponents/TrackPage.jsx';
import Loading from './Loading.jsx';
import Settings from './Settings.jsx';
import Search from './Search.jsx';
import ErrorMessage from './Error.jsx';
import Profile from './Profile.jsx';
import { connect } from 'react-redux';
import * as Actions from './actions';

// LOAD REACT-ROUTER MODULES
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

const customHistory = createBrowserHistory();

class App extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    // Checks if user is valid
    axios.get('/api/session').then(user => {
      if (user) {
        // Call Redux Action Creators:
        this.props.persistUser(user.data);
      } else {
        this.props.isLogged = false;
      }
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  //************************
  // Conditional Homepage Routing
  //************************
  render() {
    const { isLogged = '' } = this.props.userDetails;

    if (isLogged === '') {
      return <Loading />
    } else {
      return (
        <BrowserRouter>
          <div>
            {isLogged ? <Header /> : null}
            {isLogged ?
              <Switch>
                <Route
                  path="/:type/:uname/:track"
                  render={(props) =>
                    <TrackPage {...props} handleChange={this.handleChange} />
                  }
                />
                <Route
                  path="/upload"
                  exact
                  render={(props) =>
                    <Upload
                      customHistory={customHistory}
                      handleChange={this.handleChange}
                    />
                  }
                />
                <Route
                  path="/search"
                  exact
                  render={(props) =>
                    <Search
                      customHistory={customHistory}
                      handleChange={this.handleChange}
                    />
                  }
                />
                <Route
                  path="/"
                  exact
                  render={(props) => <Main {...props} history={customHistory} />}
                />
                <Route
                  path="/:uname"
                  exact
                  render={(props) => <Profile {...props} />}
                />
                <Route
                  path="/settings/:uname"
                  exact
                  render={(props) =>
                    <Settings {...props} handleChange={this.handleChange} />}
                />
                <Route component={ErrorMessage} />
              </Switch>
            : /********************
              If User is not logged
              *********************/
              <Switch>
                <Route
                  path="/"
                  render={() =>
                    <Login handleChange={this.handleChange} customHistory={customHistory} />
                  }
                />
                <Route component={ErrorMessage} />
              </Switch>
            }
          </div>
        </BrowserRouter>
      )
    }
  }
}

const MapStateToProps = (state) => {
  return { userDetails: state.userDetails };
};

export default connect(MapStateToProps, Actions)(App);