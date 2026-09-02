"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Bus, ChevronDown, Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import JourneyProgress from "./journey-progress";
import { useScrollJourney } from "./use-scroll-journey";

const ContactMap = dynamic(() => import("./contact-map"), {
  ssr: false,
  loading: () => <div className="contact-map-loading" aria-label="Loading the PITX map" role="status" />,
});

const dropdownNav = [
  { label: "Passenger’s Guide", items: [["Transport Options", "#passengers-guide"], ["Things to Do", "#things-to-do"], ["Terminal Features", "#modern-hub"]] },
  { label: "Leasing Opportunity", items: [["Retail & Commercial Spaces", "#contact-us"], ["Office Spaces", "#contact-us"], ["Advertising & Promotions", "#contact-us"]] },
  { label: "News", items: [["Latest Updates", "#modern-hub"], ["Press Releases", "#modern-hub"], ["Tourist Destinations", "#things-to-do"]] },
];
const transportGallery = [
  { name: "Bus", icon: "/assets/icon-bus.svg", image: "/assets/choose-ride.jpg", alt: "Passengers boarding buses at PITX" },
  { name: "Taxi", icon: "/assets/icon-taxi.svg", image: "/assets/accessible.jpg", alt: "PITX terminal access area" },
  { name: "PUJ", icon: "/assets/icon-puj.svg", image: "/assets/amenities.jpg", alt: "PITX passenger ticket counter" },
  { name: "LRT 1", icon: "/assets/icon-lrt.svg", image: "/assets/commuting.jpg", alt: "PITX transit turnstiles" },
];
const featureTabs = [
  { title: "Accessible Location", text: "PITX is strategically located in Diosdado Macapagal Boulevard and CAVITEX which connects the South and Metro Manila.", image: "/assets/accessible.jpg" },
  { title: "Multimodal Transport Facility", text: "PITX features intermodal terminals that provide you with a wide range of transport options and services.", image: "/assets/multimodal.jpg" },
  { title: "Advanced Commuting System", text: "PITX makes seamless commuting possible with its centralized boarding pass system.", image: "/assets/commuting.jpg" },
  { title: "Modern Features and Amenities", text: "PITX is equipped with modern features and amenities that are designed to address your daily commuting needs.", image: "/assets/amenities.jpg" },
  { title: "One-Stop Terminal", text: "PITX houses retail and office spaces where you can dine, shop, and avail government services, in one convenient location.", image: "/assets/one-stop.jpg" },
];
const scheduleGroups = [
  { time: "01:00 PM", rows: [["RORO BUS", "MASBATE CITY", "4", "20", "CANCELLED"], ["GENESIS", "BALANGA", "5", "33", "CANCELLED"]] },
  { time: "01:30 PM", rows: [["JAM/CHER", "BALIBAGO", "2", "8", ""], ["BARNEY AUTO LINES", "GUINAYANGAN", "2", "9", "CANCELLED"], ["BARNEY AUTO LINES", "STA. ELENA", "2", "10", "ARRIVING"], ["CERES-GOLDSTAR", "SAN JOSE", "2", "11", "ARRIVING"], ["BELLEZA TRANSPORT", "BULAN", "4", "20", "ARRIVING"], ["YOHANCE EXPRESS INC.", "CAGAYAN DE ORO", "4", "21", "ARRIVING"], ["MEGA BUS LINES CORP", "LAOANG", "4", "22", "ARRIVING"], ["UBE EXPRESS", "NAIA LOOP", "5", "32", "·"], ["SOLID NORTH", "DAGUPAN CITY", "5", "35", "CANCELLED"]] },
  { time: "02:00 PM", rows: [["ALPS", "BATANGAS CITY", "2", "8", ""], ["ALPS", "LIPA CITY", "2", "9", ""], ["ALPS", "LIPA CITY", "2", "10", ""], ["CERES-GOLDSTAR", "SAN JOSE", "2", "11", "ARRIVING"]] },
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
  const pageRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeTransport, setActiveTransport] = useState(0);
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [transport, setTransport] = useState("");
  const [routeMessage, setRouteMessage] = useState("");
  const [activeStop, setActiveStop] = useState("arrival");

  const handleFeatureChange = useCallback((index: number) => setActiveTab(index), []);
  const handleProgressChange = useCallback((progress: number) => {
    document.documentElement.style.setProperty("--journey-progress", `${Math.max(0, Math.min(progress, 1)) * 100}%`);
  }, []);
  const handleStopChange = useCallback((stop: string) => setActiveStop(stop), []);

  useScrollJourney({ root: pageRef, onFeatureChange: handleFeatureChange, onProgressChange: handleProgressChange, onStopChange: handleStopChange });

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
      <a className="skip-link" href="#arrival">Skip to content</a>
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

      <main id="top" ref={pageRef}>
        <div className="opening-journey">
        <section className="hero" id="arrival">
          <div className="hero-media" aria-hidden="true" />
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
            <h1 className="hero-intro">Welcome to PITX, friends!</h1>
            <p>Experience safe, convenient, and comfortable commute here at PITX, the country’s first landport.</p>
            <form className="route-search hero-intro" onSubmit={(event) => {
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
          <button className={scheduleOpen ? "schedule-tab schedule-tab-open" : "schedule-tab"} onClick={() => setScheduleOpen(true)}>LIVE BUS SCHEDULE</button>
        </section>

        <div className="mobile-cloud-transition" aria-hidden="true" />

        <section className="statement section-pad" aria-label="PITX terminal introduction">
          <div className="statement-sky" aria-hidden="true" />
          <div className="statement-frame" aria-hidden="true" />
          <div className="statement-copy">
            <h2>Seamless interconnectivity.<br />Friendly service. First-world facility.</h2>
            <p>With our first-world facilities and friendly service, you can now enjoy seamless interconnectivity from the moment you arrive, until you reach your destination.</p>
          </div>
          <Image className="statement-foreground" src="/assets/pitx-section-foreground.png" alt="" fill sizes="100vw" priority unoptimized aria-hidden="true" />
        </section>
        </div>

        <section className="transport section-pad" id="transport">
          <span id="passengers-guide" className="legacy-anchor" aria-hidden="true" />
          <div className="transport-heading">
            <div className="transport-copy">
              <p className="eyebrow">TRANSPORTATION</p>
              <h2>Choose your ride</h2>
              <p>PITX provides multimodal transport options to get you to your destination.</p>
            </div>
            <a className="transport-read-more" href="#passengers-guide">Read more</a>
          </div>
          <div className="transport-gallery" aria-label="Choose a transportation option" onMouseLeave={() => setActiveTransport(0)}>
            {transportGallery.map(({ name, icon, image, alt }, index) => (
              <button
                aria-pressed={activeTransport === index}
                className={`transport-panel${activeTransport === index ? " transport-panel-active" : ""}`}
                key={name}
                onClick={() => setActiveTransport(index)}
                onFocus={() => setActiveTransport(index)}
                onMouseEnter={() => setActiveTransport(index)}
                type="button"
              >
                <Image className="transport-panel-image" src={image} alt={alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 50vw" />
                <span className="transport-panel-tint" aria-hidden="true" />
                <span className="transport-panel-name">{name}</span>
                <span className="transport-panel-icon" aria-hidden="true"><Image src={icon} alt="" width={74} height={74} /></span>
              </button>
            ))}
          </div>
        </section>

        <section className="things section-pad" id="explore">
          <span id="things-to-do" className="legacy-anchor" aria-hidden="true" />
          <p className="eyebrow">THINGS TO DO</p>
          <h2>Shop and dine while you wait</h2>
          <p className="section-intro">PITX offers a wide range of dining and shopping options for a convenient commuting experience.</p>
          <div className="cards-viewport">
          <div className="cards cards-rail">
            {[
              ["Places to Dine", "Grab a quick bite or dine in at one of our restaurants so you can get your fill before commuting.", "/assets/dining.jpg"],
              ["Places to Shop", "Shop from your favorite brands while stocking up on those last-minute travel essentials.", "/assets/shopping.jpg"],
              ["Services", "Enjoy a safe and comfortable commute with our choice of travel and leisure services.", "/assets/services.jpg"],
            ].map(([title, text, image]) => <article className="thing-card" key={title} style={{ backgroundImage: `linear-gradient(180deg, transparent 22%, rgba(14,35,100,.92) 100%), url(${image})` }}><div><h3>{title}</h3><p>{text}</p><span>READ MORE →</span></div></article>)}
          </div>
          </div>
        </section>

        <section className="modern" id="features">
          <span id="modern-hub" className="legacy-anchor" aria-hidden="true" />
          <div className="modern-heading section-pad"><p className="eyebrow">TERMINAL FEATURES</p><h2>The Country’s First Landport</h2><p className="section-intro">PITX serves as your transfer point for provincial and in-city transportation, so you can conveniently commute</p></div>
          <div className="feature-stage">
            <div className="feature-panel">
              <div className="feature-stack" aria-live="polite">
                {featureTabs.map((tab, index) => {
                  const previousDepth = (activeTab - index + featureTabs.length) % featureTabs.length;
                  const stackStyle = index === activeTab
                    ? { width: 400, height: 400, left: 0, top: 80, transform: "translate3d(0, 0, 0)", zIndex: 20, opacity: 1 }
                    : previousDepth === 1
                      ? { width: 360, height: 400, left: 20, top: 40, transform: "translate3d(0, 0, 0)", zIndex: 12, opacity: 1 }
                      : previousDepth === 2
                        ? { width: 320, height: 341, left: 40, top: 0, transform: "translate3d(0, 0, 0)", zIndex: 11, opacity: 1 }
                        : { width: 0, height: 0, left: 0, top: 0, transform: "translate3d(0, 0, 0)", zIndex: 0, opacity: 0 };

                  return <article className={`feature-stack-card${index === activeTab ? " active" : ""}`} key={tab.title} style={stackStyle} aria-hidden={index !== activeTab}>
                    <Image src={tab.image} alt={index === activeTab ? tab.title : ""} fill sizes="400px" />
                  </article>;
                })}
              </div>
              <div className="feature-hero-copy">
                <h2>Your Friendly and Modern<br />Transport Hub</h2>
                <p>Take advantage of these features when you visit PITX</p>
              </div>
              <div className="feature-tabs" role="tablist" aria-label="PITX features">
                {featureTabs.map((tab, index) => <button key={tab.title} type="button" role="tab" aria-selected={activeTab === index} className={activeTab === index ? "active" : ""} onClick={() => setActiveTab(index)}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{tab.title}</h3>{activeTab === index ? <p>{tab.text}</p> : null}</div></button>)}
              </div>
            </div>
          </div>
        </section>

        <section className="contact section-pad" id="contact">
          <span id="contact-us" className="legacy-anchor" aria-hidden="true" />
          <div className="contact-layout">
            <div className="contact-copy soft-reveal">
              <p className="eyebrow">CONTACT US</p><h2>Get in touch</h2>
              <p className="contact-intro">Need help with your trip? Our team is here for you.</p>
              <a className="read-more contact-map-link" href="https://maps.google.com/?q=PITX" target="_blank" rel="noreferrer">VIEW IN MAPS <span>→</span></a>
              <div className="contact-info-grid">
                <div><span className="contact-icon" aria-hidden="true">✉</span><div><h3>Email</h3><a href="mailto:customerservice@pitx.com.ph">customerservice@pitx.com.ph</a></div></div>
                <div><span className="contact-icon" aria-hidden="true">f</span><div><h3>Facebook</h3><a href="https://www.facebook.com/ParanaqueITX/">/ParanaqueITX</a></div></div>
                <div><span className="contact-icon" aria-hidden="true">◎</span><div><h3>Instagram</h3><a href="https://www.instagram.com/pitx_landport/">@pitx_landport</a></div></div>
                <div><span className="contact-icon" aria-hidden="true">☎</span><div><h3>Phone</h3><a href="tel:+63283963817">8396-3817 to 18</a></div></div>
              </div>
            </div>
            <div className="contact-map soft-reveal">
              <ContactMap />
            </div>
          </div>
        </section>
      </main>

      <JourneyProgress activeStop={activeStop} subdued={scheduleOpen} visible={["transport", "explore", "features"].includes(activeStop)} />

      <footer>
        <div className="footer-layout">
          <div className="footer-brand"><Image src="/assets/footer-logo.png" alt="PITX" width={190} height={82} /></div>
          <nav className="footer-nav" aria-label="Footer navigation">
            <div className="footer-column footer-primary"><a className="footer-heading-link" href="#top">HOME</a><a className="footer-heading-link" href="#modern-hub">ABOUT US</a></div>
            <div className="footer-column"><h3>PASSENGER’S GUIDE</h3><a href="#passengers-guide">Transport</a><a href="#things-to-do">Things to Do</a></div>
            <div className="footer-column"><h3>LEASING OPPORTUNITY</h3><a href="#contact-us">Retail &amp; Commercial Spaces</a><a href="#contact-us">Office Spaces</a><a className="footer-heading-link footer-subheading" href="#modern-hub">NEWS</a><a className="footer-heading-link" href="#contact-us">CONTACT US</a></div>
          </nav>
          <div className="footer-contact"><p>Parañaque Integrated Terminal Exchange, #1 Kennedy Rd., Tambo, Parañaque City</p><div className="footer-social" aria-label="Social links"><a href="mailto:customerservice@pitx.com.ph" aria-label="Email">✉</a><a href="https://www.facebook.com/ParanaqueITX/" aria-label="Facebook">f</a><a href="https://www.instagram.com/pitx_landport/" aria-label="Instagram">◎</a></div><small>© PITX {new Date().getFullYear()} All rights reserved.</small></div>
        </div>
      </footer>

      <div className={scheduleOpen ? "schedule-drawer-layer open" : "schedule-drawer-layer"} aria-hidden={!scheduleOpen} onMouseDown={(e) => { if (e.target === e.currentTarget) setScheduleOpen(false); }}>
        <section className="schedule-drawer" role="dialog" aria-modal={scheduleOpen} aria-labelledby="schedule-title">
          <div className="schedule-drawer-topbar"><span>◉ LIVE</span><strong>BUS SCHEDULE</strong></div>
          <button type="button" className="schedule-drawer-close" onClick={() => setScheduleOpen(false)} aria-label="Close schedule">×</button>
          <h2 id="schedule-title" className="schedule-drawer-title">Live Bus Schedule</h2>
          <p className="schedule-date">{new Intl.DateTimeFormat("en-US", { weekday: "long", day: "2-digit", month: "long", year: "numeric" }).format(new Date())}</p>
          <p className="schedule-drawer-note">Representative terminal schedule. Departure times may change; confirm with your operator before travel.</p>
          <div className="schedule-table" role="table" aria-label="Live bus departures">
            <div className="schedule-table-head" role="row"><span role="columnheader">Operator</span><span role="columnheader">Route</span><span role="columnheader">Gate</span><span role="columnheader">Bay</span><span role="columnheader">Status</span></div>
            <div className="schedule-time-band">LIVE DEPARTURES</div>
            {scheduleGroups.map((group) => <div className="schedule-table-group" key={group.time}><div className="schedule-time-band">{group.time}</div>{group.rows.map(([operator, route, gate, bay, status]) => <div className="schedule-table-row" role="row" key={`${group.time}-${operator}-${route}-${gate}-${bay}`}><strong role="cell">{operator}</strong><span role="cell">{route}</span><span role="cell">{gate}</span><span role="cell">{bay}</span><time className={`schedule-status ${status === "CANCELLED" ? "cancelled" : status === "ARRIVING" ? "arriving" : "pending"}`} role="cell">{status || "·"}</time></div>)}</div>)}
          </div>
        </section>
      </div>
    </>
  );
}
