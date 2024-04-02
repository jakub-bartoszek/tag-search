import { Box, Typography } from "@mui/material";

const NoResults = () => (
 <Box
  display={"flex"}
  alignItems={"center"}
  justifyContent={"center"}
  height={"100%"}
 >
  <Typography
   variant="body1"
   color="GrayText"
  >
   No tags found...
  </Typography>
 </Box>
);

export default NoResults;
