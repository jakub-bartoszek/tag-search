import React, { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import TagInteractionPanel, { TagInteractionPanelProps } from "../components/TagInteractionPanel";
import { SelectChangeEvent } from "@mui/material";

export default {
 title: "Components/TagInteractionPanel",
 component: TagInteractionPanel
} as Meta;

const Template: StoryFn<TagInteractionPanelProps> = (args) => {
 const [pageSize, setPageSize] = useState(args.pageSize);
 const [order, setOrder] = useState(args.order);
 const [inName, setInName] = useState(args.inName);
 const [sort, setSort] = useState(args.sort);

 const handlePageSizeChange = (e: SelectChangeEvent<string>) => {
  setPageSize(e.target.value);
 };

 const handleOrderChange = () => {
  const newOrder = order === "desc" ? "asc" : "desc";
  setOrder(newOrder);
 };

 const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>, inName: string) => {
  e.preventDefault();
  setInName(inName);
 };

 const handleSortChange = (e: SelectChangeEvent<string>) => {
  setSort(e.target.value);
 };

 return (
  <TagInteractionPanel
   pageSize={pageSize}
   handlePageSizeChange={handlePageSizeChange}
   order={order}
   handleOrderChange={handleOrderChange}
   sort={sort}
   handleSortChange={handleSortChange}
   inName={inName}
   setInName={setInName}
   handleFormSubmit={handleFormSubmit}
  />
 );
};

export const Default = Template.bind({});
Default.args = {
 pageSize: "20",
 order: "desc",
 sort: "popular",
 inName: ""
};
