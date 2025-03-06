import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import WordLine from "./active/WordLine";
import "../../style/Start.css";
import {
  CheckSolutionResponse,
  GameEndState,
  LetterInfo,
  LetterState,
  LetterWithState,
  LineInfo,
} from "./types";
import { v4 as uuidv4 } from "uuid";
import Title from "./Title";
import { lightBlack } from "../../variables/colors";
import {
  checkSolution,
  pickRandomSolutionWord,
  resetGame,
  returnWordsInFile,
} from "./utils/wordleUtils";
import InactiveLine from "./inactive/InactiveLine";
import VisualLetter from "./VisualLetter";

const WordleGame: React.FC = () => {
  const initLine: LetterInfo[] = [
    { letter: "", correctLetter: false, correctPosition: false },
    { letter: "", correctLetter: false, correctPosition: false },
    { letter: "", correctLetter: false, correctPosition: false },
    { letter: "", correctLetter: false, correctPosition: false },
    { letter: "", correctLetter: false, correctPosition: false },
  ];

  const initLineInfo: LineInfo[] = [
    {
      letters: initLine,
      disabled: false,
    },
  ];

  const maxAttempts: number = 6;
  const [solution, setSolution] = useState<string>("_____");
  const [words, setWords] = useState<string[]>([]);
  const [wordLines, setWordLines] = useState<LineInfo[]>([
    { letters: initLine, disabled: false },
  ]);
  const [inactiveLines, setInactiveLines] = useState<number>(5);
  const [endGameResult, setEndGameResult] = useState<GameEndState>(null);
  const [letterStates, setLetterStates] = useState<Map<string, LetterState>>(new Map());


  useEffect(() => {
    returnWordsInFile("words.txt").then((res) => {
      setWords(res);
    });
  }, []);

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
      if (wordLines.every((line) => lineValid(line))) {
        createNewGameLine();
      }
    }
  }, [endGameResult]);

  const handleCheckSolution = (
    lineIndex: number,
    lineInfo: LineInfo
  ): GameEndState => {
    const proposedWord = lineInfo.letters
      .map((letterInfo) => letterInfo.letter)
      .join("");
    const res: CheckSolutionResponse = checkSolution(proposedWord, solution);
    let gameOver = false;
    let gameSuccess = false;

    setWordLines((prevWordLines) => {
      const updatedWordLines = [...prevWordLines];
      const currentLine = lineInfo;

      currentLine.letters = currentLine.letters.map((letterInfo, index) => {
        let isCorrectPosition: boolean;
        let isCorrectLetter: boolean;
        if (res.isCorrect) {
          isCorrectPosition = true;
          isCorrectLetter = true;
        } else {
          isCorrectPosition = res.correctPositions.some(
            (correctPos) =>
              correctPos.letter === letterInfo.letter &&
              correctPos.position === index
          );
          isCorrectLetter =
            res.correctLetters.includes(letterInfo.letter) &&
            !isCorrectPosition;
        }

        if (isCorrectLetter || isCorrectPosition) {
          console.log(isCorrectLetter, isCorrectPosition);
          if (!letterStates.keys.array.forEach(element => {

          }); letterInfo.letter )

      // SJEKK OM DE ER UNIQUE OG SÅ ADD HVIS DEN IKKE FINNES BLABLA.
      setLetterStates((prevCorrectLetters) => prevCorrectLetters?.add(letterInfo.letter))
    } else {
      setLetterStates((prevWrongLetters) => prevWrongLetters?.add(letterInfo.letter))
        }

return {
  ...letterInfo,
  correctPosition: isCorrectPosition,
  correctLetter: isCorrectLetter,
};
      });

updatedWordLines[lineIndex] = currentLine;
return updatedWordLines;
    });

if (res.isCorrect) {
  gameSuccess = true;
} else {
  if (maxAttemptsReached(wordLines.length)) {
    gameOver = true;
  }
}

return { gameOver, gameSuccess };
  };

const lineValid = (lineInfo: LineInfo) => {
  return lineInfo.letters.every((item) => /^[a-zA-Z]$/.test(item.letter));
};

const handleOnEnter = (lineIndex: number, lineInfo: LineInfo) => {
  if (lineValid(lineInfo)) {
    setEndGameResult(handleCheckSolution(lineIndex, lineInfo));
    disableCurrentLine(lineIndex, lineInfo);
  }
};

const maxAttemptsReached = (attempts: number) => {
  return attempts >= maxAttempts;
};

const disableCurrentLine = (lineIndex: number, lineInfo: LineInfo) => {
  lineInfo.disabled = true;
  setWordLines((prevWordLines) =>
    prevWordLines.map((line, index) =>
      index === lineIndex ? lineInfo : line
    )
  );
};

const createNewGameLine = () => {
  const newLineInfo: LineInfo = {
    letters: initLine.map((letter) => ({ ...letter })),
    disabled: false,
  };
  setWordLines((prevWordLines) => [...prevWordLines, newLineInfo]);
  setInactiveLines((prevInactiveLines) => prevInactiveLines - 1);
};

const handleResetGame = async () => {
  const res = resetGame(words);
  setSolution(res);
  setWordLines(initLineInfo);
  setEndGameResult({ gameOver: false, gameSuccess: false });
  setInactiveLines(5);
  setLetterStates(new Set());
};

return (
  <div>
    <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 40px)' }}>
      <Title title={"Wordle"} />

      {wordLines.map((line, lineIndex) => (
        <WordLine
          key={uuidv4()}
          lineInfo={line}
          onEnter={(lineInfo: LineInfo) => handleOnEnter(lineIndex, lineInfo)}
        />
      ))}

      {Array.from({ length: inactiveLines }, (_, i) => (
        <InactiveLine key={i + 1} />
      ))}

      <Box display={"flex"} flexDirection={"row"} padding={2} pt={5}>
        <Paper sx={{ flexGrow: 1, marginRight: 5 }}>
          {Array.from(correctLetters).map((item, index) => (
            <VisualLetter letter={item} />

          ))}
        </Paper>

        <Paper sx={{ flexGrow: 1 }}>
          {Array.from(wrongLetters).map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </Paper>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      {endGameResult?.gameOver && (
        <Box position="relative" textAlign="center" mt={4} mb={1}>
          <Typography variant="h5" gutterBottom>
            {`Solution: ${solution}`}
          </Typography>
        </Box>
      )}
      <Box textAlign="center" mt={1} mb={8}>
        {(endGameResult?.gameOver || endGameResult?.gameSuccess) && (
          <Button
            variant={"contained"}
            sx={{ backgroundColor: lightBlack, color: "white" }}
            onClick={() => handleResetGame()}
          >
            {"Play again"}
          </Button>
        )}
      </Box>
    </Container>
  </div>
);
};

export default WordleGame;
