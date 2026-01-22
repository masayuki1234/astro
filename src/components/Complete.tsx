import { useContext, useEffect, useState } from "react";
import { FormContext } from "./FormContext";

export const Complete = () => {
  const context = useContext(FormContext);

  if (!context) return null;

  const { formData, setFormData } = context;

  const [compName] = useState(formData.name); //画面表示用に名前をコピー

  //useEffect を使って画面表示後にContextをリセットする
  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      menu: "",
      message: "",
      birthday: "",
    });
  }, []);
  return (
    <div className="form-comp">
      <h1>申し込み完了</h1>
      <hr />
      <p>
        {" "}
        {compName}様、申し込みありがとうございます。
        <br />
        日時が決定次第、こちらからメールにてご連絡させていただきます。
        <br />
        example@gmail.comからのメールを受信できるように、受信設定の見直しをお願いします。
      </p>
      <style jsx>
        {`
          .form-comp {
            max-width: 600px;
            margin: 40px auto;
            padding: 20px;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
};
