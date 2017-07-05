import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import AllAlbums from './AllAlbums';
import SingleAlbum from './SingleAlbum';
import Sidebar from './Sidebar';
import Player from './Player';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.selectAlbum = this.selectAlbum.bind(this);
    this.deselectAlbum = this.deselectAlbum.bind(this);
  }

  selectAlbum(albumId) {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => this.setState({
        selectedAlbum: album
      }));
  }

  deselectAlbum() {
    this.setState({ selectedAlbum: {} });
  }

  render() {
    return (
      <Router>
        <div id="main" className="container-fluid">
          <div className="col-xs-2">
            <Sidebar deselectAlbum={this.deselectAlbum} />
          </div>
          <div className="col-xs-10">
            <Route exact path="/" component={AllAlbums} />
            <Route exact path="/albums" component={AllAlbums} />
            <Route path="albums/:albumId" component={SingleAlbum} />
          </div>
          <Player />
        </div>
      </Router>
    );
  }
}
