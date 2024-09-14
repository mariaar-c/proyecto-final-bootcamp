export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 text-center">
      <div className="mb-3">
        <a href="https://www.instagram.com/" className="text-white mx-4">
          <i className="fa-brands fa-instagram fa-2x"></i>
        </a>
        <a href="https://www.x.com/" className="text-white mx-4">
          <i className="fa-brands fa-x-twitter fa-2x"></i>
        </a>
        <a href="https://www.tiktok.com/" className="text-white mx-4">
          <i className="fa-brands fa-tiktok fa-2x"></i>
        </a>
        <a href="https://www.facebook.com/" className="text-white mx-4">
          <i className="fa-brands fa-facebook fa-2x"></i>
        </a>
      </div>
      <ul className="list-unstyled mb-0 d-inline-flex">
        <li className="me-3">
          <a href="/#" className="text-white text-decoration-none">
            Registra un restaurante
          </a>
        </li>
        <li className="me-3">
          <a href="/#" className="text-white text-decoration-none">
            Trabaja con nosotros
          </a>
        </li>
        <li className="me-3">
          <a href="/#" className="text-white text-decoration-none">
            Condiciones del servicio
          </a>
        </li>
        <li className="me-3">
          <a href="/#" className="text-white text-decoration-none">
            Política de privacidad
          </a>
        </li>
      </ul>
    </footer>
  );
}
