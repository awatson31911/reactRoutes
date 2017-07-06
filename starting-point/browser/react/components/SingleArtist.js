import React, { Component } from 'react';
import Songs from '../components/Songs';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class SingleArtist extends Component {
	constructor() {
		super();
		this.state = {
			selectedArtist: {},
			selectedAlbums: [],
			selectedSongs: []
		}
	}

	componentDidMount() {

		// const arrayOfPromises = [
		// 	axios.get(`/api/artists/${artistId}/albums`),
		// 	axios.get(`/api/artists/${artistId}/songs`)
		// ];

		// Promise.all(arrayOfPromises)
		// 	.then(([resAlbums, resSongs]) => ([resAlbums.data, resSongs.data]))
		// 	.then(([albums, songs]) => {
		// 		this.setState({
		// 			selectedAlbums: albums,
		// 			selectedSongs: songs
		// 		})
		// 	})

		const artistId = this.props.match.params.artistId;

		axios.get(`/api/artists/${artistId}`)
			.then(res => res.data)
			.then(artist => {
				console.log('artist', artist)
				this.setState({ selectedArtist: artist })
				console.log('this.selectedArtist', this.state.selectedArtist);
			});

		axios.get(`/api/artists/${artistId}/albums`)
			.then(res => res.data)
			.then(albums => {
				this.setState({ selectedAlbums: albums })
			});

		axios.get(`/api/artists/${artistId}/songs`)
			.then(res => res.data)
			.then(songs => {
				this.setState({ selectedSongs: songs })
			});

	}

	render() {
  const albums = this.state.selectedAlbums;
		return (
			<div>
				<h3>{this.state.selectedArtist.name}</h3>
				<h4>
					<div>
						<h3>Albums</h3>
						<div className="row">
							{
								albums.map(album => (
									<div className="col-xs-4" key={album.id}>

										<Link to={`/albums/${album.id}`} className="thumbnail" href="#">
											<img src={album.imageUrl} />
											<div className="caption">
												<h5>
													<span>{album.name}</span>
												</h5>
												<small>{album.songs.length} songs</small>
											</div>
										</Link>
									</div>
								))
							}
						</div>
					</div>
				</h4>
				<h4><Songs songs={this.state.selectedSongs} />></h4>
			</div>
		)
	}
}
