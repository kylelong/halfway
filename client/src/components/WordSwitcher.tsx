import React, {useState, useEffect} from "react";
import {AnimatePresence, motion} from "framer-motion";
import styled from "styled-components";

export const Phrase = styled.span`
  color: rgb(93, 93, 255);
  padding: 3px;
`;

const words = [
  "social",
  "copywriting",
  "blogs",
  "email",
  "marketing",
  "papers",
  "seo",
];

const WordSwitcher = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        initial={{opacity: 0, y: -5}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, y: 5}}
        transition={{duration: 0.5}}
      >
        <Phrase>{words[index]}</Phrase>
      </motion.span>
    </AnimatePresence>
  );
};

export default WordSwitcher;
