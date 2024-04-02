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

function App() {
 const dispatch = useDispatch();
 const tags = useSelector(selectTags);
 const loading = useSelector(selectLoading);
 const error = useSelector(selectError);
 const [searchParams, setSearchParams] = useSearchParams();
 const [pageSize, setPageSize] = useState(searchParams.get("pagesize") || "20");
 const [order, setOrder] = useState(searchParams.get("order") || "desc");
 const [inName, setInName] = useState(searchParams.get("inname") || "");
 const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));

 useEffect(() => {
  dispatch(fetchTagsStart(getSearchParams()));
 }, [dispatch, searchParams]);

 const getSearchParams = () => {
  return {
   pageSize: String(pageSize),
   order: String(order),
   inName: String(inName),
   page: String(page)
  };
 };

 const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setSearchParams(searchParams);
  dispatch(fetchTagsStart(getSearchParams()));
 };

 const handlePageSizeChange = (e: SelectChangeEvent<string>) => {
  const value = e.target.value;
  setPageSize(value);
  searchParams.set("pagesize", value);
  setSearchParams(searchParams);
 };

 const handleOrderChange = (e: SelectChangeEvent<string>) => {
  const value = e.target.value;
  setOrder(value);
  searchParams.set("order", value);
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
    Tag Explorer
   </Typography>
   <TagInteractionPanel
    pageSize={pageSize}
    handlePageSizeChange={handlePageSizeChange}
    order={order}
    handleOrderChange={handleOrderChange}
    inName={inName}
    setInName={setInName}
    handleFormSubmit={handleFormSubmit}
   />
   {renderContent()}
  </Container>
 );
}

export default App;
