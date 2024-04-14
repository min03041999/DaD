import { ButtonInterfaceProps } from "../interface/Button";

const Button = ({ title, style }: ButtonInterfaceProps) => {
  return (
    <div
      className={`py-2 w-full px-2 rounded-md text-center text-white ${
        style ? style : "bg-indigo-600"
      }`}
    >
      {title ? title : "Title"}
    </div>
  );
};

export default Button;
