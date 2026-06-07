"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease } },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14 } },
}

const candidates = [
  { name: "Priya Sharma", score: "88%", pass: true },
  { name: "Arjun Mehta",  score: "52%", pass: false },
  { name: "Sanjana Rao",  score: "79%", pass: true },
  { name: "Dev Patil",    score: "61%", pass: false },
  { name: "Kavya Nair",   score: "91%", pass: true },
]

const bars = [
  { label: "0–40",   h: "h-[20%]",  accent: false },
  { label: "40–60",  h: "h-[38%]",  accent: false },
  { label: "60–80",  h: "h-[65%]",  accent: true },
  { label: "80–100", h: "h-[100%]", accent: true },
]

const steps = [
  {
    n: "01",
    title: "Upload your policy PDF",
    desc: "CompliQ chunks the document into contextual segments, preserving clause relationships and cross-references between sections.",
  },
  {
    n: "02",
    title: "AI generates MCQs",
    desc: "Each chunk is passed to AI with role context. Questions target reasoning and application not surface-level keyword recall.",
  },
  {
    n: "03",
    title: "Invite, track, remediate",
    desc: "Send per-org shareable invite links. Track pass rates and individual candidate scores. Spot comprehension gaps before they become risks.",
  },
]

const features = [
  {
    icon: "✦",
    title: "Plausible distractors, not obvious fakes",
    desc: "Naive LLM quiz generation produces wrong answers that are trivially easy to spot. CompliQ's prompt layer engineers distractors that are plausible but definitively incorrect — forcing genuine policy reasoning.",
    tag: "Key differentiator",
    accent: true,
  },
  {
    icon: "▦",
    title: "Multi-tenant by design",
    desc: "Full org isolation across policies, quizzes, and attempts. Per-org invite links with attempt deduplication prevent double submissions.",
    tag: null,
    accent: false,
  },
  {
    icon: "◈",
    title: "No manual test authoring",
    desc: "HR teams currently write policy tests by hand or use generic LMS tools that cannot reason about document content. CompliQ eliminates that — upload once, get a full assessment.",
    tag: null,
    accent: false,
  },
  {
    icon: "◎",
    title: "Real-time HR dashboard",
    desc: "Pass rates, score distributions, and individual candidate attempts visible in real time. Stop relying on completion checkboxes.",
    tag: null,
    accent: false,
  },
]

const options = [
  { letter: "A", text: "5 days — carryover is limited to unused days at year-end",        correct: false },
  { letter: "B", text: "4 days — Q4 requests are subject to a deferred carryover cap",    correct: false },
  { letter: "C", text: "3 days — the policy caps carryover at 25% of annual entitlement", correct: true },
  { letter: "D", text: "None — leave cannot be carried over with any pending requests",    correct: false },
]

