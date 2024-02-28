import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { logOutAsync } from '../Redux/Slices/userSlice';
import { useDispatch } from 'react-redux';

export default function Nav() {
  const [showBasic, setShowBasic] = useState(false);

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logOutAsync())
  }

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarNav className='d-flex align-item-center' style={{justifyContent:"space-between"}}>
            <MDBNavbarItem>
                <MDBNavbarBrand href='#'>ToDo List</MDBNavbarBrand>
            </MDBNavbarItem>
         
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='hidden-arrow d-flex align-items-center nav-link'>
                  <img
                    src='https://mdbootstrap.com/img/new/avatars/2.jpg'
                    className='rounded-circle'
                    height='22'
                    alt='Avatar'
                    loading='lazy'
                  />
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link>MyProfile</MDBDropdownItem>
                  <MDBDropdownItem link>Settings</MDBDropdownItem>
                  <MDBDropdownItem onClick={logoutHandler} link>Logout</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
</MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
  );
}