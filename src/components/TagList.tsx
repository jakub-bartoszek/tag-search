import { List, ListItem, Typography } from "@mui/material";
import { Tag } from "../App";

export interface TagListProps {
 tags: Tag[];
}

const TagList = ({ tags }: TagListProps) => {
 return (
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
 );
};

export default TagList;
