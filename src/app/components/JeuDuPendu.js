'use client';
import { useState, useEffect } from 'react'; 
import BoutonLettre from './BoutonLettre';
import './style.css';


const JeuDuPendu = () => {
  const [mot, setMot] = useState('');
  const [lettresDevinees, setLettresDevinees] = useState([]);
  const [lettresIncorrectes, setLettresIncorrectes] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [youWon, setYouWon] = useState(false);
  
  
  const recupererMot = () => {
    setLettresDevinees([]);
    setLettresIncorrectes(0);
    setGameOver(false);
    setYouWon(false);
    const formData = new URLSearchParams();
    formData.append('locale', 'fr-FR');

    fetch('https://node-hangman-api-production.up.railway.app/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du mot');
        }
        return response.json();
      })
      .then(data => {
        setMot(data.word.toLowerCase());
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du mot:', error);
      });
  };

  useEffect(() => {
    recupererMot();
  }, []);

  const gererClicLettre = (lettre) => {
    if (gameOver || youWon) {
      return;
    }

    const lettreEnMinuscule = lettre.toLowerCase();
    if (mot.includes(lettreEnMinuscule)) {
      if (!lettresDevinees.includes(lettreEnMinuscule)) {
        setLettresDevinees((prevState) => {
          const newState = [...prevState, lettreEnMinuscule];
          const motEnMinuscule = mot.toLowerCase();
          const motDevine = Array.from(motEnMinuscule).every(
            lettre => lettre === '-' || newState.includes(lettre)
          );
          if (motDevine) {
            setYouWon(true);
          }
          return newState;
        });
      }
    } else {
      setLettresIncorrectes(lettresIncorrectes + 1);
      if (lettresIncorrectes === 6) {
        setGameOver(true);
      }
    }
  };

  const nouvellePartie = () => {
    setMot('');
    setLettresDevinees([]);
    setLettresIncorrectes(0);
    setGameOver(false);
    setYouWon(false);
    recupererMot();
  };
  const afficherMot = () => {
    return mot
      .split('')
      .map((lettre, index) => (
        lettresDevinees.includes(lettre.toLowerCase()) || lettre === '-' ? (
          <span key={index}>{lettre}</span>
        ) : (
          <span key={index}>-</span>
        )
      ));
  };

  const renderBoutonsLettres = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ-';
    return alphabet.split('').map((lettre, index) => (
      <BoutonLettre key={index} lettre={lettre} onClick={() => gererClicLettre(lettre)} />
    ));
  };
const dessinerPendu = () => {
  switch (lettresIncorrectes) {
    case 1:
      return (
        <svg viewBox="0 0 200 200" width="200" height="200">
          <circle cx="100" cy="60" r="20" fill="black" />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 200 200" width="200" height="200">
          <circle cx="100" cy="60" r="20" fill="black" />
          <line x1="100" y1="80" x2="100" y2="140" stroke="black" />
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 200 200" width="200" height="200">
          <circle cx="100" cy="60" r="20" fill="black" />
          <line x1="100" y1="80" x2="100" y2="140" stroke="black" />
          <line x1="100" y1="100" x2="80" y2="120" stroke="black" />
        </svg>
      );
    case 4:
      return (
        <svg viewBox="0 0 200 200" width="200" height="200">
          <circle cx="100" cy="60" r="20" fill="black" />
          <line x1="100" y1="80" x2="100" y2="140" stroke="black" />
          <line x1="100" y1="100" x2="80" y2="120" stroke="black" />
          <line x1="100" y1="100" x2="120" y2="120" stroke="black" />
        </svg>
      );
    case 5:
      return (
        <svg viewBox="0 0 200 200" width="200" height="200">
          <circle cx="100" cy="60" r="20" fill="black" />
          <line x1="100" y1="80" x2="100" y2="140" stroke="black" />
          <line x1="100" y1="100" x2="80" y2="120" stroke="black" />
          <line x1="100" y1="100" x2="120" y2="120" stroke="black" />
          <line x1="100" y1="140" x2="80" y2="160" stroke="black" />
        </svg>
      );
    case 6:
      return (
        <svg viewBox="0 0 200 200" width="200" height="200">
          <circle cx="100" cy="60" r="20" fill="black" />
          <line x1="100" y1="80" x2="100" y2="140" stroke="black" />
          <line x1="100" y1="100" x2="80" y2="120" stroke="black" />
          <line x1="100" y1="100" x2="120" y2="120" stroke="black" />
          <line x1="100" y1="140" x2="80" y2="160" stroke="black" />
          <line x1="100" y1="140" x2="120" y2="160" stroke="black" />
        </svg>
      );
    case 7:
      return (
        <svg viewBox="0 0 200 200" width="200" height="200">
          <circle cx="100" cy="60" r="20" fill="black" />
          <line x1="100" y1="80" x2="100" y2="140" stroke="black" />
          <line x1="100" y1="100" x2="80" y2="120" stroke="black" />
          <line x1="100" y1="100" x2="120" y2="120" stroke="black" />
          <line x1="100" y1="140" x2="80" y2="160" stroke="black" />
          <line x1="100" y1="140" x2="120" y2="160" stroke="black" />
          <line x1="100" y1="40" x2="100" y2="80" stroke="black" />
        </svg>
      );
    case 8:
      return (
        <svg viewBox="0 0 200 200" width="200" height="200">
          <circle cx="100" cy="60" r="20" fill="black" />
          <line x1="100" y1="80" x2="100" y2="140" stroke="black" />
          <line x1="100" y1="100" x2="80" y2="120" stroke="black" />
          <line x1="100" y1="100" x2="120" y2="120" stroke="black" />
          <line x1="100" y1="140" x2="80" y2="160" stroke="black" />
          <line x1="100" y1="140" x2="120" y2="160" stroke="black" />
          <line x1="100" y1="40" x2="100" y2="80" stroke="black" />
          <circle cx="100" cy="30" r="10" fill="black" />
        </svg>
      );
    default:
      return null;
  }
};

  
  return (
    <div className="container">
      <h1>Jeu du Pendu</h1>
      <button className="button" onClick={nouvellePartie}>Commencer une nouvelle partie</button>
      <div className="mot-container">Mot à deviner : {afficherMot()}</div>
  
      <div>Lettres Incorrectes : {lettresIncorrectes}</div>
      {gameOver && <div className="message">Eh non, c'est raté ! Le mot était "{mot}".</div>}
      <div className="dessin-pendu">{dessinerPendu()}</div>
      <div className="lettres-container">{renderBoutonsLettres()}</div>
      {youWon && <div className="message">Bravo, vous avez remporté la partie !</div>}
    </div>
  );
};

export default JeuDuPendu;
