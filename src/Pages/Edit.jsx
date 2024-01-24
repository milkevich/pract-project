import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { database, ref } from '../firebaseConfig';
import { update } from 'firebase/database';
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";
import { useThemeContext } from "../Contexts/ThemeContext";

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

const Edit = () => {
    const location = useLocation();
    const post = location.state.post;
    const [editedPost, setEditedPost] = useState(post);
    const [posts, setPosts] = useState([1]);
    const { theme } = useThemeContext();
    const [expanded, setExpanded] = useState(Array(posts.length).fill(false));
    const [liked, setLiked] = useState(Array(posts.length).fill(false));
    const navigate = useNavigate();

    useEffect(() => {
        setExpanded(Array(posts.length).fill(false));
        setLiked(Array(posts.length).fill(false));
    }, [posts]);

    const handleInputChange = (e, field) => {
        const { value } = e.target;
        setEditedPost((prevPost) => ({
            ...prevPost,
            [field]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const postRef = ref(database, `posts/${editedPost.id}`);
            await update(postRef, {
                title: editedPost.title,
                mainDescription: editedPost.mainDescription,
                secondaryDescription: editedPost.secondaryDescription,
            });
            window.location.href = `/posts`;
        } catch (error) {
            console.error(error);
        }
    };

    const handleLikeClick = (index) => {
        const updatedLiked = [...liked];
        updatedLiked[index] = !updatedLiked[index];
        setLiked(updatedLiked);
    };

    const handleExpandClick = (index) => {
        const updatedExpanded = [...expanded];
        updatedExpanded[index] = !updatedExpanded[index];
        setExpanded(updatedExpanded);
    };

    const darkModeStyles = {
        popUp: {
            backgroundColor: "#212121",
            width: "100vw",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            padding: "50px",
            zIndex: 1000,
        },
        FormContainer: {
            display: "flex",
            flexDirection: "column",
            position: "relative",
            left: "200px",
            top: "200px"
        },
        Container: {
            position: "relative",
            left: "10%",
            bottom: "11%"
        },
        textField: {
            marginBottom: "15px",
            width: "300px",
            border: "1px solid",
            borderRadius: "5px",
            borderColor: "#616161",
            backgroundColor: "#424242",
            color: "white",
            outline: "none",
            padding: "15px"
        },
        btn: {
            width: "145px",
            display: "block",
            marginTop: "10px",
        },
        buttonContainer: {
            display: "flex",
            justifyContent: "space-between",
            width: "330px",
        },
        btnCancel: {
            width: "160px",
            padding: "12px",
            borderRadius: "5px",
            border: "1px solid",
            borderColor: "#616161",
            backgroundColor: "#212121",
            color: "white",
            cursor: "pointer"
        },
        btnCreate: {
            width: "160px",
            padding: "12px",
            borderRadius: "5px",
            border: "1px solid",
            borderColor: "#cd74d4",
            backgroundColor: "rgba(255, 0, 247, 0.050)",
            color: "#cd74d4",
            cursor: "pointer"
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
                color: "darkgray",
                maxHeight: "300px",
                overflowY: "scroll"
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
    };

    const lightModeStyles = {
        popUp: {
            backgroundColor: "white",
            width: "100vw",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            padding: "50px",
            zIndex: 1000,
        },
        FormContainer: {
            display: "flex",
            flexDirection: "column",
            position: "relative",
            left: "200px",
            top: "100px",
            wordBreak: "break-all"
        },
        Container: {
            position: "relative",
            left: "10%",
            bottom: "60%",
        },
        textField: {
            marginBottom: "15px",
            width: "300px",
            border: "1px solid",
            borderRadius: "5px",
            borderColor: "#616161",
            backgroundColor: "white",
            color: "gray",
            outline: "none",
            padding: "15px"
        },
        textArea: {
            marginBottom: "15px",
            width: "300px",
            height: "300px",
            border: "1px solid",
            borderRadius: "5px",
            borderColor: "#616161",
            backgroundColor: "white",
            color: "gray",
            outline: "none",
            padding: "15px"
        },
        btn: {
            width: "145px",
            display: "block",
            marginTop: "10px",
        },
        buttonContainer: {
            display: "flex",
            justifyContent: "space-between",
            width: "330px",
        },
        btnCancel: {
            width: "160px",
            padding: "12px",
            borderRadius: "5px",
            border: "1px solid",
            borderColor: "#616161",
            backgroundColor: "white",
            color: "black",
            cursor: "pointer"
        },
        btnCreate: {
            width: "160px",
            padding: "12px",
            borderRadius: "5px",
            border: "1px solid",
            borderColor: "#cd74d4",
            backgroundColor: "rgba(255, 0, 247, 0.050)",
            color: "#cd74d4",
            cursor: "pointer"
        },
        cardContainer: {
            border: 1.5,
            marginTop: 5,
            textAlign: 'left',
            borderRadius: 3,
            borderColor: '#c1c1c1',
            backgroundColor: 'white',
            maxHeight: "500px",
            boxShadow: "none",
            title: {
              color: "black"
            },
            description: {
              color: "darkgray",
                maxHeight: "400px",
                overflowY: "scroll",
                wordBreak: "break-word"
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
    };

    const styles = theme ? darkModeStyles : lightModeStyles;

    const goBack = () => {
        navigate("/posts");
    };

    return (
        <div>
            <div style={styles.popUp}>
                <div style={styles.FormContainer}>
                    <input
                        style={styles.textField}
                        required
                        placeholder='Title'
                        value={editedPost.title}
                        maxLength={67}
                        onChange={(e) => handleInputChange(e, 'title')}
                        name="title" 
                    />
                    <input
                        style={styles.textField}
                        required
                        placeholder='Description'
                        value={editedPost.mainDescription}
                        maxLength={67}
                        onChange={(e) => handleInputChange(e, 'mainDescription')}
                        name="mainDescription"
                    />
                    <textarea
                        style={styles.textArea}
                        placeholder='Secondary description (Optional)'
                        value={editedPost.secondaryDescription}
                        onChange={(e) => handleInputChange(e, 'secondaryDescription')}
                        name="secondaryDescription" 
                    />
                    <br />
                    <div style={styles.buttonContainer}>
                        <button onClick={goBack} style={styles.btnCancel}>
                            Cancel
                        </button>
                        <button onClick={handleFormSubmit} style={styles.btnCreate}>
                            Save Changes
                        </button>
                    </div>
                </div>
                {posts.map((index) => (
                    <Container style={styles.Container} key={index} maxWidth="sm">
                        <div>
                            <Card sx={styles.cardContainer}>
                                <CardContent>
                                    <Typography variant="title" style={styles.cardContainer.title}>
                                        {editedPost.title}
                                    </Typography>
                                    <Typography variant="body2" style={styles.cardContainer.description}>
                                        {editedPost.mainDescription}
                                    </Typography>
                                </CardContent>
                                <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography variant="body2" style={styles.cardContainer.description}>
                                            {editedPost.secondaryDescription}
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
                                    color: "#c1c1c1",
                                }}
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </div>
                    </Container>
                ))}
            </div>
        </div>
    );
};

export default Edit;