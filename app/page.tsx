"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence
} from "framer-motion";
import {
  ArrowUpRight,
  Copy,
  Check,
  Github,
  Linkedin,
  MapPin,
  Sparkles
} from "lucide-react";
import { Reveal, RevealText } from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import ContactModal from "@/components/ContactModal";

// Projects are temporarily disabled — uncomment entries below to re-enable them
// in the Work section. The page renders a "Case studies in progress" placeholder
// while this array is empty.
const PROJECTS: Array<{
  index: string;
  title: string;
  client: string;
  tags: string[];
  image: string;
  challenge: string;
  solution: string;
  impact: string;
}> = [
  /*
  {
    index: "01",
    title: "Kasi Commerce",
    client: "Township Retail · 2025",
    tags: ["React", "Node.js", "Postgres", "Stripe"],
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2400&auto=format&fit=crop",
    challenge:
      "Local township businesses had no affordable way to take online orders — existing platforms charged fees that erased thin margins.",
    solution:
      "Designed and built a lightweight, mobile-first commerce platform with offline-friendly carts, a Node.js API, and a one-tap WhatsApp checkout flow.",
    impact:
      "Onboarded the first cohort of merchants, kept end-to-end fees under 2%, and proved a viable path to digitising informal retail in South Africa."
  },
  {
    index: "02",
    title: "Lumen Learn",
    client: "Personal Project · 2024",
    tags: ["Django", "Python", "React", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2400&auto=format&fit=crop",
    challenge:
      "Self-taught learners struggle to stay consistent without structure, feedback, and a clear sense of progress.",
    solution:
      "Built a full-stack learning companion with Django + DRF on the backend and a React front-end — featuring spaced-repetition decks, streaks, and an AI tutor for clarifying questions.",
    impact:
      "Shipped the MVP end-to-end solo, used daily by a private beta group, and grew my comfort designing systems across data, API, and UI layers."
  },
  {
    index: "03",
    title: "Portfolio v1",
    client: "ntuthukosmith.github.io · 2023",
    tags: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2400&auto=format&fit=crop",
    challenge:
      "Needed a clear, professional home on the web to introduce myself, my aims, and the skills I was actively building.",
    solution:
      "Designed and hand-coded my first portfolio in vanilla HTML, CSS, and JavaScript, deployed to GitHub Pages with a focus on clarity and readability.",
    impact:
      "Served as my public résumé while learning, opened conversations with collaborators, and became the foundation I'm now evolving into this 2026 edition."
  }
  */
];

const STACK = [
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "HTML", "CSS"]
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Tailwind", "Framer Motion"]
  },
  {
    title: "Backend",
    items: ["Node.js", "Django", "Express", "PostgreSQL", "REST"]
  },
  {
    title: "Tooling",
    items: ["Git", "GitHub", "Vercel", "Figma", "Linux"]
  }
];

