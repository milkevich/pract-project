import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Posts = () => {
  const [posts, setPosts] = useState(Array(5).fill(null));
  const [expanded, setExpanded] = useState(Array(5).fill(false));
  const [liked, setLiked] = useState(Array(5).fill(false));

  const handleExpandClick = (index) => {
    const updatedExpanded = [...expanded];
    updatedExpanded[index] = !updatedExpanded[index];
    setExpanded(updatedExpanded);
  };

  const handleLikeClick = (index) => {
    const updatedLiked = [...liked];
    updatedLiked[index] = !updatedLiked[index];
    setLiked(updatedLiked);
  };

  const handleLoadMore = () => {
    const newPosts = Array(5).fill(null);
    setPosts([...posts, ...newPosts]);
  };

  return (
    <Container maxWidth="sm">
      {posts.map((post, index) => {
        return (
          <div key={index} style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <Card sx={{ border: 1.5, marginTop: 5, textAlign: 'left', borderRadius: 3, borderColor: '#e0e0e0', boxShadow: "none" }}>
                <CardContent>
                  <Typography variant="title" color="text.main">
                    Title
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, ipsum. Sint nesciunt laborum pariatur laudantium, fuga vel quae. Rerum temporibus cum architecto at, dolorem quia atque dolores repellat nisi voluptatum!
                  </Typography>
                </CardContent>
                <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur reiciendis, ea amet minima accusamus nisi numquam adipisci inventore hic dicta placeat incidunt obcaecati porro est id maxime quisquam error excepturi.
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </div>
            <div style={{display: "flex", justifyContent: "space-between", border: 1, border: 'solid', borderColor: '#e0e0e0', padding: 5, borderRadius: 12, marginTop: 10}}>
              <IconButton
                sx={{
                  borderRadius: 2,
                  border: 1,
                  borderColor: liked[index] ? '#cd74d4' : '#c1c1c1',
                  color: liked[index] ? "#cd74d4" : '#c1c1c1',
                  bgcolor: liked[index] ? '#fbf2fb' : 'transparent',
                  "&:hover": {
                    bgcolor: liked[index] ? '#fbf2fb' : '#f7f7f7',
                  },
                }}
                onClick={() => handleLikeClick(index)}
              >
                <FavoriteIcon />
              </IconButton>
              <ExpandMore
                expand={expanded[index]}
                onClick={() => handleExpandClick(index)}
                aria-expanded={expanded[index]}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </div>
          </div>
        );
      })}
      <Button
        sx={{
          color: "#cd74d4",
          bgcolor: "#fbf2fb",
          marginTop: 2,
          marginBottom: 2,
          "&:hover": {
            bgcolor: "#fbf2fb",
          },
        }}
        variant="text"
        onClick={handleLoadMore}
      >
        Load More
      </Button>
    </Container>
  );
};

export default Posts;
