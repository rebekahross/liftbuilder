import React from "react";

const CheckMark = ({ className, width = 18, height = 18 }) => (
  <svg
    fill="#000000"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 78.369 78.369"
  >
    <g>
      <path
        d="M78.049,19.015L29.458,67.606c-0.428,0.428-1.121,0.428-1.548,0L0.32,40.015c-0.427-0.426-0.427-1.119,0-1.547l6.704-6.704
        c0.428-0.427,1.121-0.427,1.548,0l20.113,20.112l41.113-41.113c0.429-0.427,1.12-0.427,1.548,0l6.703,6.704
        C78.477,17.894,78.477,18.586,78.049,19.015z"
      />
    </g>
  </svg>
);

export default CheckMark;
