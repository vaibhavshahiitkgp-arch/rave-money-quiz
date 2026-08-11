// Coin-medal mascot, built from plain divs (no images/SVG), matching the
// approved design prototype. Canonical canvas is 100x120; `size` scales it.
//
// `pose` adds a pair of arm capsules (same gold-fill/rim-border material as
// the coin itself, so every pose still reads as "the same character") plus,
// for "envelope", a small held envelope shape. Arms render behind the coin
// so they look attached at the shoulder rather than pasted on top of it.
const ARM_STYLE = {
  position: "absolute",
  width: 15,
  height: 36,
  borderRadius: 8,
  background: "#E3B23C",
  border: "3px solid #B8860B",
};

const POSES = {
  // Static transform for browsers before the animation kicks in; the
  // animation itself (see index.css) swings between -38deg and -15deg,
  // since a fixed-angle "wave" arm reads as a broken/pointless limb, not
  // a wave -- the whole point of this pose is the motion, not the shape.
  wave: [{ ...ARM_STYLE, top: 22, left: 75, transformOrigin: "50% 10%", transform: "rotate(-38deg)", animation: "armWave 1s ease-in-out infinite" }],
  think: [{ ...ARM_STYLE, top: 36, left: 6, height: 34, transformOrigin: "50% 90%", transform: "rotate(55deg)" }],
  celebrate: [
    { ...ARM_STYLE, top: 12, left: 77, transformOrigin: "50% 95%", transform: "rotate(-15deg)" },
    { ...ARM_STYLE, top: 12, left: 8, transformOrigin: "50% 95%", transform: "rotate(15deg)" },
  ],
  envelope: [{ ...ARM_STYLE, top: 32, left: 73, height: 30, transformOrigin: "50% 10%", transform: "rotate(65deg)" }],
};

export default function Mascot({
  size = 82,
  ribbonColor = "#1F3864",
  mouth = "smile", // "smile" | "neutral"
  pose, // undefined | "wave" | "think" | "celebrate" | "envelope"
  sparkle = false,
  dashedRing = false,
  animate = false, // idle loop: gentle breathing scale + periodic blink
  className = "",
  style = {},
}) {
  const scale = size / 100;
  const height = size * 1.2;
  const arms = POSES[pose] || [];

  return (
    <div
      className={className}
      style={{
        width: size,
        height,
        position: "relative",
        animation: animate ? "breathe 4.2s ease-in-out infinite" : undefined,
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
        {arms.map((armStyle, i) => (
          <div key={i} style={armStyle} />
        ))}
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
            animation: animate ? "blink 4.5s ease-in-out infinite" : undefined,
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
            animation: animate ? "blink 4.5s ease-in-out infinite" : undefined,
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
        {pose === "envelope" && (
          <>
            <div
              style={{
                position: "absolute",
                top: 68,
                left: 34,
                width: 32,
                height: 22,
                background: "#FFF8E0",
                border: "2px solid #B8860B",
                borderRadius: 3,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 68,
                left: 34,
                width: 0,
                height: 0,
                borderLeft: "16px solid transparent",
                borderRight: "16px solid transparent",
                borderTop: "12px solid #E3B23C",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
