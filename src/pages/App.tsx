import React from 'react';
import {Queues} from '../components/queue/Queues'
import {Production} from "../components/production/Production";
import {Delivery} from "../components/delivery/Delivery";
import {LandingPage} from "../components/landing-page/LandingPage";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {Owner} from "../components/owner/Owner";

export const App: React.FC = () => {

    const isLandingPageOn = useSelector((state: RootState) => state.landingPage.isLandingPageOn);

    return (
        <div className='app flex column align-center'>
                {isLandingPageOn &&
                        <LandingPage/>
                }
                {!isLandingPageOn &&
                    <div className='main-container'>
                        <Owner/>
                        <Queues/>
                        <Production/>
                        <Delivery/>
                    </div>}
        </div>
    )
}
