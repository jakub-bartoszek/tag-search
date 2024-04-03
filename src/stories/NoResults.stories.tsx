import { StoryFn, Meta } from "@storybook/react";
import NoResults from "../components/NoResults";

export default {
 title: "Components/NoResults",
 component: NoResults
} as Meta;

const Template: StoryFn<{}> = () => <NoResults />;

export const Default = Template.bind({});
