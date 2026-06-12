import { useState, useEffect, useRef } from 'react';
import { Globe, Briefcase, GraduationCap, ArrowRight, RefreshCw, Send } from 'lucide-react';
import './MethodologyShowcase.css';

const WHATSAPP_NUMBER = '5584986236412';

// ----------------- DATA FOR SHOWCASE OF REAL PLANS (IDEA 1) -----------------
const studentCases = [
  {
    id: 'moises',
    name: 'Moisés Medeiros',
    age: '28 anos',
    profession: 'Engenheiro de Software (TI)',
    level: 'Intermediário (B2) — Fluência Travada',
    challenge: 'Moisés possui um vocabulário técnico excelente na leitura, mas trava na fala devido ao medo de errar e à falta de conectores lógicos para ligar suas ideias em reuniões de negócios.',
    planSteps: [
      { num: 1, title: 'Sentence Architecture', desc: 'Estruturação de respostas com conectores lógicos essenciais para evitar frases soltas e fragmentadas.' },
      { num: 2, title: 'Cohesion & Discourse Markers', desc: 'Uso de marcadores corporativos avançados (furthermore, however, consequently) para criar fluxo lógico contínuo.' },
      { num: 3, title: 'Linguaskill Business Prep', desc: 'Simulações reais sob pressão de tempo focadas na fala espontânea de negócios do exame da Cambridge.' },
      { num: 4, title: 'Narrative Fluency', desc: 'Treino de contação de histórias técnicas e gestão de tempo para reuniões de dailies e feedbacks.' }
    ],
    materialPreview: {
      title: 'Business English — Condução de Reuniões',
      vocabulary: [
        { term: "Let's get down to business", def: "Expressão usada para iniciar a reunião direto no assunto principal.", ex: "Now that everyone is here, let's get down to business." },
        { term: "I'd like to point out that...", def: "Estrutura polida para chamar a atenção para uma informação crucial.", ex: "I'd like to point out that the deadline is next Friday." }
      ],
      pronunciation: 'A pronúncia correta de "Management" é /ˈmæn.ɪdʒ.mənt/, com a sílaba tônica marcada logo no início (/ˈmæn/).',
      challenge: 'Grave um áudio de 60 segundos abrindo uma reunião sobre o status do projeto e apontando um atraso sutil no cronograma.'
    }
  },
  {
    id: 'mariana',
    name: 'Mariana Costa',
    age: '34 anos',
    profession: 'Médica Dermatologista',
    level: 'Iniciante (A2) — Foco em Viagens',
    challenge: 'Mariana precisa viajar para congressos médicos nos EUA e fazer turismo, mas sente pânico ao passar pela imigração, pedir comida no restaurante ou solicitar serviços no hotel.',
    planSteps: [
      { num: 1, title: 'Survival English Basics', desc: 'Estruturas prontas e seguras para comunicação básica essencial no aeroporto, táxi e hotel.' },
      { num: 2, title: 'Listening Real-Life Immersion', desc: 'Treino intensivo de compreensão auditiva com sotaques reais de nativos em ambientes barulhentos.' },
      { num: 3, title: 'Roleplay Prático', desc: 'Aulas simulando imigração, pedidos em restaurantes e check-in com feedbacks imediatos.' },
      { num: 4, title: 'Medical Congress Vocabulary', desc: 'Introdução sutil de jargões médicos básicos em inglês para networking simples em congressos.' }
    ],
    materialPreview: {
      title: 'Travel English — Imigração & Aeroporto',
      vocabulary: [
        { term: "I am staying for...", def: "Frase pronta para responder sobre o tempo de permanência no país.", ex: "I am staying for ten days." },
        { term: "I am here for tourism", def: "Frase segura para esclarecer o propósito da sua viagem.", ex: "I am here for tourism and shopping." }
      ],
      pronunciation: 'A pronúncia de "Airport" é /ˈeə.pɔːt/, terminando de forma limpa no som de /t/ oclusivo, sem criar uma sílaba extra.',
      challenge: 'Responda à pergunta do oficial de imigração: "What is the purpose of your visit and how long will you stay?"'
    }
  },
  {
    id: 'lucas',
    name: 'Lucas Pinho',
    age: '22 anos',
    profession: 'Estudante de Engenharia',
    level: 'Avançado (C1) — Foco Acadêmico / IELTS',
    challenge: 'Lucas tem excelente fluência no dia a dia, mas precisa pontuar acima de 7.5 no IELTS para conseguir uma bolsa de mestrado no Canadá. Ele precisa dominar vocabulário acadêmico e redação formal.',
    planSteps: [
      { num: 1, title: 'IELTS Band Descriptors', desc: 'Análise detalhada do que os avaliadores exigem em termos de vocabulário, coesão e precisão gramatical.' },
      { num: 2, title: 'Formal Writing Correction', desc: 'Treino focado na descrição de gráficos (Task 1) e ensaio argumentativo acadêmico (Task 2).' },
      { num: 3, title: 'Advanced Idiomatic Expressions', desc: 'Uso estratégico de expressões idiomáticas sofisticadas de nível C1/C2 na fala espontânea.' },
      { num: 4, title: 'Mock Exams (Simulados)', desc: 'Realização de testes completos reais com correção detalhada de pronúncia e gramática avançada.' }
    ],
    materialPreview: {
      title: 'IELTS Speaking — Expressões de Alto Nível',
      vocabulary: [
        { term: "To put it in a nutshell", def: "Forma sofisticada de introduzir um resumo de suas ideias.", ex: "To put it in a nutshell, technology has changed communication forever." },
        { term: "A double-edged sword", def: "Expressão usada para falar sobre algo que traz vantagens e desvantagens.", ex: "Social media is a double-edged sword." }
      ],
      pronunciation: 'Pratique a transição rápida e sem interrupções do som do Th (/θ/) em palavras como "think" e "through" para manter a fluência.',
      challenge: 'Fale por 2 minutos sobre as vantagens e desvantagens de morar no exterior na era digital.'
    }
  }
];

