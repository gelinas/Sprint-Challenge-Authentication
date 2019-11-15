import React, { useState, useEffect } from 'react';

import { axiosWithAuth } from '../utils/axiosWithAuth';

import JokeCard from './JokeCard';
// import FriendForm from './FriendForm';

function JokeList(props) {
    const [jokes, setJokes] = useState([]);

    useEffect(() => {
        axiosWithAuth()
        .get('/api/jokes')
        .then(res => {
            // console.log("get response", res);
            setJokes(res.data);
        })
        .catch(err => console.log(err.response));
    }, []);

    // implement loading spinner
    // if (something) { return <div>loading spinner</div>}
    return (
        <>
        <h1>My Jokes List</h1>
        <div className="friend-container">
            {/*error rendering */}
            {jokes.map(joke => (
                <JokeCard key={joke.id} joke={joke} />
            ))}
        </div>
        {/* <FriendForm friends={friends} setFriends={setFriends} /> */}
        </>
    )
}

export default JokeList;