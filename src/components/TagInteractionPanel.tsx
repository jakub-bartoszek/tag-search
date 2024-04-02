import { Typography, Box, Select, MenuItem, TextField, SelectChangeEvent } from "@mui/material";

interface TagInteractionPanelProps {
 pageSize: string;
 order: string;
 inName: string;
 setInName: React.Dispatch<React.SetStateAction<string>>;
 handlePageSizeChange: (e: SelectChangeEvent<string>, child: React.ReactNode) => void;
 handleOrderChange: (e: SelectChangeEvent<string>, child: React.ReactNode) => void;
 handleFormSubmit: (e: React.FormEvent<HTMLFormElement>, inName: string) => void;
}

const TagInteractionPanel = ({
 pageSize,
 order,
 inName,
 setInName,
 handlePageSizeChange,
 handleOrderChange,
 handleFormSubmit
}: TagInteractionPanelProps) => {
 return (
  <>
   <form onSubmit={(e) => handleFormSubmit(e, inName)}>
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
  </>
 );
};

export default TagInteractionPanel;
