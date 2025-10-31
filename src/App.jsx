import { useState, useEffect } from "react";

function App() {
  const [phrases, setPhrases] = useState([]);
  const [currentPhrase, setCurrentPhrase] = useState("");

  const [showKonamiMessage, setShowKonamiMessage] = useState(false);
  const [konamiSequence, setKonamiSequence] = useState([]);

  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ];

  // Load phrases from external file
  useEffect(() => {
    const loadPhrases = async () => {
      try {
        const response = await fetch("/phrases.txt");
        const text = await response.text();
        const phrasesArray = text
          .split("\n")
          .filter((phrase) => phrase.trim() !== "");
        setPhrases(phrasesArray);

        // Set initial random phrase
        if (phrasesArray.length > 0) {
          const randomIndex = Math.floor(Math.random() * phrasesArray.length);
          setCurrentPhrase(phrasesArray[randomIndex]);
        }
      } catch (error) {
        console.error("Error loading phrases:", error);
        // Fallback phrase if loading fails
        setCurrentPhrase("Erro ao carregar as frases...");
      }
    };

    loadPhrases();
  }, []);

  // Konami Code detection
  useEffect(() => {
    const handleKeyDown = (event) => {
      setKonamiSequence((prev) => {
        const newSequence = [...prev, event.code];

        // Keep only the last 10 keys (length of Konami code)
        if (newSequence.length > konamiCode.length) {
          newSequence.shift();
        }

        // Check if the sequence matches Konami code
        if (newSequence.length === konamiCode.length) {
          const matches = konamiCode.every(
            (key, index) => key === newSequence[index]
          );
          if (matches) {
            setShowKonamiMessage(true);
            return []; // Reset sequence
          }
        }

        return newSequence;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-black flex items-center justify-center p-6">
      {/* Left Side Konami Modal */}
      <div
        className={`fixed left-0 top-0 h-full w-80 transform transition-transform duration-500 ease-in-out z-50 ${
          showKonamiMessage ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full bg-gradient-to-b from-yellow-500 via-orange-500 to-red-600 p-1">
          <div className="h-full bg-black/90 backdrop-blur-sm p-6 flex flex-col justify-center">
            {/* Close button */}
            <button
              onClick={() => setShowKonamiMessage(false)}
              className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 transition-colors text-2xl"
            >
              ×
            </button>

            {/* Content */}
            <div className="text-center">
              <div className="text-6xl mb-6">🍞✨</div>
              <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
                EASTER EGG!
              </h2>
              <div className="text-yellow-200 text-sm mb-6 max-h-120 overflow-y-auto bg-black/40 rounded-lg p-4 border border-yellow-500/30">
                <div className="text-yellow-400 text-xs mb-3 font-semibold">
                  TODAS AS FRASES DO PÃO:
                </div>
                {phrases.length > 0 ? (
                  <div className="space-y-2">
                    {phrases.map((phrase, index) => (
                      <div
                        key={index}
                        className={`text-left p-2 rounded border-l-2 ${
                          phrase === currentPhrase
                            ? "border-yellow-400 bg-yellow-400/10 text-yellow-100"
                            : "border-yellow-600/50 text-yellow-200"
                        }`}
                      >
                        <span className="text-yellow-400 text-xs mr-2">
                          #{index + 1}
                        </span>
                        {phrase}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-yellow-300">Carregando frases...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-red-100 mb-4 tracking-tight drop-shadow-2xl">
            <div className="text-3xl md:text-4xl font-light">Descubra o seu</div>
            <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500">
              Pão na Gaveta!
            </div>
          </h1>
        </div>

        {/* Quote Container */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-red-900/30 backdrop-blur-sm rounded-3xl transform rotate-1 border border-red-700/50"></div>
          <div className="relative bg-black/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-red-600/30 shadow-2xl shadow-red-900/50">
            <blockquote
              className={`text-2xl md:text-3xl font-medium text-red-100 leading-relaxed transition-all duration-300 ${"opacity-100 transform translate-y-0"}`}
            >
              {currentPhrase}
            </blockquote>
          </div>
        </div>
        {/* Footer */}
        <div className="mt-16 text-red-300 text-sm">
          <p>Recarregue a página para descobrir um novo pão na gaveta</p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-red-600/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-600/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-red-700/20 rounded-full blur-xl animate-pulse delay-500"></div>
      <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-red-800/15 rounded-full blur-xl animate-pulse delay-700"></div>
    </div>
  );
}

export default App;
