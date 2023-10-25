
import { AiOutlineSetting } from 'react-icons/ai'
import { IoPersonOutline } from 'react-icons/io5'
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { AiOutlineHome } from 'react-icons/ai'
import { IconContext } from 'react-icons';
import { useNavigate, Link, useMatch, useResolvedPath } from 'react-router-dom';

import '../Styles/Navbar.css';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthProvider';
import { Button } from 'react-bootstrap';
import { MdClose } from 'react-icons/md';
import { BiMenu } from 'react-icons/bi';
import { useBlurContext } from '../context/BlurContext';
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const {setBlurred}= useBlurContext();

  const handleResize = () => {
    if (window.innerWidth <= 960) {
      setMobile(true);
    } else {
      setMobile(false);
      setToggle(false);
    }
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);


  const handleToggle = () => {
    setToggle(!toggle);
    console.log(toggle);
  }
  useEffect(()=>{
    (toggle && mobile) ? setBlurred(true) : setBlurred(false);
  },[toggle]);

  useEffect(() => {
    const role = window.localStorage.getItem('roles')
    // Check if the user has the admin role
    const checkAdminRole = () => {
      if (role) {
        setIsAdmin(role.includes('ROLE_ADMIN'));
      }

      setLoading(false);
    };
    console.log(isAdmin)
    checkAdminRole();
  }, [auth.roles, loading]);

  if (loading) {
    return <div>Loading...</div>; // Display a loading state while fetching authentication information
  }


  return (
    <div className='navbar'>
   
      
          {isAdmin ?
            <ul className={toggle ? 'nav active' : 'nav'}>
              <li><Link  className='nav-link'  to={'/'}>Products</Link>   </li>
              <li><Link  className='nav-link' to='/admin/products'><div>Manage Products</div></Link></li>
              <li><Link  className='nav-link' to='/admin/brands'><div>Manage Brands</div></Link></li>
              <li><Link  className='nav-link' to='/admin/categories'><div>Categories & Types</div></Link></li>
              <li><Link  className='nav-link' to='/admin/attributes'><div>Mange Attributes</div></Link></li>
              <li><Link  className='nav-link' to='/admin/genders'><div>Manage Genders</div></Link></li>
              <li><Link  className='nav-link' to='/admin/orders'><div>Manage Orders</div></Link></li>
            </ul > :

            <ul className={toggle ? 'nav active' : 'nav'}>
              <li><Link onClick={handleToggle} to={'/home'}><div  className='navi-link'><AiOutlineHome />Home</div></Link></li>
              <li><Link onClick={handleToggle} to={'/'}><div  className='navi-link'>PRODUCTS</div></Link></li>
              <li><Link onClick={handleToggle} to={'/MyAccount'} ><div  className='navi-link'><IoPersonOutline />Account</div></Link></li>
              <li><Link onClick={handleToggle} to={'/Favorites'}><div  className='navi-link'><AiOutlineHeart />Whishlist</div></Link></li>
              <li><Link  onClick={handleToggle} to={'/ShoppingCart'}><div  className='navi-link'><AiOutlineShoppingCart />Cart</div></Link></li>
            </ul>

          }
       
      <button className='toggle' onClick={handleToggle}>
        {!toggle ? <BiMenu />
          : <MdClose />}</button>
    </div>

  );

};

export default Navbar;

