import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export const AnimatedTerminal = component$(() => {
  const textToType = [
    "const dev = { nom: 'Maël', stack: ['Qwik', 'TS'] };",
    "console.log('Développeur Fullstack');",
    "npm start"
  ];
  const displayedText = useSignal("");
  const lineIndex = useSignal(0);
  const charIndex = useSignal(0);

  useVisibleTask$(({ track }) => {
    // On surveille les index pour déclencher la suite
    track(() => charIndex.value);
    track(() => lineIndex.value);

    const currentLine = textToType[lineIndex.value];

    // CAS 1 : On écrit la ligne actuelle
    if (charIndex.value < currentLine.length) {
      const timeout = setTimeout(() => {
        displayedText.value += currentLine.charAt(charIndex.value);
        charIndex.value++;
      }, 50);
      return () => clearTimeout(timeout);
    }

    // CAS 2 : La ligne est finie, on passe à la suivante
    else if (lineIndex.value < textToType.length - 1) {
      const timeout = setTimeout(() => {
        displayedText.value += "\n";
        lineIndex.value++;
        charIndex.value = 0;
      }, 200);
      return () => clearTimeout(timeout);
    }

    // CAS 3 : TOUT est fini -> ON RECOMANCE (La boucle !)
    else {
      const timeout = setTimeout(() => {
        displayedText.value = ""; // On efface tout
        lineIndex.value = 0;      // Retour première ligne
        charIndex.value = 0;     // Retour premier caractère
      }, 1500); // On attend 3 secondes avant de relancer
      return () => clearTimeout(timeout);
    }
  });

  return (
    <div class="w-full bg-slate-900/90 backdrop-blur-sm rounded-2xl shadow-[0_20px_50px_rgba(8,112,184,0.7)] p-6 border border-slate-700/50">
      <div class="flex gap-2 mb-4">
        <div class="w-3 h-3 rounded-full bg-red-500"></div>
        <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div class="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <pre class="text-blue-400 font-mono text-sm whitespace-pre-wrap min-h-[120px]">
                {displayedText.value}
        <span class="inline-block w-2 h-4 bg-blue-400 animate-pulse ml-1 align-middle"></span>
            </pre>
    </div>
  );
});