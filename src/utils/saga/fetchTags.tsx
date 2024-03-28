import axios from "axios";

const fetchTags = async () => {
 const response = await axios(
  "https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow"
 );
 return response.data.items;
};

export default fetchTags;
