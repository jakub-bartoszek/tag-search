import { Box, Typography } from "@mui/material";

export interface ErrorProps {
 error: string;
}

const Error = ({ error }: ErrorProps) => (
 <Box
  display={"flex"}
  alignItems={"center"}
  justifyContent={"center"}
  height={"100%"}
 >
  <Typography
   variant="body1"
   color="error"
  >
   Sorry, error occurred. {`(${error})`}
  </Typography>
 </Box>
);

export default Error;
