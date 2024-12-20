type Props = {
  child?: JSX.Element;
  children?: Array<JSX.Element>;
};

export const Container = ({ child, children }: Props) => {
  return <box className="box">{child}</box>;
};
