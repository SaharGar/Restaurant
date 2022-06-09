import {Routes, Route} from 'react-router'
import {Header} from "./components/header/Header";
import {App} from "./pages/App";
import {AdvancedFeatures} from "./pages/AdvancedFeatures";
import {Timer} from "./components/timer/Timer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import React, {useEffect} from "react";
import {useSearchParams, useLocation} from "react-router-dom";
import {landingPageActions} from "./store/landing-page.slice";


export const RootCmp: React.FC = () => {

  const isLandingPageOn = useSelector((state: RootState) => state.landingPage.isLandingPageOn);
  const restaurantName = useSelector((state: RootState) => state.landingPage.restaurantName);
  const owner = useSelector((state: RootState) => state.landingPage.owner);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    const restaurantName: string | null = searchParams.get('restaurantName');
    const owner: string | undefined = searchParams.get('owner')?.replaceAll('-', ' ')
    const ownerImg: string | null = searchParams.get('ownerImg')
    if(restaurantName&& owner && ownerImg) {
      dispatch(landingPageActions.setRestaurantName(restaurantName))
      dispatch(landingPageActions.setRestaurantOwner({name: owner, imageUrl: ownerImg!}))
      dispatch(landingPageActions.setIsLandingPageOn(false))
    }
  }, [])

  useEffect(() => {
    if(restaurantName && owner && location.pathname === '/') {
      setSearchParams({
        restaurantName: restaurantName!.toLowerCase().replaceAll(' ','-'),
        owner: owner.name!.toLowerCase().replaceAll(' ','-'),
        ownerImg: owner.imageUrl!
      })
    }
  },[location.pathname])


  return (
    <div>
      <header>
        <Header/>
      </header>
      <main>
        {!isLandingPageOn && <Timer/>}
        <Routes>
          <Route path='/' element={<App/>}/>
          <Route path='/advanced-features' element={<AdvancedFeatures/>}/>
        </Routes>
      </main>
    </div>
  )
}
