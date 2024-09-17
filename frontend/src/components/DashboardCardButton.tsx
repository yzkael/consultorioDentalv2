import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface DashboardCardButtonProps {
  image: IconType; // React Icon component type
  title: string;
  description: string;
  link: string;
}

const DashboardCardButton: React.FC<DashboardCardButtonProps> = ({
  image: Icon, // Destructure and rename `image` to `Icon`
  title,
  description,
  link,
}) => {
  return (
    <Link
      className="w-max h-max py-4 px-8 min-w-[320px] rounded-lg bg-blue-600 hover:bg-blue-500 flex flex-col justify-center items-center shadow-2xl border-black"
      to={link}
    >
      <Icon className="text-white w-6 h-6" />
      <h2 className="text-white font-bold text-2xl tracking-tight">{title}</h2>
      <p className="text-sm text-white font-semibold">{description}</p>
    </Link>
  );
};

export default DashboardCardButton;
