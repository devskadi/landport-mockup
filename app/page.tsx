"use client";

import { useState } from "react";
import ScrollReveal from "./components/ScrollReveal";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Briefcase01Icon,
  Bus01Icon,
  Calendar01Icon,
  Cancel01Icon,
  Car01Icon,
  Clock01Icon,
  Location01Icon,
  Menu01Icon,
  Restaurant01Icon,
  Search01Icon,
  ShoppingBag01Icon,
  TaxiIcon,
  TrainFrontIcon,
} from "@hugeicons/core-free-icons";

type IconName = "pin" | "calendar" | "clock" | "arrow" | "menu" | "close" | "search" | "bus" | "taxi" | "train" | "jeep" | "shop" | "utensils" | "briefcase";

const iconLibrary = {
  pin: Location01Icon,
  calendar: Calendar01Icon,
  clock: Clock01Icon,
  arrow: ArrowRight01Icon,
  menu: Menu01Icon,
  close: Cancel01Icon,
  search: Search01Icon,
  bus: Bus01Icon,
  taxi: TaxiIcon,
  train: TrainFrontIcon,
  jeep: Car01Icon,
  shop: ShoppingBag01Icon,
  utensils: Restaurant01Icon,
  briefcase: Briefcase01Icon,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <HugeiconsIcon aria-hidden="true" className="ui-icon" icon={iconLibrary[name]} size={size} strokeWidth={1.75} />;
}

const siteBasePath = process.env.NODE_ENV === "production" ? "/landport-mockup" : "";
const assetPath = (path: string) => `${siteBasePath}${path}`;

const rideOptions = [
  { icon: "bus" as IconName, name: "Bus", copy: "Provincial & city routes", image: assetPath("/assets/choose-ride.jpg") },
  { icon: "taxi" as IconName, name: "Taxi", copy: "Ride with ease", image: assetPath("/assets/amenities.jpg") },
  { icon: "jeep" as IconName, name: "PUJ", copy: "Local connections", image: assetPath("/assets/home-banner.jpg") },
  { icon: "train" as IconName, name: "LRT 1", copy: "Smooth interconnectivity", image: assetPath("/assets/gates.jpg") },
];

const updates = [
  ["August 8, 2025", "The OFFIX at PITX Becomes South Metro’s Hub"],
  ["March 7, 2025", "PITX, Government Agencies Mobilize for Holy Week"],
  ["January 23, 2025", "PITX Launches Innovative GET EV Shuttle Service"],
];

