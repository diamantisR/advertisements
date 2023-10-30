import { useNavigate } from 'react-router';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={classes.navbar}>
      <NavLink to='/'>Advertisements</NavLink>
      <NavLink to='/advertisements/create'>New advertisement</NavLink>
    </nav>
    // <div className='card'>
    //   <Menubar start={start} end={end} />
    // </div>
  );
}
