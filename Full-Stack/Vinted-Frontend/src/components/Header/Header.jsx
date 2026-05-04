import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/img/vinted_logo.png";

const Header = ({ handleToken, userToken }) => {
  return (
    <header>
      <div className="container">
        <div className="header-container">
          <Link to="/">
            <img className="logo" src={logo} alt="vinted_logo" />
          </Link>
          <nav>
            <div>
              <ul>
                {!userToken ? (
                  <>
                    <li>
                      <Link to="/signup" className="connect-btn">
                        S'inscrire
                      </Link>
                    </li>
                    <li>
                      <Link to="/login" className="connect-btn">
                        Se connecter
                      </Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <button
                      className="logout-btn"
                      onClick={() => {
                        handleToken(null);
                      }}
                    >
                      Déconnexion
                    </button>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <ul>
                <li>
                  <Link to="/publish" className="sold-btn">
                    Vends tes articles
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
