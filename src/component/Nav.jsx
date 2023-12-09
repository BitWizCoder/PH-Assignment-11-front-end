import {
  Avatar,
  DarkThemeToggle,
  Dropdown,
  Flowbite,
  Navbar,
} from "flowbite-react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Nav = () => {
  const { logOutUser, user } = useContext(AuthContext);

  // console.log();

  const handleLogOut = () => {
    logOutUser()
      .then(console.log("Loged out successfully."))
      .catch((err) => console.log(err));
  };

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          AssigmentLab
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 gap-5">
        <div>
          <Flowbite>
            <DarkThemeToggle />
          </Flowbite>
        </div>

        {user ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" img={user?.photoURL} rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">{user?.displayName}</span>
              <span className="block truncate text-sm font-medium">
                {user?.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={handleLogOut}>Log Out</Dropdown.Item>
            <Dropdown.Divider />
          </Dropdown>
        ) : (
          ""
        )}

        <Navbar.Toggle />
      </div>

      <Navbar.Collapse className="dark:text-white">
        <NavLink to="/" active="active">
          Home
        </NavLink>
        <NavLink to="/new-assignment" active="active">
          Create Assignment
        </NavLink>
        <NavLink to="/all-assignment" active="active">
          Assignment
        </NavLink>
        <NavLink to="/submited-assignment" active="active">
          Submited Assignment
        </NavLink>
        <NavLink to="/my-assignment" active="active">
          My Assignment
        </NavLink>

        {user ? (
          ""
        ) : (
          <>
            <NavLink to="/login" active="active">
              Login
            </NavLink>
            <NavLink to="/signup" active="active">
              Sign up
            </NavLink>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Nav;
