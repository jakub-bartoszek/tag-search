import { StoryFn, Meta } from "@storybook/react";
import Loader from "../components/Loader";

export default {
 title: "Components/Loader",
 component: Loader
} as Meta;

const Template: StoryFn<{}> = () => <Loader />;

export const Default = Template.bind({});
