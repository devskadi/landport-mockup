"use client";

import { FormEvent, useState } from "react";
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

const rideOptions = [
  { icon: "bus" as IconName, name: "Bus", copy: "Provincial & city routes", image: "/assets/choose-ride.jpg" },
  { icon: "taxi" as IconName, name: "Taxi", copy: "Ride with ease", image: "/assets/commuting.jpg" },
  { icon: "jeep" as IconName, name: "PUJ", copy: "Local connections", image: "/assets/gates.jpg" },
  { icon: "train" as IconName, name: "LRT Line 1", copy: "Smooth interconnectivity", image: "/assets/pitx-facade.png" },
];

const updates = [
  ["August 8, 2025", "The OFFIX at PITX Becomes South Metro’s Hub"],
  ["March 7, 2025", "PITX, Government Agencies Mobilize for Holy Week"],
  ["January 23, 2025", "PITX Launches Innovative GET EV Shuttle Service"],
];

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [tripType, setTripType] = useState("One way");

  function handleSchedule(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 3200);
  }

  return (
    <main className="page">
      <div className="notice"><span>LIVE SERVICE UPDATE</span><p>Plan your commute ahead. Check the latest bus schedule before you travel.</p><a href="#schedule">VIEW LIVE SCHEDULE <Icon name="arrow" size={15} /></a></div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="PITX home"><img src="/assets/logo.png" alt="PITX — Parañaque Integrated Terminal Exchange" /></a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Primary navigation">
          <a href="#about">About PITX</a><a href="#ride">Passenger&apos;s Guide</a><a href="#explore">Things to do</a><a href="#updates">News</a><a href="#contact">Contact us</a>
        </nav>
        <a className="schedule-link" href="#schedule"><span className="pulse" />Live bus schedule</a>
        <button className="menu-button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? "close" : "menu"} /></button>
      </header>

      <section className="hero" id="top">
        <div className="hero-image" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow light">Philippines&apos; first landport</p>
          <h1>Every journey<br /><em>starts connected.</em></h1>
          <p className="hero-copy">Safe, convenient and comfortable commuting begins at PITX—the gateway to the South and beyond.</p>
          <div className="hero-stats"><span><strong>24/7</strong>OPERATIONS</span><span><strong>100+</strong>DAILY ROUTES</span><span><strong>1</strong>CONNECTED HUB</span></div>
        </div>
        <div className="hero-corner"><span>01</span><p>Your friendly and modern transport hub.</p></div>

        <form className="trip-finder" onSubmit={handleSchedule} id="schedule">
          <div className="finder-title"><span>PLAN YOUR TRIP</span><p>Find your next ride</p></div>
          <div className="trip-tabs">{["One way", "Round trip"].map((type) => <button type="button" className={tripType === type ? "selected" : ""} onClick={() => setTripType(type)} key={type}>{tripType === type && <i />}{type}</button>)}</div>
          <label className="finder-field"><Icon name="pin" /><span>FROM</span><select aria-label="Origin"><option>PITX, Parañaque</option><option>Metro Manila</option></select></label>
          <span className="route-line"><Icon name="arrow" /></span>
          <label className="finder-field"><Icon name="pin" /><span>TO</span><select aria-label="Destination"><option>Select destination</option><option>Cavite</option><option>Batangas</option><option>Laguna</option></select></label>
          <label className="finder-field date-field"><Icon name="calendar" /><span>DATE</span><input aria-label="Travel date" type="date" defaultValue="2026-09-02" /></label>
          <button className="search-button" type="submit"><Icon name="search" /><span>CHECK SCHEDULE</span></button>
          {submitted && <p className="submit-note" role="status">Your schedule search is ready.</p>}
        </form>
      </section>

      <section className="intro intro-centered section" id="about"><p className="eyebrow">Welcome to PITX, friends!</p><h2>Moving <em>people.</em></h2><p className="intro-copy">Experience seamless interconnectivity from the moment you arrive until you reach your destination. With first-world facilities and friendly service, every journey is made simpler.</p><a className="intro-button" href="#features">Discover PITX <Icon name="arrow" size={17} /></a></section>

      <section className="rides section" id="ride">
        <div className="section-heading"><div><p className="eyebrow">Transportation</p><h2>Choose <em>your ride.</em></h2></div><p>PITX provides multimodal transport options to get you where you need to go.</p></div>
        <div className="ride-grid">{rideOptions.map((ride, i) => <a className="ride-card" href="#schedule" key={ride.name}><img src={ride.image} alt="" /><div className="ride-shade" /><div className="ride-number">0{i + 1}</div><div className="ride-info"><span className="ride-icon"><Icon name={ride.icon} /></span><h3>{ride.name}</h3><p>{ride.copy}</p><Icon name="arrow" /></div></a>)}</div>
      </section>

      <section className="feature-band" id="features"><div className="feature-image"><img src="/assets/introduction.jpg" alt="Passengers at PITX" /></div><div className="feature-content"><p className="eyebrow light">The country&apos;s first landport</p><h2>Your friendly and modern <em>transport hub.</em></h2><p>PITX serves as your transfer point for provincial and in-city transportation, so you can conveniently commute along the busy thoroughfares of Metro Manila and the South.</p><div className="feature-list"><span><b>01</b> Accessible location</span><span><b>02</b> Multimodal transport facility</span><span><b>03</b> Advanced commuting system</span></div><a className="button-outline" href="#terminal-features">EXPLORE TERMINAL FEATURES <Icon name="arrow" size={16} /></a></div></section>

      <section className="terminal-features section" id="terminal-features"><div className="section-heading"><div><p className="eyebrow">PITX features</p><h2>Tailored <em>for you.</em></h2></div><p>Take advantage of these features when you visit PITX.</p></div><div className="terminal-feature-grid"><article><span>01</span><h3>Accessible Location</h3><p>PITX is strategically located in Diosdado Macapagal Boulevard and CAVITEX which connects the South and Metro Manila.</p></article><article><span>02</span><h3>Multimodal Transport Facility</h3><p>PITX features intermodal terminals that provide you with a wide range of transport options and services.</p></article><article><span>03</span><h3>Advanced Commuting System</h3><p>PITX makes seamless commuting possible with its centralized boarding pass and online booking systems.</p></article><article><span>04</span><h3>Modern Features and Amenities</h3><p>PITX is equipped with modern features and amenities that are designed to address your daily commuting needs.</p></article><article><span>05</span><h3>One-Stop Terminal</h3><p>PITX houses retail and office spaces where you can dine, shop, and avail government services, in one convenient location.</p></article></div></section>

      <section className="explore section" id="explore"><div className="section-heading"><div><p className="eyebrow">Things to do</p><h2>More than <em>a terminal.</em></h2></div><p>Shop, dine, or take care of essentials while you wait for your next ride.</p></div><div className="explore-grid"><a className="explore-main" href="#contact"><img src="/assets/dining.jpg" alt="Dining at PITX" /><div><span>01 / DINING</span><h3>Shop and dine<br />while you wait.</h3><p>Grab a quick bite or dine in before commuting.</p><b>EXPLORE DINING <Icon name="arrow" size={16} /></b></div></a><div className="explore-side"><a href="#contact"><img src="/assets/shopping.jpg" alt="Shopping at PITX" /><span>02</span><h3>Places to shop</h3><p>Travel essentials and favorite brands.</p></a><a href="#contact"><img src="/assets/services.jpg" alt="Services at PITX" /><span>03</span><h3>Services</h3><p>Travel and leisure services for your day.</p></a></div></div></section>

      <section className="updates" id="updates"><div className="section updates-inner"><div className="updates-title"><p className="eyebrow light">Latest updates</p><h2>What&apos;s happening<br /><em>at PITX.</em></h2><a className="button-light" href="#contact">VIEW ALL NEWS <Icon name="arrow" size={16} /></a></div><div className="news-list">{updates.map(([date, title], i) => <a href="#contact" className="news-item" key={title}><span>0{i + 1}</span><div><small>UPDATES · {date}</small><h3>{title}</h3></div><Icon name="arrow" /></a>)}</div></div></section>

      <section className="video-feature section" aria-labelledby="pitx-video-title"><div className="section-heading video-heading"><div><p className="eyebrow">Inside PITX</p><h2 id="pitx-video-title">Terminal <em>in motion.</em></h2></div><p>Take a closer look at the country&apos;s first landport, built to make every commute safer, more convenient, and more connected.</p></div><a className="video-frame" href="https://pitx.ph/" target="_blank" rel="noreferrer" aria-label="View PITX video content on the official PITX website"><img src="/assets/gates.jpg" alt="PITX terminal bus bays" /><span className="video-wash" /><span className="video-kicker">PITX / IN MOTION</span><span className="video-play"><i /> WATCH PITX VIDEO</span><span className="video-caption">The country&apos;s first landport<br /><b>PARAÑAQUE, PHILIPPINES</b></span></a></section>

      <section className="contact-section" id="contact"><div className="section contact-inner"><div className="contact-centered"><p className="eyebrow">Contact PITX</p><h2>Your journey, <em>simplified.</em></h2><p>For travel assistance, terminal information, and the latest updates, the PITX customer service team is ready to help.</p><div className="contact-actions"><a href="mailto:customerservice@pitx.com.ph"><span>EMAIL US</span><strong>customerservice@pitx.com.ph</strong><Icon name="arrow" size={17} /></a><a href="tel:83963817"><span>CALL US</span><strong>8396-3817 to 18</strong><Icon name="arrow" size={17} /></a><a href="https://goo.gl/maps/BU6MazNLy1nzmQUr5" target="_blank" rel="noreferrer"><span>VISIT PITX</span><strong>Get directions</strong><Icon name="arrow" size={17} /></a></div></div></div></section>

      <footer><div className="footer-top"><div><a className="footer-brand" href="#top"><img src="/assets/footer-logo.png" alt="PITX" /></a><p>Experience safe, convenient, and comfortable commute here at PITX, the country&apos;s first landport.</p></div><div className="contact-block"><span>Passenger&apos;s guide</span><a href="#ride">Transport</a><a href="#explore">Things to do</a><a href="#schedule">Live bus schedule</a></div><div className="contact-block"><span>Visit us</span><p>Parañaque Integrated Terminal Exchange<br />#1 Kennedy Rd., Tambo, Parañaque City</p></div></div><div className="footer-bottom"><p>© PITX 2026. All rights reserved.</p><div><a href="https://www.facebook.com/ParanaqueITX/">Facebook</a><a href="https://www.instagram.com/pitx_landport/">Instagram</a><a href="https://twitter.com/pitx_landport">X / Twitter</a></div></div></footer>
    </main>
  );
}
