import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useState, useEffect } from 'react';

export default function ImgList() {
    const [images, setImages] = useState([]);

    const fetchImages = async () => {
        try {
            const imagePromises = Array(10)
                .fill(null)
                .map(async () => {
                    const response = await fetch(
                        `https://api.unsplash.com/photos/random?count=1&client_id=FO372Wunqxq9dX5Malrb-Tva7GzsGPV6NYnstPsBc5o`
                    );

                    if (response.ok) {
                        const imageData = await response.json();
                        return imageData[0];
                    } else {
                        console.error('Failed to fetch image');
                        return null;
                    }
                });

            const fetchedImages = await Promise.all(imagePromises);
            setImages([...images, ...fetchedImages.filter((image) => image !== null)]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleLoadMore = () => {
        fetchImages();
    };

    return (
        <div>
            {images.length > 0 && (
                <ImageList variant="masonry" cols={3} gap={8}>
                    {images.map((image) => (
                        <ImageListItem key={image.id}>
                            <img src={image.urls.regular} alt={image.alt_description || 'Unsplash Photo'} />
                        </ImageListItem>
                    ))}
                </ImageList>
            )}
            <button onClick={handleLoadMore}>Load More</button>
        </div>
    );
}
