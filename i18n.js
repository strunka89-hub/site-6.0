/**
 * RU ↔ EN: русский остаётся в HTML, английские строки — ниже.
 * Ключи в data-i18n="..."
 */
(function () {
  "use strict";

  var STORAGE = "site-lang";

  var EN = {
    "meta.title": "Daryana Ushakova — prompt engineer, AI for business",
    "meta.desc":
      "Daryana Ushakova — prompt engineer and web developer. AI for business, ChatGPT content, AI assistants, sites and calculators. Calm and tailored to your task.",

    "nav.tasks": "Tasks",
    "nav.services": "Services",
    "nav.process": "How I work",
    "nav.calculator": "Calculator",
    "nav.about": "About",

    "lang.ariaToEn": "Switch interface to English",
    "lang.ariaToRu": "Переключить интерфейс на русский",

    "hero.kicker": "Prompt engineer · web developer",
    "hero.title":
      "I bring AI into business, content and your site — clearly, calmly, around your goal",
    "hero.lead":
      "I help experts and businesses build a clear system: content with ChatGPT or other AI, AI assistants, sites, calculators and digital solutions without overload or needless complexity.",
    "hero.sig": "Daryana Ushakova — prompt engineer and web developer",
    "hero.cta1": "Discuss a task",
    "hero.cta2": "Estimate cost →",

    "main.title": "Not just neural networks — a working system for your business",
    "main.p1":
      "I don’t “do AI for AI’s sake”. I help you use AI so it really simplifies work, saves time and helps you communicate value to clients more clearly.",
    "main.p2":
      "If you’ve already tried ChatGPT, bots or a site but it felt raw, awkward or didn’t deliver — it can be rebuilt differently.",
    "main.accent": "Calmly. Step by step. Around your task.",

    "audience.title": "Who I’m a good fit for",
    "audience.intro": "Experts, specialists and small businesses who want to:",
    "audience.li1": "adopt AI without overload",
    "audience.li2": "use ChatGPT and prompts with real benefit",
    "audience.li3": "simplify content and copy",
    "audience.li4": "build an AI assistant for real tasks",
    "audience.li5": "create a clear service-focused site",
    "audience.li6": "build a clearer system in work and messaging",
    "audience.outro":
      "If you need a practical tool, not hype around AI — we’re probably a match.",

    "results.title": "What changes after we work together",
    "results.intro": "After working with me, people usually find it:",
    "results.li1": "clearer how to use AI in your specific case",
    "results.li2": "easier to work with content, copy and presentation",
    "results.li3": "easier to explain your services",
    "results.li4": "smoother to lead a client to a lead",
    "results.li5": "calmer in day-to-day work",
    "results.li6": "fewer manual steps where the process can be simplified",
    "results.outro":
      "I don’t promise a magic button — but I can help build a solution that’s useful for you.",

    "process.title": "How the work goes",
    "process.s1t": "You message me",
    "process.s1p": "You briefly say what you need help with now.",
    "process.s2t": "We unpack the task",
    "process.s2p": "We see what’s really needed and what doesn’t need to be overcomplicated.",
    "process.s3t": "I propose an approach",
    "process.s3p": "I explain which format fits better and why.",
    "process.s4t": "I do the work",
    "process.s4p": "Structure, copy, site, assistant logic or a tool.",
    "process.s5t": "I show how to use it",
    "process.s5p": "So the result doesn’t sit “somewhere aside” but works in your real workflow.",

    "approach.title": "How I work",
    "approach.p1": "I don’t use the same templates for everyone.",
    "approach.p2": "First I look at:",
    "approach.li1": "your task",
    "approach.li2": "your product",
    "approach.li3": "your audience",
    "approach.li4": "how you work today",
    "approach.p3": "Only then I assemble the solution.",
    "approach.p4":
      "I care not just about making something “techy” — but that it’s clear, useful and usable in your real work.",

    "about.title": "About me",
    "about.p1": "My name is Daryana Ushakova. I’m a prompt engineer and web developer.",
    "about.p2":
      "I work at the intersection of structure, copy, logic and digital tools. I help experts and businesses adopt AI calmly, clearly and without needless complexity.",
    "about.p3":
      "I like approaches where everything can be explained in plain language, assembled into a system and used in life — not just for show.",
    "about.tg": "Telegram: @UshakovaDariana",
    "about.vk": "VK: ushakova_ai",

    "requests.title": "What people come to me with",
    "card1.t": "Business prompts and ChatGPT content",
    "card1.x":
      "When it’s unclear what to write, how to structure content, how to get solid copy with AI and stop spending hours on it.",
    "card1.h": "Less time, simpler content",
    "card2.t": "AI assistants and task automation",
    "card2.x":
      "When there’s a lot of repetition, manual replies, similar scenarios — and you want to simplify part of the process.",
    "card2.h": "Less routine in repeating workflows",
    "card3.t": "A site for an expert or business",
    "card3.x":
      "When you need to present a service clearly, structure the site, build trust and make the path to a lead simpler.",
    "card3.h": "Clearer offer and path to contact",
    "card4.t": "Calculators, quizzes and mini tools",
    "card4.x":
      "When you need engagement, easier estimates, more interest on the site and stronger presentation.",
    "card4.h": "More engagement on the site",
    "card5.t": "Slides, PDFs, guides and packaging",
    "card5.x":
      "When you have knowledge and experience but need it in a clear, neat, working format.",
    "card5.h": "Knowledge in a neat, working format",

    "services.title": "Services",
    "svc1.t": "AI system for content and copy",
    "svc1.p":
      "I help build a content system where you don’t reinvent what to write every time. I unpack the task, product and audience, structure prompts for your business and show how to use ChatGPT without random output.",
    "svc1.suit": "Fit if:",
    "svc1.suit1": "you’re an expert tired of squeezing content out of yourself",
    "svc1.suit2": "posts are irregular",
    "svc1.suit3": "copy takes too much time",
    "svc1.suit4": "you tried AI but don’t like the result",
    "svc1.res": "Result:",
    "svc1.resT": "time saved, clearer content, a system instead of endless tries.",
    "svc1.hint": "Helps save time and simplify the process",

    "svc2.t": "AI assistant for business",
    "svc2.p":
      "I build an assistant around real processes: client replies, scenario logic, repeated tasks, internal help.",
    "svc2.suit": "Fit if:",
    "svc2.suit1": "many similar actions",
    "svc2.suit2": "part of the work is always manual",
    "svc2.suit3": "you want simpler communication",
    "svc2.suit4": "you need a useful tool, not “a bot for the sake of a bot”",
    "svc2.res": "Result:",
    "svc2.resT": "less routine, faster replies, smoother processes.",
    "svc2.hint": "Helps save time and simplify the process",

    "svc3.t": "Site for expert or business",
    "svc3.p":
      "Clear service sites: structure, copy, HTML, mobile adaptation, forms, client journey logic.",
    "svc3.suit": "Fit if:",
    "svc3.suit1": "no site yet",
    "svc3.suit2": "there’s a site but it doesn’t explain the value",
    "svc3.suit3": "it’s hard to see why to contact you",
    "svc3.suit4": "you want more clarity and trust",
    "svc3.res": "Result:",
    "svc3.resT": "clearer pitch, better first impression, easier path to a lead.",
    "svc3.hint": "Helps save time and simplify the process",

    "svc4.t": "Calculators and mini services",
    "svc4.p":
      "Interactive tools for the site: calculators, quizzes, mini services so clients don’t only read — they interact.",
    "svc4.suit": "Fit if:",
    "svc4.suit1": "you want to stand out among similar sites",
    "svc4.suit2": "you need engagement",
    "svc4.suit3": "you want to simplify the client’s choice",
    "svc4.suit4": "you want to show a serious approach",
    "svc4.res": "Result:",
    "svc4.resT": "more interest, higher engagement, stronger sense of service.",
    "svc4.hint": "Helps save time and simplify the process",

    "svc5.t": "Slides and packaging",
    "svc5.p":
      "I structure your knowledge: decks, PDFs, guides, client materials, service packaging.",
    "svc5.suit": "Fit if:",
    "svc5.suit1": "the material exists but isn’t designed",
    "svc5.suit2": "you want expertise presented clearly and neatly",
    "svc5.suit3": "you need knowledge turned into a working format",
    "svc5.res": "Result:",
    "svc5.resT": "material looks cohesive, value is clearer, presentation is stronger.",
    "svc5.hint": "Helps save time and simplify the process",

    "doubts.title": "Common worries before the first chat",
    "faq1.q": "I’m not good with AI",
    "faq1.a": "That’s fine. I explain in plain language without drowning you in technical detail.",
    "faq2.q": "I’m afraid it’ll be too complex",
    "faq2.a": "My job is to simplify and build clear logic.",
    "faq3.q": "I’m not sure it’s for me",
    "faq3.a": "That’s why we clarify the request first and only then pick a format.",
    "faq4.q": "I’ve had a bad experience before",
    "faq4.a":
      "It happens. Often the issue isn’t the tool itself but how it was designed and embedded in the workflow.",

    "reviews.title": "Testimonials",
    "reviews.intro":
      "Drag the top card left or tap “Next” — testimonials rotate like a deck.",
    "rev1": "I kept putting off content because I didn’t know what to write. After working with Daryana I got structure, ChatGPT became easier to use, and I stopped feeling I had to pull every line out of myself. Much clearer now, fewer wasted moves.",
    "rev1a": "Content expert",
    "rev2":
      "We hesitated about an AI assistant — we didn’t want a checkbox solution. In the end everything was tied to real tasks and it actually took work off our plate. Easier replies to clients, less time on repetitive actions.",
    "rev2a": "Service team",
    "rev3":
      "I had a site but it didn’t explain how I help. Daryana rebuilt structure and copy so people understand my service faster. The site looks neater, clearer and more confident.",
    "rev3a": "Private practice",
    "reviews.next": "Next testimonial",

    "pricing.title": "Format and pricing",
    "pricing.lead":
      "I work online. We can start with a diagnostic call to unpack the task calmly and choose the best format. Below are ranges by direction; exact cost depends on scope and timeline.",
    "price1.n": "Content and copy",
    "price1.d": "Prompt system, content structure, ChatGPT tailored to your business.",
    "price1.f1": "Task and audience review",
    "price1.f2": "Prompts for your scenarios",
    "price1.f3": "How to use AI in practice",
    "price1.btn": "Discuss",
    "price2.badge": "Often chosen",
    "price2.n": "AI assistant",
    "price2.d": "Reply logic, scenarios, less routine in communication.",
    "price2.f1": "Tied to real processes",
    "price2.f2": "Scenarios and structure",
    "price2.f3": "Fewer repetitive actions",
    "price2.btn": "Message on Telegram",
    "price3.n": "Site and interactive",
    "price3.d": "Service site, calculators and mini tools for engagement.",
    "price3.note": "Calculators and complex tools: up to 60,000 ₽",
    "price3.f1": "Structure and copy",
    "price3.f2": "Responsive layout",
    "price3.f3": "Interactivity as needed",
    "price3.btn": "Cost calculator",
    "pricing.note":
      "Slides and packaging: 20,000 — 40,000 ₽. Unsure about the format — we can start with a no-strings review.",

    "calc.title": "Estimate a rough cost",
    "calc.intro":
      "Pick the task type and get a range. Final price depends on scope, timeline and depth.",
    "calc.l1": "What you need",
    "calc.o1": "content and copy",
    "calc.o2": "AI assistant",
    "calc.o3": "site",
    "calc.o4": "calculator / mini tool",
    "calc.o5": "slides / packaging",
    "calc.l2": "Where you are now",
    "calc.s1": "just an idea",
    "calc.s2": "need structure",
    "calc.s3": "need implementation",
    "calc.s4": "need to improve what exists",
    "calc.l3": "Second language needed",
    "calc.yes": "yes",
    "calc.no": "no",
    "calc.l4": "Urgency",
    "calc.u1": "no rush",
    "calc.u2": "soon",
    "calc.u3": "urgent",
    "calc.submit": "Calculate cost →",
    "calc.resultLabel": "Approximate range",
    "calc.resultFrom": "from",
    "calc.resultTo": "to",

    "contact.title": "Want to unpack your task calmly — message me",
    "contact.p":
      "No pressure, no heavy talk. We’ll see what you actually need and pick a format that fits you.",
    "contact.a1": "Write on Telegram",
    "contact.a2": "Discuss the project",

    "footer.copy": "© Daryana Ushakova · prompt engineer and web developer",
    "footer.tg": "Telegram",
    "footer.vk": "VK"
  };

  var ruTitle = "";
  var ruMeta = "";

  function getLang() {
    return localStorage.getItem(STORAGE) || "ru";
  }

  function updateMeta(lang) {
    var t = document.querySelector("title");
    var m = document.querySelector('meta[name="description"]');
    if (!t || !m) return;
    if (lang === "en") {
      t.textContent = EN["meta.title"];
      m.setAttribute("content", EN["meta.desc"]);
    } else {
      t.textContent = ruTitle;
      m.setAttribute("content", ruMeta);
    }
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE, lang);
    document.documentElement.lang = lang === "en" ? "en" : "ru";
    apply(lang);
    updateMeta(lang);
    document.dispatchEvent(new CustomEvent("site-lang-change", { detail: { lang: lang } }));
    updateToggle(lang);
  }

  function updateToggle(lang) {
    var btn = document.getElementById("lang-toggle");
    if (!btn) return;
    if (lang === "ru") {
      btn.textContent = "EN";
      btn.setAttribute("aria-label", EN["lang.ariaToEn"]);
    } else {
      btn.textContent = "RU";
      btn.setAttribute("aria-label", EN["lang.ariaToRu"]);
    }
  }

  function apply(lang) {
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var key = el.getAttribute("data-i18n");
      if (!key) continue;
      if (!el.getAttribute("data-i18n-ru")) {
        el.setAttribute("data-i18n-ru", el.innerHTML);
      }
      if (lang === "en") {
        if (EN[key]) {
          el.innerHTML = EN[key];
        }
      } else {
        el.innerHTML = el.getAttribute("data-i18n-ru");
      }
    }
  }

  function init() {
    ruTitle = document.querySelector("title").textContent;
    var md = document.querySelector('meta[name="description"]');
    ruMeta = md ? md.getAttribute("content") || "" : "";

    var initial = getLang();
    document.documentElement.lang = initial === "en" ? "en" : "ru";
    if (initial === "en") {
      apply("en");
      updateMeta("en");
    }
    updateToggle(initial);

    var btn = document.getElementById("lang-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        var next = getLang() === "ru" ? "en" : "ru";
        setLang(next);
      });
    }
  }

  window.getSiteLang = getLang;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
