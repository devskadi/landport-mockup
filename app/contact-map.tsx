"use client";

import Image from "next/image";
import { useState } from "react";
import { divIcon } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

const pitxPosition: [number, number] = [14.5093, 120.9926];

const pitxMarker = divIcon({
  className: "pitx-map-marker",
  html: '<span class="pitx-map-pin" aria-hidden="true"></span>',
  iconSize: [36, 36],
  iconAnchor: [18, 34],
});

function ContactMapFallback() {
  return (
    <div className="contact-map-fallback" role="img" aria-label="Schematic map showing PITX transport connections">
      <Image src="/assets/multimodal.jpg" alt="" fill sizes="(max-width: 1000px) 100vw, 50vw" />
      <span className="pitx-map-pin contact-map-fallback-pin" aria-hidden="true" />
    </div>
  );
}

export default function ContactMap() {
  const [tilesUnavailable, setTilesUnavailable] = useState(false);

  if (tilesUnavailable) return <ContactMapFallback />;

  return (
    <MapContainer
      aria-label="Interactive map showing the PITX location"
      center={pitxPosition}
      className="contact-leaflet-map"
      maxZoom={18}
      minZoom={13}
      scrollWheelZoom={false}
      zoom={15}
      zoomControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        eventHandlers={{ tileerror: () => setTilesUnavailable(true) }}
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={pitxMarker} position={pitxPosition} title="PITX" />
    </MapContainer>
  );
}
