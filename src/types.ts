export type LetterInfo = {
  letter: string;
  correctLetter: boolean;
  correctPosition: boolean;
}

export type LineInfo = {
  letters: LetterInfo[];
  disabled: boolean;
}

export type CorrectPosition = { letter: string, position: number };

export interface CheckSolutionResponse {
    isCorrect: boolean;
    correctLetters: string[];
    correctPositions: CorrectPosition[];
  }

export type GameEndState = {
    gameOver: boolean;
    gameSuccess: boolean;
} | null