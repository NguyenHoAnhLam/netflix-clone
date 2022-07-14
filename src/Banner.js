import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import * as request from './axios';
import requests from './requests';
import styles from './Banner.module.scss';

const cx = classNames.bind(styles);

function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await request.get(requests.fetchNetflixOriginals);
            setMovie(res.results[Math.floor(Math.random() * res.results.length - 1)]);
            return res;
        }
        fetchData();
    }, []);

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + ' ...' : str;
    };

    return (
        <header
            className={cx('banner')}
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: 'center center',
            }}
        >
            <div className={cx('banner_contents')}>
                <h1 className={cx('title')}>{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className={cx('banner_btns')}>
                    <button className={cx('banner_btn')}>Play</button>
                    <button className={cx('banner_btn')}>My List</button>
                </div>
                <h1 className={cx('banner_desc')}>{truncate(movie?.overview, 150)}</h1>
            </div>
            <div className={cx('banner--fadeBottom')}></div>
        </header>
    );
}

export default Banner;
