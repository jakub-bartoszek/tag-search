import { StoryFn, Meta } from "@storybook/react";
import Error, { ErrorProps } from "../components/Error";

export default {
 title: "Components/Error",
 component: Error
} as Meta;

const Template: StoryFn<ErrorProps> = (args) => <Error {...args} />;

export const Default = Template.bind({});
Default.args = {
 error: "AxiosError: Network Error"
};
