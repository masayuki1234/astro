import Tarot from "../images/Tarot.png";
import Astrology from "../images/astrology.png";
import Shichu from "../images/shichusuimei.png";

export const Menu = () => {
  return (
    <div className="Imgcontainer">
      <div className="Tarot">
        <p>タロット</p>
        <img className="Images" src={Tarot} alt="ad" />
      </div>
      <div className="Astrology">
        <p>西洋占星術</p>
        <img className="Images" src={Astrology} alt="ad" />
      </div>
      <div className="Shichu">
        <p>四柱推命</p>
        <img className="Images" src={Shichu} alt="ad" />
      </div>
      {/* 💡 修正点：<style jsx> に変更し、:hover を外に出す */}
      <style jsx>{`
        .Imgcontainer {
          display: flex;
          justify-content: space-around;
          padding: 20px;
          box-sizing: border-box; // パディングを含めて100%にする
          /* text-align: center; は、子要素で個別に制御 */
        }
        /* 1. 各コンテナ（親要素）の定義 */
        .Tarot,
        .Astrology,
        .Shichu {
          position: relative; /* 文字の基準点にする */
          width: 30%;
          text-align: center;
        }

        .Images {
          width: 100%; /* 親要素の幅いっぱいに広げる */
          max-width: 100%;
          border-radius: 20px;
          height: auto;
          display: block;

          /*トランジション設定*/
          transform-origin: center center;
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          cursor: pointer;
        }
        .Tarot p,
        .Astrology p,
        .Shichu p {
          position: absolute; /*ここが重要：絶対位置で重ねる */
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%); /* 要素を真ん中に寄せる */

          z-index: 10; /* 画像の上に確実に来るように設定 */
          color: white;
          font-size: 70%;
          background-color: rgba(0, 0, 0, 0.6);
          padding: 10px 20px;
          border-radius: 10px;
          margin: 0;
          width: 50%; /* テキストの長さに合わせる */
        }
        /* 💡 ホバー時のスタイルは独立したセレクタとして定義します */
        .Images:hover {
          transform: scale(1.1); /* 拡大 */
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .Tarot:hover .Images,
        .Astrology:hover .Images,
        .Shichu:hover .Images {
          /* 画像のホバーを親要素に移行し、画像だけをスケールさせる */
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};
