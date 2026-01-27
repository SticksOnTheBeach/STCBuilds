import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";


// 1. On importe nos composants depuis leurs fichiers respectifs
import { Navbar } from "../components/navbar";
import { Skills } from "../components/skills";
import { Contact } from "../components/contact";
import { Footer } from "../components/footer";
import { Projects } from "../components/projects";
import { Timeline } from "~/components/timeline";
import { AnimatedTerminal } from "../components/animated-terminal";
// 1. Définition du bouton
export const ContactBTN = component$(() => {
    return (
        <a
            href="#contact"
            class="bg-blue-600 hover:bg-blue-900 transition-colors rounded-lg px-6 py-3 text-white font-medium shadow-lg inline-block"
        >
            Me contacter
        </a>
    );
});

export const EchapBTN = component$(() => {
    return (
        <button
            class="bg-amber-200 hover:bg-black transition-colors rounded-lg px-6 py-3 text-white font-medium shadow-lg">
            Se connecter
        </button>
    );
});



export const Statistiques = component$(() => {
    const projets = useSignal(0);
    const clients = useSignal(0);

    useVisibleTask$(() => {
        const interval = setInterval(() => {
            if (projets.value < 15) projets.value++;
            if (clients.value < 10) clients.value++;
            if (projets.value >= 15 && clients.value >= 10) clearInterval(interval);
        }, 100);
    });

    return (
        <div class="max-w-4xl mx-auto px-4 my-20">
            <div class="grid grid-cols-2 gap-8 bg-blue-600 p-10 rounded-3xl text-white shadow-2xl">
                <div class="text-center border-r border-blue-400">
                    <div class="text-5xl font-black mb-2">{projets.value}+</div>
                    <div class="uppercase tracking-widest text-xs opacity-80">Projets Terminés</div>
                </div>
                <div class="text-center">
                    <div class="text-5xl font-black mb-2">{clients.value}+</div>
                    <div class="uppercase tracking-widest text-xs opacity-80">Clients Heureux</div>
                </div>
            </div>
        </div>
    );
});


// 2. Ta page qui utilise le bouton
export default component$(() => {
  return (
    /* 1. Un seul parent avec 'relative' et 'overflow-hidden' pour contenir les lumières */
    <div class="relative min-h-screen overflow-hidden bg-slate-900 pt-20 transition-colors duration-500">

      {/* 2. Les lumières sont placées ICI, en début de div */}
      <div class="pointer-events-none absolute inset-0 z-0 h-full w-full">
        {/* Lumière Violette */}
        <div class="animate-blob absolute top-0 -left-4 h-72 w-72 rounded-full bg-purple-500 opacity-70 mix-blend-multiply filter blur-[128px] dark:opacity-40"></div>
        {/* Lumière Bleue */}
        <div class="animate-blob animation-delay-2000 absolute top-0 -right-4 h-72 w-72 rounded-full bg-blue-500 opacity-70 mix-blend-multiply filter blur-[128px] dark:opacity-40"></div>
        {/* Lumière Rose */}
        <div class="animate-blob animation-delay-4000 absolute -bottom-8 left-20 h-72 w-72 rounded-full bg-pink-500 opacity-70 mix-blend-multiply filter blur-[128px] dark:opacity-40"></div>
      </div>

      {/* 3. On ajoute 'relative z-10' sur le contenu pour qu'il soit AU-DESSUS des lumières */}
      <div class="relative z-10">
        <Navbar />

        <main class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-6 py-12 lg:flex-row lg:py-24">
          <div class="flex-1 text-center lg:text-left">
            <h1 class="mb-4 text-5xl font-extrabold leading-tight text-white lg:text-7xl">
              Salut, je m'appelle <span class="text-blue-600">Maël</span> 👋
            </h1>
            <p class="mx-auto mb-8 max-w-xl text-xl text-slate-400 lg:mx-0">
              Développeur Fullstack React & Qwik
            </p>
            <div class="flex flex-wrap justify-center gap-4 lg:justify-start">
              <ContactBTN />
            </div>
          </div>

          <div class="flex w-full flex-1 justify-center lg:justify-end">
            <div class="w-full transform rounded-2xl border border-slate-700/50 bg-slate-900/90 p-6 shadow-[0_20px_50px_rgba(8,112,184,0.7)] backdrop-blur-sm transition-transform duration-500 hover:-translate-y-2">
              <AnimatedTerminal />
            </div>
          </div>
        </main>

        <Skills />
        <Statistiques />
        <Projects />
        <Timeline />
        <Contact />
        <Footer />
      </div>
    </div>
  );
});