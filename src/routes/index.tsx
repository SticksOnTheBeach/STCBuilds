import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";


// 1. On importe nos composants depuis leurs fichiers respectifs
import { Navbar } from "../components/navbar";
import { Skills } from "../components/skills";
import { Contact } from "../components/contact";
import { Footer } from "../components/footer";
import { Projects } from "../components/projects";


// 1. Définition du bouton
export const MonBouton = component$(() => {
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
        // On ajoute 'pt-20' (Padding Top) pour laisser de la place à la Navbar
        <div class="min-h-screen bg-gray-50 pt-20">

            <Navbar/>

            <main class="flex flex-col items-center justify-center mt-20">
                <h1 class="text-5xl font-extrabold text-slate-900 mb-4">
                    Salut, je m'appelle Maël 👋
                </h1>
                <p class="text-xl text-slate-500 mb-8">
                    Développeur Fullstack React & Qwik
                </p>

                <MonBouton />
            </main>
            <Skills />
            <Statistiques />
            <Projects />
            <Contact />
            <Footer />

        </div>
    );
});