import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FormContext } from "./FormContext";
import { useState, useContext } from "react";

export const Confirm = () => {
  const location = useLocation();
  const navigate = useNavigate(); // useNavigateフックを使用

  //location.stateからデータを取得
  const { formData } = useContext(FormContext)!;
  const handleSubmit = () => {
    navigate("/complete", {
      state: {
        data: formData, //渡したいデータをオブジェクトに入れる
      },
    });
  };
  const handleBack = () => {
    // 1. 直前のページに戻る (ブラウザの「戻る」ボタンと同じ動作)
    navigate("/form");

    // 2. または、特定のパスに戻る場合
    // navigate('/form');
  };
  //mapping
  const menuMap = {
    tarot: "タロット",
    astrology: "西洋占星術",
    shichusuimei: "四柱推命",
  };
  const displayMenu = menuMap[formData.menu as keyof typeof menuMap];
  return (
    <div className="con-container">
      <h1>フォーム内容確認</h1>
      <hr></hr>
      <label className="con-label">お名前</label>
      <p>{formData.name}</p>
      <label className="con-label">メールアドレス</label>
      <p>{formData.email}</p>
      <label className="con-label">相談メニュー</label>
      <p>{displayMenu}</p>
      <label className="con-label">相談内容</label>
      <p>{formData.message}</p>
      <label className="con-label">生年月日</label>
      <p>{formData.birthday}</p>
      {/* もどるボタン */}
      <div className="but">
        <button type="button" onClick={handleBack}>
          戻る
        </button>
        {/* 4. 送信ボタン */}　
        <button type="submit" onClick={handleSubmit}>
          送信
        </button>
      </div>
      <style jsx>
        {`
          .con-container {
            max-width: 600px;
            margin: 40px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
            text-align: left;
          }
          .con-label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
          }
          .but {
            text-align: center;
          }
          button[type="button"] {
            background-color: #ddd;
            color: #333;
            padding: 12px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            width: 40%;
          }
          button[type="submit"] {
            background-color: #ffc700;
            color: #333;
            padding: 12px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            width: 40%;
          }
          button[type="button"]:hover {
            background-color: #a9a9a9;
          }
          button[type="submit"]:hover {
            background-color: #ffb700;
          }
        `}
      </style>
    </div>
  );
};
