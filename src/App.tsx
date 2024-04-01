import { useEffect, useState } from "react";
import { fetchTagsStart, selectError, selectLoading, selectTags } from "./utils/redux/tagsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export interface Tag {
 id: string;
 name: string;
}

function App() {
 const dispatch = useDispatch();
 const tags: Tag[] = useSelector(selectTags);
 const loading = useSelector(selectLoading);
 const error = useSelector(selectError);
 const [searchParams, setSearchParams] = useSearchParams();
 const [pageSize, setPageSize] = useState(searchParams.get("pagesize") || "20");
 const [order, setOrder] = useState(searchParams.get("order") || "desc");

 useEffect(() => {
  dispatch(fetchTagsStart({ pageSize: String(pageSize), order: String(order) }));
 }, [pageSize, order]);

 const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setPageSize(e.target.value);
  searchParams.set("pagesize", e.target.value);
  setSearchParams(searchParams);
 };

 const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setOrder(e.target.value);
  searchParams.set("order", e.target.value);
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
      value={pageSize}
      onChange={handlePageSizeChange}
     >
      {[...Array(100)].map((_, index) => (
       <option
        key={index + 1}
        value={index + 1}
       >
        {index + 1}
       </option>
      ))}
     </select>
     <label htmlFor="order">Order:</label>
     <select
      id="order"
      value={order}
      onChange={handleOrderChange}
     >
      <option
       key="desc"
       value="desc"
      >
       desc
      </option>
      <option
       key="asc"
       value="asc"
      >
       asc
      </option>
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
