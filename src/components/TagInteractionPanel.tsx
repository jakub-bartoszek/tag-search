import { Box, Select, MenuItem, TextField, SelectChangeEvent, Button } from "@mui/material";

export interface TagInteractionPanelProps {
 pageSize: string;
 order: string;
 sort: string;
 inName: string;
 setInName: React.Dispatch<React.SetStateAction<string>>;
 handleSortChange: (e: SelectChangeEvent<string>, child: React.ReactNode) => void;
 handlePageSizeChange: (e: SelectChangeEvent<string>, child: React.ReactNode) => void;
 handleOrderChange: () => void;
 handleFormSubmit: (e: React.FormEvent<HTMLFormElement>, inName: string) => void;
}

const TagInteractionPanel = ({
 pageSize,
 order,
 sort,
 inName,
 setInName,
 handleSortChange,
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
    <Box
     display={"flex"}
     height={"48px"}
    >
     <Box>
      <Select
       sx={{ height: "48px" }}
       value={sort}
       onChange={handleSortChange}
       variant="outlined"
       fullWidth
      >
       <MenuItem value="popular">Popular</MenuItem>
       <MenuItem value="activity">Activity</MenuItem>
       <MenuItem value="name">Name</MenuItem>
      </Select>
     </Box>
     <Box>
      <Button
       sx={{ height: "48px", fontSize: "24px" }}
       onClick={handleOrderChange}
      >
       {order === "desc" ? "🠋" : "🠉"}
      </Button>{" "}
     </Box>
    </Box>
   </Box>
  </>
 );
};

export default TagInteractionPanel;
