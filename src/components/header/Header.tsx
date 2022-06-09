import {DEFAULT_APP_NAME} from "../../consts";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {NavLink, Link} from "react-router-dom";

export const Header = () => {

  const restaurantName = useSelector((state: RootState) => state.landingPage.restaurantName);
  const timerStatus = useSelector((state: RootState) => state.timer.status);
  const totalIncome = useSelector((state: RootState) => state.generalInfo.totalIncome);
  const isTotalIncomeVisible = useSelector((state: RootState) => state.generalInfo.isTotalIncomeVisible);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  const onToggleMobileMenu = (ev: React.MouseEvent) => {
    ev.stopPropagation()
    setIsMobileMenuOpen(prevState => !prevState)
  }

  return (
    <div className='app-header flex space-between align-center'>
      <Link to='/'>
        <h1 data-testid='app-headline' className='app-headline'>
          {restaurantName ? restaurantName : DEFAULT_APP_NAME}
        </h1>
      </Link>
      {isTotalIncomeVisible && <h3 className='total-income'>Total Income: {totalIncome}₪</h3>}
      <nav className='nav-links flex'>
        <NavLink className='nav-link' to='/'>App</NavLink>
        {timerStatus !== 'running' && <NavLink className='nav-link' to='/advanced-features'>Advanced Features</NavLink>}
      </nav>
      <i className="menu-icon lni lni-menu" onClick={onToggleMobileMenu}></i>
      {isMobileMenuOpen && <div className='mobile-menu-modal-container' onClick={onToggleMobileMenu}></div>}
      <div className={`mobile-menu-nav-links-container ${isMobileMenuOpen && 'open'}`}>
        <NavLink className='nav-link' to='/'>App</NavLink>
        {timerStatus !== 'running' &&
            <NavLink className='nav-link' to='/advanced-features'>Advanced Features</NavLink>}
      </div>
    </div>
  )
}
