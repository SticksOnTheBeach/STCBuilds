import { component$ } from "@builder.io/qwik";

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
            <h2 class="text-3xl font-bold mb-8 text-white">Mes Compétences</h2>

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