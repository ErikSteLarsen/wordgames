import { CorrectPosition, LineInfo } from "../types";

export const returnWordsInFile = async (filename: string) => {
    try {
        const response = await fetch(filename);
        const text = await response.text();
        return text.split(/\s+/);
    } catch (err) {
        console.error(`The file ${filename} does not exist.`);
        return [];
    }
};

export const pickRandomSolutionWord = (words: string[]) => {
    if (words.length > 0) {
        return words[Math.floor(Math.random() * words.length)];
    }
    return '';
};

export const checkSolution = (inputWord: string, solutionWord: string) => {
    const correctLetters: string[] = [];
    const correctPositions: CorrectPosition[] = [];


    if (inputWord === solutionWord) {
        return { isCorrect: true, correctLetters, correctPositions };
    }

    for (let i = 0; i < inputWord.length; i++) {
        if (inputWord[i] === solutionWord[i]) {
            correctPositions.push({ letter: inputWord[i], position: i });
        } else if (solutionWord.includes(inputWord[i])) {
            correctLetters.push(inputWord[i]);
        }
    }

    return { isCorrect: false, correctLetters: correctLetters, correctPositions: correctPositions };
};

export const resetGame = (words: string[]) => {
    return pickRandomSolutionWord(words);
}

export const lineValid = (lineInfo: LineInfo) => {
    return lineInfo.letters.every((item) => /^[a-zA-Z]$/.test(item.letter));
}