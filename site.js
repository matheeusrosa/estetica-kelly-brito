/* ESTÉTICA KELLY BRITO — config + choreography (core.js does the rest) */
const I = {
  face: '<circle cx="12" cy="9" r="5"/><path d="M5 21c1.5-3.5 4-5 7-5s5.5 1.5 7 5"/><path d="M10 9h.01M14 9h.01M10.5 11.5c.9.6 2.1.6 3 0"/>',
  led: '<rect x="5" y="3" width="14" height="18" rx="7"/><path d="M9 9h.01M15 9h.01M12 3v-1M5 12H3M21 12h-2"/>',
  pen: '<path d="M16 3l5 5-9 9H7v-5z"/><path d="M7 17l-4 4"/>',
  syringe: '<path d="M18 2l4 4M15 5l4 4M17 7L8 16M10 10l4 4M3 21l4-4M6 14l4 4"/>',
  drop: '<path d="M12 2s6 7 6 12a6 6 0 0 1-12 0c0-5 6-12 6-12z"/>',
  lotus: '<path d="M12 20c-4 0-8-3-9-7 3 0 6 1 9 4 3-3 6-4 9-4-1 4-5 7-9 7z"/><path d="M12 17c-2-3-2-8 0-12 2 4 2 9 0 12z"/>',
  sparkle: '<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>',
  wax: '<rect x="5" y="9" width="14" height="11" rx="3"/><path d="M8 9V7a4 4 0 0 1 8 0v2"/>',
  gold: '<path d="M4 17l3-8h10l3 8z"/><path d="M8 13h8"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  nail: '<path d="M8 21v-9a4 4 0 0 1 8 0v9"/><path d="M8 12c1-2 7-2 8 0"/>'
};

const KB_SERVICES = [
  { c: "facial", i: "face", t: "Limpeza de pele", s: "Remove impurezas, controla a oleosidade e deixa a pele limpa, saudável e renovada." },
  { c: "facial", i: "led", t: "Terapia de LED", s: "Luzes que estimulam o colágeno e ajudam no tratamento de acne, manchas e rejuvenescimento." },
  { c: "facial", i: "pen", t: "Microagulhamento", s: "Estimula o colágeno e melhora manchas, cicatrizes, estrias e a textura da pele." },
  { c: "facial", i: "syringe", t: "Botox", s: "Suaviza linhas de expressão e rugas, com um aspecto mais jovem e natural." },
  { c: "facial", i: "drop", t: "Skinbooster", s: "Hidratação profunda que melhora a elasticidade, a firmeza e o viço da pele." },
  { c: "facial", i: "gold", t: "Banho de ouro", s: "Rico em nutrientes e partículas de ouro: luminosidade, hidratação e revitalização." },
  { c: "intima", i: "sparkle", t: "Preenchimento íntimo", s: "Procedimento que promove volume, hidratação e melhora da autoestima íntima." },
  { c: "intima", i: "lotus", t: "Spa íntimo", s: "Tratamento para foliculite, pseudofoliculite, manchas e desidratação íntima." },
  { c: "intima", i: "sparkle", t: "Glow íntimo", s: "Tratamento pós-epilação que acalma, hidrata e uniformiza a pele íntima." },
  { c: "beleza", i: "wax", t: "Epilação com cera", s: "Remoção dos pelos com cera, deixando a pele lisa, macia e sem irritações." },
  { c: "beleza", i: "eye", t: "Sobrancelhas", s: "Design personalizado para realçar o seu olhar com harmonia e naturalidade." },
  { c: "beleza", i: "nail", t: "Nails designer", s: "Manicure, esmaltação em gel, alongamentos e nail art." }
];
const KB_TABS = [{ id: "todos", label: "Todos" }, { id: "facial", label: "Facial" }, { id: "intima", label: "Íntima" }, { id: "beleza", label: "Beleza" }];

