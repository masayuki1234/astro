import classes from "./HamburgerB.module.scss";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export const Hamb = () => {
  //メニューの開閉状態を管理するState
  const [isOpen, setIsOpen] = useState(false);

  //メニューパネル全体を参照するためにRefを作成
  const menuRef = useRef(null);

  //クリック時の状態切り替え関数
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  //外側のクリック検知
  useEffect(() => {
    //クリックイベントを処理する関数
    const handleClickOutSide = (event: React.MouseEvent<HTMLButtonElement>) => {
      //条件
      //1.メニューが開いてるか？(isOpen)
      //2.クリックされた要素がmenuRefの内部に含まれていないか？
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        //メニューの外側がクリックされた場合、メニューを閉じる
        setIsOpen(false);
      }
    };
    //メニューが開いている場合のみ、ドキュメント全体にイベントリスナーを追加
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutSide);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [isOpen]);
  return (
    //ハンバーガーメニュー（3本線ボタン）
    <nav
      className={`${classes.menu} ${isOpen ? classes.open : ""}`}
      ref={menuRef}
    >
      {/* ハンバーガーボタン (クリック対象) */}
      {/* isOpenがtrueの場合、classes.active クラスを付与 */}
      <div
        className={`${classes.hamburger} ${isOpen ? classes.active : ""}`}
        onClick={handleToggle} // クリックイベントで状態を切り替える
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul>
        <li>
          <Link to="/" onClick={handleToggle}>
            トップ
          </Link>
        </li>
        <li>
          <Link to="/form" onClick={handleToggle}>
            申し込み
          </Link>
        </li>
        <li>
          <Link to="/infomation" onClick={handleToggle}>
            お知らせ
          </Link>
        </li>
        <li>
          <a>
            <s>占い実績・レビュー</s>
          </a>
        </li>
        <li>
          <Link to="/Inquiry" onClick={handleToggle}>
            お問い合わせ
          </Link>
        </li>
      </ul>
    </nav>
  );
};
