import { Link } from "react-router-dom";

const MenuButton = () => {
  return (
    <Link
      to={"/dashboard"}
      className="btn"
    >
      Menu
    </Link>
  );
};

export default MenuButton;
