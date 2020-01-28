import React from "react";

export default ({ className = "" }) => {
    return <svg
        className={className}
        height="16"
        viewBox="0 0 16 16"
        width="16"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M2.333 3.61a.935.935 0 010-1.32.927.927 0 011.315 0l10.08 10.117a.935.935 0 010 1.32.927.927 0 01-1.315 0L2.333 3.61z"
            fill="#000000" />
        <path
            d="M12.352 2.273a.927.927 0 011.314 0 .935.935 0 010 1.32L3.587 13.709a.927.927 0 01-1.315 0 .935.935 0 010-1.32l10.08-10.116z"
            fill="#000000" />
    </svg>;
};