window.SITE = {
  brand: "Kelly",
  cityLabel: "Parauapebas",
  whatsapp: "5594981635940",
  timeZone: "America/Belem",
  hours: { 2: [[13, 20.5]], 3: [[13.5, 20.5]], 4: [[13.5, 20.5]], 5: [[13.5, 20.5]], 6: [[9, 17.5]] },
  slots: ["09:00", "10:00", "11:00", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30"],
  slotNote: (dw) => dw === 6 ? "Aos sábados: 09h às 17h30." : "Ter a sex: à tarde e à noite, até 20h30.",
  treatmentLabel: "Serviço",
  treatments: ["Avaliação", ...KB_SERVICES.map(s => s.t)],

  render(core) {
    const tabs = core.$(".tabs"), pill = core.$("#tabPill"), grid = core.$("#svcGrid");
    tabs.insertAdjacentHTML("beforeend", KB_TABS.map((t, i) => `<button type="button" class="tab" role="tab" data-id="${t.id}" aria-selected="${i === 0}">${t.label}</button>`).join(""));
    const svg = (n) => `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
    const draw = (id) => {
      const list = id === "todos" ? KB_SERVICES : KB_SERVICES.filter(s => s.c === id);
      grid.innerHTML = list.map(s => `
        <article class="svc">
          <span class="svc-icon">${svg(s.i)}</span>
          <h3>${s.t}</h3>
          <p>${s.s}</p>
          <button type="button" data-book="${s.t}">Agendar →</button>
        </article>`).join("");
      core.$$(".svc", grid).forEach(c => c.addEventListener("pointermove", (e) => { const r = c.getBoundingClientRect(); c.style.setProperty("--mx", `${e.clientX - r.left}px`); c.style.setProperty("--my", `${e.clientY - r.top}px`); }));
      core.$$("[data-book]", grid).forEach(b => b.addEventListener("click", () => { core.setTreatment(b.dataset.book); core.scrollTo(core.$("#agendar")); }));
      if (window.gsap && !core.reduceMotion) gsap.from(core.$$(".svc", grid), { y: 30, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.05 });
    };
    const place = (b) => { const c = tabs.getBoundingClientRect(), r = b.getBoundingClientRect(); pill.style.width = `${r.width}px`; pill.style.transform = `translateX(${r.left - c.left + tabs.scrollLeft}px)`; };
    const btns = core.$$(".tab", tabs);
    btns.forEach(b => b.addEventListener("click", () => { btns.forEach(x => x.setAttribute("aria-selected", String(x === b))); place(b); draw(b.dataset.id); }));
    draw("todos");
    const sync = () => place(btns.find(b => b.getAttribute("aria-selected") === "true"));
    sync(); addEventListener("resize", sync); document.fonts?.ready.then(sync);
  },

  motion(core) {
    const { $ } = core;
    const words = core.splitWords($(".hero-title"));
    const tl = gsap.timeline({ delay: 0.15 });
    core.intro = tl;
    tl.from(".pill", { y: 16, opacity: 0, duration: 0.7, ease: "power3.out" })
      .from(words, { yPercent: 110, duration: 1.2, ease: "expo.out", stagger: 0.07 }, "-=0.4")
      .from(".arch", { clipPath: "inset(100% 0 0 0 round 999px 999px 26px 26px)", duration: 1.5, ease: "expo.inOut" }, "-=1.1")
      .from(".arch img", { scale: 1.25, duration: 1.8, ease: "expo.out" }, "-=1.2")
      .from(".arch-frame", { opacity: 0, x: -20, y: 20, duration: 1, ease: "power3.out" }, "-=1.2")
      .from(".seal", { scale: 0, rotate: -90, duration: 1, ease: "back.out(1.8)" }, "-=0.8")
      .from(".fade", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }, "-=1.2");

    gsap.to(".arch img", { yPercent: 8, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".arch-frame", { x: 14, y: -14, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

    const mw = core.splitWords($("#manifesto"), "mw");
    gsap.to(core.$$(".mw", $("#manifesto")), { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: { trigger: ".story", start: "top 65%", end: "center 45%", scrub: true } });
    gsap.from(".c2", { y: 80, rotate: 6, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".collage", start: "top 80%" } });
    gsap.from(".review-num", { scale: 0.6, opacity: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: ".review", start: "top 80%" } });
    gsap.fromTo(".footer-script", { xPercent: 10, opacity: 0.3 }, { xPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: ".footer", start: "top bottom", end: "bottom bottom", scrub: true } });
  }
};
