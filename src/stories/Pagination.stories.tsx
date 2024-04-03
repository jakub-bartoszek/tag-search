import { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import Pagination, { PaginationProps } from "../components/Pagination";

export default {
 title: "Components/Pagination",
 component: Pagination
} as Meta;

const Template: StoryFn<PaginationProps> = (args) => {
 const [page, setPage] = useState(args.page);

 const handlePageChange = (newPage: number) => {
  setPage(newPage);
  console.log("Page changed to:", newPage);
 };

 return (
  <Pagination
   {...args}
   page={page}
   handlePageChange={handlePageChange}
  />
 );
};

export const Default = Template.bind({});
Default.args = {
 page: 1
};
