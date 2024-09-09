import { Link } from "react-router-dom";

const MenuButton = () => {
  return (
    <Link
      to={"/dashboard"}
      className="py-1 px-2 bg-purple-600 rounded-lg font-bold text-white hover:bg-purple-400"
    >
      Menu
    </Link>
  );
};

export default MenuButton;
