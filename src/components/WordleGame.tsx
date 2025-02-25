import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import WordLine from './WordLine';
import '../style/Start.css';
import { CheckSolutionResponse, GameEndState, LetterInfo, LineInfo } from '../types';
import { v4 as uuidv4 } from 'uuid';
import Title from './Title';
import { lightBlack } from '../variables/colors';
import { checkSolution, pickRandomSolutionWord, resetGame, returnWordsInFile } from '../utils/wordleUtils';


const WordleGame: React.FC = () => {

  const initLine: LetterInfo[] = [
    { letter: '', correctLetter: false, correctPosition: false },
    { letter: '', correctLetter: false, correctPosition: false },
    { letter: '', correctLetter: false, correctPosition: false },
    { letter: '', correctLetter: false, correctPosition: false },
    { letter: '', correctLetter: false, correctPosition: false }
  ];

  const initLineInfo: LineInfo[] = [{
    letters: initLine,
    disabled: false,
  }]

  const maxAttempts: number = 6;
  const [solution, setSolution] = useState<string>('_____');
  const [words, setWords] = useState<string[]>([]);
  const [wordLines, setWordLines] = useState<LineInfo[]>([{ letters: initLine, disabled: false }]);
  const [endGameResult, setEndGameResult] = useState<GameEndState>(null);

  useEffect(() => {
    returnWordsInFile("words.txt").then((res) => {
      setWords(res);
    })
  }, [])

  useEffect(() => {
    const localSolution = pickRandomSolutionWord(words);
    setSolution(localSolution);
  }, [words]);

  useEffect(() => {
    if (endGameResult?.gameOver) {
      console.log("Lose.");
    } else if (endGameResult?.gameSuccess) {
      console.log("WIN!!");
    } else {
      if (wordLines.every(line => lineValid(line))) {
        createNewGameLine();
      }
    }
  }, [endGameResult]);


  const handleCheckSolution = (lineIndex: number, lineInfo: LineInfo): GameEndState => {
    const proposedWord = lineInfo.letters.map(letterInfo => letterInfo.letter).join('')
    const res: CheckSolutionResponse = checkSolution(proposedWord, solution);
    let gameOver = false;
    let gameSuccess = false;

    setWordLines(prevWordLines => {
      const updatedWordLines = [...prevWordLines];
      const currentLine = lineInfo;

      currentLine.letters = currentLine.letters.map((letterInfo, index) => {
        let isCorrectPosition: boolean;
        let isCorrectLetter: boolean;
        if (res.isCorrect) {
          isCorrectPosition = true;
          isCorrectLetter = true;
        } else {
          isCorrectPosition = res.correctPositions.some(correctPos => correctPos.letter === letterInfo.letter && correctPos.position === index);
          isCorrectLetter = res.correctLetters.includes(letterInfo.letter) && !isCorrectPosition;
        }

        return {
          ...letterInfo,
          correctPosition: isCorrectPosition,
          correctLetter: isCorrectLetter
        };
      });

      updatedWordLines[lineIndex] = currentLine;
      return updatedWordLines;
    });

    if (res.isCorrect) {
      gameSuccess = true;
    } else {
      if (maxAttemptsReached(wordLines.length)) {
        gameOver = true
      }
    }

    return { gameOver, gameSuccess }
  };


  const lineValid = (lineInfo: LineInfo) => {
    return lineInfo.letters.every((item) => /^[a-zA-Z]$/.test(item.letter));
  }

  const handleOnEnter = (lineIndex: number, lineInfo: LineInfo) => {
    if (lineValid(lineInfo)) {
      setEndGameResult(handleCheckSolution(lineIndex, lineInfo));
      disableCurrentLine(lineIndex, lineInfo);
    }
  };

  const maxAttemptsReached = (attempts: number) => {
    return attempts >= maxAttempts
  }

  const disableCurrentLine = (lineIndex: number, lineInfo: LineInfo) => {
    lineInfo.disabled = true;
    setWordLines(prevWordLines =>
      prevWordLines.map((line, index) => (index === lineIndex ? lineInfo : line))
    )
  }

  const createNewGameLine = () => {
    const newLineInfo: LineInfo = {
      letters: initLine.map(letter => ({ ...letter })),
      disabled: false,
    };
    setWordLines(prevWordLines => [...prevWordLines, newLineInfo]);
  }

  const handleResetGame = async () => {
    const res = resetGame(words);
    setSolution(res);
    setWordLines(initLineInfo);
    setEndGameResult({ gameOver: false, gameSuccess: false })
  }



  return (
    <div >
      <Container maxWidth="xl">

        <Title title={'Wordle'} />

        {wordLines.map((line, lineIndex) => (
          <WordLine
            key={uuidv4()}
            lineInfo={line}
            onEnter={(lineInfo: LineInfo) => handleOnEnter(lineIndex, lineInfo)}
          />
        ))}

        {endGameResult?.gameOver && (
          <Box position="relative" textAlign="center" mt={8} mb={1}>
            <Typography variant="h5" gutterBottom>
              {`Solution: ${solution}`}
            </Typography>
          </Box>
        )}
        <Box textAlign="center" mt={2} mb={8}>
          {(endGameResult?.gameOver || endGameResult?.gameSuccess) &&
            <Button variant={'contained'} sx={{ backgroundColor: lightBlack, color: 'white' }} onClick={() => handleResetGame()}>
              {'Play again'}
            </Button>}
        </Box>

      </Container>
    </div>
  );
};

export default WordleGame;