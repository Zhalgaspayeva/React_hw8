import React from 'react';
import '../styles/Card.css';

export default function Card({ character }) {
  return (
    <div className="card">
      <img src={character.image} alt={character.name} />
      <h3>{character.name}</h3>
      <p>{character.species}</p>
    </div>
  );
}