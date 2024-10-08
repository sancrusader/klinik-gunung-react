import { SVGAttributes } from "react";

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            {...props}
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="300.000000pt"
            height="299.000000pt"
            viewBox="0 0 300.000000 299.000000"
            preserveAspectRatio="xMidYMid meet"
        >
            <g
                transform="translate(0.000000,299.000000) scale(0.100000,-0.100000)"
                fill="#1f3d7c"
                stroke="none"
            >
                <path
                    d="M750 1495 l0 -745 450 0 450 0 -46 78 c-26 42 -67 113 -91 157 -56
99 -115 195 -119 195 -2 0 -20 -29 -41 -65 -20 -36 -40 -65 -44 -65 -4 0 -49
72 -99 160 -81 140 -94 158 -105 143 -6 -10 -35 -60 -65 -110 -29 -51 -54 -93
-56 -93 -2 0 -4 194 -4 430 l0 430 135 0 135 0 2 -257 3 -257 89 155 c49 85
116 200 149 257 l59 102 160 0 160 0 -22 -37 c-12 -21 -55 -94 -95 -163 -40
-69 -100 -172 -134 -230 -33 -58 -61 -108 -61 -111 0 -7 41 -78 313 -549 l95
-165 141 -3 141 -3 0 746 0 745 -750 0 -750 0 0 -745z m415 -413 l0 -42 43 0
42 0 0 -44 0 -45 -42 -3 c-43 -3 -43 -3 -43 -43 l0 -40 -47 -3 -47 -3 -3 43
c-3 40 -5 43 -33 44 -54 1 -55 2 -55 49 l0 45 45 0 45 0 0 46 0 45 48 -3 47
-3 0 -43z"
                />
            </g>
        </svg>
    );
}
