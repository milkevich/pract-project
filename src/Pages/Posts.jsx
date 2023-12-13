import React, { useContext, useState, useEffect } from "react";
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
import { useThemeContext } from "../Contexts/ThemeContext";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { database, onValue, ref } from "../firebaseConfig";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PopUp from "./CreateNewPost";
import { likeCheck } from "../firebaseConfig";
import { update, increment, get } from "firebase/database";


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
  const [posts, setPosts] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [likes, setLikes] = useState({});
  const [postsAmount, setPostsAmount] = useState(5);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const { theme, changeTheme } = useThemeContext();

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts'));
    setLikes(likedPosts || {});
  }, []);

  useEffect(() => {
    const postsRef = ref(database, "posts/");

    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const postsArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setPosts(postsArray);
        setExpanded(Array(postsArray.length).fill(false));
      }
    });
  }, []);

  const handleExpandClick = (index) => {
    const updatedExpanded = [...expanded];
    updatedExpanded[index] = !updatedExpanded[index];
    setExpanded(updatedExpanded);
  };

  const handleLikeClick = async (postId) => {
    await toggleLike(postId);
    const isLiked = await likeCheck(postId);
    setLikes((prevLikes) => ({ ...prevLikes, [postId]: isLiked }));

    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
    likedPosts[postId] = isLiked;
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  };

  const handleLoadMore = () => {
    setPostsAmount(postsAmount + 5)
  };

  const toggleLike = async (postId) => {
    const isLiked = likes[postId];
    const updatedLikes = { ...likes };
  
    const postLikesRef = ref(database, `posts/${postId}`);

    try {
      if (!isLiked) {
      await update(postLikesRef, {
        likes: increment(1)
      });
    } else {
      await update(postLikesRef, {
        likes: increment(-1)
      });
    }
  }
    catch (error) {
      console.log(error)
    }
    localStorage.setItem('likedPosts', JSON.stringify(updatedLikes));
    setLikes(updatedLikes);
  }

  const lightModeStyles = {
    themeToggle: {
      position: "fixed",
      top: 320,
      left: 20,
      padding: 10,
      backgroundColor: "white",
      border: "1.5px solid #e0e0e0",
      borderRadius: 100,
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
    addPostBtn: {
      position: "fixed",
      top: 380,
      left: 20,
      padding: 10,
      backgroundColor: "white",
      border: "1.5px solid #e0e0e0",
      borderRadius: 100,
      color: "#c1c1c1",
      cursor: "pointer"
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
    },
    noPosts: {
      color: "black",
      padding: 20
    },
    likeValue: {
      textAlign: "left",
      margin: 0,
      marginTop: "10px",
      color: "black"
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
      backgroundColor: "white",
      border: "1.5px solid #e0e0e0",
      borderRadius: 100,
      borderColor: "#616161",
      backgroundColor: "#424242",
      color: "e0e0e0",
      border: "1.5px solid #e0e0e0"
    },
    logOutBtn: {
      position: "fixed",
      top: 260,
      left: 20,
      padding: 10,
      border: "1.5px solid #e0e0e0",
      borderRadius: 100,
      borderColor: "#616161",
      backgroundColor: "#424242",
      color: "e0e0e0",
      border: "1.5px solid #e0e0e0"
    },
    addPostBtn: {
      position: "fixed",
      top: 380,
      left: 20,
      padding: 10,
      backgroundColor: "white",
      border: "1.5px solid #e0e0e0",
      borderRadius: 100,
      borderColor: "#616161",
      backgroundColor: "#424242",
      color: "e0e0e0",
      border: "1.5px solid #e0e0e0",
      cursor: "pointer"
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
    },
    noPosts: {
      color: "white",
      padding: 20
    },
    likeValue: {
      textAlign: "left",
      margin: 0,
      marginTop: "10px",
      color: "white"
    }
  };

  const styles = theme ? darkModeStyles : lightModeStyles;

  const handleClosePopUp = () => {
    setPopUpOpen(false);
  };

  return (
    <div style={styles.backgroundColor}>
      <IconButton style={styles.themeToggle} onClick={changeTheme}>
        {theme ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
      </IconButton>
      <Link to={{ pathname: '/log-in' }}>
        <LogoutRoundedIcon style={styles.logOutBtn} />
      </Link>
      <Link to={{ pathname: '/create-new-post' }}>
        <AddRoundedIcon style={styles.addPostBtn} />
      </Link>
      <Container maxWidth="sm">
        {popUpOpen ? <PopUp open={popUpOpen} onClose={handleClosePopUp} /> : console.log(popUpOpen)}

        {posts.slice(0, postsAmount).map((post, index) => {
          return (
            <div key={index} style={styles.listContainer}>
              <div>
                <Card sx={styles.cardContainer}>
                  <CardContent>
                    <Typography variant="title" style={styles.cardContainer.title}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" style={styles.cardContainer.description}>
                      {post.mainDescription}
                    </Typography>
                  </CardContent>
                  <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography variant="body2" style={styles.cardContainer.description}>
                        {post.secondaryDescription}
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
                    borderColor: likes[post.id] ? '#cd74d4' : '#c1c1c1',
                    color: likes[post.id] ? "#cd74d4" : '#c1c1c1',
                    bgcolor: likes[post.id] ? 'rgba(255, 0, 247, 0.050)' : 'transparent',
                    "&:hover": {
                      bgcolor: likes[post.id] ? 'rgba(255, 0, 247, 0.150)' : 'transparent',
                    },
                  }}
                  onClick={() => handleLikeClick(post.id || post.id)}
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
                  }}>
                  <ExpandMoreIcon />
                </ExpandMore>
              </div>
              <h5 style={styles.likeValue}>{`${post.likes} Likes`}</h5>
            </div>
          );
        })}
        {postsAmount < posts.length ? (
          <Button
            sx={{
              color: theme ? "#e0e0e0" : "#cd74d4",
              bgcolor: theme ? "#424242" : "#fbf2fb",
              border: 1,
              borderColor: theme ? "#616161" : "#cd74d4",
              marginTop: 2,
              marginBottom: 2,
              textAlign: 'center',
              "&:hover": {
                bgcolor: theme ? "#616161" : "#fbf2fb",
              },
            }}
            variant="text"
            onClick={handleLoadMore}

          >
            Load More
          </Button>
        ) : (
          <Typography style={styles.noPosts}>
            that's it bae
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default Posts;
