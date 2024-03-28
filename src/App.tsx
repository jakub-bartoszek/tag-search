import { useEffect } from "react";
import { fetchTagsStart, selectError, selectLoading, selectTags } from "./utils/redux/tagsSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
 const dispatch = useDispatch();
 const tags = useSelector(selectTags);
 const loading = useSelector(selectLoading);
 const error = useSelector(selectError);

 useEffect(() => {
  dispatch(fetchTagsStart());
 }, []);

 if (error) {
  return <>{error}</>;
 }

 if (loading) {
  return <>Loading</>;
 }

 if (tags) {
  return <>Tags</>;
 }
}

export default App;
