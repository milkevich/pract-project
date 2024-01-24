import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useThemeContext } from '../Contexts/ThemeContext';
import { database, ref, onValue } from '../firebaseConfig';
import { update, increment } from 'firebase/database';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Grow from '@mui/material/Grow';
import { useUserContext } from '../Contexts/UserContext';
import Avatar from '@mui/material/Avatar';

const PostPage = () => {
    const { theme } = useThemeContext();
    const location = useLocation();
    const [likes, setLikes] = useState({});
    const [postLikes, setPostLikes] = useState();
    const [likesLoading, setLikesLoading] = useState(true);
    const [checked, setChecked] = useState(false);

    const { user } = useUserContext();


    const post = location.state.post;
    const navigate = useNavigate();

    useEffect(() => {
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts'));

        setLikesLoading(true);
        setLikes(likedPosts || {});

        const postLikesRef = ref(database, `posts/${location.state.postId}`);
        onValue(postLikesRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data.likes !== undefined) {
                setPostLikes(data.likes);
            }
            setLikesLoading(false);
        });
    }, [location.state.postId]);

    const toggleLike = async (postId) => {
        const isLiked = likes[postId];
        const updatedLikes = { ...likes };

        try {
            const postLikesRef = ref(database, `posts/${postId}`);
            const likesUpdate = isLiked ? increment(-1) : increment(1);

            await update(postLikesRef, {
                likes: likesUpdate,
            });

            updatedLikes[postId] = !isLiked;
        } catch (error) {
            console.error(error);
        }

        localStorage.setItem('likedPosts', JSON.stringify(updatedLikes));
        setLikes(updatedLikes);
    };

    const handleLikeClick = async (postId) => {
        try {
            await toggleLike(postId);
        } catch (error) {
            console.error(error);
        }
    };

    const goBack = () => {
        navigate('/posts');
    };

    const handleEditClick = () => {
        navigate(`/post/${post.id}/edit`, {
            state: { post },
        });
    };

    const darkModeStyles = {
        background: {
            backgroundColor: "#212121",
        },
        container: {
            maxWidth: "100vh",
            minHeight: "95vh",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            padding: "20px",
            paddingLeft: "40px",
            paddingRight: "40px",
            backgroundColor: "#212121",
        },
        header: {
            textAlign: "left",
            marginTop: "-20px",
            title: {
                fontSize: "42px",
                fontWeight: "900",
                letterSpacing: "-0.11rem",
                color: "white"
            },
            author: {
                marginBottom: "10px",
                marginTop: "-30px",
                color: "white",
                display: "flex",
            }
        },
        postMenu: {
            display: "flex",
            justifyContent: "space-between",
            border: "solid",
            borderColor: "#616161",
            backgroundColor: "#424242",
            padding: 5,
            borderRadius: 12,
            marginTop: 10,
        },
        likeValue: {
            textAlign: "left",
            margin: 0,
            marginTop: "10px",
            color: "white",
        },
        description: {
            marginBottom: "50px",
            marginTop: "-30px",
            color: "white",
            fontWeight: "600"
        },
        mainContent: {
            wordBreak: "break-word",
            color: "white",
            marginTop: "20px"
        },
    };

    const lightModeStyles = {
        container: {
            maxWidth: "100vh",
            minHeight: "95vh",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            padding: "20px",
            paddingLeft: "40px",
            paddingRight: "40px",
        },
        header: {
            textAlign: "left",
            marginTop: "-20px",
            title: {
                fontSize: "42px",
                fontWeight: "900",
                letterSpacing: "-0.11rem",
            },
            author: {
                marginBottom: "10px",
                marginTop: "-30px",
                display: "flex",
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
        likeValue: {
            textAlign: "left",
            margin: 0,
            marginTop: "10px",
            color: "black"
        },
        description: {
            marginBottom: "50px",
            marginTop: "-30px",
            color: "#616161",
            fontWeight: "600"
        },
        mainContent: {
            wordBreak: "break-word",
            marginTop: "20px"
        }
    };

    const firstInitial = post.author[0].toUpperCase()

    const styles = theme ? darkModeStyles : lightModeStyles;

    return (
        <div style={styles.background}>
            {likesLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress style={{ color: 'darkgray' }} />
                </div>
            ) : (
                <Grow
                    in={!likesLoading}
                    style={{ transformOrigin: '0 1 0' }}
                    {...(checked ? { timeout: 1000 } : {})}
                    onEntered={() => setChecked(true)}
                >
                    <div style={styles.container}>
                        <div style={styles.header}>
                            <p style={styles.header.title}>
                                <ChevronLeftIcon
                                    sx={{
                                        fontSize: '32px',
                                        position: 'relative',
                                        right: '5px',
                                        cursor: 'pointer',
                                        transition: 'ease-in-out 0.3s',
                                        '&:hover': {
                                            marginLeft: '10px',
                                            marginRight: '20px',
                                        },
                                    }}
                                    onClick={goBack}
                                />
                                {post.title}
                            </p>
                            <p style={styles.description}>{post.mainDescription}</p>
                            <p style={styles.header.author}>
                                <Avatar sx={{ width: 36, height: 36 }}>
                                    {firstInitial}
                                </Avatar> 
                                <span style={{marginTop: "7px", marginLeft: "10px"}}>{post.author}</span>
                            </p>
                        </div>
                        <div style={styles.postMenu}>
                            <IconButton
                                sx={{
                                    borderRadius: 2,
                                    border: 1,
                                    borderColor: likes[post.id] ? '#cd74d4' : '#c1c1c1',
                                    color: likes[post.id] ? '#cd74d4' : '#c1c1c1',
                                    bgcolor: likes[post.id] ? 'rgba(255, 0, 247, 0.050)' : 'transparent',
                                    transition: 'ease-in-out 0.3s',
                                    '&:hover': {
                                        bgcolor: likes[post.id] ? 'rgba(255, 0, 247, 0.150)' : 'transparent',
                                        color: likes[post.id] ? '#cd74d4' : 'gray',
                                    },
                                }}
                                onClick={() => handleLikeClick(post.id)}
                            >
                                <FavoriteIcon />
                            </IconButton>
                            {user && post.author === user.email && (
                                <ModeEditIcon
                                    sx={{
                                        marginTop: '10px',
                                        marginRight: '15px',
                                        fontSize: '21px',
                                        color: 'darkgray',
                                        cursor: 'pointer',
                                        transition: 'ease-in-out 0.3s',
                                        '&:hover': {
                                            color: 'gray',
                                        },
                                    }}
                                    onClick={handleEditClick}
                                />)}
                        </div>

                        <h5 style={styles.likeValue}>{`${postLikes.toLocaleString()}`} <span style={{fontWeight: "500"}}>People liked this post</span></h5>

                        <div  style={styles.mainContent}>
                        <div dangerouslySetInnerHTML={{ __html: post.secondaryDescription.replace(/\n/g, '<br>') }}></div>
                        </div>
                    </div>
                </Grow>
            )}
        </div>
    );
};

export default PostPage;