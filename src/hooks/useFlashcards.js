import { useState, useEffect } from "react";

function getRandomCards(cards, count) {
  const shuffled = [...cards].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function useFlashcards(domain, count = 50) {
  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [results, setResults] = useState([]);
  const [sessionActive, setSessionActive] = useState(false);

  useEffect(() => {
    if (domain) {
      const selected = getRandomCards(domain.cards, count);
      setCards(selected);
      setCurrent(0);
      setResults([]);
      setSessionActive(true);
    }
  }, [domain, count]);

  const markResult = (correct) => {
    setResults([...results, { id: cards[current].id, correct }]);
    setCurrent(current + 1);
  };

  const restart = () => {
    setCurrent(0);
    setResults([]);
    setSessionActive(true);
  };

  return {
    cards,
    current,
    results,
    sessionActive,
    markResult,
    restart,
    setSessionActive
  };
} 