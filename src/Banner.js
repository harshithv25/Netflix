import React, { useState, useEffect } from 'react'
import axios from './axios'
import requests from './requests'
import './Banner.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

function Banner() {

    const [movie, setMovie] = useState('');
    const [trailerUrl, setTrailerUrl] = useState('');
    const base_url = 'https://image.tmdb.org/t/p/original/'
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchAnimated);
            const banner = Math.floor(Math.random() * request.data.results.length - 1);
            setMovie(request.data.results[banner]);
        }
        fetchData();
    }, [])

    const opts = {
        height: '450',
        width: '100%',
        playerVars: {
            autoplay: true
        },
    }
    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.title || '')
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                }).catch(error => console.log(error))
        }

    }
    return (
        <header className="banner cover " style={{ backgroundImage: `url(${base_url}${movie.backdrop_path})`, backgroundSize: 'cover', }}>
            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie.original_title}
                </h1>
                <div className="banner__buttons">
                    <button onClick={() => handleClick(movie)}>Play</button>
                    <button>My List</button>
                </div>
                <h1 className="banner__description">
                    {movie.overview}
                </h1>
            </div>
            <div className="banner--fadeBottom"></div>
            <div className="vid">
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            </div>
        </header >
    )
}

export default Banner
