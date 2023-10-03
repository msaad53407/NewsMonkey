/* eslint-disable react/prop-types */
const Error = ({ errorMessage: { data } }) => {
  return (
    <div className="w-full min-h-[50dvh] flex justify-center items-center">
      <h2 className="text-3xl font-bold text-center">{data}</h2>
    </div>
  );
};

export default Error;
