import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace) => {
    if (replace === true) {
      setMode(newMode);
    } else {
    setHistory([...history, newMode])
    setMode(newMode);
    }
  };

  const back = () => {
    if (history.length > 1) {
      const copyHistory = [...history];
      copyHistory.pop();
      setHistory(copyHistory);
      setMode(copyHistory[copyHistory.length - 1]);
    }

  };

  return { mode, transition, back };
};