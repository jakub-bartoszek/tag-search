import { Box, CircularProgress } from "@mui/material";

const Loader = () => (
 <Box
  display={"flex"}
  alignItems={"center"}
  justifyContent={"center"}
  height={"100%"}
 >
  <CircularProgress />
 </Box>
);

export default Loader;