export default function Page() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Marquee />
      <Work />
      <About />
      <Stack />
      <Footer />
    </main>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
      <div className="flex items-center justify-between px-6 md:px-10 py-6">
        <a href="#top" className="flex items-center gap-2 text-paper" data-cursor="Home">
          <span className="font-serif italic text-2xl">Ntuthuko</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-70">
            /Smith
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-10 text-[12px] uppercase tracking-[0.2em] text-paper">
          <a href="#work" className="hover:opacity-60 transition-opacity">Work</a>
          <a href="#about" className="hover:opacity-60 transition-opacity">About</a>
          <a href="#stack" className="hover:opacity-60 transition-opacity">Stack</a>
          <a href="#contact" className="hover:opacity-60 transition-opacity">Contact</a>
        </nav>
        <a
          href="#contact"
          data-cursor="Say Hi"
          className="text-[12px] uppercase tracking-[0.2em] text-paper border border-paper/30 rounded-full px-4 py-2 hover:bg-paper hover:text-ink transition-colors"
        >
          Available · 2026
        </a>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  // Background photo parallax — drifts slower than the text for depth
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[110vh] pt-40 pb-24 px-6 md:px-10 overflow-hidden"
    >
      {/* Full-bleed background portrait — blended into the editorial dark theme */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden
      >
        <Image
          src="/NS1.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover [object-position:95%_center] md:[object-position:center_18%] grayscale contrast-110 opacity-60 md:opacity-40"
        />
        {/* Editorial blend layers: stronger on mobile so text stays legible,
            lighter on desktop so the photo reads more clearly */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/55 to-ink md:from-ink/70 md:via-ink/40 md:to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-ink/60 md:from-ink/40 md:to-ink/40" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 [background:radial-gradient(120%_80%_at_50%_40%,transparent_0%,transparent_55%,rgba(10,10,10,0.85)_100%)]" />
      </motion.div>

      <motion.div style={{ y, opacity, scale }} className="relative z-10 max-w-[1600px] mx-auto">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-ash mb-10">
          <span className="h-[1px] w-10 bg-ash/60" />
          <span>Portfolio · 2026 Edition</span>
        </div>

        <h1 className="font-serif text-paper leading-[0.92] tracking-tightest text-[14vw] md:text-[11vw]">
          <RevealText as="span" className="block">Engineering</RevealText>
          <RevealText as="span" className="block italic text-ash">
            scalable digital
          </RevealText>
          <RevealText as="span" className="block">solutions.</RevealText>
        </h1>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <Reveal delay={0.4} className="md:col-span-5 md:col-start-2 text-paper/80 text-lg md:text-xl leading-relaxed">
            <p>
              I'm <span className="text-paper">Ntuthuko Smith</span> — a software
              developer from South Africa turning lines of code into innovative
              solutions, with a deep love for technology and an eye for design.
            </p>
          </Reveal>
          <Reveal delay={0.55} className="md:col-span-4 md:col-start-9 text-paper/60 text-sm leading-relaxed">
            <div className="font-mono uppercase text-[10px] tracking-[0.25em] text-ash mb-3">
              Currently
            </div>
            <p>
              Building full-stack products with React, Node.js, and Django. Open
              to junior / mid-level engineering roles and freelance collaborations.
            </p>
          </Reveal>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-6 md:left-10 right-6 md:right-10 flex items-end justify-between text-[11px] uppercase tracking-[0.3em] text-ash z-10"
      >
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          Scroll to explore
        </div>
        <div className="hidden md:block">S 26.2041° · E 28.0473°</div>
      </motion.div>
    </section>
  );
}

