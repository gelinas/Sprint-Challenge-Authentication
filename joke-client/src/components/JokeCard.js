import React from 'react';

const FriendCard = props => {
  return (
    <div className="friend-card">
      <p>{`Joke: ${props.joke.joke}`}</p>
    </div>
  )
};

export default FriendCard;
