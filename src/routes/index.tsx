import { component$, useSignal } from "@builder.io/qwik";

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

export const Navbar = component$(() => {
    // La variable magique pour l'état du menu
    const menuOuvert = useSignal(false);

    return (
        <nav class="w-full bg-white shadow-sm fixed top-0 z-50">
            {/* Conteneur principal de la Navbar */}
            <div class="flex justify-between items-center px-6 py-4">

                {/* Logo */}
                <div class="text-xl font-bold text-blue-600 hover:text-amber-800 transition-colors cursor-pointer">
                    MAËL.DEV
                </div>

                {/* Liens (PC uniquement) */}
                <div class="hidden md:flex items-center gap-8 text-sm font-medium">
                    <a href="#" class="hover:text-blue-600">Projets</a>
                    <a href="#" class="hover:text-blue-600">Compétences</a>
                    <a href="#contact" class="hover:text-blue-600">Contact</a>
                </div>

                {/* Boutons et Menu Burger */}
                <div class="flex items-center gap-4">
                    <EchapBTN />

                    {/* Bouton Burger (Mobile uniquement) */}
                    <button
                        onClick$={() => (menuOuvert.value = !menuOuvert.value)}
                        class="md:hidden p-2 text-gray-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Menu Déroulant Mobile (S'affiche si menuOuvert est true) */}
            {menuOuvert.value && (
                <div class="md:hidden bg-blue-600 p-4 flex flex-col gap-4 text-white animate-fade-in">
                    <a href="#" class="font-medium">Projets</a>
                    <a href="#" class="font-medium">Compétences</a>
                    <a href="#" class="font-medium">Contact</a>
                </div>
            )}
        </nav>
    );
});


export const Skills = component$(() => {
    const mesTechnos = [
        // On ajoute "hover: ..." dans une nouvelle propriété 'survol'
        { nom: "React JS", couleur: "bg-blue-100 text-blue-700", survol: "hover:bg-blue-600 hover:text-white" },
        { nom: "Qwik", couleur: "bg-purple-100 text-purple-700", survol: "hover:bg-purple-600 hover:text-white" },
        { nom: "Tailwind CSS", couleur: "bg-cyan-100 text-cyan-700", survol: "hover:bg-cyan-600 hover:text-white" },
        { nom: "TypeScript", couleur: "bg-blue-200 text-blue-800", survol: "hover:bg-blue-700 hover:text-white" },
        { nom: "Node.js", couleur: "bg-green-100 text-green-700", survol: "hover:bg-green-600 hover:text-white" },
    ];

    return (
        <section class="py-16 px-4 max-w-4xl mx-auto text-center">
            <h2 class="text-3xl font-bold mb-8">Mes Compétences</h2>

            <div class="flex flex-wrap justify-center gap-4">
                {mesTechnos.map((tech) => (
                    <span
                        class={`px-4 py-2 rounded-full font-semibold shadow-sm transition-all duration-300 cursor-default
                        ${tech.couleur} ${tech.survol}`}
                    >
                        {tech.nom}
                    </span>
                ))}
            </div>
        </section>
    );
});

export const Contact = component$(() => {
    return (
        <section id="contact" class="py-16 px-4 max-w-lg mx-auto">
            <h2 class="text-3xl font-bold mb-8 text-center">Me contacter</h2>

            <form class="space-y-4 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Votre nom" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="exemple@mail.com" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32" placeholder="Votre projet..."></textarea>
                </div>

                <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-900 transition-colors">
                    Envoyer le message
                </button>
            </form>
        </section>
    );
});

export const Footer = component$(() => {
    return (
        <footer class="bg-slate-900 text-white py-12 mt-20">
            <div class="max-w-4xl mx-auto px-4 text-center">
                <p class="text-xl font-bold mb-4">MAËL.DEV</p>
                <p class="text-slate-400 mb-6 text-sm">
                    Propulsé par Qwik, React et beaucoup de café.
                </p>
                <div class="flex justify-center gap-6">
                    <a href="https://github.com/sticksonthebeach" class="hover:text-blue-400 transition-colors">GitHub</a>
                    <a href="#" class="hover:text-blue-400 transition-colors">LinkedIn</a>
                    <a href="#" class="hover:text-blue-400 transition-colors">Twitter (X)</a>
                </div>
                <div class="mt-8 pt-8 border-t border-slate-800 text-xs text-slate-500">
                    © {new Date().getFullYear()} Maël - Tous droits réservés.
                </div>
            </div>
        </footer>
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
            <Contact />
            <Footer />
        </div>
    );
});