import React, { useMemo, useState } from "react";
import {
  ArrowRight, CalendarDays, MapPin, Search, Menu, X, Sparkles,
  Code2, Music2, Trophy, Palette, Users, Clock3, CheckCircle2
} from "lucide-react";

const events = [
  { id: 1, title: "Build Your First AI App", category: "Technology", date: "NOV 18", time: "10:00 AM", place: "Innovation Lab", tag: "Workshop", color: "violet", icon: Code2, description: "A hands-on beginner workshop to turn an idea into a working AI prototype." },
  { id: 2, title: "Campus Music Evening", category: "Cultural", date: "NOV 19", time: "5:30 PM", place: "Open Air Theatre", tag: "Live music", color: "pink", icon: Music2, description: "An evening of student bands, acoustic performances and good campus energy." },
  { id: 3, title: "Inter-Department Sports Meet", category: "Sports", date: "NOV 21", time: "8:00 AM", place: "University Ground", tag: "Competition", color: "orange", icon: Trophy, description: "Bring your team spirit and take part in a day of friendly competition." },
  { id: 4, title: "Design Thinking Sprint", category: "Workshop", date: "NOV 22", time: "11:00 AM", place: "Design Studio", tag: "Creative lab", color: "blue", icon: Palette, description: "Collaborate with other students and design solutions to real-world problems." },
  { id: 5, title: "Student Clubs Connect", category: "Community", date: "NOV 24", time: "2:00 PM", place: "Central Atrium", tag: "Networking", color: "green", icon: Users, description: "Meet student communities, discover new interests and find your people." },
  { id: 6, title: "Web Development Bootcamp", category: "Technology", date: "NOV 26", time: "9:30 AM", place: "Computer Lab 2", tag: "Bootcamp", color: "violet", icon: Code2, description: "Learn the building blocks of modern websites through guided practice." }
];

