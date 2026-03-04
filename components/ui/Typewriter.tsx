import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  strings: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delay?: number;
  loop?: boolean;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  strings,
  typeSpeed = 50,
  deleteSpeed = 30,
  delay = 2000,
  loop = true,
}) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentString = strings[currentStringIndex];

    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, delay);
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentStringIndex((prev) => (prev + 1) % strings.length);
      } else {
        const timeout = setTimeout(() => {
          setCurrentText(currentString.substring(0, currentText.length - 1));
        }, deleteSpeed);
        return () => clearTimeout(timeout);
      }
    } else {
      if (currentText === currentString) {
        if (!loop && currentStringIndex === strings.length - 1) {
          return;
        }
        setIsPaused(true);
      } else {
        const timeout = setTimeout(() => {
          setCurrentText(currentString.substring(0, currentText.length + 1));
        }, typeSpeed);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentText, isDeleting, isPaused, currentStringIndex, strings, typeSpeed, deleteSpeed, delay, loop]);

  return (
    <span>
      {currentText}
      <span className="animate-pulse text-accent">|</span>
    </span>
  );
};