"use client";

import Image from "next/image";
import { Bus, ChevronDown, Search } from "lucide-react";
import { useEffect, useState } from "react";

const dropdownNav = [
  { label: "Passenger’s Guide", items: [["Transport Options", "#passengers-guide"], ["Things to Do", "#things-to-do"], ["Terminal Features", "#modern-hub"]] },
  { label: "Leasing Opportunity", items: [["Retail & Commercial Spaces", "#contact-us"], ["Office Spaces", "#contact-us"], ["Advertising & Promotions", "#contact-us"]] },
  { label: "News", items: [["Latest Updates", "#modern-hub"], ["Press Releases", "#modern-hub"], ["Tourist Destinations", "#things-to-do"]] },
];
const rides = [
  ["Bus", "/assets/icon-bus.svg"],
  ["Taxi", "/assets/icon-taxi.svg"],
  ["PUJ", "/assets/icon-puj.svg"],
  ["LRT Line 1 Extension", "/assets/icon-lrt.svg"],
];
const featureTabs = [
  { title: "Accessible Location", text: "PITX is strategically located in Diosdado Macapagal Boulevard and CAVITEX which connects the South and Metro Manila.", image: "/assets/accessible.jpg" },
  { title: "Multimodal Transport Facility", text: "PITX features intermodal terminals that provide you with a wide range of transport options and services.", image: "/assets/multimodal.jpg" },
  { title: "Advanced Commuting System", text: "PITX makes seamless commuting possible with its centralized boarding pass system.", image: "/assets/commuting.jpg" },
  { title: "Modern Features and Amenities", text: "PITX is equipped with modern features and amenities that are designed to address your daily commuting needs.", image: "/assets/amenities.jpg" },
  { title: "One-Stop Terminal", text: "PITX houses retail and office spaces where you can dine, shop, and avail government services, in one convenient location.", image: "/assets/one-stop.jpg" },
];
const schedule = [
  ["Baguio", "Solid North", "12:00 AM – 11:00 PM"],
  ["Batangas", "Ceres / JAM", "4:00 AM – 9:00 PM"],
  ["Cavite", "Various operators", "24 hours"],
  ["Lucena", "JAC Liner", "3:00 AM – 10:00 PM"],
  ["Naga", "DLTB / Penafrancia", "5:00 AM – 9:00 PM"],
];
const routeOptions: Record<string, string[]> = {
  Cavite: ["Bacoor", "Dasmariñas", "Tagaytay", "Trece Martires"],
  "Metro Manila": ["Alabang", "Baclaran", "NAIA", "North EDSA"],
  Batangas: ["Batangas City", "Lipa City", "Nasugbu"],
  Laguna: ["Balibago", "San Pedro"],
  Quezon: ["Lucena City", "Tagkawayan"],
};
const transportOptions = ["Bus", "Modern Jeep", "P2P Bus", "UV Express"];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [transport, setTransport] = useState("");
  const [routeMessage, setRouteMessage] = useState("");

  useEffect(() => {
    document.body.style.overflow = scheduleOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [scheduleOpen]);

  useEffect(() => {
    const closeDropdowns = (event: PointerEvent) => {
      if (!(event.target as HTMLElement).closest(".nav-dropdown")) setOpenDropdown("");
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenDropdown("");
    };
    document.addEventListener("pointerdown", closeDropdowns);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeDropdowns);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="PITX home"><Image src="/assets/logo.png" alt="PITX Parañaque Integrated Terminal Exchange" width={360} height={33} priority /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span /><span /><span /></button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Main navigation">
          <a href="#top" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#modern-hub" onClick={() => setMenuOpen(false)}>About PITX</a>
          {dropdownNav.map((group) => {
            const isOpen = openDropdown === group.label;
            return (
              <div className="nav-dropdown" key={group.label} onMouseEnter={() => setOpenDropdown(group.label)} onMouseLeave={() => setOpenDropdown("")}>
                <button className="nav-dropdown-trigger" type="button" aria-expanded={isOpen} aria-controls={`menu-${group.label.replaceAll(" ", "-")}`} onClick={() => setOpenDropdown(isOpen ? "" : group.label)}>
                  {group.label}<ChevronDown size={14} aria-hidden="true" />
                </button>
                <div className="nav-dropdown-menu" id={`menu-${group.label.replaceAll(" ", "-")}`} data-open={isOpen} aria-hidden={!isOpen}>
                  {group.items.map(([label, href]) => <a key={label} href={href} tabIndex={isOpen ? 0 : -1} onClick={() => { setOpenDropdown(""); setMenuOpen(false); }}>{label}</a>)}
                </div>
              </div>
            );
          })}
          <a href="#contact-us" onClick={() => setMenuOpen(false)}>Contact Us</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-kicker" aria-label="Welcome to the Philippines’ first-ever LANDPORT">
            <div className="marquee-track">
              {[0, 1].map((copy) => (
                <div className="marquee-message" aria-hidden={copy === 1} key={copy}>
                  <Bus className="marquee-bus" aria-hidden="true" size={22} strokeWidth={1.8} />
                  <span>Welcome to the Philippines’ first-ever <strong>LANDPORT</strong></span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-copy">
            <h1>Welcome to PITX, friends!</h1>
            <p>Experience safe, convenient, and comfortable commute here at PITX, the country’s first landport.</p>
            <form className="route-search" onSubmit={(event) => {
              event.preventDefault();
              if (!province || !city || !transport) return;
              setRouteMessage(`${transport} routes to ${city}, ${province}`);
            }}>
              <label>
                <span>Province</span>
                <select value={province} onChange={(event) => { setProvince(event.target.value); setCity(""); setTransport(""); setRouteMessage(""); }}>
                  <option value="">Select province</option>
                  {Object.keys(routeOptions).map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
              <label>
                <span>City</span>
                <select value={city} disabled={!province} onChange={(event) => { setCity(event.target.value); setTransport(""); setRouteMessage(""); }}>
                  <option value="">Select city</option>
                  {(routeOptions[province] ?? []).map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
              <label>
                <span>Transport</span>
                <select value={transport} disabled={!city} onChange={(event) => { setTransport(event.target.value); setRouteMessage(""); }}>
                  <option value="">Transport option</option>
                  {transportOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
              <button type="submit" disabled={!province || !city || !transport}><Search size={19} aria-hidden="true" /> Search</button>
            </form>
            <p className="route-result" aria-live="polite">{routeMessage}</p>
          </div>
          <button className="schedule-tab" onClick={() => setScheduleOpen(true)}>LIVE BUS SCHEDULE</button>
        </section>

        <section className="statement section-pad">
          <div className="statement-frame">
            <div className="statement-copy">
              <h2>Seamless interconnectivity.<br />Friendly service. First-world facility.</h2>
              <p>With our first-world facilities and friendly service, you can now enjoy seamless interconnectivity from the moment you arrive, until you reach your destination.</p>
            </div>
          </div>
          <Image className="statement-foreground" src="/assets/pitx-section-foreground.png" alt="" fill sizes="100vw" unoptimized aria-hidden="true" />
        </section>

        <section className="transport section-pad" id="passengers-guide">
          <div className="transport-image"><Image src="/assets/choose-ride.jpg" alt="PITX passenger concourse" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
          <div className="transport-copy">
            <p className="eyebrow">TRANSPORTATION</p>
            <h2>Choose your ride</h2>
            <p>PITX provides multimodal transport options to get you to your destination.</p>
            <a className="read-more" href="#modern-hub">READ MORE <span>→</span></a>
            <div className="ride-grid">{rides.map(([name, icon]) => <div className="ride" key={name}><Image src={icon} alt="" width={58} height={58} /><h3>{name}</h3></div>)}</div>
          </div>
        </section>

        <section className="things section-pad" id="things-to-do">
          <p className="eyebrow">THINGS TO DO</p>
          <h2>Shop and dine while you wait</h2>
          <p className="section-intro">PITX offers a wide range of dining and shopping options for a convenient commuting experience.</p>
          <div className="cards">
            {[
              ["Places to Dine", "Grab a quick bite or dine in at one of our restaurants so you can get your fill before commuting.", "/assets/dining.jpg"],
              ["Places to Shop", "Shop from your favorite brands while stocking up on those last-minute travel essentials.", "/assets/shopping.jpg"],
              ["Services", "Enjoy a safe and comfortable commute with our choice of travel and leisure services.", "/assets/services.jpg"],
            ].map(([title, text, image]) => <article className="thing-card" key={title} style={{ backgroundImage: `linear-gradient(180deg, transparent 22%, rgba(14,35,100,.92) 100%), url(${image})` }}><div><h3>{title}</h3><p>{text}</p><span>READ MORE →</span></div></article>)}
          </div>
        </section>

        <section className="modern" id="modern-hub">
          <div className="modern-heading section-pad"><p className="eyebrow">THE COUNTRY’S FIRST LANDPORT</p><h2>Your Friendly and Modern Transport Hub</h2><p>Take advantage of these features when you visit PITX</p></div>
          <div className="feature-panel">
            <div className="feature-image" style={{ backgroundImage: `url(${featureTabs[activeTab].image})` }} />
            <div className="feature-tabs" role="tablist" aria-label="PITX features">
              {featureTabs.map((tab, index) => <button key={tab.title} role="tab" aria-selected={activeTab === index} className={activeTab === index ? "active" : ""} onClick={() => setActiveTab(index)}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{tab.title}</h3>{activeTab === index ? <p>{tab.text}</p> : null}</div></button>)}
            </div>
          </div>
          <p className="transfer-copy">PITX serves as your transfer point for provincial and in-city transportation, so you can conveniently commute along the busy thoroughfares of Metro Manila and the South.</p>
        </section>

        <section className="contact section-pad" id="contact-us">
          <p className="eyebrow">CONTACT US</p><h2>Get in touch</h2>
          <div className="contact-grid">
            <div><span>✉</span><h3>Email</h3><a href="mailto:customerservice@pitx.com.ph">customerservice@pitx.com.ph</a></div>
            <div><span>f</span><h3>Facebook</h3><a href="https://www.facebook.com/ParanaqueITX/">/ParanaqueITX</a></div>
            <div><span>◎</span><h3>Instagram</h3><a href="https://www.instagram.com/pitx_landport/">@pitx_landport</a></div>
            <div><span>☎</span><h3>Phone</h3><p>8396-3817 to 18</p></div>
            <div className="address"><span>⌖</span><h3>Address</h3><a href="https://maps.google.com/?q=PITX">Parañaque Integrated Terminal Exchange, #1 Kennedy Rd., Tambo, Parañaque City</a></div>
          </div>
        </section>
      </main>

      <footer><Image src="/assets/footer-logo.png" alt="PITX" width={190} height={82} /><div className="footer-links"><a href="#top">HOME</a><a href="#modern-hub">ABOUT US</a><a href="#passengers-guide">PASSENGER’S GUIDE</a><a href="#contact-us">CONTACT US</a></div><p>Parañaque Integrated Terminal Exchange, #1 Kennedy Rd., Tambo, Parañaque City</p><small>© PITX {new Date().getFullYear()} All rights reserved.</small></footer>

      {scheduleOpen ? <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setScheduleOpen(false); }}><section className="schedule-modal" role="dialog" aria-modal="true" aria-labelledby="schedule-title"><button className="modal-close" onClick={() => setScheduleOpen(false)} aria-label="Close schedule">×</button><p className="eyebrow">DEPARTURES</p><h2 id="schedule-title">Live Bus Schedule</h2><p className="modal-note">Representative terminal schedule. Departure times may change; confirm with your operator before travel.</p><div className="schedule-list">{schedule.map(([destination, operator, hours]) => <div key={destination}><strong>{destination}</strong><span>{operator}</span><time>{hours}</time></div>)}</div></section></div> : null}
    </>
  );
}
