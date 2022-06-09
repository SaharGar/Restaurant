import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {OWNER} from "../../consts";

export const Owner: React.FC = () => {

    const owner = useSelector((state: RootState) => state.landingPage.owner);

    return (
        <div className='owner flex column justify-center align-center'>
          <h3 className='owner-name-headline'>{OWNER}<span className='owner-name'>{owner?.name}</span></h3>
            <div className='img-container'>
                <img src={owner?.imageUrl} alt='Owner Image'/>
            </div>
        </div>
    )
}
