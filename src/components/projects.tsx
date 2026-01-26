import { component$ } from "@builder.io/qwik";

// On définit un "Type" précis pour nos projets
interface Projet {
    id: number;
    titre: string;
    description: string;
    image: string;
    technos: string[];
    lien: string;
}

export const Projects = component$(() => {
    const mesRealisations: Projet[] = [
        {
            id: 1,
            titre: "E-commerce Rapide",
            description: "Une boutique en ligne avec chargement instantané.",
            image: "https://picsum.photos/id/1/400/250", // Image d'illustration
            technos: ["Qwik", "Tailwind"],
            lien: "#"
        },
        {
            id: 2,
            titre: "Dashboard Admin",
            description: "Gestion de données complexes et graphiques.",
            image: "https://picsum.photos/id/2/400/250",
            technos: ["React", "TypeScript"],
            lien: "#"
        }
    ];

    return (
        <section class="py-20 bg-white">
            <div class="max-w-6xl mx-auto px-4">
                <h2 class="text-4xl font-bold text-center mb-12">Mes Réalisations</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mesRealisations.map((p) => (
                        <div key={p.id} class="group bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">
                            {/* Image avec effet de zoom au survol */}
                            <div class="overflow-hidden">
                                <img src={p.image} alt={p.titre} class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>

                            <div class="p-6">
                                <div class="flex gap-2 mb-3">
                                    {p.technos.map(t => (
                                        <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-blue-50 text-blue-600 rounded">
                      {t}
                    </span>
                                    ))}
                                </div>
                                <h3 class="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{p.titre}</h3>
                                <p class="text-gray-500 text-sm mb-4">{p.description}</p>
                                <a href={p.lien} class="font-semibold text-sm border-b-2 border-blue-600 pb-1">Voir le projet</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});