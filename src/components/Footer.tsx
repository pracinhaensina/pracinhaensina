import { Link } from 'react-router-dom';
import { GraduationCap, MessageCircle, Instagram } from 'lucide-react';
import './Footer.css';

const WHATSAPP_URL =
  'https://wa.me/5584986236412?text=Olá Professor Gabriel! Vi seu site e gostaria de saber mais sobre as aulas de inglês.';

const INSTAGRAM_URL = 'https://instagram.com/pracinhaensina';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          {/* Brand Column */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <GraduationCap className="footer__logo-icon" size={26} />
              <span className="footer__logo-text">
                <span className="footer__logo-white">Pracinha</span>
                <span className="footer__logo-accent">Ensina</span>
              </span>
            </Link>
            <p className="footer__description">
              Aprenda inglês de verdade com aulas personalizadas e uma
              metodologia que funciona. Seu próximo nível começa aqui.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer__column-title">Navegação</h4>
            <nav className="footer__links">
              <Link to="/" className="footer__link">
                Início
              </Link>
              <Link to="/sobre" className="footer__link">
                Sobre
              </Link>
              <Link to="/metodo-na-pratica" className="footer__link">
                Método na Prática
              </Link>
              <Link to="/contato" className="footer__link">
                Contato
              </Link>
            </nav>
          </div>

          {/* Social / Connect */}
          <div>
            <h4 className="footer__column-title">Redes Sociais</h4>
            <div className="footer__socials">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <hr className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2026 PracinhaEnsina — Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
