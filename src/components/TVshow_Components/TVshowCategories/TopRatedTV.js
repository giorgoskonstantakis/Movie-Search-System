import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios'
import NavBar from './../../../NavBar'
import { Link } from 'react-router-dom';

function TopRatedTV(props) {
    var count = 0;
    const [topRatedTV, settopRatedTV] = useState([]);
    const [topRatedTV2, settopRatedTV2] = useState([]);
    const [topRatedTV3, settopRatedTV3] = useState([]);

    const fetchTopRated = () => {
        axios.get(`${process.env.REACT_APP_API}tv/top_rated?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${props.match.params.page}`)
            .then(res => { settopRatedTV(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };
    const fetchTopRated2 = () => {
        axios.get(`${process.env.REACT_APP_API}tv/top_rated?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${parseInt(props.match.params.page) + 1}`)
            .then(res => { settopRatedTV2(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };
    const fetchTopRated3 = () => {
        axios.get(`${process.env.REACT_APP_API}tv/top_rated?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${parseInt(props.match.params.page) + 2}`)
            .then(res => { settopRatedTV3(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };

    useEffect(() => {
        fetchTopRated();
    }, []);

    useEffect(() => {
        fetchTopRated2();
    }, []);

    useEffect(() => {
        fetchTopRated3();
    }, []);

    console.log(topRatedTV3.page)

    // Setting buttons for changing pages in page No 1
    const firstPage = () => {
        return (
            <div className="text-center col-md-12">
                <span className="mr-5">Results: {(topRatedTV.page - 1) * 20 + 1} - {topRatedTV3.page * 20}</span>
                <Link to={`/tv_shows/top_rated_tv_reverse/page/${topRatedTV.page + 3}`}>
                    <button type="button" className="btn btn-dark">
                        Next Page<i className="fas fa-angle-double-right ml-2"></i>
                    </button>
                </Link>
            </div>
        )
    }

    // Setting buttons for changing pages in last page
    const lastPage = () => {
        return (
            <div className="text-center col-md-12">
                <span className="mr-5">Results: {(topRatedTV.page - 1) * 20 + 1} - {(topRatedTV.page - 1) * 20 + 1 + count}</span>
                <Link to={`/tv_shows/top_rated_tv_reverse/page/${topRatedTV.page - 3}`}>
                    <button type="button" className="btn btn-dark">
                        <i class="fas fa-angle-double-left mr-2"></i>Previous Page
                    </button>
                </Link>
            </div>
        )
    }

    // Setting buttons for changing pages
    const renderPages = () => {
        return (
            <div className="text-center col-md-12">
                <span className="mr-5">Results: {(topRatedTV.page - 1) * 20 + 1} - {topRatedTV3.page * 20}</span>
                <Link className="mr-5" to={`/tv_shows/top_rated_tv_reverse/page/${topRatedTV.page - 3}`}>
                    <button type="button" className="btn btn-dark">
                        <i class="fas fa-angle-double-left mr-2"></i>Previous Page
                </button>
                </Link>
                <Link to={`/tv_shows/top_rated_tv_reverse/page/${topRatedTV.page + 3}`}>
                    <button type="button" className="btn btn-dark">
                        Next Page<i class="fas fa-angle-double-right ml-2"></i>
                    </button>
                </Link>
            </div>
        )
    }

    return (
        <div>
            <NavBar />
            <div className="container my-3">
                <div className="card">
                    <div className="card-header text-center">
                        Top Rated TV Shows
                    </div>
                    <div className="card-body">
                        {topRatedTV.results && topRatedTV.results.map((topRated, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1">
                                    <Link to={`/tv_info/${topRated.id}`}><img src={`https://image.tmdb.org/t/p/w45/${topRated.poster_path}`} alt="new" /> {topRated.name}</Link>
                                </div>
                            )
                        }
                        )}
                        {topRatedTV2.results && topRatedTV2.results.map((topRated, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1">
                                    <Link to={`/tv_info/${topRated.id}`}><img src={`https://image.tmdb.org/t/p/w45/${topRated.poster_path}`} alt="new" /> {topRated.name}</Link>
                                </div>
                            )
                        }
                        )}
                        {topRatedTV3.results && topRatedTV3.results.map((topRated, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1">
                                    <Link to={`/tv_info/${topRated.id}`}><img src={`https://image.tmdb.org/t/p/w45/${topRated.poster_path}`} alt="new" /> {topRated.name}</Link>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
                <div className="row mb-5 mt-3">
                    {topRatedTV.page == 1 && firstPage()}
                    {topRatedTV.page == 40 && lastPage()}
                    {topRatedTV.page != 1 && topRatedTV.page != 40 && renderPages()}
                </div>
            </div>
        </div>
    );
}

export default TopRatedTV;