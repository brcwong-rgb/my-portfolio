"use client";

const INK = "#FAFAFA";
const DIM = "#757575";
const BG = "#121212";
const CARD = "#1e1e1e";
const LINE = "#2a2a2a";
const WORK_SANS = "'Work Sans', sans-serif";
const MANROPE = "Manrope, sans-serif";

type Screen = {
  src: string; // file in /public
  caption: string;
};

type Decision = {
  title: string;
  body: string;
  screens: Screen[];
};

const DECISIONS: Decision[] = [
  {
    title: "Flagging a missing team",
    body: "Judges arrive at tables where nobody is there. Instead of stalling the round, they can flag the team as missing. It moves into a separate missing category so organizers can follow up and the judge keeps moving.",
    screens: [
      { src: "/hackdavis-missing-1.png", caption: "Empty table" },
      { src: "/hackdavis-missing-2.png", caption: "Flag as missing" },
      { src: "/hackdavis-missing-3.png", caption: "Missing category" },
    ],
  },
  {
    title: "A venue map",
    body: "Judges from the previous year said they could not find the tables. The map is on the home screen and expands to a full view.",
    screens: [
      { src: "/hackdavis-map-1.png", caption: "Map on the home screen" },
      { src: "/hackdavis-map-2.png", caption: "Expanded map view" },
    ],
  },
  {
    title: "Knowing when you are done",
    body: "The previous year's app left judges unsure whether they had finished judging all their assigned projects. Now the unjudged list ends with a clear done state, and a scored section keeps track of all completed projects.",
    screens: [
      { src: "/hackdavis-done-1.png", caption: "You're done" },
      { src: "/hackdavis-done-2.png", caption: "Scored projects" },
    ],
  },
];

function ScreenFrame({ src, caption }: Screen) {
  return (
    <figure
      style={{
        margin: 0,
        flex: "1 1 0",
        minWidth: 0,
        maxWidth: 300,
      }}
    >
      <div
        style={{
          background: CARD,
          border: `0.5px solid ${LINE}`,
          borderRadius: 8,
          padding: 16,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={src}
          alt={caption}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            borderRadius: 6,
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        />
      </div>
      <figcaption
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: DIM,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          fontFamily: WORK_SANS,
          marginTop: 12,
          textAlign: "center",
        }}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

export default function HackDavisDecisions() {
  return (
    <div
      style={{
        width: "100%",
        background: BG,
        boxSizing: "border-box",
        padding: "96px 48px 0",
        display: "grid",
        gridTemplateColumns: "280px minmax(0, 1fr)",
        gap: 48,
        alignItems: "start",
      }}
    >
      {/* gutter — mirrors the sticky nav column */}
      <div />

      <div style={{ width: "100%" }}>
        {/* subsection under DESIGN — no section label here */}
        <div id="design-decisions">
          <h3
            style={{
              fontSize: "clamp(22px, 2.2vw, 30px)",
              fontWeight: 700,
              color: INK,
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
              margin: 0,
              fontFamily: MANROPE,
            }}
          >
            Design Decisions
          </h3>

          <p
            style={{
              fontSize: 19,
              fontWeight: 400,
              color: "#D4D4D4",
              lineHeight: 1.65,
              margin: "20px 0 0 0",
              maxWidth: 960,
              fontFamily: WORK_SANS,
            }}
          >
            Three changes, each from something judges told us.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 112,
              marginTop: 64,
            }}
          >
            {DECISIONS.map((d) => (
              <div key={d.title}>
                <h4
                  style={{
                    fontSize: "clamp(19px, 1.9vw, 25px)",
                    fontWeight: 700,
                    color: INK,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                    margin: 0,
                    fontFamily: MANROPE,
                  }}
                >
                  {d.title}
                </h4>

                <p
                  style={{
                    fontSize: 19,
                    fontWeight: 400,
                    color: "#D4D4D4",
                    lineHeight: 1.65,
                    margin: "16px 0 0 0",
                    maxWidth: 800,
                    fontFamily: WORK_SANS,
                  }}
                >
                  {d.body}
                </p>

                {/* screens side by side — capped so 2 and 3 match */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 24,
                    marginTop: 40,
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  {d.screens.map((s) => (
                    <ScreenFrame
                      key={s.src}
                      src={s.src}
                      caption={s.caption}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}