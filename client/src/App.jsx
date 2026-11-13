import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Menu, X, Code2, Layers3, Server, Database, Send, CheckCircle2 } from 'lucide-react';
import { profile, skills, projects } from './data/portfolio';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Header() {
  const [open, setOpen] = useState(false);
  const links = [['About', '#about'], ['Skills', '#skills'], ['Projects', '#projects'], ['Contact', '#contact']];
  return <header className="header"><a className="brand" href="#home"><span className="brand-mark">A.</span><span>AJINKYA<span className="muted">.DEV</span></span></a>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button>
    <nav className={open ? 'nav open' : 'nav'}>{links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}<a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>Let's talk <ArrowUpRight size={15}/></a></nav>
  </header>;
}

function SectionHeading({eyebrow, title, text}) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function App() {
  const [form, setForm] = useState({name:'', email:'', message:''});
  const [status, setStatus] = useState({kind:'', text:''});
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault(); setSending(true); setStatus({kind:'', text:''});
    try {
      const response = await fetch(`${API}/api/contact`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to send message.');
      setStatus({kind:'success', text:'Thanks! Your message has been received.'});
      setForm({name:'', email:'', message:''});
    } catch (err) {
      setStatus({kind:'error', text:err.message === 'Failed to fetch' ? 'Could not reach the API. Make sure the backend is running.' : err.message});
    } finally { setSending(false); }
  };

  return <><Header/><main>
    <section className="hero section-wrap" id="home">
      <div className="hero-copy"><div className="availability"><span className="pulse"/> AVAILABLE FOR OPPORTUNITIES</div>
        <p className="eyebrow">HELLO, I'M {profile.name.toUpperCase()}</p>
        <h1>Building for<br/><span className="gradient-text">the web.</span></h1>
        <p className="hero-description">{profile.intro}</p>
        <div className="hero-actions"><a className="button primary" href="#projects">Explore my work <ArrowUpRight size={17}/></a><a className="button secondary" href="#contact">Get in touch <Mail size={16}/></a></div>
        <div className="social-row"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={17}/> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn</a><span className="social-location">⌖ {profile.location}</span></div>
      </div>
      <div className="hero-art" aria-label="Decorative developer code illustration"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="code-card"><div className="window-dots"><i/><i/><i/></div><div className="code-line"><span className="code-purple">const</span> developer = {'{'}</div><div className="code-line indent"><span className="code-blue">name</span>: <span className="code-green">'Ajinkya'</span>,</div><div className="code-line indent"><span className="code-blue">stack</span>: [<span className="code-green">'MERN'</span>],</div><div className="code-line indent"><span className="code-blue">focus</span>: <span className="code-green">'Building'</span></div><div className="code-line">{'}'};</div><div className="code-cursor">▍</div></div><div className="floating-chip chip-react"><Code2 size={16}/> React.js</div><div className="floating-chip chip-node"><Server size={16}/> Node.js</div><div className="floating-chip chip-db"><Database size={16}/> MongoDB</div></div>
      <a className="scroll-hint" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={15}/></a>
    </section>

    <section className="section-wrap about-section" id="about"><SectionHeading eyebrow="01 / ABOUT ME" title={<>A developer with a<br/><span className="gradient-text">builder's mindset.</span></>} />
      <div className="about-grid"><div className="about-copy"><p>{profile.about}</p><p>Whether it's crafting a clean frontend, designing an API, or tracking down a tricky bug, I care about the details that make software dependable and enjoyable to use.</p><a className="text-link" href={profile.github} target="_blank" rel="noreferrer">Explore my GitHub <ArrowUpRight size={16}/></a></div>
      <div className="stats-grid"><div className="stat-card"><span className="stat-icon"><Code2/></span><strong>MERN</strong><span>Full-stack toolkit</span></div><div className="stat-card"><span className="stat-icon"><Layers3/></span><strong>End-to-end</strong><span>Product development</span></div><div className="stat-card"><span className="stat-icon"><Server/></span><strong>API-first</strong><span>Backend engineering</span></div><div className="stat-card"><span className="stat-icon"><Database/></span><strong>Data-driven</strong><span>MongoDB & SQL</span></div></div></div>
    </section>

    <section className="section-wrap skills-section" id="skills"><SectionHeading eyebrow="02 / TOOLKIT" title="Skills & technologies" text="The tools I use to bring ideas to life."/>
      <div className="skills-grid">{skills.map((group, i)=><article className="skill-card" key={group.title}><div className="skill-top"><span>0{i+1}</span><h3>{group.title}</h3></div><div className="skill-tags">{group.items.map(item=><span key={item}>{item}</span>)}</div></article>)}</div>
    </section>

    <section className="section-wrap projects-section" id="projects"><SectionHeading eyebrow="03 / SELECTED WORK" title={<>Things I've <span className="gradient-text">built.</span></>} text="A selection of projects that showcase my approach to building useful web experiences."/>
      <div className="projects-list">{projects.map(project=><article className="project-card" key={project.number}><div className="project-number">{project.number}</div><div className="project-main"><span className="project-type">{project.type}</span><h3>{project.name}</h3><p>{project.description}</p><div className="project-tags">{project.stack.map(s=><span key={s}>{s}</span>)}</div></div><div className="project-links"><a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.name} GitHub repository`}><Github size={19}/></a>{project.live && <a href={project.live} target="_blank" rel="noreferrer" aria-label={`${project.name} live demo`}><ArrowUpRight size={19}/></a>}</div></article>)}</div>
    </section>

    <section className="contact-section" id="contact"><div className="section-wrap contact-inner"><div className="contact-copy"><SectionHeading eyebrow="04 / CONTACT" title={<>Have a project<br/>in <span className="gradient-text">mind?</span></>} text="Have an idea, an opportunity, or just want to connect? Send me a message."/><a className="contact-email" href={`mailto:${profile.email}`}><Mail size={17}/>{profile.email}<ArrowUpRight size={15}/></a><div className="contact-social"><a href={profile.github} target="_blank" rel="noreferrer"><Github/></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin/></a></div></div>
      <form className="contact-form" onSubmit={submit}><label>Your name<input required minLength="2" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Jane Smith"/></label><label>Email address<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="jane@company.com"/></label><label>How can I help?<textarea required minLength="10" rows="4" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell me a little about your project..."/></label><button className="button primary submit-button" disabled={sending}>{sending ? 'Sending...' : 'Send message'} <Send size={16}/></button>{status.text && <p className={`form-status ${status.kind}`}>{status.kind==='success' && <CheckCircle2 size={16}/>} {status.text}</p>}</form>
    </div></section>
  </main><footer className="footer"><div className="section-wrap footer-inner"><a className="brand" href="#home"><span className="brand-mark">A.</span><span>AJINKYA<span className="muted">.DEV</span></span></a><span>Designed & built with care.</span><span>© {new Date().getFullYear()} {profile.name}</span></div></footer></>;
}

export default App;
