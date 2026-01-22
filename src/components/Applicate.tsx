import { useContext } from "react";
import { useNavigate } from "react-router-dom"; //navigateフックで確認ページに送信してみる
import { FormContext } from "./FormContext";

export const Form = () => {
  //Contextから既存でーたを読み込み、それを初期値として設定
  const { formData, setFormData } = useContext(FormContext)!;

  //navigateフック
  const navigate = useNavigate();
  //入力値が変更されたときにStateを更新するハンドラ
  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const { name, value } = e.target;
    setFormData((PrevData) => ({
      ...PrevData,
      [name]: value,
    }));
  };
  //フォームがそうしんされたときのハンドラ
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //ページの再読み込みを防ぐ
    //送信処理を記述
    //confirmページに移動して、formDataをStateとして渡す
    navigate("/confirm", {
      state: {
        data: formData, //渡したいデータをオブジェクトに入れる
      },
    });
  };
  return (
    <div className="form-container">
      <h2>申し込みフォーム</h2>
      <hr></hr>
      <form onSubmit={handleSubmit}>
        {/*名前 */}
        <div className="form-group">
          <label htmlFor="name">お名前（必須）</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        {/*メールアドレス*/}
        <div className="form-group">
          <label htmlFor="email">メールアドレス（必須）</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="menu">相談メニュー(必須)</label>
          <select
            id="menu"
            name="menu"
            value={formData.menu}
            onChange={handleChange}
            required
          >
            <option value="">メニューを選択してください</option>
            <option value="tarot">タロット</option>
            <option value="astrology">西洋占星術</option>
            <option value="shichusuimei">四柱推命</option>
          </select>
        </div>
        {/* 3. ご相談内容 */}
        <div className="form-group">
          <label htmlFor="message">ご相談内容</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        {/*生年月日 */}
        <div className="form-group">
          <label htmlFor="birthday">生年月日</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
          />
        </div>
        {/* 4. 送信ボタン */}
        <button type="submit">確認</button>
      </form>
      <style jsx>{`
        .form-container {
          max-width: 600px;
          margin: 40px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          text-align: left;
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
        input[type="date"],
        textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-sizing: border-box; /* paddingを含めて幅100%にする */
          background-color: #e8dbcd;
        }
        select {
          width: 100%;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 10px;
          background-color: #e8dbcd;
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
          background-color: #ffb700;
        }
      `}</style>
    </div>
  );
  1;
};
