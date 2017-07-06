import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import AllAlbums from './AllAlbums';
import SingleAlbum from './SingleAlbum';
import Sidebar from './Sidebar';
import Player from './Player';
import AllArtists from './AllArtists';
import SingleArtist from './SingleArtist';

export default class Main extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div id="main" className="container-fluid">
          <div className="col-xs-2">
            <Sidebar />
          </div>
          <div className="col-xs-10">
            <Route exact path="/" component={AllAlbums} />
            <Route exact path="/albums" component={AllAlbums} />
            <Route exact path="/artists" component={AllArtists} />
            <Route exact path="/artists/:artistId" component={SingleArtist} />
            <Route path="/albums/:albumId" component={SingleAlbum} />

          </div>
          <Player />
        </div>
      </Router>
    );
  }
}