const categories = ["All", "Technology", "Cultural", "Sports", "Workshop", "Community"];

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [registered, setRegistered] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredEvents = useMemo(() => events.filter(event => {
    const matchesCategory = activeCategory === "All" || event.category === activeCategory;
    const text = `${event.title} ${event.description} ${event.place} ${event.category}`.toLowerCase();
    return matchesCategory && text.includes(query.toLowerCase());
  }), [activeCategory, query]);

  function register(id, title) {
    if (registered.includes(id)) {
      setNotice(`You're already on the list for ${title}.`);
      return;
    }
    setRegistered(current => [...current, id]);
    setNotice(`You're registered for ${title}!`);
    window.setTimeout(() => setNotice(""), 3500);
  }

  const closeMenu = () => setMobileOpen(false);

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" onClick={closeMenu}>
          <span className="brand-mark"><Sparkles size={19} /></span>
          <span>Campus<span className="brand-accent">Loop</span></span>
        </a>
        <button className="mobile-toggle" aria-label="Toggle navigation" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
        <nav className={mobileOpen ? "nav-links open" : "nav-links"}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#events" onClick={closeMenu}>Explore events</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a className="nav-cta" href="#events" onClick={closeMenu}>Find an event <ArrowRight size={16} /></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-glow glow-one" /><div className="hero-glow glow-two" />
          <div className="hero-content">
            <div className="eyebrow"><span className="live-dot" /> YOUR CAMPUS, YOUR COMMUNITY</div>
            <h1>Make campus life<br /><span>unforgettable.</span></h1>
            <p className="hero-copy">Discover events, meet like-minded people and find the moments that make your college journey yours.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#events">Explore events <ArrowRight size={18} /></a>
              <a className="button button-ghost" href="#about">How it works</a>
            </div>
            <div className="hero-stats">
              <div><strong>20+</strong><span>Campus clubs</span></div>
              <div><strong>50+</strong><span>Events each term</span></div>
              <div><strong>1 place</strong><span>To find your people</span></div>
            </div>
          </div>
          <div className="hero-art" aria-label="Illustration of campus event cards">
            <div className="orbit orbit-a" /><div className="orbit orbit-b" />
            <div className="floating-card card-main">
              <div className="mini-label">UP NEXT <span>● LIVE</span></div>
              <div className="art-icon"><Code2 size={30} /></div>
              <h3>Ideas into<br />innovations.</h3>
              <p><CalendarDays size={14} /> NOV 18 · INNOVATION LAB</p>
              <div className="attendees"><span>R</span><span>A</span><span>S</span><small>+48 joining</small></div>
            </div>
            <div className="floating-card card-side"><Music2 size={22} /><b>Music night</b><small>Nov 19 · 5:30 PM</small></div>
            <div className="sparkle s1">✦</div><div className="sparkle s2">✧</div>
          </div>
        </section>

        <section className="trust-strip">
          <span>FIND YOUR NEXT</span><b>WORKSHOP</b><i>✦</i><b>COMMUNITY</b><i>✦</i><b>COMPETITION</b><i>✦</i><b>BIG IDEA</b>
        </section>

        <section className="events-section section-wrap" id="events">
          <div className="section-heading">
            <div><div className="eyebrow dark-eyebrow">WHAT'S HAPPENING</div><h2>Find your <span>next moment.</span></h2><p>Explore what's coming up around campus.</p></div>
            <div className="event-count"><strong>{filteredEvents.length.toString().padStart(2, "0")}</strong><span>EVENTS TO EXPLORE</span></div>
          </div>
          <div className="event-tools">
            <div className="filters" role="group" aria-label="Filter events by category">
              {categories.map(category => <button key={category} className={activeCategory === category ? "filter active" : "filter"} onClick={() => setActiveCategory(category)}>{category}</button>)}
            </div>
            <label className="search-box"><Search size={18} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search events..." aria-label="Search events" /></label>
          </div>
          {notice && <div className="notice" role="status"><CheckCircle2 size={18} />{notice}</div>}
          <div className="event-grid">
            {filteredEvents.map(event => {
              const Icon = event.icon;
              const isRegistered = registered.includes(event.id);
              return <article className="event-card" key={event.id}>
                <div className={`event-visual ${event.color}`}>
                  <span className="event-tag">{event.tag}</span><Icon size={54} strokeWidth={1.5} />
                  <span className="visual-number">0{event.id}</span>
                </div>
                <div className="event-info">
                  <div className="event-date"><CalendarDays size={15} /> {event.date} <span>·</span> <Clock3 size={15} /> {event.time}</div>
                  <h3>{event.title}</h3><p>{event.description}</p>
                  <div className="event-bottom"><span><MapPin size={15} />{event.place}</span>
                    <button className={isRegistered ? "register-button registered" : "register-button"} onClick={() => register(event.id, event.title)}>{isRegistered ? "Joined ✓" : "Join event"} <ArrowRight size={15} /></button>
                  </div>
                </div>
              </article>;
            })}
          </div>
          {filteredEvents.length === 0 && <div className="empty-state"><Search size={28} /><h3>No events found</h3><p>Try another search term or category.</p><button onClick={() => {setQuery(""); setActiveCategory("All");}}>Clear filters</button></div>}
        </section>

        <section className="about-section" id="about">
          <div className="about-inner">
            <div className="about-badge"><Sparkles size={20} /> THE CAMPUSLOOP WAY</div>
            <h2>Less scrolling.<br /><span>More experiencing.</span></h2>
            <p>CampusLoop brings campus activities together in one simple place. Browse events, discover interests and take the first step toward getting involved.</p>
            <div className="steps">
              <div><b>01</b><strong>Discover</strong><span>Find events that match your interests.</span></div>
              <div><b>02</b><strong>Connect</strong><span>Meet people who enjoy what you do.</span></div>
              <div><b>03</b><strong>Participate</strong><span>Show up, learn something and make memories.</span></div>
            </div>
          </div>
        </section>
        <section className="join-banner" id="contact">
          <div><div className="eyebrow">YOUR CAMPUS ADVENTURE STARTS HERE</div><h2>There's a place for you<br />in the loop.</h2></div>
          <a className="button button-light" href="mailto:hello@campusloop.example">Get in touch <ArrowRight size={18} /></a>
        </section>
      </main>
      <footer><a className="brand footer-brand" href="#home"><span className="brand-mark"><Sparkles size={17} /></span><span>Campus<span className="brand-accent">Loop</span></span></a><p>Made for campus life. © 2026 CampusLoop.</p><a href="#home">Back to top ↑</a></footer>
    </div>
  );
}

export default App;