import { Hamb } from "./HamburgerB";
import { Link } from "react-router-dom";
import Logo from "../images/Logo.jpg";

export const Header = () => {
  return (
    <>
      <div className="container">
        <Hamb />
        <Link to="/">
          <img className="Logo" src={Logo} alt="ad"></img>
        </Link>
        <div className="spacer"></div>
        {/*スペーサー（左右のバランス要員）*/}
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            justify-content: space-between; /* 3要素を両端と中央に配置 */
            align-items: center;
            margin: 0;
            box-sizing: border-box;
            width: 100%;
            background-color: #333;
            padding: 0px 20px;
            position: relative;
            height: 80px;
            overflow-x: hidden; // はみ出しを防止
          }
          .Logo {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            flex: 1; /* 余白を埋める */
            text-align: center; /* テキストを中央に */
            margin: 0;
            max-width: 80px;
            border-radius: 5px;
          }
          .spacer {
            width: 40px;
          }
        `}
      </style>
    </>
  );
};
