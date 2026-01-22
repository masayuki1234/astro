import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const Footer = () => {
  const Today = new Date();
  const [ranking, setRanking] = useState<string[]>([]);

  const items = [
    "牡羊座",
    "牡牛座",
    "双子座",
    "蟹座",
    "獅子座",
    "乙女座",
    "天秤座",
    "蠍座",
    "射手座",
    "山羊座",
    "水瓶座",
    "魚座",
  ];
  //今日の日付を数値化
  const dateNum =
    Today.getFullYear() * 10000 +
    (Today.getMonth() + 1) * 100 +
    Today.getDate() +
    1;

  const getColorCodeSite = (name:string) => {
    const charCodeSum = name
      .split("")
      .reduce((acc:number, char:string) => acc + char.charCodeAt(0), 0);
    const ColorSeed = dateNum + charCodeSum;
    return (
      Math.floor(((Math.sin(ColorSeed) + 1) / 2) * (1100 - 1000 + 1)) + 1000
    );
  };
  useEffect(() => {
    //星座リストを日付シードでシャッフル
    const shuffled = [...items].sort((a, b) => {
      //日付と星座名の文字コードを組み合わせ
      const hashA = Math.sin(dateNum + a.charCodeAt(0)) * 10000;
      const hashB = Math.sin(dateNum + b.charCodeAt(0)) * 10000;
      return hashA - hashB;
    });
    setRanking(shuffled);
  }, []);

  return (
    <>
      <div
        style={{
          padding: "20px",
          maxWidth: "500px",
          margin: "0 auto",
          boxSizing: "border-box",
          overflowX: "hidden",
        }}
      >
        <h2>今日の星座ランキング</h2>
        <p>
          {Today.getFullYear()}年{Today.getMonth() + 1}月{Today.getDate()}
          日の運勢
        </p>
        <hr></hr>

        <div style={{ marginTop: "20px" }}>
          <table
            style={{
              width: "100%",
              maxWidth: "100%",
              alignItems: "center",
              margin: "",
              borderSpacing: "0 15px",
              background: "#333",
              borderRadius: "20px",
            }}
          >
            <thead>
              <tr>
                <th>順位</th>
                <th>星座</th>
                <th>ラッキーカラー</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((name, index) => {
                const code = getColorCodeSite(name);
                const url = `https://www.colordic.org/colorsample/${code}`;
                return (
                  <tr key={name}>
                    <td style={{ width: "20%", textAlign: "center" }}>
                      {index + 1}位
                    </td>
                    <td style={{ width: "50%", textAlign: "center" }}>
                      {name}
                    </td>
                    <td style={{ width: "30%", textAlign: "center" }}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#000",
                          background: "#9790a4",
                          borderRadius: "3px",
                        }}
                      >
                        ココ！
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
