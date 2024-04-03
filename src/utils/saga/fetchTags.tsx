import axios from "axios";

const fetchTags = async (query: string) => {
 const response = await axios(
  `https://api.stackexchange.com/2.3/tags?${query}&site=stackoverflow`
 );

 return response.data;
};

export default fetchTags;
