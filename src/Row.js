import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import * as request from './axios';
import styles from './Row.module.scss';

const cx = classNames.bind(styles);

const baseURL = 'https://image.tmdb.org/t/p/original/';

function Row({ title, fetchUrl, isLargeRow = false }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(() => {
        async function fetchData() {
            const res = await request.get(fetchUrl);
            setMovies(res.results);
            return res;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoPlay: true,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || '')
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    console.log(movies);

    return (
        <div className={cx('row')}>
            <h2 className={cx('row_title')}>{title}</h2>
            <div className={cx('row_posters')}>
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={10}
                    slidesPerView={!isLargeRow ? 5 : 7}
                    scrollbar={{ draggable: true }}
                >
                    {movies.map((movie, index) => (
                        <SwiperSlide key={index}>
                            <img
                                className={cx(`row_poster`, `${isLargeRow && 'row_posterLarge'}`)}
                                key={movie.id}
                                src={`${baseURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.name}
                                onClick={() => handleClick(movie)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    );
}

export default Row;