// ----------------- DATA FOR GENERATOR COMBINATIONS (IDEA 2) -----------------
const generatorContent: Record<string, { topic: string; vocab: { term: string; def: string; ex: string }[]; pronunciation: string; challenge: string }> = {
  'negocios-iniciante': {
    topic: 'Apresentação Pessoal no Trabalho',
    vocab: [
      { term: "I work as a...", def: "Frase ideal para dizer sua profissão de forma direta.", ex: "I work as a software engineer at a tech company." },
      { term: "I am responsible for...", def: "Usado para explicar o que você faz no seu dia a dia.", ex: "I am responsible for managing the database." },
      { term: "Nice to meet you", def: "A forma clássica e polida de cumprimentar um colega no primeiro dia.", ex: "Hi, I am Gabriel. Nice to meet you." }
    ],
    pronunciation: 'O "-ed" final em verbos como "worked" é pronunciado como um som de /t/ acoplado (/wɜːrkt/), sem formar uma sílaba extra.',
    challenge: 'Tente gravar um áudio dizendo qual é o seu cargo e pelo que você é responsável na sua empresa atualmente.'
  },
  'negocios-intermediario': {
    topic: 'Condução de Reuniões Corporativas (Meetings)',
    vocab: [
      { term: "Let's get down to business", def: "Frase para dar início à reunião, chamando a atenção de todos para o tópico.", ex: "Now that everyone is online, let's get down to business." },
      { term: "I'd like to point out that...", def: "Uma forma polida e profissional de destacar uma informação essencial.", ex: "I'd like to point out that our sales increased by 15%." },
      { term: "Could you elaborate on that?", def: "Forma educada de pedir para alguém explicar melhor ou dar mais detalhes sobre um ponto.", ex: "That is an interesting idea. Could you elaborate on that?" }
    ],
    pronunciation: 'A pronúncia de "Management" é /ˈmæn.ɪdʒ.mənt/. Atente-se à sílaba tônica que incide no início da palavra (/ˈmæn/).',
    challenge: 'Simule a abertura de uma reunião: cumprimente a equipe virtual, inicie os trabalhos e peça para um colega dar mais detalhes sobre o relatório de marketing.'
  },
  'negocios-avancado': {
    topic: 'Negociação Estratégica & Persuasão',
    vocab: [
      { term: "A win-win situation", def: "Uma situação em que ambos os lados saem ganhando no acordo.", ex: "By sharing the costs, we can create a win-win situation for both brands." },
      { term: "To reach a compromise", def: "Chegar a um meio-termo ou acordo onde ambas as partes cedem um pouco.", ex: "After hours of negotiating, we finally managed to reach a compromise." },
      { term: "To read between the lines", def: "Perceber intenções ou sentimentos ocultos que não foram ditos de forma explícita.", ex: "Reading between the lines of their proposal, they seem eager to sign." }
    ],
    pronunciation: 'Pratique a entonação descendente no final de afirmações corporativas para transmitir autoridade e firmeza durante a negociação.',
    challenge: 'Apresente uma contraproposta em inglês em que você defende que o acordo atual precisa ser flexibilizado para que se torne uma situação em que todos ganham.'
  },
  'viagem-iniciante': {
    topic: 'Imigração no Aeroporto',
    vocab: [
      { term: "Here is my passport", def: "A frase ideal para entregar seu passaporte ao oficial.", ex: "Good morning. Here is my passport and visa." },
      { term: "I am staying for...", def: "Frase pronta para responder quanto tempo você vai ficar no país.", ex: "I am staying for twelve days in New York." },
      { term: "I am here for tourism", def: "A forma mais direta de explicar o motivo da sua viagem de férias.", ex: "I am here for tourism and sightseeing." }
    ],
    pronunciation: 'Pronuncie "Airport" /ˈeə.pɔːt/ terminando de forma limpa no som de /t/ oclusivo, sem adicionar vogais no final.',
    challenge: 'Responda em voz alta ao oficial que te pergunta: "What is the purpose of your visit?"'
  },
  'viagem-intermediario': {
    topic: 'Check-in & Solicitações no Hotel',
    vocab: [
      { term: "I have a reservation under...", def: "Frase padrão para fazer o check-in no balcão do hotel.", ex: "Hello, I have a reservation under the name of Gabriel." },
      { term: "There is an issue with the...", def: "Forma polida e eficaz de reportar que algo não está funcionando no quarto.", ex: "Excuse me, there is an issue with the air conditioning." },
      { term: "Could I get clean towels?", def: "Estrutura educada para pedir objetos ou serviços adicionais.", ex: "Could I get clean towels sent to room 302, please?" }
    ],
    pronunciation: 'Diferença de pronúncia crítica: "Suite" (suíte de hotel) tem a pronúncia idêntica à palavra "sweet" (/swiːt/). Não confunda com "suit" (terno de roupas, pronunciado /suːt/).',
    challenge: 'Simule uma ligação para a recepção do hotel informando que o chuveiro do seu quarto não está esquentando e peça toalhas extras.'
  },
  'viagem-avancado': {
    topic: 'Conversa Fluida com Locais (Networking)',
    vocab: [
      { term: "Off the beaten path", def: "Locais menos explorados por turistas convencionais, joias substituídas.", ex: "I prefer visiting small villages that are off the beaten path." },
      { term: "To get the hang of...", def: "Pegar o jeito de alguma atividade, entender o funcionamento local.", ex: "Don't worry, you will get the hang of using the subway system soon." },
      { term: "To blend in with the locals", def: "Agir ou se vestir de forma a não parecer um turista, se misturar.", ex: "I love exploring local markets to blend in with the locals." }
    ],
    pronunciation: 'Treine o uso de reduções e conexões de fala comuns no inglês informal, como "going to" virando "gonna" ou "want to" virando "wanna".',
    challenge: 'Puxe conversa com um local em um café, pergunte sobre recomendações de pontos de interesse que fogem das rotas turísticas tradicionais.'
  },
  'conversacao-iniciante': {
    topic: 'Falar sobre Hobbies e Rotina',
    vocab: [
      { term: "In my free time, I like to...", def: "A maneira clássica de contar o que você gosta de fazer para se divertir.", ex: "In my free time, I like to watch series and play football." },
      { term: "I usually wake up at...", def: "Frase essencial para descrever sua rotina de horários.", ex: "I usually wake up at 7 AM on weekdays." },
      { term: "I enjoy listening to...", def: "Dizer seus gostos musicais ou de podcasts de maneira fluida.", ex: "I enjoy listening to rock music while cooking." }
    ],
    pronunciation: 'Pronúncia de "Like" e "Love": Garanta que o som do "e" no final de ambas as palavras seja mudo. O som termina no som de "k" (/laɪk/) e de "v" (/lʌv/).',
    challenge: 'Diga duas coisas que você faz na sua rotina matinal e qual é o seu hobby favorito nos fins de semana.'
  },
  'conversacao-intermediario': {
    topic: 'Expressar Opiniões & Debater Ideias',
    vocab: [
      { term: "From my perspective...", def: "Uma forma elegante de introduzir a sua visão sobre um assunto.", ex: "From my perspective, working remotely offers a better work-life balance." },
      { term: "I see your point, but...", def: "Expressão usada para discordar com elegância e educação, reconhecendo o outro lado.", ex: "I see your point, but we still need to think about the costs." },
      { term: "To agree to disagree", def: "Decidir parar a discussão aceitando que ambos têm opiniões diferentes que não mudarão.", ex: "We clearly have different opinions here, so let's agree to disagree." }
    ],
    pronunciation: 'O som do "Th" na palavra "think" é soprado (sem voz), enquanto em "this" ele é vibrado (com voz). Pratique a língua entre os dentes!',
    challenge: 'Diga a sua opinião sobre o trabalho híbrido versus presencial e simule uma discordância amigável com um colega fictício.'
  },
  'conversacao-avancado': {
    topic: 'Discutir Ideias Complexas e Nuances',
    vocab: [
      { term: "To put it in a nutshell", def: "Expressão idiomática sofisticada para resumir uma ideia longa em poucas palavras.", ex: "To put it in a nutshell, the project was a complete success." },
      { term: "It's a double-edged sword", def: "Uma situação que tem aspectos muito positivos, mas também grandes riscos.", ex: "Fame can be a double-edged sword." },
      { term: "To hit the nail on the head", def: "Descrever de forma exata a causa de um problema ou a solução de uma questão.", ex: "Your analysis of the problem really hit the nail on the head." }
    ],
    pronunciation: 'Domine o "Flapped T" no inglês americano: o som de "T" intervocálico (como em "water" ou "computer") é suavizado em um tepe alveolar rápido (som de /ɾ/).',
    challenge: 'Explique de forma resumida o impacto das redes sociais na atenção dos jovens, usando a metáfora da "espada de dois gumes" (double-edged sword).'
  }
};

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const targets = node.querySelectorAll<HTMLElement>(
      '.showcase-header, .cases-section, .generator-section, .fade-in-element'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function MethodologyShowcase() {
  const revealRef = useScrollReveal();

  // Active state for Student Cases (Idea 1)
  const [activeCaseId, setActiveCaseId] = useState('moises');
  const activeCase = studentCases.find(c => c.id === activeCaseId) || studentCases[0];

  // Generator states (Idea 2)
  const [selectedObjective, setSelectedObjective] = useState('negocios');
  const [selectedLevel, setSelectedLevel] = useState('intermediario');
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilationProgress, setCompilationProgress] = useState(0);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [generatedMaterial, setGeneratedMaterial] = useState<typeof generatorContent[string] | null>(null);

  const loadingTexts = [
    'Analisando objetivo e perfil selecionados...',
    'Consultando base de dados pedagógica...',
    'Selecionando chunks e expressões ideais...',
    'Formatando guia fonético de pronúncia...',
    'Gerando desafio prático de conversação...',
    'Material customizado pronto!'
  ];

  useEffect(() => {
    document.title = 'Método na Prática — PracinhaEnsina';
  }, []);

  // Handle Generator Compilation Animation
  const handleGenerate = () => {
    setIsCompiling(true);
    setCompilationProgress(0);
    setLoadingTextIndex(0);
    setShowResult(false);

    // Simulate progress bar and text changes
    const textInterval = setInterval(() => {
      setLoadingTextIndex(prev => {
        if (prev < loadingTexts.length - 1) return prev + 1;
        clearInterval(textInterval);
        return prev;
      });
    }, 600);

    const progressInterval = setInterval(() => {
      setCompilationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            const key = `${selectedObjective}-${selectedLevel}`;
            setGeneratedMaterial(generatorContent[key] || null);
            setIsCompiling(false);
            setShowResult(true);
          }, 300);
          return 100;
        }
        return prev + 4;
      });
    }, 120);
  };

  // Autoload a default compilation on mount so the generator isn't empty
  useEffect(() => {
    const key = `${selectedObjective}-${selectedLevel}`;
    setGeneratedMaterial(generatorContent[key]);
    setShowResult(true);
  }, []);

  const getWhatsAppLink = (objective: string, level: string, topic: string) => {
    const message = `Olá Professor Gabriel! Generei uma amostra de aula no seu site para o objetivo de ${objective} (${level}) sobre o tema "${topic}". Gostaria de saber como funcionam as aulas completas!`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="showcase-page" ref={revealRef}>
      {/* Background elements */}
      <div className="showcase-grid-bg" />
      <div className="showcase-glow showcase-glow--1" />
      <div className="showcase-glow showcase-glow--2" />

      <div className="container">
        {/* ===== HEADER ===== */}
        <header className="showcase-header">
          <h1>
            Método <span className="gradient-text">na Prática</span>
          </h1>
          <p>
            Não compre no escuro. Veja exatamente como crio planejamentos sob medida e teste o nosso gerador de materiais para experimentar a personalização na hora.
          </p>
        </header>

        {/* ===== SECTION 1: INTERACTIVE MATERIAL GENERATOR (IDEA 2) ===== */}
        <section className="generator-section fade-in-element" id="generator">
          <div className="generator-card glass-card">
            <div className="generator-grid-layout">
              {/* Controls Column */}
              <div className="generator-controls">
                <h2 className="widget-title">
                  <span>🤖</span> Simulador de Material Customizado
                </h2>
                <p className="widget-desc">
                  Escolha o seu objetivo e o seu nível de inglês atual para gerar uma amostra interativa do material que seria criado para você.
                </p>

                {/* Option 1: Objective */}
                <div className="control-group">
                  <label className="control-label">1. Qual seu objetivo principal?</label>
                  <div className="options-selector">
                    <button
                      className={`option-btn ${selectedObjective === 'negocios' ? 'active' : ''}`}
                      onClick={() => setSelectedObjective('negocios')}
                    >
                      <Briefcase size={18} />
                      Negócios
                    </button>
                    <button
                      className={`option-btn ${selectedObjective === 'viagem' ? 'active' : ''}`}
                      onClick={() => setSelectedObjective('viagem')}
                    >
                      <Globe size={18} />
                      Viagem
                    </button>
                    <button
                      className={`option-btn ${selectedObjective === 'conversacao' ? 'active' : ''}`}
                      onClick={() => setSelectedObjective('conversacao')}
                    >
                      <GraduationCap size={18} />
                      Geral/Estudos
                    </button>
                  </div>
                </div>

                {/* Option 2: Level */}
                <div className="control-group">
                  <label className="control-label">2. Qual seu nível de conversação atual?</label>
                  <div className="options-selector">
                    <button
                      className={`option-btn ${selectedLevel === 'iniciante' ? 'active' : ''}`}
                      onClick={() => setSelectedLevel('iniciante')}
                    >
                      Iniciante
                    </button>
                    <button
                      className={`option-btn ${selectedLevel === 'intermediario' ? 'active' : ''}`}
                      onClick={() => setSelectedLevel('intermediario')}
                    >
                      Intermediário
                    </button>
                    <button
                      className={`option-btn ${selectedLevel === 'avancado' ? 'active' : ''}`}
                      onClick={() => setSelectedLevel('avancado')}
                    >
                      Avançado
                    </button>
                  </div>
                </div>

                <button
                  className="btn-primary btn-generate"
                  onClick={handleGenerate}
                  disabled={isCompiling}
                >
                  <RefreshCw className={isCompiling ? 'spin-icon' : ''} size={18} />
                  {isCompiling ? 'Compilando...' : 'Gerar Minha Amostra'}
                </button>
              </div>

              {/* Screen / Result Column */}
              <div className="generator-screen">
                {isCompiling && (
                  <div className="screen-loader">
                    <div className="loader-spinner"></div>
                    <p className="loader-text">{loadingTexts[loadingTextIndex]}</p>
                    <div className="loader-progress-bar">
                      <div
                        className="loader-progress-fill"
                        style={{ width: `${compilationProgress}%` }}
                      ></div>
                    </div>
                    <span className="loader-percentage">{compilationProgress}%</span>
                  </div>
                )}

                {showResult && generatedMaterial && (
                  <div className="material-output-fade">
                    <div className="material-output-header">
                      <span className="material-badge">Material Sob Medida</span>
                      <h3>Tema: {generatedMaterial.topic}</h3>
                      <div className="material-meta">
                        <span>Foco: {selectedObjective.charAt(0).toUpperCase() + selectedObjective.slice(1)}</span>
                        <span>Nível: {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)}</span>
                      </div>
                    </div>

                    <div className="material-output-body">
                      {/* Vocab block */}
                      <div className="output-section">
                        <h4>📚 Vocabulary & Useful Chunks</h4>
                        <div className="output-vocab-list">
                          {generatedMaterial.vocab.map((v, i) => (
                            <div key={i} className="output-vocab-item">
                              <span className="vocab-term">{v.term}</span>
                              <p className="vocab-def">{v.def}</p>
                              <span className="vocab-example">Exemplo: <em>"{v.ex}"</em></span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pronunciation block */}
                      <div className="output-section">
                        <h4>🗣️ Dica de Pronúncia & Erros Comuns</h4>
                        <p className="output-text-box">{generatedMaterial.pronunciation}</p>
                      </div>

                      {/* Challenge block */}
                      <div className="output-section">
                        <h4>🎯 Desafio de Conversação (Output)</h4>
                        <p className="output-text-box challenge-box">{generatedMaterial.challenge}</p>
                      </div>
                    </div>

                    <div className="material-output-footer">
                      <a
                        href={getWhatsAppLink(selectedObjective, selectedLevel, generatedMaterial.topic)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp-screen"
                      >
                        <Send size={18} />
                        Quero meu planejamento completo
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 2: CASE STUDIES SHOWCASE (IDEA 1) ===== */}
        <section className="cases-section fade-in-element" id="cases">
          <h2 className="section-title">
            Casos de Sucesso & <span className="gradient-text">Evolução</span>
          </h2>
          <p className="section-subtitle">
            Veja a estrutura completa do planejamento e o material desenhado especificamente para perfis de alunos reais da escola.
          </p>

          {/* Student Case Tabs */}
          <div className="cases-tabs">
            {studentCases.map(student => (
              <button
                key={student.id}
                className={`case-tab-btn ${activeCaseId === student.id ? 'active' : ''}`}
                onClick={() => setActiveCaseId(student.id)}
              >
                {student.name}
                <span className="tab-sub">{student.profession.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Active Case Detail Grid */}
          <div className="case-detail-card glass-card">
            <div className="case-grid-layout">
              {/* Diagnosis Column */}
              <div className="case-diagnosis">
                <div className="diagnosis-header">
                  <h3>Diagnóstico de Evolução</h3>
                  <div className="student-badge">
                    <span>👤</span> {activeCase.name} ({activeCase.age})
                  </div>
                </div>

                <div className="info-row">
                  <strong>Objetivo e Nível:</strong>
                  <span>{activeCase.level}</span>
                </div>
                <div className="info-row">
                  <strong>Profissão:</strong>
                  <span>{activeCase.profession}</span>
                </div>

                <div className="diagnosis-challenge-box">
                  <h4>⚠️ O Desafio Principal:</h4>
                  <p>{activeCase.challenge}</p>
                </div>

                {/* Evolution Steps */}
                <div className="evolution-steps-widget">
                  <h4>🗺️ Plano de Aula Estruturado:</h4>
                  <div className="widget-steps-list">
                    {activeCase.planSteps.map(step => (
                      <div key={step.num} className="widget-step-item">
                        <div className="step-num">{step.num}</div>
                        <div className="step-content">
                          <h5>{step.title}</h5>
                          <p>{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Material Sample Column */}
              <div className="case-material-sample">
                <div className="sample-header">
                  <h4>📝 Amostra de Exercício do Aluno</h4>
                  <span className="preview-tag">Preview de Tela</span>
                </div>

                <div className="sample-material-box">
                  <h3 className="sample-material-title">{activeCase.materialPreview.title}</h3>

                  <div className="sample-section">
                    <h5>📚 Vocabulário sob Medida</h5>
                    <div className="sample-vocab-list">
                      {activeCase.materialPreview.vocabulary.map((vocab, i) => (
                        <div key={i} className="sample-vocab-item">
                          <span className="sample-term">{vocab.term}</span>
                          <span className="sample-def">{vocab.def}</span>
                          <span className="sample-example">Ex: <em>"{vocab.ex}"</em></span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="sample-section">
                    <h5>🗣️ Pronúncia Guiada</h5>
                    <p className="sample-pronunciation-text">{activeCase.materialPreview.pronunciation}</p>
                  </div>

                  <div className="sample-section">
                    <h5>🎯 Desafio Prático de Output</h5>
                    <p className="sample-challenge-text">{activeCase.materialPreview.challenge}</p>
                  </div>
                </div>

                <div className="sample-action-container">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá Professor Gabriel! Vi o caso de sucesso do ${activeCase.name} no site e achei incrível. Gostaria de agendar uma aula experimental!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary btn-full-width"
                  >
                    Quero um planejamento como este
                    <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