const departures = [
  { time: "14:40", destination: "Batangas City", operator: "ALPS The Bus", gate: "7", bay: "12", status: "Boarding", tone: "tone-boarding" },
  { time: "14:55", destination: "Naga", operator: "Philtranco", gate: "3", bay: "04", status: "On time", tone: "tone-ontime" },
  { time: "15:10", destination: "Lucena", operator: "JAC Liner", gate: "5", bay: "21", status: "On time", tone: "tone-ontime" },
  { time: "15:20", destination: "Laoag", operator: "Fariñas Trans", gate: "1", bay: "02", status: "Delayed 25m", tone: "tone-delayed" },
  { time: "15:30", destination: "Sta. Ana", operator: "Victory Liner", gate: "2", bay: "09", status: "Cancelled", tone: "tone-cancelled" },
  { time: "14:15", destination: "Dasmariñas", operator: "Saulog Transit", gate: "9", bay: "33", status: "Departed", tone: "tone-departed" },
] as const;

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="page">
      <ScrollReveal>
      <div className="notice"><span>LIVE SERVICE UPDATE</span><p>Plan your commute ahead. Check the latest bus schedule before you travel.</p><a className="notice-schedule" href="#schedule">VIEW LIVE SCHEDULE <Icon name="arrow" size={15} /></a></div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="PITX home"><img src={assetPath("/assets/logo.png")} alt="PITX — Parañaque Integrated Terminal Exchange" /></a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Primary navigation">
          <a href="#about">About PITX</a><a href="#ride">Passenger&apos;s Guide</a><a href="#explore">Things to Do</a><a href="#updates">News</a><a href="#contact">Contact Us</a>
        </nav>
        <button className="menu-button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? "close" : "menu"} /></button>
      </header>

      <section className="hero" id="top">
        <div
          className="hero-image"
          style={{ backgroundImage: `url("${assetPath("/assets/home-banner.jpg")}")` }}
        />
        <div className="hero-overlay" />
        <div className="hero-content" data-reveal="left" data-reveal-distance="28">
          <p className="eyebrow light">Philippines&apos; first landport</p>
          <h1>Welcome to PITX, friends!</h1>
          <p className="hero-copy">Experience safe, convenient, and comfortable commute here at PITX, the country’s first landport.</p>
        </div>

        <section className="departures-board hero-departures" id="schedule" aria-labelledby="departures-title"><header className="departures-header"><div><p>Departures</p><h2 id="departures-title">Today, <em>10 September</em></h2></div><div className="departures-live"><span>Updated 14:32</span><i /> live</div></header><div className="departures-columns" aria-hidden="true"><span>Time</span><span>Destination</span><span>Operator</span><span>Gate</span><span>Bay</span><span>Status</span></div><div className="departures-list">{departures.map((departure) => <article className={`departure-row ${departure.tone}`} key={`${departure.time}-${departure.destination}`}><span className="departure-time" data-label="Time">{departure.time}</span><strong className="departure-destination" data-label="Destination">{departure.destination}</strong><span className="departure-operator" data-label="Operator">{departure.operator}</span><span className="departure-gate" data-label="Gate">{departure.gate}</span><span className="departure-bay" data-label="Bay">{departure.bay}</span><span className="departure-status" data-label="Status"><b>{departure.status}</b></span></article>)}</div><footer className="departures-footer"><p>Times and assignments may change. Please check terminal screens before boarding.</p><a href="#ride">VIEW ROUTE GUIDE <Icon name="arrow" size={16}/></a></footer></section>
      </section>


      <section className="intro intro-centered section" id="about"><p className="eyebrow" data-reveal="up">Welcome to PITX, friends!</p><h2 data-reveal="up" data-reveal-delay="0.08">Moving <em>people</em></h2><p className="intro-copy" data-reveal="up" data-reveal-delay="0.14">Experience seamless interconnectivity from the moment you arrive until you reach your destination. With first-world facilities and friendly service, every journey is made simpler.</p><a className="intro-button" data-reveal="up" data-reveal-delay="0.2" href="#features">Discover PITX <Icon name="arrow" size={17} /></a></section>

      <section className="rides section" id="ride">
        <div className="section-heading" data-reveal="up"><div><p className="eyebrow">Transportation</p><h2>Choose <em>your ride</em></h2></div></div>
        <div className="ride-grid">{rideOptions.map((ride, i) => <a className="ride-card" data-reveal="up" data-reveal-delay={(i * 0.07).toFixed(2)} href="#schedule" key={ride.name}><img src={ride.image} alt="" /><div className="ride-shade" /><div className="ride-number">0{i + 1}</div><div className="ride-info"><span className="ride-icon"><Icon name={ride.icon} /></span><h3>{ride.name}</h3><p>{ride.copy}</p><Icon name="arrow" /></div></a>)}</div>
      </section>

      <section className="feature-band" id="features"><div className="feature-image" data-reveal="left" data-reveal-distance="30"><img src={assetPath("/assets/introduction.jpg")} alt="Passengers at PITX" /></div><div className="feature-content" data-reveal="right" data-reveal-distance="30"><p className="eyebrow light">The country&apos;s first landport</p><h2>Your friendly and modern <em>transport hub</em></h2><p>PITX serves as your transfer point for provincial and in-city transportation, so you can conveniently commute along the busy thoroughfares of Metro Manila and the South.</p><div className="feature-list"><span><b>01</b> Accessible location</span><span><b>02</b> Multimodal transport facility</span><span><b>03</b> Advanced commuting system</span></div><a className="button-outline" href="#terminal-features">EXPLORE TERMINAL FEATURES <Icon name="arrow" size={16} /></a></div></section>

      <section className="terminal-features section" id="terminal-features"><div className="section-heading" data-reveal="up"><div><p className="eyebrow">PITX features</p><h2>Tailored <em>for you</em></h2></div><p>Take advantage of these features when you visit PITX.</p></div><div className="terminal-feature-grid"><article data-reveal="up"><span>01</span><h3>Accessible Location</h3><p>PITX is strategically located in Diosdado Macapagal Boulevard and CAVITEX which connects the South and Metro Manila.</p></article><article data-reveal="up" data-reveal-delay="0.06"><span>02</span><h3>Multimodal Transport Facility</h3><p>PITX features intermodal terminals that provide you with a wide range of transport options and services.</p></article><article data-reveal="up" data-reveal-delay="0.12"><span>03</span><h3>Advanced Commuting System</h3><p>PITX makes seamless commuting possible with its centralized boarding pass and online booking systems.</p></article><article data-reveal="up" data-reveal-delay="0.18"><span>04</span><h3>Modern Features and Amenities</h3><p>PITX is equipped with modern features and amenities that are designed to address your daily commuting needs.</p></article><article data-reveal="up" data-reveal-delay="0.24"><span>05</span><h3>One-Stop Terminal</h3><p>PITX houses retail and office spaces where you can dine, shop, and avail government services, in one convenient location.</p></article></div></section>

      <section className="explore section" id="explore"><div className="section-heading" data-reveal="up"><div><p className="eyebrow">Things to do</p><h2>More than <em>a terminal</em></h2></div><p>Shop, dine, or take care of essentials while you wait for your next ride.</p></div><div className="explore-grid"><a className="explore-main" data-reveal="left" href="#contact"><img src={assetPath("/assets/dining.jpg")} alt="Dining at PITX" /><div><span>01 / DINING</span><h3>Shop and dine<br />while you wait.</h3><p>Grab a quick bite or dine in before commuting.</p><b>EXPLORE DINING <Icon name="arrow" size={16} /></b></div></a><div className="explore-side"><a data-reveal="right" href="#contact"><img src={assetPath("/assets/shopping.jpg")} alt="Shopping at PITX" /><span>02</span><h3>Shops</h3><p>Travel essentials and favorite brands.</p></a><a data-reveal="right" data-reveal-delay="0.1" href="#contact"><img src={assetPath("/assets/services.jpg")} alt="Services at PITX" /><span>03</span><h3>Services</h3><p>Travel and leisure services for your day.</p></a></div></div></section>

      <section className="updates" id="updates"><div className="section updates-inner"><div className="updates-title" data-reveal="left"><p className="eyebrow light">Latest updates</p><h2>What&apos;s happening<br /><em>at PITX</em></h2><a className="button-light" href="#contact">VIEW ALL NEWS <Icon name="arrow" size={16} /></a></div><div className="news-list">{updates.map(([date, title], i) => <a data-reveal="right" data-reveal-delay={(i * 0.08).toFixed(2)} href="#contact" className="news-item" key={title}><span>0{i + 1}</span><div><small>UPDATES · {date}</small><h3>{title}</h3></div><Icon name="arrow" /></a>)}</div></div></section>

      <section className="video-feature section" aria-labelledby="pitx-video-title"><div className="section-heading video-heading" data-reveal="up"><div><p className="eyebrow">Inside PITX</p><h2 id="pitx-video-title">Terminal <em>in motion</em></h2></div><p>Take a closer look at the country&apos;s first landport, built to make every commute safer, more convenient, and more connected.</p></div><div className="video-frame" data-reveal="up" data-reveal-delay="0.12" aria-label="PITX video"><iframe src="https://www.youtube.com/embed/TJGoXMjDUds?autoplay=1&mute=1&controls=0&loop=1&playlist=TJGoXMjDUds&playsinline=1" title="PITX" allow="autoplay; encrypted-media"/><a className="video-offix" href="http://offix.pitx.ph" target="_blank" rel="noreferrer">EXPLORE OFFIX TOWER <Icon name="arrow" size={16} /></a></div></section>

      <section className="contact-section" id="contact"><div className="section contact-inner"><div className="contact-centered" data-reveal="up"><p className="eyebrow">Contact PITX</p><h2>Simplify <em>journey</em></h2><p>For travel assistance, terminal information, and the latest updates, the PITX customer service team is ready to help.</p><div className="contact-actions"><a href="mailto:customerservice@pitx.com.ph"><span>EMAIL US</span><strong>customerservice@pitx.com.ph</strong><Icon name="arrow" size={17} /></a><a href="tel:83963817"><span>CALL US</span><strong>8396-3817 to 18</strong><Icon name="arrow" size={17} /></a><a href="https://goo.gl/maps/BU6MazNLy1nzmQUr5" target="_blank" rel="noreferrer"><span>VISIT PITX</span><strong>Get directions</strong><Icon name="arrow" size={17} /></a></div></div></div></section>

      <footer><div className="footer-top" data-reveal="up"><div><a className="footer-brand" href="#top"><img src={assetPath("/assets/footer-logo.png")} alt="PITX" /></a><p>Experience safe, convenient, and comfortable commute here at PITX, the country&apos;s first landport.</p></div><div className="contact-block"><span>Passenger&apos;s guide</span><a href="#ride">Transport</a><a href="#explore">Things to do</a><a href="#schedule">Live bus schedule</a></div><div className="contact-block"><span>Visit us</span><p>Parañaque Integrated Terminal Exchange<br />#1 Kennedy Rd., Tambo, Parañaque City</p></div></div><div className="footer-bottom" data-reveal="up" data-reveal-delay="0.1"><p>© PITX 2026. All rights reserved.</p><div><a href="https://www.facebook.com/ParanaqueITX/">Facebook</a><a href="https://www.instagram.com/pitx_landport/">Instagram</a><a href="https://twitter.com/pitx_landport">X / Twitter</a></div></div></footer>
      </ScrollReveal>
    </main>
  );
}
