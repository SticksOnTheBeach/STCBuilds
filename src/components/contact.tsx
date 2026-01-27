import { component$ } from "@builder.io/qwik";

export const Contact = component$(() => {
    return (
        <section id="contact" class="py-16 px-4 max-w-lg mx-auto text-white">
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