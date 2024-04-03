import { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import Pagination, { PaginationProps } from "../components/Pagination";
import { Box, Button, Typography } from "@mui/material";

export default {
 title: "Components/Pagination",
 component: Pagination
} as Meta;

const Template: StoryFn<PaginationProps> = (args) => {
 const [page, setPage] = useState(args.page);

 const handlePageChange = (newPage: number) => {
  setPage(newPage);
 };

 return (
  <Box
   sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
    gap: 2
   }}
  >
   <Button
    disabled={page === 1}
    onClick={() => handlePageChange(page - 1)}
    variant="outlined"
   >
    &#11164;
   </Button>
   <Typography variant="subtitle1">{page}</Typography>
   <Button
    disabled={!args.hasMorePages}
    onClick={() => handlePageChange(page + 1)}
    variant="outlined"
   >
    &#11166;
   </Button>
  </Box>
 );
};

export const Default = Template.bind({});
Default.args = {
 page: 1,
 hasMorePages: true
};
