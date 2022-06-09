import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {landingPageActions} from "../../store/landing-page.slice";
import {useDispatch, useSelector} from "react-redux";
import { useSearchParams } from "react-router-dom";
import {RootState} from "../../store";

interface PersonCardProps {
    name: string;
    imageUrl: string;
}

export const PersonCard: React.FC<PersonCardProps> = ({name, imageUrl}) => {

    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const restaurantName = useSelector((state: RootState) => state.landingPage.restaurantName);

    const onPickOwner = () => {
        dispatch(landingPageActions.setRestaurantOwner({name, imageUrl}));
        dispatch(landingPageActions.setIsLandingPageOn(false))
        setSearchParams({
            restaurantName: restaurantName!.toLowerCase().replaceAll(' ','-'),
            owner: name.toLowerCase().replaceAll(' ','-'),
            ownerImg: imageUrl
        })
    }

    return (
        <div className='person-card' onClick={onPickOwner}>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="300"
                        image={imageUrl}
                        alt="Person Image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}
