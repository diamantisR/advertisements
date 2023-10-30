import Navigation from './Navigation';
import classes from './MainHeader.module.css';
import { NavLink } from 'react-router-dom';

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <NavLink className={classes.logo} to='/'>
        Properties
      </NavLink>
      <label className={classes.icons}>
        <i className='bx bx-menu' id='menu-icon'></i>
        <i className='bx bx-x' id='close-icon'></i>
      </label>
      <Navigation />
    </header>
  );
};

export default MainHeader;
