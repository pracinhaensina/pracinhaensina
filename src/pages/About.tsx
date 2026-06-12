import { useEffect, useRef } from 'react';
import fotoGabriel from '../assets/foto-gabriel.jpg';
import './About.css';

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const targets = node.querySelectorAll<HTMLElement>(
      '.professor-text, .professor-photo-wrap, .info-card, .method-step, .fade-in-section'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
}

const infoCards = [
  { emoji: '📚', text: 'Materiais próprios personalizados' },
  { emoji: '🖥️', text: 'Aulas 100% online' },
  { emoji: '🤖', text: 'Tecnologia e IA integradas' },
  { emoji: '💬', text: 'Acompanhamento individual' },
];

const methodSteps = [
  {
    number: 1,
    title: 'Diagnóstico personalizado',
    description:
      'Antes de tudo, entendo exatamente onde você está e onde quer chegar.',
  },
  {
    number: 2,
    title: 'Plano sob medida',
    description:
      'Crio um plano de evolução específico para os seus objetivos e timeline.',
  },
  {
    number: 3,
    title: 'Materiais exclusivos',
    description:
      'Cada aula tem material criado do zero, com apoio de IA, especificamente para você.',
  },
  {
    number: 4,
    title: 'Foco em output',
    description:
      'Prática real desde o primeiro dia. Você fala, escreve e pensa em inglês — sem tradução mental.',
  },
  {
    number: 5,
    title: 'Evolução mensurável',
    description:
      'Acompanho seu progresso com métricas claras. Você vai VER sua evolução.',
  },
];

export default function About() {
  const revealRef = useScrollReveal();

  useEffect(() => {
    document.title = 'Sobre — PracinhaEnsina';
  }, []);

  return (
    <div ref={revealRef}>
      {/* ===== PROFESSOR GABRIEL ===== */}
      <section className="professor-section" id="professor">
        <div className="container">
          <div className="professor-grid">
            {/* Text column */}
            <div className="professor-text">
              <h1>
                Quem <span className="gradient-text">sou eu</span>?
              </h1>
              <p>
                Prazer, sou o Gabriel — professor de inglês, apaixonado por educação e
                obcecado por encontrar o melhor caminho para cada aluno.
              </p>
              <p>
                Acredito que aprender inglês não precisa ser chato, demorado ou
                frustrante. Com o método certo, materiais que fazem sentido pra você e um
                professor que realmente se importa, fluência é questão de tempo.
              </p>
              <p>
                Criei o PracinhaEnsina para ser diferente: aqui não existe aula de
                caixinha. Cada material é pensado para o seu nível, para os seus objetivos
                e para o seu ritmo. E sim — uso tecnologia e inteligência artificial para
                tornar tudo isso mais eficiente, sem perder o que realmente importa: a
                conexão humana.
              </p>
            </div>

            {/* Photo column */}
            <div className="professor-photo-wrap">
              <div className="professor-photo-placeholder" id="professor-photo">
                <img
                  src={fotoGabriel}
                  alt="Professor Gabriel"
                  className="professor-photo-img"
                />
              </div>
            </div>
          </div>

          {/* Info cards */}
          <div className="professor-info-cards">
            {infoCards.map((card, index) => (
              <div
                className="glass-card info-card"
                key={index}
                id={`info-card-${index + 1}`}
              >
                <span className="info-card-emoji">{card.emoji}</span>
                <span>{card.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== METODOLOGIA ===== */}
      <section className="metodologia-section" id="metodologia">
        <div className="container">
          <h2>
            O Método <span className="gradient-text">PracinhaEnsina</span>
          </h2>

          <div className="method-steps">
            {methodSteps.map((step) => (
              <div
                className="method-step"
                key={step.number}
                id={`method-step-${step.number}`}
              >
                <div className="method-step-number">{step.number}</div>
                <div className="method-step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