export default function Home() {
  const [picked, setPicked] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div
      className="flex flex-col min-h-screen overflow-x-hidden bg-[#f9f8f6] text-[#0f0e0c]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: #d4ead9; }
        .serif { font-family: 'Instrument Serif', serif; }
      `}</style>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-5 md:px-8 py-3.5 bg-[#f9f8f6] border-b border-black/10">
        <span className="serif text-xl tracking-tight">
          Compli<span className="text-[#2d6647]">Q</span>
        </span>

        <div className="hidden md:flex gap-6">
          {["How it works", "Features", "Pricing"].map(l => (
            <a key={l} href="#" className="text-[13px] text-[#4a4843] hover:text-[#0f0e0c] no-underline transition-colors">{l}</a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden md:block text-[13px] font-medium px-4 py-1.5 rounded-lg border border-black/[0.18] bg-transparent hover:bg-black/5 transition-colors cursor-pointer">
            Request access
          </button>
          <button
            className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer border-none bg-transparent"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-[#0f0e0c] transition-all duration-200 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#0f0e0c] transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#0f0e0c] transition-all duration-200 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-5 py-5 bg-white border-b border-black/10">
          {["How it works", "Features", "Pricing"].map(l => (
            <a key={l} href="#" className="text-[14px] text-[#4a4843] no-underline">{l}</a>
          ))}
          <button className="text-[13px] font-medium px-4 py-2 rounded-lg border border-black/[0.18] bg-transparent text-left cursor-pointer">
            Request access
          </button>
        </div>
      )}

      {/* ── HERO ── */}
      <motion.section
        className="max-w-3xl mx-auto w-full px-5 pt-14 pb-10 md:pt-20 md:pb-14 text-center"
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-widest uppercase px-3 py-1 rounded-full bg-[#edf6f0] text-[#2d6647] border border-[#2d6647]/25 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2d6647] inline-block" />
            Policy-aware assessment
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="serif font-normal leading-[1.12] tracking-tight text-[2.1rem] sm:text-5xl md:text-[3.6rem] mb-4"
        >
          Upload policies.<br />
          <em className="text-[#2d6647]">Verify understanding.</em><br />
          Not just completion.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-[15px] md:text-base text-[#4a4843] leading-relaxed max-w-lg mx-auto mb-8 font-light"
        >
          CompliQ chunks your internal policy PDFs, passes contextual segments to AI,
          and generates role-relevant MCQs that test genuine comprehension 
          eliminating manual test authoring entirely.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2.5">
          <button className="text-[14px] font-medium px-6 py-2.5 rounded-lg bg-[#0f0e0c] text-white border-none cursor-pointer hover:bg-[#2a2927] transition-colors">
            Get started
          </button>
          <button className="text-[14px] font-normal px-6 py-2.5 rounded-lg border border-black/[0.18] bg-transparent text-[#0f0e0c] cursor-pointer hover:bg-black/5 transition-colors">
            See how it works
          </button>
        </motion.div>
      </motion.section>

      {/* ── DASHBOARD MOCKUP ── */}
      <motion.div
        className="max-w-5xl mx-auto w-full px-4 md:px-5 mb-14 md:mb-20"
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 1, delay: 0.2, ease }}
      >
        <div className="bg-white border border-black/10 rounded-2xl overflow-hidden">
          {/* topbar */}
          <div className="bg-[#f2f0ec] border-b border-black/10 px-4 py-2.5 flex items-center gap-1.5">
            {[0, 1, 2].map(i => <div key={i} className="w-2.5 h-2.5 rounded-full bg-black/[0.18]" />)}
            <span className="text-[11px] text-[#9a9690] ml-2.5 hidden sm:inline">CompliQ — HR dashboard</span>
          </div>

          {/* stats */}
          <div className="p-3 md:p-4 grid grid-cols-3 gap-2 md:gap-2.5">
            {[
              { label: "Avg. score",   val: "74%", sub: "↑ 6% this month"  },
              { label: "Quizzes sent", val: "312", sub: "4 policies"        },
              { label: "Pass rate",    val: "68%", sub: "threshold: 65%"   },
            ].map(s => (
              <div key={s.label} className="bg-[#f2f0ec] rounded-xl p-2.5 md:p-4">
                <div className="text-[9px] md:text-[11px] text-[#9a9690] tracking-widest uppercase mb-1 truncate">{s.label}</div>
                <div className="serif text-xl md:text-3xl text-[#0f0e0c]">{s.val}</div>
                <div className="text-[9px] md:text-[11px] text-[#2d6647] font-medium mt-0.5 hidden sm:block">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* candidates + bar chart */}
          <div className="px-3 md:px-4 pb-3 md:pb-4 grid grid-cols-1 sm:grid-cols-[1.6fr_1fr] gap-2 md:gap-2.5">
            <div className="bg-[#f2f0ec] rounded-xl p-3 md:p-4">
              <div className="text-[12px] font-medium mb-2.5">Recent attempts</div>
              {candidates.map(c => (
                <div key={c.name} className="flex justify-between items-center py-1.5 border-b border-black/10 last:border-0 text-[12px]">
                  <span className="text-[#4a4843]">{c.name}</span>
                  <span className={`text-[10px] md:text-[11px] font-medium px-2 md:px-2.5 py-0.5 rounded-full whitespace-nowrap ${c.pass ? "bg-[#edf6f0] text-[#2d6647]" : "bg-[#fff0f0] text-[#8b1c1c]"}`}>
                    {c.score} · {c.pass ? "Pass" : "Fail"}
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-[#f2f0ec] rounded-xl p-3 md:p-4 relative ">
              <div className="text-[12px] font-medium mb-2.5 ">Score distribution</div>
              <div className="flex items-end gap-1.5 h-40 md:absolute bottom-0 w-full md:w-84">
                {bars.map(b => (
                  <div key={b.label} className="flex flex-col items-center flex-1 h-full">
                    <div className={`w-full mt-auto rounded-t-sm ${b.h} ${b.accent ? "bg-[#2d6647]" : "bg-black/[0.18]"}`} />
                    <div className="text-[8px] md:text-[10px] text-[#9a9690] mt-1 whitespace-nowrap">{b.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── REPLACE CHECKBOX ── */}
      <motion.div
        className="max-w-2xl mx-auto px-5 pb-10 md:pb-14 text-center"
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} className="serif font-normal leading-tight tracking-tight text-[1.8rem] sm:text-4xl md:text-5xl mb-3">
          Replace checkbox compliance with real insight
        </motion.h2>
        <motion.p variants={fadeUp} className="text-[15px] text-[#4a4843] leading-relaxed font-light">
          Generic LMS tools track clicks, not comprehension. CompliQ reasons over your
          actual document content. so you know who understands your policies and who doesn't.
        </motion.p>
      </motion.div>

      {/* ── HOW IT WORKS ── */}
      <motion.div
        className="max-w-5xl mx-auto w-full px-4 md:px-5 pb-14 md:pb-16 grid grid-cols-1 sm:grid-cols-3 gap-3"
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        {steps.map(s => (
          <motion.div key={s.n} variants={fadeUp} className="bg-white border border-black/10 rounded-xl p-5">
            <div className="serif text-xl text-black/20 italic mb-3">{s.n}</div>
            <div className="text-[14px] font-medium text-[#0f0e0c] mb-1.5">{s.title}</div>
            <div className="text-[13px] text-[#4a4843] leading-relaxed font-light">{s.desc}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── WHAT MAKES COMPLIQ DIFFERENT ── */}
      <motion.div
        className="max-w-2xl mx-auto px-5 pb-6 md:pb-8 text-center"
        initial="hidden" whileInView="visible" viewport={{ once: true }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} className="serif font-normal leading-tight tracking-tight text-[1.8rem] sm:text-4xl md:text-5xl">
          What makes CompliQ different
        </motion.h2>
      </motion.div>

      <motion.div
        className="max-w-5xl mx-auto w-full px-4 md:px-5 pb-16 md:pb-20 grid grid-cols-1 sm:grid-cols-2 gap-3"
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
      >
        {features.map(f => (
          <motion.div
            key={f.title}
            variants={fadeUp}
            className={`bg-white rounded-xl p-5 ${f.accent ? "border-[1.5px] border-[#2d6647]" : "border border-black/10"}`}
          >
            <div className="text-lg text-[#2d6647] mb-3">{f.icon}</div>
            <div className="text-[14px] font-medium text-[#0f0e0c] mb-1.5">{f.title}</div>
            <div className="text-[13px] text-[#4a4843] leading-relaxed font-light">{f.desc}</div>
            {f.tag && (
              <span className="inline-block mt-2.5 text-[10px] font-medium px-2 py-0.5 rounded bg-[#fef3d6] text-[#7a4f00] border border-[#7a4f00]/20 tracking-wide">
                {f.tag}
              </span>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* ── MCQ DEMO ── */}
      <motion.div
        className="max-w-2xl mx-auto px-5 pb-6 md:pb-8 text-center"
        initial="hidden" whileInView="visible" viewport={{ once: true }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} className="serif font-normal leading-tight tracking-tight text-[1.8rem] sm:text-4xl md:text-5xl mb-2.5">
          What a good question looks like
        </motion.h2>
        <motion.p variants={fadeUp} className="text-[14px] text-[#4a4843] leading-relaxed font-light">
          Generated from a leave policy. Each wrong answer is plausible enough to catch someone who skimmed — not just guessed.
        </motion.p>
      </motion.div>

      <motion.div
        className="max-w-xl mx-auto w-full px-4 md:px-5 pb-16 md:pb-20"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8, ease }}
      >
        <div className="bg-white border border-black/10 rounded-xl p-5">
          <div className="text-[10px] font-medium text-[#9a9690] tracking-widest uppercase mb-3">
            Auto-generated · Leave &amp; Absence Policy v3.2 · Section 4
          </div>
          <div className="text-[13px] md:text-[14px] font-medium text-[#0f0e0c] leading-relaxed mb-4">
            An employee has used 8 of their 12 annual leave days and requests 5 more in Q4.
            Under the carryover provisions, what is the maximum leave they can carry into the next year?
          </div>

          <div className="flex flex-col gap-2">
            {options.map((o, i) => {
              const chosen = picked === i
              const revealed = picked !== null
              const isCorrect = o.correct
              const state =
                chosen && isCorrect    ? "correct"
                : chosen && !isCorrect ? "wrong"
                : revealed && isCorrect ? "reveal"
                : "idle"

              const cls =
                state === "correct" || state === "reveal"
                  ? "border-[#2d6647] bg-[#edf6f0] text-[#2d6647]"
                  : state === "wrong"
                  ? "border-[#8b1c1c] bg-[#fff0f0] text-[#8b1c1c]"
                  : "border-black/10 text-[#4a4843] hover:border-black/20 hover:bg-black/[0.02]"

              return (
                <div
                  key={o.letter}
                  onClick={() => picked === null && setPicked(i)}
                  className={`flex items-start gap-2.5 px-3 py-2.5 rounded-lg border text-[13px] transition-all duration-150 ${cls} ${picked === null ? "cursor-pointer" : "cursor-default"}`}
                >
                  <span className="min-w-[18px] h-[18px] rounded-full border border-current flex items-center justify-center text-[10px] font-medium flex-shrink-0 mt-0.5">
                    {o.letter}
                  </span>
                  {o.text}
                </div>
              )
            })}
          </div>

          {picked !== null && (
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-3.5 px-3.5 py-2.5 bg-[#fef3d6] border border-[#7a4f00]/20 rounded-lg text-[12px] text-[#7a4f00] leading-relaxed"
            >
              Options A and D sound like plausible policy clauses. Option B invents a convincing
              "Q4 deferred cap" rule that doesn't exist. Only someone who read Section 4 carefully would pick C.
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* ── CTA ── */}
      <motion.section
        className="max-w-lg mx-auto w-full px-5 pb-16 md:pb-20 text-center"
        initial="hidden" whileInView="visible" viewport={{ once: true }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} className="serif font-normal leading-tight tracking-tight text-[1.7rem] sm:text-4xl md:text-[2.4rem] mb-3">
          From policy PDF to assessment in minutes.
        </motion.h2>
        <motion.p variants={fadeUp} className="text-[14px] text-[#4a4843] leading-relaxed font-light mb-6">
          No manual test authoring. No generic question banks. CompliQ generates MCQs with
          plausible distractors — wrong answers convincing enough to catch anyone who skimmed,
          not just guessed.
        </motion.p>
        <motion.div variants={fadeUp}>
          <button className="text-[14px] font-medium px-7 py-3 rounded-lg bg-[#0f0e0c] text-white border-none cursor-pointer hover:bg-[#2a2927] transition-colors">
            Start now
          </button>
        </motion.div>
      </motion.section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-black/10 px-5 md:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 bg-white">
        <span className="serif text-base">CompliQ</span>
        <span className="text-[11px] text-[#9a9690] text-center">Next.js · PostgreSQL ·  AI API · Resend · Docker</span>
      </footer>

    </div>
  )
}