import { useEffect, useState } from "react";
import { fetchTagsStart, selectError, selectLoading, selectTags } from "./utils/redux/tagsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
 Select,
 MenuItem,
 ListItem,
 List,
 Container,
 Box,
 Typography,
 CircularProgress,
 TextField,
 Button
} from "@mui/material";

export interface Tag {
 id: string;
 name: string;
 count: string;
}

function App() {
 const dispatch = useDispatch();
 const tags: Tag[] = useSelector(selectTags);
 const loading = useSelector(selectLoading);
 const error = useSelector(selectError);
 const [searchParams, setSearchParams] = useSearchParams();
 const [pageSize, setPageSize] = useState(searchParams.get("pagesize") || "20");
 const [order, setOrder] = useState(searchParams.get("order") || "desc");
 const [inName, setInName] = useState(searchParams.get("inname") || "");
 const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));

 useEffect(() => {
  dispatch(
   fetchTagsStart({
    pageSize: String(pageSize),
    order: String(order),
    inName: String(inName),
    page: String(page)
   })
  );
 }, [dispatch, pageSize, order, page]);

 useEffect(() => {
  window.scrollTo(0, 0);
 }, [page]);

 useEffect(() => {
  setPage(1);
 }, [pageSize, order, inName]);

 const handlePageSizeChange = (e) => {
  const value = e.target.value;
  setPageSize(value);
  searchParams.set("pagesize", value);
  setSearchParams(searchParams);
 };

 const handleOrderChange = (e) => {
  const value = e.target.value;
  setOrder(value);
  searchParams.set("order", value);
  setSearchParams(searchParams);
 };

 const handleFormSubmit = (e) => {
  e.preventDefault();
  searchParams.set("inname", inName);
  setSearchParams(searchParams);

  dispatch(
   fetchTagsStart({
    pageSize: String(pageSize),
    order: String(order),
    inName: String(inName),
    page: String(page)
   })
  );
 };

 const handlePageChange = (newPage) => {
  setPage(newPage);
  searchParams.set("page", newPage);
  setSearchParams(searchParams);
 };

 const renderContent = () => {
  if (error) {
   return (
    <Box
     display={"flex"}
     alignItems={"center"}
     justifyContent={"center"}
     height={"100%"}
    >
     <Typography
      variant="body1"
      color="error"
     >
      {error}
     </Typography>
    </Box>
   );
  }

  if (loading) {
   return (
    <Box
     display={"flex"}
     alignItems={"center"}
     justifyContent={"center"}
     height={"100%"}
    >
     <CircularProgress />
    </Box>
   );
  }

  if (tags.length === 0) {
   return (
    <Box
     display={"flex"}
     alignItems={"center"}
     justifyContent={"center"}
     height={"100%"}
    >
     <Typography
      variant="body1"
      color="GrayText"
     >
      No tags found...
     </Typography>
    </Box>
   );
  }

  if (tags) {
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
     <List>
      {tags.map((tag, index) => (
       <ListItem
        key={tag.id}
        sx={{
         display: "flex",
         justifyContent: "space-between",
         paddingX: 0,
         borderBottom: index !== tags.length - 1 ? "1px solid #ccc" : "none"
        }}
       >
        <Typography>{tag.name}</Typography>
        <Typography>{tag.count}</Typography>
       </ListItem>
      ))}
     </List>
     <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      marginTop={2}
      gap={2}
     >
      <Button
       disabled={page === 1}
       onClick={() => handlePageChange(page - 1)}
       variant="outlined"
      >
       &#11164;
      </Button>
      <Typography variant="subtitle1">{page}</Typography>
      <Button
       onClick={() => handlePageChange(page + 1)}
       variant="outlined"
      >
       &#11166;
      </Button>
     </Box>
    </Box>
   );
  }
 };

 return (
  <Container sx={{ minHeight: "100dvh", padding: "16px" }}>
   <Box padding={0}>
    <Typography
     variant="h4"
     align="center"
    >
     Tag Explorer
    </Typography>
    <form onSubmit={handleFormSubmit}>
     <Box
      display={"flex"}
      alignItems={"center"}
     >
      <TextField
       label="Search by name"
       variant="outlined"
       fullWidth
       value={inName}
       onChange={(e) => setInName(e.target.value)}
       margin="normal"
      />
     </Box>
    </form>
    <Box
     display="flex"
     alignItems="center"
     justifyContent="space-between"
     marginBottom={2}
    >
     <Box>
      <Typography variant="subtitle1">Page Size</Typography>
      <Select
       label="Page Size"
       value={pageSize}
       onChange={handlePageSizeChange}
       variant="outlined"
       fullWidth
      >
       {[...Array(100)].map((_, index) => (
        <MenuItem
         key={index + 1}
         value={(index + 1).toString()}
        >
         {index + 1}
        </MenuItem>
       ))}
      </Select>
     </Box>
     <Box>
      <Typography variant="subtitle1">Sort Type</Typography>
      <Select
       value={order}
       onChange={handleOrderChange}
       variant="outlined"
       fullWidth
      >
       <MenuItem value="desc">Descending</MenuItem>
       <MenuItem value="asc">Ascending</MenuItem>
      </Select>
     </Box>
    </Box>
    {renderContent()}
   </Box>
  </Container>
 );
}

export default App;
