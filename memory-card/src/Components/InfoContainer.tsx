import {Typography} from "@mui/material";

export default function InfoContainer() {
  return (
    <div className={"header"}>
      <div>
        <Typography variant="h2" gutterBottom>
          Memory Game
        </Typography>
        <Typography variant="h6" gutterBottom>
          Get points by clicking on an image but don't click on any more than once!
        </Typography>
      </div>
      <div>
        <Typography variant="subtitle2" gutterBottom align={"right"}>
          Score: 0
        </Typography>
        <Typography variant="subtitle2" gutterBottom align={"right"}>
          Best score: 6
        </Typography>
      </div>
    </div>
  )
}