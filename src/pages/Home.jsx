import React from 'react';
import '../styles/Home.css';
import rickMortyImage from '../assets/AAAABUMwygtBZSDI7ZVLfWJXbnTBSuY7KgG24YPDm8tQziKDzMsn-vuOssi0-yM5XXOFrfBu-E_eEDLV-0nEN9Umt0g1tqtCpOxBpEi7.jpg';

export default function Home() {
  return (
    <div className="home">
      <h1>Welcome to the Rick & Morty Explorer!</h1>
      <p>Use the navigation above to explore characters from the show.</p>
      <img 
        src={rickMortyImage} 
        alt="Rick and Morty" 
        className="home-image"
      />
    </div>
  );
}