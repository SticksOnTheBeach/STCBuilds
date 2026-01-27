import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";


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
    // TRÈS IMPORTANT : On surveille charIndex et lineIndex
    track(() => charIndex.value);
    track(() => lineIndex.value);

    const currentLine = textToType[lineIndex.value];

    if (lineIndex.value < textToType.length) {
      if (charIndex.value < currentLine.length) {
        const timeout = setTimeout(() => {
          displayedText.value += currentLine.charAt(charIndex.value);
          charIndex.value++;
        }, 50);
        return () => clearTimeout(timeout);
      } else if (lineIndex.value < textToType.length - 1) {
        const timeout = setTimeout(() => {
          displayedText.value += "\n";
          lineIndex.value++;
          charIndex.value = 0;
        }, 600);
        return () => clearTimeout(timeout);
      }
    }
  });

  return (
    <div class="w-full max-w-lg h-64 bg-slate-900 rounded-xl shadow-2xl p-4 font-mono text-sm border border-slate-700">
      <div class="flex gap-2 mb-4">
        <div class="w-3 h-3 rounded-full bg-red-500"></div>
        <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div class="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <pre class="text-blue-400 whitespace-pre-wrap">
                {displayedText.value}
        <span class="inline-block w-2 h-4 bg-blue-400 animate-pulse ml-1"></span>
            </pre>
    </div>
  );
});