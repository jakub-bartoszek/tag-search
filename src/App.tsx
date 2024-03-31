import { useEffect } from "react";
import { fetchTagsStart, selectError, selectLoading, selectTags } from "./utils/redux/tagsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";

function App() {
 const dispatch = useDispatch();
 const tags = useSelector(selectTags);
 const loading = useSelector(selectLoading);
 const error = useSelector(selectError);
 const [searchParams, setSearchParams] = useSearchParams();
 const location = useLocation();

 useEffect(() => {
  dispatch(fetchTagsStart(location.search));
 }, [location.search, dispatch]);

 const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  searchParams.set("pagesize", e.target.value);
  setSearchParams(searchParams);
 };

 if (error) {
  return <>{error}</>;
 }

 if (loading) {
  return <>Loading</>;
 }

 if (tags) {
  return (
   <>
    <div>
     <label htmlFor="pageSize">Page size:</label>
     <select
      id="pageSize"
      value={searchParams.get("pagesize") || "20"}
      onChange={handlePageSizeChange}
     >
      {[...Array(20)].map((_, index) => (
       <option
        key={index + 1}
        value={index + 1}
       >
        {index + 1}
       </option>
      ))}
     </select>
    </div>
    {tags.map((tag) => (
     <p key={tag.id}>{tag.name}</p>
    ))}
   </>
  );
 }
}

export default App;
