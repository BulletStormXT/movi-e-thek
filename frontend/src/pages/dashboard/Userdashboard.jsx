import React, { useState, useEffect } from "react";

const Userdashboard = () => {

    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3001/api/movies/search/${search}`)
            .then((res) => { return res.json()})
            .then((data) => {
                setMovies(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (

       
        <div>
            <h1 style={{ textAlign: "center" }}>User Dashboard</h1>
            <input
                type="text"
                placeholder="Search Movies"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {/* <button
                onClick={() => {
                    fetch(`http://localhost:5000/api/movies/search/${search}`)
                        .then((res) => { return res.json()})
                        .then((data) => {
                            setMovies(data);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }}
            >
                Search
            </button> */}
            <div>
                {movies.map((movie) => {
                    return (
                        <div key={movie.imdbID}>
                            <h3>{movie.Title}</h3>
                            <img src={movie.Poster} alt={movie.Title} />
                        </div>
                    );
                })}
            </div>
        </div>
   )
};


export default Userdashboard;
