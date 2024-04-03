import type { Meta, StoryObj } from "@storybook/react";
import { StoryFn } from "@storybook/react";
import TagList, { TagListProps } from "../components/TagList";

export default {
 title: "Components/TagList",
 component: TagList
} as Meta;

const Template: StoryFn<TagListProps> = (args) => <TagList {...args} />;

export const Default: StoryObj<typeof Template> = {
 args: {
  tags: [
   { id: 1, name: "React", count: 100 },
   { id: 2, name: "JavaScript", count: 200 }
  ]
 }
};
