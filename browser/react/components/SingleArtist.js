import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Songs from '../components/Songs';

export default class SingleArtist extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedArtist: {},
            selectedArtistAlbums: [],
            selectedArtistSongs: []
        }
    }

    componentDidMount() {
        const artistId = this.props.match.params.artistId;

        axios.get(`/api/artists/${artistId}`)
            .then(res => res.data)
            .then(artist => {
                this.setState({selectedArtist: artist});
            });

        axios.get(`/api/artists/${artistId}/albums`)
            .then(res => res.data)
            .then(artistAlbums => {
                this.setState({selectedArtistAlbums: artistAlbums});
            });

        axios.get(`/api/artists/${artistId}/songs`)
            .then(res => res.data)
            .then(artistSongs => {
                this.setState({selectedArtistSongs: artistSongs});
            });
    }

    render() {

        const artist = this.state.selectedArtist;
        const artistAlbums = this.state.selectedArtistAlbums;
        const artistSongs = this.state.selectedArtistSongs;

        return (
            <div>
                <h3>{ artist.name }</h3>
                <h4>
                    {
                        artistAlbums.map(album => (
                            <div className="col-xs-4" key={ album.id }>
                                <Link className="thumbnail" to={`/albums/${album.id}`}>
                                    <img src={ album.imageUrl }/>
                                    <div className="caption">
                                        <h5>
                                            <span>{ album.name }</span>
                                        </h5>
                                        <small>{ album.songs.length } songs</small>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </h4>
                <h4>
                    <Songs songs={artistSongs}/>
                </h4>
            </div>
        );
    }
}

