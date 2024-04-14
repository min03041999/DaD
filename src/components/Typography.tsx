import { TypographyInterfaceProps } from "../interface/Typography";

const Typography = ({ name }: TypographyInterfaceProps) => {
  return <div>{name ? name : "Typography"}</div>;
};

export default Typography;
