import { component$, useSignal, useVisibleTask$, $} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// 1. On importe nos composants depuis leurs fichiers respectifs
import { Navbar } from "../components/navbar";
import { Skills } from "../components/skills";
import { Contact } from "../components/contact";
import { Footer } from "../components/footer";
import { Projects } from "../components/projects";
import { Timeline } from "~/components/timeline";
import { AnimatedTerminal } from "../components/animated-terminal";
import { Preloader } from "../components/Preloader"; // Vérifie le chemin
import { IntroSequence } from "~/components/intro-sequence";

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
  const direction = useSignal(1); // 1 pour monter, -1 pour descendre
  const isPaused = useSignal(false); // Signal pour gérer la pause

  useVisibleTask$(() => {
    const interval = setInterval(() => {
      // Si on est en pause, on ne fait rien du tout
      if (isPaused.value) return;

      // On ajuste les valeurs
      projets.value += direction.value;
      clients.value += direction.value;

      // Vérification des paliers
      if (projets.value >= 15 || projets.value <= 0) {
        // 1. On active la pause
        isPaused.value = true;

        // 2. On change la direction pour le futur
        direction.value = direction.value === 1 ? -1 : 1;

        // 3. On programme la fin de la pause dans 2 secondes
        setTimeout(() => {
          isPaused.value = false;
        }, 2000); // 2000ms = 2 secondes d'arrêt
      }
    }, 100);

    return () => clearInterval(interval);
  });

  return (
    <div class="max-w-4xl mx-auto px-4 my-20 relative z-10">
      <div class="grid grid-cols-2 gap-8 bg-blue-600 p-10 rounded-3xl text-white shadow-2xl transition-transform hover:scale-105 duration-500">
        <div class="text-center border-r border-blue-400/50">
          <div class="text-6xl font-black mb-2 tabular-nums">
            {projets.value}+
          </div>
          <div class="uppercase tracking-widest text-xs font-bold opacity-80">
            Projets Terminés
          </div>
        </div>
        <div class="text-center">
          <div class="text-6xl font-black mb-2 tabular-nums">
            {clients.value}+
          </div>
          <div class="uppercase tracking-widest text-xs font-bold opacity-80">
            Clients Heureux
          </div>
        </div>
      </div>
    </div>
  );
});


export default component$(() => {
  // 1. SIGNAL : Est-ce que la séquence de texte "Be more..." est finie ?
  const introTextComplete = useSignal(false);

  // 2. SIGNAL : Est-ce que l'animation du Terminal (Preloader) est finie ?
  const terminalComplete = useSignal(false);

  return (
    <>
      {/* --- ÉTAPE 1 : SEQUENCE D'INTRO TEXTE --- */}
      {/* S'affiche uniquement au tout début */}
      {!introTextComplete.value && (
        <IntroSequence onSequenceEnd$={$(() => (introTextComplete.value = true))} />
      )}

      {/* --- ÉTAPE 2 : PRELOADER (TERMINAL) --- */}
      {/* S'affiche une fois le texte fini, mais tant que le terminal n'a pas fini */}
      {introTextComplete.value && !terminalComplete.value && (
        <Preloader onAnimationEnd$={$(() => (terminalComplete.value = true))} />
      )}

      {/* --- ÉTAPE 3 : LE SITE PRINCIPAL --- */}
      {/* Toujours présent dans le DOM mais caché par opacité au début */}
      <div
        class={[
          "relative min-h-screen overflow-hidden bg-slate-900 pt-20 transition-opacity duration-1000",
          // Si le terminal est fini -> Opacité 100%, sinon Opacité 0 et pas de clic possible
          terminalComplete.value ? "opacity-100" : "opacity-0 pointer-events-none h-0 lg:h-auto"
        ]}
      >

        {/* --- LUMIÈRES D'ARRIÈRE-PLAN --- */}
        <div class="pointer-events-none absolute inset-0 z-0 h-full w-full">
          <div class="animate-blob absolute top-0 -left-4 h-72 w-72 rounded-full bg-purple-500 opacity-70 mix-blend-multiply filter blur-[128px] dark:opacity-40"></div>
          <div class="animate-blob animation-delay-2000 absolute top-0 -right-4 h-72 w-72 rounded-full bg-blue-500 opacity-70 mix-blend-multiply filter blur-[128px] dark:opacity-40"></div>
          <div class="animate-blob animation-delay-4000 absolute -bottom-8 left-20 h-72 w-72 rounded-full bg-pink-500 opacity-70 mix-blend-multiply filter blur-[128px] dark:opacity-40"></div>
        </div>

        {/* --- CONTENU DU SITE --- */}
        <div class="relative z-10">
          <Navbar />

          <main class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-6 py-12 lg:flex-row lg:py-24">
            {/* COLONNE GAUCHE : Texte Intro */}
            <div class="flex-1 text-center lg:text-left">
              <h1 class="mb-4 text-5xl font-extrabold leading-tight text-white lg:text-7xl">
                Salut, je m'appelle <span class="text-blue-600">Maël</span> 👋
              </h1>
              <p class="mx-auto mb-8 max-w-xl text-xl text-slate-400 lg:mx-0">
                Développeur Fullstack React & Qwik
              </p>
              <div class="flex flex-wrap justify-center gap-4 lg:justify-start">
                {/* Si ContactBTN n'est pas importé, assure-toi qu'il est défini plus haut ou importé */}
                <ContactBTN />
              </div>
            </div>

            {/* COLONNE DROITE : Terminal animé (celui qui reste sur le site) */}
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
    </>
  );
});

// --- CONFIGURATION SEO POUR GOOGLE ---
export const head: DocumentHead = {
  // C'est le texte qui apparaîtra dans l'onglet du navigateur et en bleu sur Google
  title: "Maël RETAULT | Développeur Web Front-End (Qwik & React)",
  meta: [
    {
      // C'est le petit texte descriptif qui apparaît sous le lien sur Google
      name: "description",
      content: "Portfolio de Maël Retault, développeur web freelance. Création de sites internet ultra-rapides, optimisés SEO et sécurisés avec Qwik et TailwindCSS.",
    },
    {
      // Optionnel mais recommandé : empêche les robots de rater la page
      name: "robots",
      content: "index, follow",
    }
  ],
};