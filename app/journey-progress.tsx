"use client";

const journeyStops = [
  { id: "arrival", label: "Arrival" },
  { id: "transport", label: "Transport" },
  { id: "explore", label: "Explore" },
  { id: "features", label: "Features" },
  { id: "contact", label: "Contact" },
];

type JourneyProgressProps = {
  activeStop: string;
  subdued: boolean;
  visible: boolean;
};

export default function JourneyProgress({ activeStop, subdued, visible }: JourneyProgressProps) {
  const className = [
    "journey-progress",
    !visible ? "journey-progress-hidden" : "",
    subdued ? "subdued" : "",
  ].filter(Boolean).join(" ");

  return (
    <nav className={className} aria-label="Page journey">
      <span className="journey-progress-label" aria-hidden="true">Terminal guide</span>
      <div className="journey-progress-track" aria-hidden="true"><span /></div>
      <ol>
        {journeyStops.map((stop, index) => (
          <li key={stop.id}>
            <a href={`#${stop.id}`} aria-current={activeStop === stop.id ? "location" : undefined}>
              <span className="journey-progress-marker">{String(index + 1).padStart(2, "0")}</span>
              <span className="journey-progress-name">{stop.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
