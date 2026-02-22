import { component$, useSignal, useVisibleTask$, type PropFunction } from "@builder.io/qwik";

interface IntroSequenceProps {
  onSequenceEnd$: PropFunction<() => void>;
}

export const IntroSequence = component$<IntroSequenceProps>((props) => {
  // Signaux pour contrôler l'apparition de chaque élément
  const showLigne1 = useSignal(false);
  const showLigne2 = useSignal(false);
  const showLigne3 = useSignal(false);
  const startSweep = useSignal(false);

  useVisibleTask$(() => {
    const runTimeline = async () => {
      // Délai initial avant de commencer
      await new Promise(r => setTimeout(r, 500));
      showLigne1.value = true;

      // Attendre 1.2s puis afficher ligne 2
      await new Promise(r => setTimeout(r, 1000));
      showLigne2.value = true;

      // Attendre 1.2s puis afficher ligne 3 (le gros titre)
      await new Promise(r => setTimeout(r, 1000));
      showLigne3.value = true;

      // Pause dramatique pour lire le tout (2s)
      await new Promise(r => setTimeout(r, 2000));

      // Lancer le rideau de transition
      startSweep.value = true;

      // Attendre la fin de l'animation du rideau (1s dans le CSS) avant de signaler la fin
      await new Promise(r => setTimeout(r, 1000));
      props.onSequenceEnd$();
    };

    runTimeline();
  });

  return (
    // Conteneur principal (fond noir)
    <div class="fixed inset-0 z-[10000] bg-[#111] flex items-center justify-center overflow-hidden font-sans">

      {/* Conteneur du texte centré */}
      <div class="text-center flex flex-col items-center gap-4 relative z-10 px-4">

        {/* Ligne 1 */}
        {showLigne1.value && (
          <h2 class="text-2xl md:text-3xl text-gray-400 font-medium animate-text-appear">
            Be more
          </h2>
        )}

        {/* Ligne 2 */}
        {showLigne2.value && (
          <h2 class="text-2xl md:text-3xl text-gray-400 font-medium animate-text-appear">
            accurate using
          </h2>
        )}

        {/* Ligne 3 (Titre principal) */}
        {showLigne3.value && (
          <h1 class="text-5xl md:text-7xl text-white font-bold mt-4 animate-text-appear tracking-tight">
            STCBuild
          </h1>
        )}
      </div>

      {/* LE RIDEAU DE TRANSITION */}
      {/* C'est une div noire positionnée en bas, qui remonte pour tout couvrir */}
      <div
        class={[
          "absolute inset-0 bg-slate-950 z-20 transform translate-y-full",
          startSweep.value ? "animate-sweep-transition" : ""
        ]}
      ></div>
    </div>
  );
});