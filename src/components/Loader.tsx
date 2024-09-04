import { Triangle } from "react-loader-spinner";

type Props = {
  height?: string;
  width?: string;
  color?: string;
  visible?: boolean;
  wrapperClass?: string;
};
const Loader = (props: Props) => {
  const { color = "blue", height = "80", visible = true, width = "80", wrapperClass } = props;
  return (
    <Triangle
      visible={visible}
      height={height}
      width={width}
      color={color}
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClass={wrapperClass}
    />
  );
};

export default Loader;
