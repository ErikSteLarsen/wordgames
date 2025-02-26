// src/components/DayBox.tsx
import React from "react";
import { Paper, TextField } from "@mui/material";
import { LetterInfo } from "../../../types";

interface Props {
  index: number;
  letterInfo: LetterInfo;
  disabled: boolean;
}

const LetterBox: React.FC<Props> = ({ index, letterInfo, disabled }) => {
  return (
    <Paper
      key={index}
      elevation={3}
      sx={{
        p: 2,
        textAlign: "center",
        width: "80px",
        height: "80px",
        aspectRatio: "1/1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        backgroundColor: "#efefef",
      }}
    >
      <TextField
        disabled={disabled}
        key={index}
        value={letterInfo.letter}
        inputProps={{
          maxLength: 1,
          style: {
            padding: 1,
            textAlign: "center",
            fontSize: "30px",
            textTransform: "uppercase",
            fontWeight: "bold",
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
              padding: 0,
            },
          },
          //caretColor: 'transparent',
        }}
      />
    </Paper>
  );
};

export default LetterBox;
