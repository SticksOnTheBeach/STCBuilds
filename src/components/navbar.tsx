import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";

import { ContactBTN } from "~/routes";



export const Navbar = component$(() => {
    const isDark = useSignal(false);

    // Ce code s'exécute au chargement pour vérifier les préférences de l'utilisateur
    useVisibleTask$(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            isDark.value = true;
            document.documentElement.classList.add('dark');
        }
    });

    // Fonction pour basculer le mode
    const toggleDark = $(() => {
        isDark.value = !isDark.value;
        if (isDark.value) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    });

    return (
        <nav class="w-full fixed top-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-colors duration-500">
            <div class="flex justify-between items-center px-6 py-4">
                <div class="font-bold dark:text-white">MAËL.DEV</div>

                <div class="flex items-center gap-4">
                    {/* Bouton Dark Mode */}
                    <button onClick$={toggleDark} class="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-yellow-400 transition-all">
                        {isDark.value ? '☀️' : '🌙'}
                    </button>
                    <ContactBTN />
                </div>
            </div>
        </nav>
    );
});


/*
export const Navbar = component$(() => {
    // La variable magique pour l'état du menu
    const menuOuvert = useSignal(false);

    return (
        // Dans navbar.tsx
        <nav class="w-full bg-white/70 backdrop-blur-md border-b border-white/20 fixed top-0 z-50">

            <div class="flex justify-between items-center px-6 py-4">


                <div class="text-xl font-bold text-blue-600 hover:text-amber-800 transition-colors cursor-pointer">
                    MAËL.DEV
                </div>


                <div class="hidden md:flex items-center gap-8 text-sm font-medium">
                    <a href="#" class="hover:text-blue-600">Projets</a>
                    <a href="#" class="hover:text-blue-600">Compétences</a>
                    <a href="#contact" class="hover:text-blue-600">Contact</a>
                </div>


                <div class="flex items-center gap-4">
                    <EchapBTN />


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
*/
