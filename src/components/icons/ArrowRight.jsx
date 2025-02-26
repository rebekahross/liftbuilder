const ArrowRight = ({ className, width = 24, height = 24 }) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 1200 1200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M150 550h775v100H150z" fill="currentColor" />
      <path
        d="M710 935l-70-70 265-265-265-265 70-70 335 335z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowRight;
