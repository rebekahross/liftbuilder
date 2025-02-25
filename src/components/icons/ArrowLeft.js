const ArrowLeft = ({ className, width = 24, height = 24 }) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 1200 1200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1050 550H345l215-215-70-70-335 335 335 335 70-70-215-215h705z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowLeft;
