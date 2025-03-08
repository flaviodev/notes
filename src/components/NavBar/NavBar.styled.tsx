import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavbarContainer = styled.nav`
  width: 100%;
  height: 60px;
  background-color: #333;
  display: flex;
  align-items: center;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-left: auto;  
  margin-right: auto;  
`;

export const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #ffcc00;
  }
`;