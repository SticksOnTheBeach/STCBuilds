import { component$ } from "@builder.io/qwik";

interface Etape {
    date: string;
    titre: string;
    lieu: string;
    description: string;
}

export const Timeline = component$(() => {
    const etapes: Etape[] = [
        {
            date: "2024 - Présent",
            titre: "Développeur Fullstack Junior",
            lieu: "Freelance",
            description: "Création de sites ultra-rapides avec Qwik et Tailwind CSS pour des clients locaux."
        },
        {
            date: "2023",
            titre: "Formation Web Intensive",
            lieu: "Autodidacte / BootCamp",
            description: "Apprentissage approfondi de JavaScript, React et de l'écosystème moderne."
        },
        {
            date: "2022",
            titre: "Premiers pas en Code",
            lieu: "Lycée / Passion",
            description: "Découverte du HTML et du CSS. Création de mes premiers designs statiques."
        }
    ];

    return (
        <section class="py-20 px-4 dark:bg-slate-950 transition-colors duration-500">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold text-center mb-16 dark:text-white">Mon Parcours</h2>

                <div class="relative border-l-2 border-blue-500 ml-4 md:mx-auto md:w-fit">
                    {etapes.map((item, index) => (
                        <div key={index} class="mb-10 ml-6 group">
                            {/* Le petit rond sur la ligne */}
                            <div class="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-blue-500 bg-white dark:bg-slate-900 group-hover:bg-blue-500 transition-colors"></div>

                            {/* Le contenu */}
                            <div class="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                                <span class="text-sm font-bold text-blue-600 uppercase tracking-wide">{item.date}</span>
                                <h3 class="text-xl font-bold mt-1 dark:text-white">{item.titre}</h3>
                                <p class="text-gray-500 dark:text-gray-400 font-medium text-sm mb-2">{item.lieu}</p>
                                <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});