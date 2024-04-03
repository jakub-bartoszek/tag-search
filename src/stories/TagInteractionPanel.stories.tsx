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

 const handlePageSizeChange = (e: SelectChangeEvent<string>) => {
  setPageSize(e.target.value);
 };

 const handleOrderChange = (e: SelectChangeEvent<string>) => {
  setOrder(e.target.value);
 };

 const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>, inName: string) => {
  e.preventDefault();
  console.log("Form submitted with name:", inName);
 };

 return (
  <TagInteractionPanel
   {...args}
   pageSize={pageSize}
   order={order}
   inName={inName}
   setInName={setInName}
   handlePageSizeChange={handlePageSizeChange}
   handleOrderChange={handleOrderChange}
   handleFormSubmit={handleFormSubmit}
  />
 );
};

export const Default = Template.bind({});
Default.args = {
 pageSize: "20",
 order: "desc",
 inName: ""
};
