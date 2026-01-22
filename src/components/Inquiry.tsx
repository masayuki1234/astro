import { PrefetchPageLinks } from "react-router-dom";
import { useState } from "react";

export const Inquiry = () => {
  //フォーム送信処理のハンドラ
  const handleSubmit = (event) => {
    //デフォルトのフォーム送信を阻止
    event.preventDefault();

    //FormDataを取得
    const formData = new FormData(event.target);

    //FormDataをJSONオブジェクトに変換(Node.jsで処理しやすくなる)
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    //データを整形
    /*let message = "フォームの送信内容:\n\n";
    formData.forEach((value, key) => {
      message += `${key}:${value}\n`;
    });*/
    //デバック用コンソール出力
    console.log("送信データ：", data);
    // メール送信,バックエンドへデータ送信
    fetch("https://httpbin.org/post", {
      // CodeSandboxのAPIパス
      method: "POST",
      // JSON形式でデータを送信
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      // 1. HTTPステータスコードをチェック
      .then((response) => {
        if (!response.ok) {
          // サーバー側でエラー(4xx, 5xx)が返された場合、エラーメッセージを投げる
          console.error(
            `HTTP Error: ${response.status} ${response.statusText}`
          );
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        // 成功した場合、JSONとしてパース
        return response.json();
      })
      .then((result) => {
        // 2. Node.jsのAPIからのJSON応答を処理
        if (result) {
          alert("お問い合わせを受け付けました。");
          event.target.reset(); // フォームをリセット
        } else {
          // API側でエラーが返された場合 (例: success: false)
          alert(`送信に失敗しました: ${result.message}`);
          console.error("API Error Details:", result.error);
        }
      })
      .catch((error) => {
        // 3. fetch自体のエラー（ネットワークエラー、JSONパースエラーなど）をキャッチ
        console.error("Fetch/Network Error:", error);
        // HTTPエラーの詳細メッセージをアラートに表示
        alert(
          `送信中に予期せぬエラーが発生しました。詳細: ${
            error.message || error
          }`
        );
      });
  };

  return (
    <div className="Inquiry-container">
      <h1>お問い合わせフォーム</h1>
      <hr />
      <form id="contactform" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>お名前</label>
          <input type="text" id="Iqname" name="Iqname" required />
        </div>
        <div className="form-group">
          <label>メールアドレス</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label>お問い合わせ内容</label>
          <textarea id="message" name="message" rows="5" />
        </div>
        <button type="submit">送信</button>
      </form>
      <style jsx>
        {`
          .Inquiry-container {
            max-width: 600px;
            margin: 40px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
            text-align: left;
            background-color: black;
            color: #ddd;
            box-sizing: border-box; // パディングを含めて100%にする
          }
          .form-group {
            margin-bottom: 20px;
          }
          label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
          }
          input[type="text"],
          input[type="email"],
          textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box; /* paddingを含めて幅100%にする */
          }
          button[type="submit"] {
            background-color: #ffc700;
            color: #333;
            padding: 12px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            width: 100%;
          }
          button[type="submit"]:hover {
            background-color: #ffa700;
          }
        `}
      </style>
    </div>
  );
};
