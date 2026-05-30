"use client";

const MARKERS = [
  {
    left: "12.5%",
    lines: ["No conversation", "in 4 mo"],
    top: "11.6%",
  },
  {
    left: "50%",
    lines: ["Re-engaged"],
    top: "10%",
  },
  {
    left: "74.4%",
    lines: ["Upsell"],
    top: "10%",
  },
] as const;

const LABEL_OFFSET_PX = 6;

function ChartAreaFill() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 504 417.285"
    >
      <defs>
        <linearGradient
          id="measure-chart-area"
          x1="252"
          x2="252"
          y1="-76.2152"
          y2="417.285"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#2ACE95" stopOpacity="0.2" />
          <stop offset="1" stopColor="#2ACE95" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M244.668 229.798L192.799 173.29C190.519 170.807 186.927 170.019 183.818 171.32L159.312 181.573C158.122 182.071 157.07 182.849 156.245 183.842L129.151 216.466C127.219 218.792 124.141 219.83 121.195 219.15L64.1157 205.961C63.3757 205.79 62.6151 205.726 61.8568 205.769L0 209.316V409.285C0 413.703 3.58172 417.285 8 417.285H496C500.418 417.285 504 413.703 504 409.285V36.7848L481.824 64.1059C477.869 68.9786 470.099 67.6075 468.051 61.6753L448.615 5.38891C446.184 -1.65081 436.297 -1.84125 433.597 5.09963L380.646 141.214C379.147 145.066 374.959 147.143 370.985 146.003L320.976 131.666C317.46 130.658 313.709 132.163 311.864 135.321L257.469 228.423C254.753 233.073 248.31 233.765 244.668 229.798Z"
        fill="url(#measure-chart-area)"
        opacity={0.4}
      />
    </svg>
  );
}

function ChartLine() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 510.603 232.888"
    >
      <path
        d="M510.25 33.5348L507.25 37.0348L485.074 64.3559C481.119 69.2286 473.349 67.8575 471.301 61.9253L451.865 5.63891C449.434 -1.40081 439.547 -1.59125 436.847 5.34963L383.896 141.464C382.397 145.316 378.209 147.393 374.235 146.253L324.226 131.916C320.71 130.908 316.959 132.413 315.114 135.571L260.719 228.673C258.003 233.323 251.56 234.015 247.918 230.048L196.049 173.54C193.769 171.057 190.177 170.269 187.068 171.57L162.562 181.823C161.372 182.321 160.32 183.099 159.495 184.092L132.401 216.716C130.469 219.042 127.391 220.08 124.445 219.4L67.3657 206.211C66.6257 206.04 65.8651 205.976 65.1068 206.019L3.25 209.566H0.25"
        fill="none"
        stroke="#2ACE95"
        strokeLinecap="square"
        strokeWidth="0.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function MeasureChartMockup() {
  return (
    <div className="measure-chart-mockup relative h-full w-full overflow-hidden">
      {MARKERS.map((marker) => (
        <div
          key={marker.left}
          className="absolute inset-y-0"
          style={{ left: marker.left }}
        >
          <div
            aria-hidden
            className="absolute bottom-0 left-0 top-[8.4%] w-px bg-gradient-to-b from-white/20 to-transparent"
          />
          <div
            className="pointer-events-none absolute whitespace-nowrap text-[0.875rem] leading-[1.3] tracking-[-0.01em] text-white"
            style={{ left: LABEL_OFFSET_PX, top: marker.top }}
          >
            {marker.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      ))}

      <div className="absolute inset-x-0 top-[22.7%] h-[77.2%]">
        <div className="absolute inset-[3.52%_0_0_0]">
          <ChartAreaFill />
        </div>
      </div>

      <div className="absolute -left-[0.6%] top-[22.7%] h-[45.2%] w-[101.2%]">
        <div className="absolute inset-[5.92%_0_2.03%_0]">
          <ChartLine />
        </div>
      </div>
    </div>
  );
}
