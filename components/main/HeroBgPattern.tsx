import { useMemo } from "react";

const HeroBgPattern = () => {
  // Generate stable binary values that won't change between server and client
  const binaryValues = useMemo(
    () => Array.from({ length: 30 }, (_, i) => (i % 2 === 0 ? "1" : "0")),
    []
  );

  return (
    <>
      {/* Animated Binary Matrix */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className={`absolute font-mono text-sm animate-pulse ${
              i % 4 === 0 ? "text-white/40" : "text-white/40"
            }`}
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7) % 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${2 + (i % 3)}s`,
              color: i % 4 === 0 ? "rgba(208, 56, 75, 0.6)" : undefined,
            }}
          >
            {binaryValues[i]}
          </div>
        ))}
      </div>

      {/* Technology Tags */}
      <div className="relative z-10 h-full">
        {[
          {
            text: "AI",
            top: "10%",
            left: "20%",
            delay: "0s",
            isRed: true,
          },
          {
            text: "MACHINE LEARNING",
            top: "20%",
            left: "22%",
            delay: "0s",
            isRed: false,
          },
          {
            text: "MODEL CONTEXT PROTOCOL",
            top: "30%",
            left: "15%",
            delay: "0s",
            isRed: true,
          },
          {
            text: "RAG",
            top: "40%",
            left: "35%",
            delay: "0s",
            isRed: true,
          },
          {
            text: "NEXTJS",
            top: "20%",
            right: "15%",
            delay: "0.5s",
            isRed: false,
          },
          {
            text: "PERFORMANCE",
            top: "60%",
            right: "15%",
            delay: "0.5s",
            isRed: false,
          },
          {
            text: "PYTHON",
            bottom: "25%",
            left: "10%",
            delay: "1s",
            isRed: false,
          },
          {
            text: "JAVASCRIPT",
            top: "50%",
            left: "5%",
            delay: "2s",
            isRed: false,
          },
          {
            text: "NODE",
            top: "35%",
            right: "5%",
            delay: "2.5s",
            isRed: true,
          },
          {
            text: "REACT",
            top: "45%",
            right: "5%",
            delay: "2.5s",
            isRed: false,
          },
          {
            text: "ANALYTICS",
            top: "75%",
            right: "5%",
            delay: "2.5s",
            isRed: false,
          },
          {
            text: "DATA",
            top: "65%",
            right: "10%",
            delay: "2.5s",
            isRed: true,
          },
          {
            text: "INFRASTRUCTURE",
            top: "85%",
            right: "10%",
            delay: "2.5s",
            isRed: true,
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`absolute text-white px-3 py-1 rounded text-xs font-mono animate-bounce hover:scale-110 transition-transform cursor-pointer ${
              item.isRed ? "" : "bg-black text-white"
            }`}
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
              animationDelay: item.delay,
              animationDuration: "3s",
              backgroundColor: item.isRed
                ? "var(--color-secondary)"
                : undefined,
            }}
          >
            {item.text}
          </div>
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full gap-1">
          {Array.from({ length: 144 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-sm animate-pulse ${i % 7 === 0 ? "" : "bg-white"}`}
              style={{
                animationDelay: `${(i * 0.05) % 3}s`,
                animationDuration: "3s",
                backgroundColor:
                  i % 7 === 0 ? "var(--color-secondary)" : undefined,
              }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroBgPattern;
