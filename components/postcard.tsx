'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Mark } from './mark';

export type PostcardProps = {
  domain: string;
  message: ReactNode;
  email: string;
  tagline: string;
};

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const face =
  'absolute inset-0 flex flex-col overflow-hidden rounded-[4px] p-[clamp(18px,4%,34px)] text-paper backface-hidden shadow-[0_30px_60px_-30px_rgba(0,0,0,.8)]';

export function Postcard({ domain, message, email, tagline, revealed }: PostcardProps & { revealed: boolean }) {
  const [flipped, setFlipped] = useState(false);
  const [idleHint, setIdleHint] = useState('click to flip');

  const frontRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingTextRef = useRef<HTMLSpanElement>(null);
  const addrRef = useRef<HTMLSpanElement>(null);
  const mailRef = useRef<HTMLAnchorElement>(null);

  /* Scale the domain and the email so they fill their space on the card. */
  useEffect(() => {
    const front = frontRef.current!;
    const heading = headingRef.current!;
    const headingText = headingTextRef.current!;
    const addr = addrRef.current!;
    const mail = mailRef.current!;

    function fit() {
      const cs = getComputedStyle(front);
      const avail = front.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      if (avail > 0) {
        heading.style.fontSize = '100px';
        const w = headingText.getBoundingClientRect().width;
        if (w > 0) heading.style.fontSize = `${(100 * avail) / w}px`;
      }
      const aw = addr.clientWidth;
      if (aw > 0) {
        mail.style.fontSize = '100px';
        const mw = mail.getBoundingClientRect().width;
        if (mw > 0) mail.style.fontSize = `${((100 * aw) / mw) * 0.995}px`;
      }
    }

    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(front);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (matchMedia('(hover: none)').matches) setIdleHint('tap to flip');
  }, []);

  return (
    <main className="grid h-full place-items-center pt-[env(safe-area-inset-top)] pr-[max(16px,env(safe-area-inset-right))] pb-[env(safe-area-inset-bottom)] pl-[max(16px,env(safe-area-inset-left))] perspective-[1800px]">
      <motion.div
        className="stage flex w-[min(88vw,680px)] flex-col items-center gap-[18px]"
        initial={{ opacity: 0, y: 40, rotate: -4 }}
        animate={revealed ? { opacity: 1, y: 0, rotate: 0 } : undefined}
        transition={{ default: { duration: 1.4, ease: easeOutExpo }, opacity: { duration: 1, ease: [0.2, 0.7, 0.2, 1] } }}
      >
        <button
          type="button"
          className="postcard block aspect-[3/2] w-full max-w-full cursor-pointer perspective-[2000px] [-webkit-tap-highlight-color:transparent] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-fg"
          aria-pressed={flipped}
          aria-label="Postcard from lysbth, flip it over"
          onClick={(e) => {
            if ((e.target as Element).closest('a')) return;
            setFlipped((f) => !f);
          }}
        >
          <motion.span
            className="relative block size-full transform-3d"
            initial={false}
            animate={flipped ? { rotate: 1.5, rotateY: 180 } : { rotate: -2, rotateY: 0 }}
            transition={{ duration: 1.1, ease: easeOutExpo }}
          >
            {/* front */}
            <span ref={frontRef} className={`${face} justify-between bg-brick`}>
              <h1 ref={headingRef} className="m-0 font-px text-[64px] leading-[.95] font-normal tracking-[-.04em] whitespace-nowrap">
                <span ref={headingTextRef} className="inline-block">
                  {domain}
                </span>
              </h1>
              <span className="flex items-end justify-between gap-4">
                <p className="m-0 max-w-[26ch] font-px text-[clamp(14px,2.3vw,22px)] leading-[1.2] font-medium tracking-[-.015em] text-balance">
                  {message}
                </p>
                <Mark className="h-auto w-[clamp(26px,6%,42px)] flex-none" />
              </span>
            </span>

            {/* back */}
            <span className={`${face} grid! grid-cols-[1fr_1px_.82fr] gap-[clamp(14px,3.5%,30px)] bg-cobalt rotate-y-180`}>
              <span className="flex min-w-0 flex-col justify-between">
                <h2 className="m-0 font-px text-[clamp(22px,4.6vw,48px)] leading-[1.05] font-normal tracking-[-.03em]">
                  Let&rsquo;s connect
                </h2>
                <span className="font-px text-[clamp(12px,1.7vw,16px)] leading-[1.2] font-medium opacity-80">{tagline}</span>
              </span>
              <span className="bg-paper/45" />
              <span ref={addrRef} className="flex min-w-0 flex-col justify-between">
                <span className="grid aspect-[5/6] w-[clamp(42px,30%,78px)] place-items-center self-end border-[1.5px] border-dashed border-paper/75 p-1.5">
                  <Mark className="h-auto w-[70%]" />
                </span>
                <span className="flex flex-col gap-[clamp(14px,3vw,26px)]">
                  <a
                    ref={mailRef}
                    href={`mailto:${email}`}
                    className="self-start border-b border-paper/50 pb-0.5 font-px text-[clamp(14px,2.3vw,22px)] leading-[1.15] font-semibold tracking-[-.015em] whitespace-nowrap text-paper no-underline select-all hover:border-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
                  >
                    {email}
                  </a>
                  <i className="block border-t border-paper/45" />
                  <i className="block border-t border-paper/45" />
                </span>
              </span>
            </span>
          </motion.span>
        </button>
        <span className="font-sans text-[clamp(9px,1.2vw,11px)] leading-[1.2] font-medium tracking-[.08em] text-muted uppercase opacity-80">
          {flipped ? 'flip back' : idleHint}
        </span>
      </motion.div>
    </main>
  );
}
