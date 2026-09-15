export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="footer-brand">Matero.sgo</span>
        <a
          href="https://www.instagram.com/matero.sgo"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-ig"
          aria-label="Instagram de Matero.sgo"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
          </svg>
          @matero.sgo
        </a>
        <p className="footer-copy">© EFACELLI — Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
