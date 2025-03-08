import { NavbarContainer, NavLinks, NavLink } from "./NavBar.styled";

export const NavBar = () => {

  return (
    <NavbarContainer>
      <NavLinks>
        <NavLink to="/">Reviews</NavLink>
        <NavLink to="/about">About</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};
