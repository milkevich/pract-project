import { React, useState } from 'react';
import { useThemeContext } from "../Contexts/ThemeContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { addNewPost } from "../firebaseConfig";
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../Contexts/UserContext'



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

const CreateNewPost = () => {
    const { theme } = useThemeContext();
    const [posts, setPosts] = useState([1]);
    const [expanded, setExpanded] = useState([]);
    const [liked, setLiked] = useState([]);
    const [title, setTitle] = useState('Title');
    const [description, setDescription] = useState('Description');
    const [secondaryDescription, setSecondaryDescription] = useState('Secondary Description');

    const handleExpandClick = (index) => {
        const updatedExpanded = [...expanded];
        updatedExpanded[index] = !updatedExpanded[index];
        setExpanded(updatedExpanded);
      };
    
      const handleLikeClick = (index) => {
        const updatedLiked = [...liked];
        updatedLiked[index] = !updatedLiked[index];
        setLiked(updatedLiked);
        console.log('liked')
      };

      const navigate = useNavigate();
      const {user} = useUserContext()
      const [author, setAuthor] = useState(user.email)


      const handleNewPost = () => {
        if (!title || !description || !secondaryDescription) {
          alert("You have to fill in all the forms.");
          return;
        } else {
          addNewPost(title, description, secondaryDescription, author)
          navigate("/posts");
        }
      }

      console.log(user.email)

      const goBack = () => {
        navigate("/posts");
      }

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
            top: "100px"
        },
        Container: {
            position: "relative",
            left: "10%",
            bottom: "60%",
            wordBreak: "break-word"

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
            padding: "15px",
            wordBreak: "break-word"
        },
        textArea: {
            marginBottom: "15px",
            width: "300px",
            height: "300px",
            border: "1px solid",
            borderRadius: "5px",
            borderColor: "#616161",
            backgroundColor: "#424242",
            color: "white",
            outline: "none",
            padding: "15px",
            wordBreak: "break-word"
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
                maxHeight: "400px",
                overflowY: "scroll",
            },
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
            padding: "15px",
            whiteSpace: "pre-line", 
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
                overflowY: "scroll"
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

    return (
        <div>
        <div style={styles.popUp} >
            <div style={styles.FormContainer}>
            <input
                style={styles.textField}
                required
                placeholder='Title'
                value={title}
                maxLength={67}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                style={styles.textField}
                required
                placeholder='Description'
                value={description}
                maxLength={200}
                onChange={(e) => setDescription(e.target.value)}
            />
            <textarea

                style={styles.textArea}
                placeholder='Secondary description (Optional)'
                value={secondaryDescription}
                type='messege'
                onChange={(e) => setSecondaryDescription(e.target.value)}
            />
                <br />
                <div style={styles.buttonContainer}>
                    <button onClick={goBack} style={styles.btnCancel} >
                        Cancel
                    </button>
                    <button onClick={handleNewPost} style={styles.btnCreate} >
                        Create
                    </button>
                </div>
            </div> 
            {posts.map((index) => {
          return (
            <Container style={styles.Container} key={index} maxWidth="sm">
              <div>
                <Card sx={styles.cardContainer}>
                  <CardContent>
                    <Typography variant="title" style={styles.cardContainer.title}>
                    {title}
                    </Typography>
                    <Typography variant="body2" style={styles.cardContainer.description}>
                    {description}
                    </Typography>
                  </CardContent>
                  <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography variant="body2" style={styles.cardContainer.description}>
                        {secondaryDescription}
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
                  }}>
                  <ExpandMoreIcon />
                </ExpandMore>
              </div>
            </Container>
          );
        })}
        </div>
        </div>
    );
};

export default CreateNewPost;