/* ---------------- MARQUEE ---------------- */
function Marquee() {
  const items = [
    "Full-Stack Development",
    "Design Engineering",
    "React & Next.js",
    "Django & Node.js",
    "Creative Problem-Solving",
    "Lifelong Learning"
  ];
  const loop = [...items, ...items];
  return (
    <section className="border-y border-paper/10 py-8 overflow-hidden">
      <div className="flex marquee whitespace-nowrap gap-16 font-serif text-paper text-5xl md:text-7xl">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-16">
            <span className={i % 2 ? "italic text-ash" : ""}>{t}</span>
            <Sparkles className="h-6 w-6 text-accent" strokeWidth={1} />
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------------- WORK ---------------- */
function Work() {
  return (
    <section id="work" className="px-6 md:px-10 py-32 md:py-48 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
        <div className="md:col-span-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash">
            (01) — Selected Work
          </div>
        </div>
        <div className="md:col-span-8">
          <RevealText
            as="h2"
            className="font-serif text-5xl md:text-7xl tracking-tightest leading-[1.05]"
          >
            A growing catalogue of projects I've designed, coded, and shipped end-to-end.
          </RevealText>
        </div>
      </div>

      <div className="space-y-32 md:space-y-48">
        {PROJECTS.length === 0 ? (
          <Reveal>
            <div className="border border-paper/10 rounded-2xl bg-paper/[0.02] backdrop-blur-md p-10 md:p-16 text-center">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash mb-6">
                Coming soon
              </div>
              <h3 className="font-serif text-4xl md:text-6xl tracking-tightest leading-[1.05] text-paper">
                Case studies in progress.
              </h3>
              <p className="mt-6 max-w-xl mx-auto text-paper/65 text-base md:text-lg leading-relaxed">
                I'm currently writing up my featured work — challenge, solution,
                and impact for each project — and shooting clean visuals to go
                with them. Check back shortly, or reach out and I'll happily walk
                you through what I've been building.
              </p>
              <a
                href="#contact"
                data-cursor="Email"
                className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-accent hover:text-paper transition-colors"
              >
                Get in touch <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </Reveal>
        ) : (
          PROJECTS.map((p, i) => (
            <ProjectCard key={p.index} project={p} reverse={i % 2 === 1} />
          ))
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  reverse
}: {
  project: (typeof PROJECTS)[number];
  reverse: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <Reveal>
      <article
        ref={ref}
        className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <a
          href="#"
          data-cursor="View"
          className="group relative md:col-span-7 block overflow-hidden rounded-sm bg-graphite aspect-[4/5] md:aspect-[5/6]"
        >
          <motion.div style={{ y: imgY }} className="absolute inset-[-8%]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover grayscale group-hover:grayscale-0 transition-[filter,transform] duration-[1200ms] ease-out group-hover:scale-[1.04]"
              priority={project.index === "01"}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/0 to-ink/0" />
          <div className="absolute top-6 left-6 right-6 flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-paper">
            <span>{project.index}</span>
            <span>{project.client}</span>
          </div>
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-paper">
            <h3 className="font-serif text-3xl md:text-5xl tracking-tightest leading-none">
              {project.title}
            </h3>
            <ArrowUpRight className="h-8 w-8 md:h-10 md:w-10 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1} />
          </div>
        </a>

        <div className="md:col-span-5 space-y-10">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="text-[10px] uppercase tracking-[0.2em] border border-paper/20 rounded-full px-3 py-1 text-paper/70"
              >
                {t}
              </span>
            ))}
          </div>

          <Field label="Challenge" body={project.challenge} />
          <Field label="Solution" body={project.solution} />
          <Field label="Impact" body={project.impact} accent />
        </div>
      </article>
    </Reveal>
  );
}

function Field({
  label,
  body,
  accent
}: {
  label: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <div className="grid grid-cols-12 gap-4 border-t border-paper/10 pt-6">
      <div className="col-span-4 md:col-span-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ash pt-1">
        {label}
      </div>
      <p
        className={`col-span-8 md:col-span-9 text-base md:text-lg leading-relaxed ${
          accent ? "text-paper" : "text-paper/75"
        }`}
      >
        {body}
      </p>
    </div>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  return (
    <section id="about" className="relative px-6 md:px-10 py-32 md:py-48 border-t border-paper/10">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        <aside className="md:col-span-4 md:sticky md:top-32 self-start">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash mb-6">
            (02) — Bio
          </div>
          <Reveal>
            <div className="group aspect-[4/5] relative overflow-hidden rounded-sm bg-graphite">
              <Image
                src="/NS3.png"
                alt="Ntuthuko Smith"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover grayscale contrast-110 brightness-90 saturate-0 transition-[filter,transform] duration-[1200ms] ease-out group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.03]"
              />
              {/* Dark editorial blend — vignette + bottom-up gradient + subtle accent tint */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent mix-blend-multiply" />
              <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/0 transition-colors duration-700" />
              <div className="absolute inset-0 [background:radial-gradient(120%_80%_at_50%_30%,transparent_0%,transparent_60%,rgba(10,10,10,0.7)_100%)]" />
              {/* Mono caption overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-paper/80">
                <span>NS</span>
                <span>'26</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-ash">
              <span className="flex items-center gap-2">
                <MapPin className="h-3 w-3" /> South Africa
              </span>
              <span>SAST · GMT+2</span>
            </div>
          </Reveal>
        </aside>

        <div className="md:col-span-7 md:col-start-6 space-y-10">
          <RevealText
            as="h2"
            className="font-serif text-4xl md:text-6xl leading-[1.1] tracking-tightest"
          >
            I treat software like a craft — built with curiosity, shipped with care.
          </RevealText>

          <Reveal delay={0.15} className="space-y-6 text-paper/75 text-lg leading-relaxed font-serif">
            <p className="first-letter:font-serif first-letter:text-7xl first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85] first-letter:text-paper">
              I'm a software developer based in South Africa, with a deep love
              for technology and an eye for design. I started by hand-coding
              websites in HTML, CSS, and JavaScript and have grown into a
              full-stack engineer building real products with React, Node.js,
              and Django. The thread through all of it is the same belief: the
              best software is <em className="text-paper">creative</em>,{" "}
              <em className="text-paper">collaborative</em>, and unmistakably{" "}
              <em className="text-paper">impactful</em>.
            </p>
            <p className="font-sans text-base text-paper/65">
              I work best in small, ambitious teams where design and engineering
              sit at the same table. I care about clean, maintainable code, the
              texture of a button press, and the kind of details that make a
              product feel inevitable. When I'm not shipping, I'm usually
              learning the next thing — a new framework, a new pattern, a new
              way to make the web feel a little more alive.
            </p>
          </Reveal>

          <Reveal delay={0.25} className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-paper/10">
            {[
              ["Creative", "Solutions that push limits"],
              ["Innovative", "Adapting to what's next"],
              ["Collaborative", "Built across teams"],
              ["Impactful", "Shipped to be felt"]
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-serif text-3xl md:text-4xl tracking-tightest text-paper">
                  {n}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ash mt-2">
                  {l}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- STACK / BENTO ---------------- */
function Stack() {
  return (
    <section id="stack" className="px-6 md:px-10 py-32 md:py-48 border-t border-paper/10">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash">
              (03) — Toolkit
            </div>
          </div>
          <div className="md:col-span-8">
            <RevealText
              as="h2"
              className="font-serif text-5xl md:text-7xl tracking-tightest leading-[1.05]"
            >
              The instruments I reach for, again and again.
            </RevealText>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-[auto] gap-4">
          {/* Big feature tile */}
          <Reveal className="md:col-span-4 md:row-span-2">
            <BentoTile className="min-h-[420px] flex flex-col justify-between">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-ash">
                <span>Philosophy</span>
                <span>· 01</span>
              </div>
              <div>
                <h3 className="font-serif text-4xl md:text-6xl tracking-tightest leading-[1.05] text-paper">
                  Tools are just tools.
                  <span className="italic text-ash"> Taste is the moat.</span>
                </h3>
                <p className="mt-6 max-w-md text-paper/70">
                  I keep a deliberately small toolbox and go deep — JavaScript,
                  Python, React, Django, and the right amount of cloud. Boring,
                  battle-tested, and ruthlessly composable.
                </p>
              </div>
            </BentoTile>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-2">
            <BentoTile className="min-h-[200px] flex flex-col justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash">
                Based in
              </span>
              <div className="font-serif text-5xl tracking-tightest text-paper">South Africa</div>
              <p className="text-paper/60 text-sm">Open to remote work worldwide · SAST timezone (GMT+2).</p>
            </BentoTile>
          </Reveal>

          <Reveal delay={0.15} className="md:col-span-2">
            <BentoTile className="min-h-[200px] flex flex-col justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash">
                Currently learning
              </span>
              <div className="font-serif text-3xl italic text-paper leading-tight">
                "Type-safe full-stack with Next.js + tRPC"
              </div>
              {/* <a href="https://github.com/ntuthukosmith" target="_blank" rel="noreferrer" data-cursor="Follow" className="text-[11px] uppercase tracking-[0.25em] text-accent flex items-center gap-2">
                Follow on GitHub <ArrowUpRight className="h-3 w-3" />
              </a> */}
            </BentoTile>
          </Reveal>

          {STACK.map((cat, i) => (
            <Reveal key={cat.title} delay={0.05 * i} className="md:col-span-3">
              <BentoTile className="min-h-[180px]">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash mb-4">
                  {cat.title}
                </div>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 font-serif text-2xl md:text-3xl text-paper tracking-tightest">
                  {cat.items.map((it, j) => (
                    <li key={it} className={j % 2 ? "italic text-ash" : ""}>
                      {it}
                    </li>
                  ))}
                </ul>
              </BentoTile>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoTile({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative h-full rounded-2xl border border-paper/10 bg-paper/[0.03] backdrop-blur-md p-6 md:p-8 overflow-hidden transition-colors hover:bg-paper/[0.05] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-paper/[0.04] via-transparent to-transparent" />
      <div className="relative h-full flex flex-col gap-4">{children}</div>
    </div>
  );
}

/* ---------------- FOOTER / CONTACT ---------------- */
function Footer() {
  const email = "ntuthukosmith10@gmail.com";
  const [copied, setCopied] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  };

  return (
    <footer id="contact" className="relative px-6 md:px-10 pt-32 md:pt-48 pb-10 border-t border-paper/10">
      <div className="max-w-[1600px] mx-auto">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash mb-10">
          (04) — Let's build · 2026
        </div>

        <RevealText
          as="h2"
          className="font-serif text-paper text-[14vw] md:text-[11vw] leading-[0.92] tracking-tightest"
        >
          Have a project
        </RevealText>
        <RevealText
          as="h2"
          className="font-serif text-ash italic text-[14vw] md:text-[11vw] leading-[0.92] tracking-tightest"
        >
          worth building?
        </RevealText>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <button
              onClick={onCopy}
              data-cursor={copied ? "Copied" : "Copy"}
              className="group inline-flex items-center gap-4 text-paper hover:text-accent transition-colors"
            >
              <span className="font-serif text-3xl md:text-5xl tracking-tightest">
                {email}
              </span>
              <span className="relative h-10 w-10 rounded-full border border-paper/30 flex items-center justify-center group-hover:border-accent">
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                    >
                      <Check className="h-4 w-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Copy className="h-4 w-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </button>
            <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ash">
              {copied ? "Copied to clipboard" : "Click to copy email"}
            </div>
          </div>

          <div className="md:col-span-5 flex md:justify-end">
            <MagneticButton
              className="inline-block cursor-pointer"
              data-cursor="Book"
              onClick={() => setContactOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setContactOpen(true);
                }
              }}
            >
              <span className="inline-flex items-center gap-3 rounded-full bg-paper text-ink px-8 py-5 font-mono text-[11px] uppercase tracking-[0.3em] hover:bg-accent transition-colors">
                Book an intro call <ArrowUpRight className="h-4 w-4" />
              </span>
            </MagneticButton>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-2 md:grid-cols-3 gap-8 pt-10 border-t border-paper/10 text-sm">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash mb-3">
              Elsewhere
            </div>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/ntuthukosmith" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-paper/80 hover:text-paper">
                  <Github className="h-4 w-4" /> Github
                </a>
              </li>
              <li>
                <a href="#" className="inline-flex items-center gap-2 text-paper/80 hover:text-paper">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash mb-3">
              Sections
            </div>
            <ul className="space-y-2 text-paper/80">
              <li><a href="#work">Work</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#stack">Stack</a></li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash mb-3">
              Status
            </div>
            <p className="text-paper/80">
              Available for new engagements in 2026. Reach me on{" "}
              <a href="tel:+27677115581" className="underline decoration-paper/30 hover:text-paper">+27 67 711 5581</a>{" "}
              or by email. Replies within 24h on weekdays.
            </p>
          </div>
        </div>

        <div className="mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] uppercase tracking-[0.3em] text-ash">
          <span>© {new Date().getFullYear()} Ntuthuko Smith. All rights reserved.</span>
          <span>Designed & built in South Africa · 2026 Edition</span>
        </div>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </footer>
  );
}
