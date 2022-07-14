import React from 'react';
import classNames from 'classnames/bind';

import styles from './App.module.scss';
import Row from './Row';
import Banner from './Banner';
import Nav from './Nav';
import requests from './requests';

const cx = classNames.bind(styles);

function App() {
    return (
        <div className={cx('app')}>
            <Nav />
            <Banner />
            <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
            <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
            <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
            <Row title="Documentaries" fetchUrl={requests.fetchDocumantaries} />
        </div>
    );
}

export default App;
