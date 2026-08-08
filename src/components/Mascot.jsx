// Coin-medal mascot, built from plain divs (no images/SVG), matching the
// approved design prototype. Canonical canvas is 100x120; `size` scales it.
export default function Mascot({
  size = 82,
  ribbonColor = "#1F3864",
  mouth = "smile", // "smile" | "neutral"
  sparkle = false,
  dashedRing = false,
  animate = false,
  className = "",
  style = {},
}) {
  const scale = size / 100;
  const height = size * 1.2;

  return (
    <div
      className={className}
      style={{
        width: size,
        height,
        position: "relative",
        animation: animate ? "bob 2.6s ease-in-out infinite" : undefined,
        ...style,
      }}
    >
      <div
        style={{
          width: 100,
          height: 120,
          position: "absolute",
          top: 0,
          left: 0,
          transform: `scale(${scale})`,
          transformOrigin: "left top",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 26,
            width: 18,
            height: 40,
            background: ribbonColor,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 56,
            width: 18,
            height: 40,
            background: ribbonColor,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 10,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "#E3B23C",
            border: "5px solid #B8860B",
          }}
        />
        {dashedRing && (
          <div
            style={{
              position: "absolute",
              top: 6,
              left: 16,
              width: 68,
              height: 68,
              borderRadius: "50%",
              border: "2px dashed #FFF8E0",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            top: 26,
            left: 30,
            width: 11,
            height: 11,
            borderRadius: "50%",
            background: "#1F3864",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 26,
            left: 58,
            width: 11,
            height: 11,
            borderRadius: "50%",
            background: "#1F3864",
          }}
        />
        {mouth === "smile" ? (
          <div
            style={{
              position: "absolute",
              top: 46,
              left: 36,
              width: 26,
              height: 13,
              borderRadius: "0 0 26px 26px",
              background: "#1F3864",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              top: 50,
              left: 39,
              width: 22,
              height: 6,
              borderRadius: 3,
              background: "#1F3864",
            }}
          />
        )}
        {sparkle && (
          <>
            <div
              style={{
                position: "absolute",
                top: 4,
                left: 78,
                width: 12,
                height: 3,
                borderRadius: 2,
                background: "#E3B23C",
                transform: "rotate(-45deg)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 84,
                width: 8,
                height: 2,
                borderRadius: 2,
                background: "#E3B23C",
                transform: "rotate(-45deg)",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
