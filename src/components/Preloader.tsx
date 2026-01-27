import { component$, useSignal, useVisibleTask$, $, type PropFunction } from "@builder.io/qwik";

interface PreloaderProps {
  onAnimationEnd$: PropFunction<() => void>;
}

export const Preloader = component$<PreloaderProps>((props) => {
  const step = useSignal('typing');
  const displayedText = useSignal("");
  const loginValue = useSignal("");
  const passValue = useSignal("");
  const isZooming = useSignal(false);
  const isShaking = useSignal(false); // Pour l'effet d'impact au clic

  useVisibleTask$(() => {
    const sequence = async () => {
      // 1. TEXTE DANS LE TERMINAL
      const intro = "SYSTEM BOOTING...\nSTCBuild OS v1.0\nPhrase d'accroche : Le meilleur choix pour vos sites.\nRedirecting to secure login...";
      for (let i = 0; i < intro.length; i++) {
        displayedText.value += intro[i];
        await new Promise((r) => setTimeout(r, 30)); // Corrigé : () => setTimeout
      }
      await new Promise((r) => setTimeout(r, 1000));
      step.value = 'login';

      // 2. REMPLISSAGE AUTO
      await new Promise((r) => setTimeout(r, 500));
      for (const c of "Admin") {
        loginValue.value += c;
        await new Promise((r) => setTimeout(r, 100));
      }
      await new Promise((r) => setTimeout(r, 300));
      for (const c of "••••••") {
        passValue.value += c;
        await new Promise((r) => setTimeout(r, 100));
      }

      // 3. APPARITION SOURIS ET CLIC
      await new Promise((r) => setTimeout(r, 500));
      step.value = 'click';

      // 4. EFFET D'IMPACT (Secousse)
      await new Promise((r) => setTimeout(r, 1500));
      isShaking.value = true;

      // 5. ZOOM ET FLASH FINAL
      await new Promise((r) => setTimeout(r, 100));
      isZooming.value = true;

      await new Promise((r) => setTimeout(r, 800));
      props.onAnimationEnd$();
    };

    sequence();
  });

  return (
    <div class="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950 overflow-hidden">

      <div
        class={[
          "w-full max-w-2xl bg-slate-900 rounded-lg border border-slate-700 shadow-2xl relative transition-all duration-700",
          isZooming.value ? "scale-[30] blur-xl opacity-0" : "scale-100",
          isShaking.value ? "animate-shake" : ""
        ]}
      >
        {/* Barre de fenêtre */}
        <div class="flex items-center gap-2 p-3 border-b border-slate-800 bg-slate-800/50">
          <div class="w-3 h-3 rounded-full bg-red-500"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div class="w-3 h-3 rounded-full bg-green-500"></div>
        </div>

        <div class="p-8 font-mono min-h-[350px] flex flex-col justify-center relative overflow-hidden">

          {step.value === 'typing' && (
            <pre class="text-green-400 whitespace-pre-wrap text-sm leading-relaxed">
                {displayedText.value}<span class="animate-pulse">_</span>
            </pre>
          )}

          {(step.value === 'login' || step.value === 'click') && (
            <div class="flex flex-col items-center space-y-6 animate-fade-in">
              <div class="w-20 h-20 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl border-4 border-slate-800">
                SB
              </div>
              <div class="w-full max-w-xs space-y-4">
                <div class="space-y-1">
                  <label class="text-[10px] text-slate-500 uppercase tracking-widest">Utilisateur</label>
                  <input type="text" value={loginValue.value} readOnly class="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white text-sm outline-none" />
                </div>
                <div class="space-y-1">
                  <label class="text-[10px] text-slate-500 uppercase tracking-widest">Mot de passe</label>
                  <input type="password" value={passValue.value} readOnly class="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white text-sm outline-none" />
                </div>
                <button class={["w-full py-3 rounded font-bold transition-all duration-200", step.value === 'click' ? "bg-blue-400 scale-95" : "bg-blue-600 text-white shadow-lg shadow-blue-900/40"]}>
                  Se connecter
                </button>
              </div>
            </div>
          )}

          {step.value === 'click' && (
            <div class="absolute z-50 animate-mouse pointer-events-none">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="black" stroke-width="1.5">
                <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.83-4.83 3.06 7.15c.13.31.48.46.79.33l2.06-.88c.31-.13.46-.48.33-.79l-3.04-7.1 6.33-.6c.33-.03.49-.44.25-.67L6.35 2.86c-.32-.32-.85-.1-.85.35z" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {isZooming.value && (
        <div class="absolute inset-0 bg-white z-[10000] animate-flash-white"></div>
      )}
    </div>
  );
});