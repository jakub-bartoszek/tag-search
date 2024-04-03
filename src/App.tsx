import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchTagsStart, selectError, selectLoading, selectTags } from "./utils/redux/tagsSlice";
import { Container, Typography, Box, SelectChangeEvent } from "@mui/material";
import TagInteractionPanel from "./components/TagInteractionPanel";
import Error from "./components/Error";
import Loader from "./components/Loader";
import NoResults from "./components/NoResults";
import Pagination from "./components/Pagination";
import TagList from "./components/TagList";

export interface Tag {
 id: number;
 name: string;
 count: number;
}

function App() {
 const dispatch = useDispatch();
 const tags = useSelector(selectTags);
 const loading = useSelector(selectLoading);
 const error = useSelector(selectError);
 const [searchParams, setSearchParams] = useSearchParams();
 const [pageSize, setPageSize] = useState(searchParams.get("pagesize") || "20");
 const [order, setOrder] = useState(searchParams.get("order") || "desc");
 const [inName, setInName] = useState(searchParams.get("inname") || "");
 const [sort, setSort] = useState(searchParams.get("sort") || "");
 const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));

 useEffect(() => {
  dispatch(fetchTagsStart(getSearchParams()));
 }, [dispatch, searchParams]);

 const getSearchParams = () => {
  return {
   pageSize: String(pageSize),
   order: String(order),
   sort: String(sort),
   inName: String(inName),
   page: String(page)
  };
 };

 const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>, inName: string) => {
  e.preventDefault();
  setInName(inName);
  searchParams.set("inname", inName);
  setSearchParams(searchParams);
 };

 const handlePageSizeChange = (e: SelectChangeEvent<string>) => {
  const value = e.target.value;
  setPageSize(value);
  searchParams.set("pagesize", value);
  setSearchParams(searchParams);
 };

 const handleOrderChange = () => {
  const newOrder = order === "desc" ? "asc" : "desc";
  setOrder(newOrder);
  searchParams.set("order", newOrder);
  setSearchParams(searchParams);
};

 const handleSortChange = (e: SelectChangeEvent<string>) => {
  const value = e.target.value;
  setSort(value);
  searchParams.set("sort", value);
  setSearchParams(searchParams);
 };

 const handlePageChange = (newPage: number) => {
  setPage(newPage);
  searchParams.set("page", newPage.toString());
  setSearchParams(searchParams);
 };

 const renderContent = () => {
  if (error) {
   return <Error error={error} />;
  }

  if (loading) {
   return <Loader />;
  }

  if (tags.length === 0) {
   return <NoResults />;
  }

  return (
   <Box>
    <Box
     display={"flex"}
     justifyContent={"space-between"}
    >
     <Typography
      variant="subtitle1"
      fontWeight="bold"
     >
      Name
     </Typography>
     <Typography
      variant="subtitle1"
      fontWeight="bold"
     >
      Count
     </Typography>
    </Box>
    <TagList tags={tags} />
    <Pagination
     page={page}
     handlePageChange={handlePageChange}
    />
   </Box>
  );
 };

 return (
  <Container sx={{ minHeight: "100dvh", padding: "16px" }}>
   <Typography
    variant="h4"
    align="center"
   >
    Tag Search
   </Typography>
   <TagInteractionPanel
    pageSize={pageSize}
    handlePageSizeChange={handlePageSizeChange}
    order={order}
    handleOrderChange={handleOrderChange}
    sort={sort}
    handleSortChange={handleSortChange}
    inName={inName}
    setInName={setInName}
    handleFormSubmit={handleFormSubmit}
   />
   {renderContent()}
  </Container>
 );
}

export default App;
