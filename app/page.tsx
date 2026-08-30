"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { sendContactMessage } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

/* lucide-react dropped brand icons; these two glyphs are cheaper than a new dependency */
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SOCIALS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/clear-cloud-software",
    Icon: LinkedinIcon,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/clearcloudsoftware",
    Icon: InstagramIcon,
  },
];

const capabilities = [
  { n: "01", title: "Software building", body: "You bring the idea. We ship the software — any stack, any scale, no drama." },
  { n: "02", title: "Cloud infrastructure", body: "Google Cloud natives, fluent everywhere else. Your infrastructure, minus the thunderstorms." },
  { n: "03", title: "AI solutions", body: "From AI-assisted engineering to systems that think for a living." },
  { n: "04", title: "IT consulting", body: "We automate the boring parts. Then we automate the rest. R&D handles what's left." },
];

/* cut-paper cloud: stacked board layers; each lobe is its own sheet with
   a soft shadow falling on the lobes behind it (clipped to the silhouette) */
function CardboardCloud({
  className,
  uid,
}: {
  className?: string;
  uid: string;
}) {
  const lobes = (
    <>
      <circle cx="55" cy="78" r="30" />
      <circle cx="95" cy="55" r="40" />
      <circle cx="143" cy="64" r="33" />
      <circle cx="178" cy="80" r="24" />
      <rect x="34" y="68" width="160" height="40" rx="20" />
    </>
  );
  const face = `url(#face-${uid})`;
  const lobeShadow = `url(#lobe-${uid})`;
  return (
    <svg
      viewBox="0 0 225 125"
      className={className}
      style={{ overflow: "visible" }}
      aria-hidden
    >
      <defs>
        <linearGradient id={`face-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="65%" stopColor="#f3f7fb" />
          <stop offset="100%" stopColor="#dce6f1" />
        </linearGradient>
        <clipPath id={`clip-${uid}`}>{lobes}</clipPath>
        <filter id={`lobe-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow
            dx="0"
            dy="7"
            stdDeviation="6"
            floodColor="#7e9bb9"
            floodOpacity="0.45"
          />
        </filter>
      </defs>
      <g fill="#b3c7dc" transform="translate(8,0)" opacity="0.6">
        {lobes}
      </g>
      <g fill="#e2ebf4" transform="translate(4,0)">
        {lobes}
      </g>
      <g
        style={{ filter: "drop-shadow(0 12px 14px rgba(34, 55, 82, 0.25))" }}
      >
        <g fill={face}>{lobes}</g>
        <g clipPath={`url(#clip-${uid})`} fill={face}>
          <circle cx="178" cy="80" r="24" filter={lobeShadow} />
          <circle cx="55" cy="78" r="30" filter={lobeShadow} />
          <circle cx="143" cy="64" r="33" filter={lobeShadow} />
          <circle cx="95" cy="55" r="40" filter={lobeShadow} />
        </g>
      </g>
    </svg>
  );
}

/* wavy cloud-bank edge for the papercut horizon; fills solid below the bumps */
function ScallopBand({
  className,
  flip,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1440 96"
      preserveAspectRatio="none"
      className={className}
      style={{
        filter: "drop-shadow(0 -7px 9px rgba(34, 55, 82, 0.22))",
        transform: flip ? "scaleX(-1)" : undefined,
      }}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M0,44 q65,-36 130,0 q50,-24 100,0 q75,-40 150,0 q45,-20 90,0 q70,-34 140,0 q60,-26 120,0 q80,-42 160,0 q55,-22 110,0 q70,-36 140,0 q50,-20 100,0 q60,-30 120,0 q40,-18 80,0 L1440,96 L0,96 Z"
      />
    </svg>
  );
}

/* concentric-ring paper sun with a soft glow */
function PaperSun({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        borderRadius: "50%",
        background:
          "repeating-radial-gradient(circle, #ffffff 0 10px, #eef3f9 10px 12px)",
        boxShadow:
          "0 0 50px 18px rgba(255, 255, 255, 0.55), 0 8px 14px rgba(34, 55, 82, 0.15)",
      }}
      aria-hidden
    />
  );
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(sendContactMessage, {
    ok: false,
  });

  return (
    <main className="relative flex h-svh flex-col overflow-hidden px-6 pt-6 sm:px-12 sm:pt-8 lg:px-16">
      <CardboardCloud
        uid="c"
        className="drift absolute top-[26%] left-[-14%] z-0 w-[36rem] opacity-90 sm:top-[18%] sm:w-[58rem] xl:w-[74rem]"
      />
      <PaperSun className="absolute top-[9%] right-[34%] z-0 h-20 w-20 xl:h-24 xl:w-24" />

      <CardboardCloud uid="a" className="drift absolute top-[36%] right-[4%] z-0 hidden w-80 md:block xl:w-[24rem]" />
      <CardboardCloud uid="b" className="drift absolute top-[8%] right-[10%] z-0 w-36 opacity-80 md:top-[16%] md:right-[24%] md:w-44 md:opacity-70" />

      <header className="z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-mark.png"
            alt="Clear Cloud Software logo"
            width={92}
            height={21}
            priority
          />
          <span className="hidden font-mono text-xs leading-tight font-bold tracking-[0.25em] uppercase sm:block">
            Clear Cloud
            <br />
            <span className="font-normal text-ink-soft">Software</span>
          </span>
        </div>
        <div className="flex items-center gap-8">
          <button
            onClick={() => setOpen(true)}
            className="bg-navy px-6 py-3 font-mono text-sm font-semibold text-white transition-colors hover:bg-steel"
          >
            Contact us
          </button>
        </div>
      </header>

      <section className="z-10 flex min-h-0 flex-1 flex-col justify-center">
        <p
          className="rise-in mb-6 flex items-center gap-4 font-mono text-xs font-semibold tracking-[0.3em] text-navy uppercase"
          style={{ "--d": "0.05s" } as React.CSSProperties}
        >
          <span className="h-px w-10 bg-navy" aria-hidden />
          Software · Cloud · AI studio
        </p>
        <h1
          className="rise-in font-display text-[clamp(3rem,8vw,7rem)] leading-[1.02] font-semibold"
          style={{ "--d": "0.15s" } as React.CSSProperties}
        >
          Complex problems.
          <br />
          <span className="text-steel">Clear skies.</span>
        </h1>
        <p
          className="rise-in mt-8 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg"
          style={{ "--d": "0.3s" } as React.CSSProperties}
        >
          From first sketch to shipped product: software built right, clouds
          kept clear, and AI that earns its keep.
        </p>
      </section>

      <footer
        className="rise-in relative z-10 -mx-6 sm:-mx-12 lg:-mx-16"
        style={{ "--d": "0.45s" } as React.CSSProperties}
      >
        <ScallopBand className="absolute bottom-full h-24 w-full text-[#a5c0da] sm:h-28" />
        <ScallopBand flip className="absolute bottom-full h-16 w-full text-[#d3e0ed] sm:h-20" />
        <ScallopBand className="absolute bottom-full h-9 w-full text-white sm:h-11" />
        <div className="bg-white px-6 pb-6 sm:px-12 sm:pb-8 lg:px-16">
        <div className="flex items-center justify-between pt-1 pb-5 font-mono text-[10px] font-semibold tracking-[0.25em] text-ink-soft uppercase">
          <span>What we do</span>
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="text-ink-soft transition-colors hover:text-steel"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-4 lg:gap-x-12">
          {capabilities.map((c) => (
            <div key={c.n} className="flex gap-3">
              <span className="font-mono text-xs text-steel">{c.n}</span>
              <div>
                <h2 className="font-display text-base font-semibold sm:text-lg">
                  {c.title}
                </h2>
                <p className="mt-1 hidden text-sm text-ink-soft sm:block">
                  {c.body}
                </p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </footer>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          {state.ok ? (
            <>
              <DialogHeader>
                <DialogTitle>Message sent</DialogTitle>
                <DialogDescription>
                  We&apos;ll get back to you once the coffee (or beer) kicks
                  in.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end">
                <Button onClick={() => setOpen(false)}>Close</Button>
              </div>
            </>
          ) : (
            <form action={formAction}>
              <DialogHeader>
                <DialogTitle>Get In Touch</DialogTitle>
                <DialogDescription>
                  If you want me in the morning, buy me a coffee. If you need
                  me in the evening, buy me a beer.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* honeypot: hidden from real visitors, bots fill every field */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" rows={4} required />
                </div>
                {state.error && (
                  <p className="text-sm text-destructive">{state.error}</p>
                )}
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={pending}>
                  {pending ? "Sending…" : "Send it"}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
