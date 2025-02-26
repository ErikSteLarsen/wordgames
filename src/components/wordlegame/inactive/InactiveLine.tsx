import { Box, Container, Grid, Grid2 } from "@mui/material";
import InactiveLetterBox from "./InactiveLetterBox";

const InactiveLine: React.FC<{}> = () => {
  const letterInfo = {
    letter: "",
    correctLetter: false,
    correctPosition: false,
  };
  const line = [letterInfo, letterInfo, letterInfo, letterInfo, letterInfo];

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Box display="flex" justifyContent="center">
        <Grid2 container spacing={1.5} direction="row" wrap="nowrap">
          {line.map((letter, index) => (
            <Grid item key={index}>
              <InactiveLetterBox
                key={index}
                index={index}
                letterInfo={letter}
                disabled={true}
              />
            </Grid>
          ))}
        </Grid2>
      </Box>
    </Container>
  );
};

export default InactiveLine;
