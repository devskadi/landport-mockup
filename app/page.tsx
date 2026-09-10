"use client";

import { FormEvent, MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from "react";
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

const careMessages = [
  ["MR", "Mara R.", "Hello po, anong oras ang huling biyahe papuntang Batangas ngayong gabi?"],
  ["PX", "PITX Information Desk", "Hello, Mara. Tutulungan ka naming tingnan ang pinakabagong departure board."],
  ["JL", "Jules L.", "May accessible waiting area po ba malapit sa Gate 5?"],
  ["PX", "PITX Information Desk", "Meron po. Maaari ka naming gabayan mula main entrance papunta sa accessible lounge."],
  ["AN", "Ana N.", "Saan po puwedeng magtanong tungkol sa nawawalang gamit?"],
  ["PX", "PITX Information Desk", "Dito po. Sabihin kung saan at kailan mo ito huling nakita—huwag magbahagi ng sensitibong detalye."],
  ["RC", "Rico C.", "Salamat po sa mabilis na sagot."],
  ["KC", "Kaye C.", "Saan po ang sakayan papuntang Tagaytay?"],
  ["PX", "PITX Information Desk", "Pumunta po sa second floor at tingnan ang gate assignment sa departure board."],
  ["DV", "Dino V.", "May biyahe po ba papuntang Dasmariñas ngayong hapon?"],
  ["PX", "PITX Information Desk", "Meron po. I-check natin ang susunod na available na biyahe at gate."],
  ["LS", "Liza S.", "Paano po pumunta sa People’s Park mula PITX?"],
  ["PX", "PITX Information Desk", "May step-by-step route guide kami para diyan. Buksan ang thread sa ibaba."],
] as const;

const careThreads = [
  "From PITX to People’s Park",
  "From PITX to Enchanted Kingdom",
  "From Enchanted Kingdom to PITX",
  "From PITX to Tagaytay",
  "From Tagaytay to PITX",
  "From PITX to Batangas City",
  "From PITX to Lucena",
  "From PITX to Baguio",
] as const;

const careAnnouncements = [
  "Paalala: Maaaring magbago ang gate assignment. Tingnan ang departure board bago sumakay.",
  "Abiso: May dagdag na biyahe tuwing weekend para sa ilang ruta. Magtanong sa Information Desk.",
  "Paalala: Panatilihing malapit ang ticket at personal na gamit habang nasa terminal.",
] as const;

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [tripType, setTripType] = useState("One way");
  const [careMessageCount, setCareMessageCount] = useState(8);
  const [careChatVisible, setCareChatVisible] = useState(false);
  const [careFullscreen, setCareFullscreen] = useState(false);
  const careChatRef = useRef<HTMLElement>(null);
  const careFeedRef = useRef<HTMLDivElement>(null);
  const careInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const chat = careChatRef.current;
    if (!chat) return;

    const observer = new IntersectionObserver(
      ([entry]) => setCareChatVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(chat);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!careChatVisible) return;
    const interval = window.setInterval(() => {
      setCareMessageCount((count) => count + 1);
    }, 2600);
    return () => window.clearInterval(interval);
  }, [careChatVisible]);

  useEffect(() => {
    const feed = careFeedRef.current;
    if (!feed) return;
    feed.scrollTo({ top: feed.scrollHeight, behavior: "smooth" });
  }, [careMessageCount]);

  useEffect(() => {
    if (!careFullscreen) return;

    const lockedScrollY = window.scrollY;
    const previousBodyStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const media = window.matchMedia("(max-width: 760px)");
    const closeOnDesktop = () => {
      if (!media.matches) setCareFullscreen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCareFullscreen(false);
    };

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.width = "100%";
    media.addEventListener("change", closeOnDesktop);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyStyles.overflow;
      document.body.style.position = previousBodyStyles.position;
      document.body.style.top = previousBodyStyles.top;
      document.body.style.width = previousBodyStyles.width;
      media.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("keydown", closeOnEscape);
      window.scrollTo({ top: lockedScrollY, behavior: "auto" });
    };
  }, [careFullscreen]);

  function handleCarePanelClick(event: ReactMouseEvent<HTMLDivElement>) {
    if (!careFullscreen && window.matchMedia("(max-width: 760px)").matches) {
      const composerTapped = (event.target as Element).closest(".cares-composer");
      if (!composerTapped) event.preventDefault();
      setCareFullscreen(true);
      if (composerTapped) careInputRef.current?.focus({ preventScroll: true });
    }
  }

  function handleSchedule(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 3200);
  }

  return (
    <main className="page">
      <ScrollReveal>
      <div className="notice"><span>THE PHILIPPINES&apos; FIRST LANDPORT</span><p>Plan your commute ahead. Check the latest bus schedule before you travel.</p><button className="notice-schedule" type="button" onClick={() => setScheduleOpen(true)}>VIEW LIVE SCHEDULE <Icon name="arrow" size={15} /></button></div>
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
          <h1>Welcome to <span className="hero-nowrap">PITX, friends!</span></h1>
          <p className="hero-copy">Experience safe, convenient, and comfortable commute here at PITX, the country’s first landport.</p>
        </div>

        <div className={careFullscreen ? "cares-media hero-cares-media is-fullscreen" : "cares-media hero-cares-media"} data-reveal="up" data-reveal-delay="0.16" onClick={handleCarePanelClick}>
          <button className="care-fullscreen-back" type="button" onClick={(event) => { event.stopPropagation(); setCareFullscreen(false); }} aria-label="Back to the PITX website"><Icon name="arrow" size={18} /><span>Back to website</span></button>
          <div className="cares-image"><img src={assetPath("/assets/pitx-care-agent.png")} alt="PITX passenger care representative at the terminal information desk" /></div>
          <aside ref={careChatRef} className="cares-chat" aria-label="PITX live passenger care preview">
            <header className="cares-chat-header"><div><span className="cares-chat-mark"><img src={assetPath("/assets/pitx-information-desk-logo.png")} alt="" /></span><strong>#HowToGetTherePITX</strong></div><span className="cares-live"><i aria-hidden="true" />Live</span></header>
            <div ref={careFeedRef} className="cares-feed" aria-live="polite">
              {Array.from({ length: Math.min(9, careMessageCount) }, (_, visibleIndex) => {
                const sequence = careMessageCount - Math.min(9, careMessageCount) + visibleIndex;
                const [initials, name, message] = careMessages[sequence % careMessages.length];
                const totalMinutes = (14 * 60) + 8 + sequence;
                const time = `${String(Math.floor(totalMinutes / 60) % 24).padStart(2, "0")}:${String(totalMinutes % 60).padStart(2, "0")}`;
                const isHost = initials === "PX";
                return <div className="cares-feed-entry" key={sequence}>
                  <div className="cares-message"><span className={isHost ? "cares-avatar host" : "cares-avatar"}>{initials}</span><p><span className="cares-meta"><strong>{name}</strong>{isHost ? <em>Official</em> : null}<time>{time}</time></span>{message}</p></div>
                  {sequence % 4 === 3 ? <button className="cares-thread-link" type="button"><span>Route guide</span><strong>View Thread — {careThreads[Math.floor(sequence / 4) % careThreads.length]}</strong><Icon name="arrow" size={16} /></button> : null}
                  {sequence % 5 === 2 ? <aside className="cares-announcement"><span>Announcement</span><p>{careAnnouncements[Math.floor(sequence / 5) % careAnnouncements.length]}</p></aside> : null}
                </div>;
              })}
            </div>
            <form className="cares-composer" onSubmit={(event) => event.preventDefault()}>
              <input ref={careInputRef} type="text" inputMode="text" enterKeyHint="send" aria-label="Mensahe sa PITX Information Desk" placeholder="Mag-type ng mensahe…" />
              <button type="submit" aria-label="Ipadala ang mensahe"><Icon name="arrow" size={17} /></button>
            </form>
          </aside>
        </div>
      </section>
      {scheduleOpen && <><button className="drawer-backdrop" aria-label="Close live schedule" onClick={() => setScheduleOpen(false)}/><aside className="schedule-drawer" aria-label="Live bus schedule"><header><div><p className="eyebrow">Live bus schedule</p><h2>Departures <em>today</em></h2></div><button onClick={() => setScheduleOpen(false)} aria-label="Close schedule"><Icon name="close"/></button></header><p className="drawer-date">WEDNESDAY, 02 SEPTEMBER 2026</p><div className="schedule-time">02:00 PM</div><div className="schedule-table"><div className="schedule-head"><span>OPERATOR / ROUTE</span><span>GATE · BAY</span><span>STATUS</span></div>{[["ALPS", "Batangas City", "2 · 08", "ARRIVING"],["JAM/LLI", "Lucena City", "2 · 10", "ARRIVING"],["SOLID NORTH", "Dagupan City", "5 · 35", "CANCELLED"],["Davao Metro Shuttle", "Davao City", "4 · 20", "BOARDING"]].map(([operator, route, gate, status]) => <div className="schedule-row" key={operator + route}><span><b>{operator}</b>{route}</span><span>{gate}</span><strong className={status.toLowerCase()}>{status}</strong></div>)}</div><a href="#schedule" onClick={() => setScheduleOpen(false)}>CHECK A ROUTE <Icon name="arrow" size={16}/></a></aside></>}


      <section className="intro intro-centered section" id="about"><p className="eyebrow" data-reveal="up">Welcome to PITX, friends!</p><h2 data-reveal="up" data-reveal-delay="0.08">Moving <em>people</em></h2><p className="intro-copy" data-reveal="up" data-reveal-delay="0.14">Experience seamless interconnectivity from the moment you arrive until you reach your destination. With first-world facilities and friendly service, every journey is made simpler.</p><a className="intro-button" data-reveal="up" data-reveal-delay="0.2" href="#features">Discover PITX <Icon name="arrow" size={17} /></a></section>

      <section className="pitx-cares route-planner-section section" aria-labelledby="route-planner-title" id="schedule">
        <div className="cares-heading" data-reveal="up">
          <p className="eyebrow">Your trip starts here</p>
          <h2 id="route-planner-title">Find <em>your route</em></h2>
          <p>Choose where you are headed and how you want to travel. We’ll help you find the right connection from PITX.</p>
        </div>
        <form className="trip-finder pitx-finder section-route-finder" data-reveal="up" data-reveal-delay="0.1" onSubmit={handleSchedule}><span className="finder-section-label finder-routes-label">Find Routes</span><label className="finder-field"><Icon name="pin"/><select aria-label="Province"><option>Select Province</option><option>Cavite</option><option>Batangas</option><option>Laguna</option></select></label><label className="finder-field"><Icon name="pin"/><select aria-label="City"><option>Select City</option><option>Batangas City</option><option>Dasmariñas</option><option>Lipa City</option></select></label><span className="finder-section-label finder-transport-label">Transport Options</span><label className="finder-field"><Icon name="bus"/><select aria-label="Transport"><option>Select Transport</option><option>Provincial Bus</option><option>City Bus</option><option>PUJ</option></select></label><button className="search-button" type="submit"><Icon name="search"/><span>FIND ROUTES</span></button>{submitted && <p className="submit-note" role="status">Your route options are ready.</p>}</form>
      </section>

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
