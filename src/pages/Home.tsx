import { useEffect, useRef } from 'react';
import {
  Target,
  Rocket,
  Bot,
  Heart,
  Globe,
  Briefcase,
  GraduationCap,
  Send,
  ClipboardList,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import './Home.css';

const WHATSAPP_URL =
  'https://wa.me/5584986236412?text=Olá Professor Gabriel! Vi seu site e gostaria de saber mais sobre as aulas de inglês.';

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const targets = node.querySelectorAll<HTMLElement>(
      '.diferencial-card, .publico-card, .step-item, .como-funciona-cta, .fade-in-section'
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

export default function Home() {
  const revealRef = useScrollReveal();

  useEffect(() => {
    document.title = 'PracinhaEnsina — Aulas de Inglês Personalizadas';
  }, []);

  const scrollToDiferenciais = () => {
    const el = document.getElementById('diferenciais');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={revealRef}>
      {/* ===== HERO ===== */}
      <section className="hero" id="hero">
        {/* Animated grid background */}
        <div className="hero-grid-bg" />

        {/* Decorative glow circles */}
        <div className="hero-glow-circle hero-glow-circle--1" />
        <div className="hero-glow-circle hero-glow-circle--2" />
        <div className="hero-glow-circle hero-glow-circle--3" />

        <div className="hero-content">
          <h1>
            Aprenda inglês de verdade.{' '}
            <span className="gradient-text">No seu ritmo, do seu jeito.</span>
          </h1>

          <p className="hero-subtitle">
            Aulas particulares online com materiais 100% personalizados, tecnologia de
            ponta e foco total na sua fluência.
          </p>

          <div className="hero-buttons">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              id="hero-cta-primary"
            >
              Agende sua Aula Experimental
              <ArrowRight size={18} />
            </a>
            <button
              className="btn-secondary"
              onClick={scrollToDiferenciais}
              id="hero-cta-secondary"
            >
              Conheça o Método
            </button>
          </div>
        </div>
      </section>

      {/* ===== DIFERENCIAIS ===== */}
      <section className="diferenciais" id="diferenciais">
        <div className="container">
          <div className="fade-in-section">
            <h2 className="section-title">
              Por que aprender com o{' '}
              <span className="gradient-text">Professor Gabriel</span>?
            </h2>
          </div>

          <div className="diferenciais-grid">
            <div className="glass-card diferencial-card" id="diff-1">
              <div className="diferencial-icon">
                <Target />
              </div>
              <h3>Materiais 100% Personalizados</h3>
              <p>
                Cada aula é criada especificamente para você. Nada de apostilas genéricas
                — seu material é único, feito sob medida para seus objetivos e nível.
              </p>
            </div>

            <div className="glass-card diferencial-card" id="diff-2">
              <div className="diferencial-icon">
                <Rocket />
              </div>
              <h3>Foco em Fluência Real</h3>
              <p>
                Método focado em resultados rápidos. Você não vai só estudar gramática —
                vai aprender a pensar e se comunicar em inglês com naturalidade.
              </p>
            </div>

            <div className="glass-card diferencial-card" id="diff-3">
              <div className="diferencial-icon">
                <Bot />
              </div>
              <h3>Tecnologia e IA a Seu Favor</h3>
              <p>
                Uso inteligência artificial para criar materiais mais eficientes,
                acompanhar sua evolução e otimizar cada minuto da sua aula.
              </p>
            </div>

            <div className="glass-card diferencial-card" id="diff-4">
              <div className="diferencial-icon">
                <Heart />
              </div>
              <h3>Acompanhamento Humanizado</h3>
              <p>
                Tecnologia sem perder o toque humano. Conheço cada aluno pelo nome,
                entendo seus desafios e celebro cada conquista junto com você.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PÚBLICO-ALVO ===== */}
      <section className="publico-alvo" id="publico-alvo">
        <div className="container">
          <div className="fade-in-section">
            <h2 className="section-title">
              Inglês para <span className="gradient-text">todos os objetivos</span>
            </h2>
            <p className="section-subtitle">
              Não importa se você quer viajar, crescer na carreira ou estudar fora — o
              método se adapta a você.
            </p>
          </div>

          <div className="publico-alvo-grid">
            <div className="glass-card publico-card" id="publico-1">
              <div className="publico-icon">
                <Globe />
              </div>
              <h3>Inglês para Viagens</h3>
              <p>
                Prepare-se para se comunicar com confiança em qualquer lugar do mundo.
              </p>
            </div>

            <div className="glass-card publico-card" id="publico-2">
              <div className="publico-icon">
                <Briefcase />
              </div>
              <h3>Inglês para Negócios</h3>
              <p>
                Destaque-se no mercado com fluência profissional em reuniões, e-mails e
                apresentações.
              </p>
            </div>

            <div className="glass-card publico-card" id="publico-3">
              <div className="publico-icon">
                <GraduationCap />
              </div>
              <h3>Inglês para Estudos</h3>
              <p>
                Preparação focada para exames internacionais e vida acadêmica no exterior.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMO FUNCIONA ===== */}
      <section className="como-funciona" id="como-funciona">
        <div className="container">
          <div className="fade-in-section">
            <h2 className="section-title">
              Simples, direto e <span className="gradient-text">eficiente</span>
            </h2>
          </div>

          <div className="steps-timeline">
            <div className="step-item" id="step-1">
              <div className="step-number-wrap">
                <div className="step-icon">
                  <Send />
                </div>
                <span className="step-number">1</span>
              </div>
              <div className="step-text">
                <h3>Entre em contato</h3>
                <p>
                  Me chame no WhatsApp e conte seus objetivos com o inglês.
                </p>
              </div>
            </div>

            <div className="step-item" id="step-2">
              <div className="step-number-wrap">
                <div className="step-icon">
                  <ClipboardList />
                </div>
                <span className="step-number">2</span>
              </div>
              <div className="step-text">
                <h3>Aula experimental gratuita</h3>
                <p>
                  Fazemos uma aula experimental para eu conhecer seu nível e criar seu
                  plano personalizado.
                </p>
              </div>
            </div>

            <div className="step-item" id="step-3">
              <div className="step-number-wrap">
                <div className="step-icon">
                  <Rocket />
                </div>
                <span className="step-number">3</span>
              </div>
              <div className="step-text">
                <h3>Evolução garantida</h3>
                <p>
                  Aulas semanais com materiais exclusivos, acompanhamento constante e
                  resultados visíveis.
                </p>
              </div>
            </div>
          </div>

          <div className="como-funciona-cta">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              id="cta-comecar"
            >
              Começar Agora
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="cta-final" id="cta-final">
        <div className="cta-final-bg" />
        <div className="cta-final-content fade-in-section">
          <h2>
            Seu próximo nível em inglês{' '}
            <span className="gradient-text">começa com uma conversa.</span>
          </h2>
          <p className="cta-subtitle">
            Agende sua aula experimental gratuita e descubra como o PracinhaEnsina pode
            transformar seu inglês.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-big"
            id="cta-final-whatsapp"
          >
            <MessageCircle size={24} />
            Falar com o Professor Gabriel
          </a>
        </div>
      </section>
    </div>
  );
}
