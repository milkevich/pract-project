import React, { useContext, useState } from "react";
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
import { Link } from "react-router-dom";
import { ThemeContext } from "../Contexts/ThemeContext";
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

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
  const [theme, setTheme] = useState(false);

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

  const changeTheme = () => {
    setTheme(!theme);
  }

  const lightModeStyles = {
    themeToggle: {
      position: "fixed",
      top: 320,
      left: 20,
      padding: 10,
      backgroundColor: "white",
      border: "1.5px solid #e0e0e0",
      color: "#c1c1c1"
    },
    logOutBtn: {
      position: "fixed",
      top: 260,
      left: 20,
      padding: 10,
      backgroundColor: "white",
      border: "1.5px solid #e0e0e0",
      borderRadius: 100,
      color: "#c1c1c1"
    },
    listContainer: {
      display: "flex",
      flexDirection: "column",
    },
    cardContainer: {
      border: 1.5,
      marginTop: 5,
      textAlign: 'left',
      borderRadius: 3,
      borderColor: '#c1c1c1',
      backgroundColor: '#white',
      boxShadow: "none",
      title: {
        color: "black"
      },
      description: {
        color: "darkgray"
      }
    },
    postMenu: {
      display: "flex",
      justifyContent: "space-between", 
      border: 1, 
      border: "solid", 
      borderColor: "#c1c1c1", 
      backgroundColor: "white",
      padding: 5, 
      borderRadius: 12, 
      marginTop: 10,
    }
  };

  const darkModeStyles = {
    backgroundColor: {
      backgroundColor: "#212121",
    },
    themeToggle: {
      position: "fixed",
      top: 320,
      left: 20,
      padding: 10,
      borderColor: "#616161",
      backgroundColor: "#424242",
      color: "#e0e0e0",
      border: "1.5px solid #e0e0e0"
    },
    logOutBtn: {
      position: "fixed",
      top: 260,
      left: 20,
      padding: 10,
      backgroundColor: "white",
      border: "1.5px solid #e0e0e0",
      borderRadius: 100,
      borderColor: "#616161",
      backgroundColor: "#424242",
      color: "e0e0e0",
      border: "1.5px solid #e0e0e0"
    },
    listContainer: {
      display: "flex",
      flexDirection: "column",
    },
    cardContainer: {
      border: 1.5,
      marginTop: 5,
      textAlign: 'left',
      borderRadius: 3,
      borderColor: '#616161',
      backgroundColor: '#424242',
      boxShadow: "none",
      title: {
        color: "white"
      },
      description: {
        color: "darkgray"
      }
    },
    postMenu: {
      display: "flex",
      justifyContent: "space-between", 
      border: 1, 
      border: "solid", 
      borderColor: "#616161", 
      backgroundColor: "#424242",
      padding: 5, 
      borderRadius: 12, 
      marginTop: 10,
    }
  };

  const styles = theme ? darkModeStyles : lightModeStyles;

  return (
    <div style={styles.backgroundColor}>
      <ThemeContext.Provider value={{ theme, changeTheme }}>
        <IconButton style={styles.themeToggle} onClick={changeTheme}>
          {theme ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
        </IconButton>
        <Link className='router-log-out' to={{ pathname: '/log-in' }}>
          <LogoutRoundedIcon style={styles.logOutBtn}/>
        </Link>
        <Container maxWidth="sm">
          {posts.map((post, index) => {
            return (
              <div key={index} style={styles.listContainer}>
                <div>
                  <Card sx={styles.cardContainer}>
                    <CardContent>
                      <Typography variant="title" style={styles.cardContainer.title}>
                        Title
                      </Typography>
                      <Typography variant="body2" style={styles.cardContainer.description}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, ipsum. Sint nesciunt laborum pariatur laudantium, fuga vel quae. Rerum temporibus cum architecto at, dolorem quia atque dolores repellat nisi voluptatum!
                      </Typography>
                    </CardContent>
                    <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography variant="body2" style={styles.cardContainer.description}>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur reiciendis, ea amet minima accusamus nisi numquam adipisci inventore hic dicta placeat incidunt obcaecati porro est id maxime quisquam error excepturi.
                        </Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
                </div>
                <div style={styles.postMenu}>
                  <IconButton
                    sx={{
                      borderRadius: 2,
                      border: 1,
                      borderColor: liked[index] ? '#cd74d4' : '#c1c1c1',
                      color: liked[index] ? "#cd74d4" : '#c1c1c1',
                      bgcolor: liked[index] ? 'rgba(255, 0, 247, 0.050)' : 'transparent',
                      "&:hover": {
                        bgcolor: liked[index] ? 'rgba(255, 0, 247, 0.150)' : 'transparent',
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
                    sx={{
                      color: "#c1c1c1"
                    }}
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </div>
              </div>
            );
          })}
          <Button
            sx={{
              color: theme ? "#e0e0e0" : "#cd74d4",
              bgcolor: theme ? "#424242" : "#fbf2fb",
              border: 1,
              borderColor: theme ? "#616161" : "#cd74d4",
              marginTop: 2,
              marginBottom: 2,
              
              "&:hover": {
                bgcolor: theme ? "#616161" : "#fbf2fb",
              },
            }}
            variant="text"
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        </Container>
      </ThemeContext.Provider>
    </div>
  );
};

export default Posts;
