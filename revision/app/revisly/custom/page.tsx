import React from 'react';

const CustomPageInfo = () => {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      <div className="max-w-3xl  mx-20  py-20 max-md:mx-7">
        
        {/* Header */}
        <header className="mb-24">
          <div className="w-12 h-1 bg-zinc-900 mb-8"></div>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-900 mb-6">
            Custom PDF Upload
          </h1>
          <p className="text-xl text-zinc-500 font-light leading-relaxed">
            A transparency report on the mechanics, timeline, and engineering challenges behind building custom PDF upload and adding two months limit
          </p>
        </header>

        <div className="space-y-20">
          
          {/* Section 1: The Process */}
          <section>
            <h2 className="text-sm font-medium tracking-widest text-zinc-400 uppercase mb-8">01 — The Process</h2>
            <div className="grid gap-8">
              <div className="group">
                <h3 className="text-xl font-medium mb-2 group-hover:text-zinc-600 transition-colors">Component Architecture</h3>
                <p className="text-zinc-500 leading-relaxed">
                  We move beyond templates. Every page is constructed as a unique set of React components, encapsulating specific business logic and state requirements that standard libraries cannot address.
                </p>
              </div>
              <div className="group">
                <h3 className="text-xl font-medium mb-2 group-hover:text-zinc-600 transition-colors">Tailwind Utility Composition</h3>
                <p className="text-zinc-500 leading-relaxed">
                  Styling is applied directly via utility classes. This avoids style sheets growing out of control but requires precise structural planning to maintain consistency across the design system.
                </p>
              </div>
            </div>
          </section>

          <div className="h-px w-full bg-zinc-200"></div>

          {/* Section 2: Timeline Factors */}
          <section>
            <h2 className="text-sm font-medium tracking-widest text-zinc-400 uppercase mb-8">02 — Challenges</h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
              <div>
                <span className="block text-zinc-300 text-4xl font-light mb-4">25%</span>
                <h4 className="font-medium mb-2">UX & Design Systems</h4>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  Translating abstract requirements into concrete pixel-perfect layouts requires significant upfront architectural decisions.
                </p>
              </div>
              <div>
                <span className="block text-zinc-300 text-4xl font-light mb-4">40%</span>
                <h4 className="font-medium mb-2">Money Problem</h4>
                <p className="text-sm text-zinc-500 leading-relaxed">
                 Uploading custom PDFs with a two-month time limit requires significant server resources and storage costs
                  
                </p>
              </div>
              <div>
                <span className="block text-zinc-300 text-4xl font-light mb-4">35%</span>
                <h4 className="font-medium mb-2">Payment</h4>
                <p className="text-sm text-zinc-500 leading-relaxed">
                   We’re thinking about offering custom features that you can access for a fee.
                </p>
              </div>
            </div>
          </section>

          <div className="h-px w-full bg-zinc-200"></div>

          {/* Section 3: Technical Constraints */}
          <section>
            <h2 className="text-sm font-medium tracking-widest text-zinc-400 uppercase mb-8">03 — Engineering Constraints</h2>
            <div className="bg-white border border-zinc-200 rounded-2xl p-8">
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <span className="text-zinc-300 font-mono text-sm mt-1">01</span>
                  <div>
                    <strong className="block text-zinc-900 font-medium mb-1">State Complexity</strong>
                    <p className="text-zinc-500 text-sm leading-relaxed">As features grow, managing data flow between components (props/context) becomes exponentially more complex than static pages.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="text-zinc-300 font-mono text-sm mt-1">02</span>
                  <div>
                    <strong className="block text-zinc-900 font-medium mb-1">Bundle Size & Performance</strong>
                    <p className="text-zinc-500 text-sm leading-relaxed">Custom logic adds weight. Optimizing React re-renders and purging unused Tailwind styles is critical to keep the site fast.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="text-zinc-300 font-mono text-sm mt-1">03</span>
                  <div>
                    <strong className="block text-zinc-900 font-medium mb-1">Maintenance Overhead</strong>
                    <p className="text-zinc-500 text-sm leading-relaxed">Unlike off-the-shelf themes, custom code requires developer knowledge to update, debug, or extend in the future.</p>
                  </div>
                </li>
               
              </ul>
            </div>
          </section>

        </div>

        <footer className="mt-24 text-zinc-400 text-sm">
           <p>© 2025 Revisly Team. Built with Next & Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
};

export default CustomPageInfo;
