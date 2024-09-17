import MenuButton from "./MenuButton";

type TitleProps = {
  title: string;
};

const TitleMenus = ({ title }: TitleProps) => {
  return (
    <div className=" bg-slate-500 w-full h-[15vh]  flex justify-around items-center max-h-[10vh]">
      <MenuButton />
      <div className="text-white font-bold tracking-tight text-3xl">
        {title}
      </div>
      <div className="invisible">adsa</div>
    </div>
  );
};

export default TitleMenus;
