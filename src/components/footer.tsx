import { component$ } from "@builder.io/qwik";

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