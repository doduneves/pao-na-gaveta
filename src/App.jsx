import { useState, useEffect } from "react";

function App() {
  const [phrases, setPhrases] = useState([]);
  const [currentPhrase, setCurrentPhrase] = useState("");

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-black flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-red-100 mb-4 tracking-tight drop-shadow-2xl">
            <div className="text-4xl md:text-5xl font-light">Cuidado com o</div>
            <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500">
              Pão na Gaveta
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
          <p>Recarregue a página para descobrir um outro pão na gaveta</p>
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
