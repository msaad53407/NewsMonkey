/* eslint-disable react/prop-types */
import LoadingBar from "react-top-loading-bar";

const TopLoadingBar = ({ progress }) => {
  return <LoadingBar color="#f97316" height={3} progress={progress} />;
};

export default TopLoadingBar;
