// server.js

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000; // CodeSandboxが割り当てるポートを使用

// JSON形式のリクエストボディを解析するためのミドルウェア
app.use(express.json());

// CORS対策 (CodeSandboxのプレビューからリクエストを受け付けるため)
app.use((req, res, next) => {
  // 全てのオリジンからのリクエストを許可
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "POST");

  // OPTIONSメソッド（プリフライトリクエスト）を許可
  if (req.method === "OPTIONS") {
    return res.status(200).send();
  }
  next();
});

// 新しいAPIエンドポイント: /send-mail への POST リクエスト
app.post("/send-mail", async (req, res) => {
  const { Iqname, email, message } = req.body;

  if (!Iqname || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "必須項目が不足しています。" });
  }

  // 環境変数 (Secrets) から認証情報を取得
  const SENDER_EMAIL = process.env.SMTP_USER;
  const SENDER_PASSWORD = process.env.SMTP_PASSWORD;
  const RECEIVER_EMAIL = "yomogi.anko100pct@gmail.com";

  if (!SENDER_EMAIL || !SENDER_PASSWORD) {
    console.error("SMTP認証情報が設定されていません。");
    return res.status(500).json({
      success: false,
      message: "サーバー設定エラー: メール認証情報が不足しています。",
    });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: SENDER_EMAIL, pass: SENDER_PASSWORD },
  });

  const mailOptions = {
    from: `お問い合わせフォーム <${SENDER_EMAIL}>`,
    to: RECEIVER_EMAIL,
    subject: `ウェブサイトからのお問い合わせ: ${Iqname}様より`,
    text: `お名前: ${Iqname}\nメールアドレス: ${email}\nお問い合わせ内容:\n${message}`,
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: "メールが正常に送信されました。" });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    res.status(500).json({
      success: false,
      message: "メール送信中にエラーが発生しました。",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Expressサーバーがポート ${PORT} で稼働中です。`);
  // CodeSandboxでサーバーが起動したことを確認できます
});
