import { useEffect, useRef } from 'react';
import { Clock, Instagram, ArrowRight } from 'lucide-react';
import './Contact.css';

const WHATSAPP_URL =
  'https://wa.me/5584986236412?text=Olá Professor Gabriel! Vi seu site e gostaria de saber mais sobre as aulas de inglês.';

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const targets = node.querySelectorAll<HTMLElement>(
      '.contact-header, .contact-whatsapp-card, .contact-info-items'
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

/* Inline WhatsApp SVG icon (green) for large display */
function WhatsAppSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="#22c55e" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Contact() {
  const revealRef = useScrollReveal();

  useEffect(() => {
    document.title = 'Contato — PracinhaEnsina';
  }, []);

  return (
    <div className="contact-page" ref={revealRef}>
      <div className="container">
        {/* Header */}
        <div className="contact-header" id="contact-header">
          <h1>
            Vamos <span className="gradient-text">conversar</span>?
          </h1>
          <p>
            O primeiro passo para a fluência é uma mensagem. Me conte seus objetivos e
            vamos montar o melhor plano para você.
          </p>
        </div>

        {/* WhatsApp Card */}
        <div
          className="glass-card contact-whatsapp-card"
          id="contact-whatsapp-card"
        >
          <div className="whatsapp-icon-large">
            <WhatsAppSvg />
          </div>
          <h2>Me chame no WhatsApp</h2>
          <p className="contact-phone">(84) 98623-6412</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-contact"
            id="contact-whatsapp-btn"
          >
            Abrir WhatsApp
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="contact-info-items" id="contact-info-items">

          <div className="contact-info-item" id="contact-instagram">
            <div className="contact-info-icon">
              <Instagram />
            </div>
            <div className="contact-info-text">
              <span className="contact-info-label">Instagram</span>
              <span className="contact-info-value">
                <a
                  href="https://instagram.com/pracinhaensina"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @pracinhaensina
                </a>
              </span>
            </div>
          </div>

          <div className="contact-info-item" id="contact-hours">
            <div className="contact-info-icon">
              <Clock />
            </div>
            <div className="contact-info-text">
              <span className="contact-info-label">Horário de atendimento</span>
              <span className="contact-info-value">
                Segunda a Sexta, 8h às 21h
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
