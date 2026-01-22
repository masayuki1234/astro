// ファイル名: api/send-mail.js

const nodemailer = require("nodemailer");

// 環境変数が設定されていない場合は、適宜値を置き換えてください
const SENDER_EMAIL = process.env.SMTP_USER || "yomogi.anko100pct@gmail.com";
const SENDER_PASSWORD = process.env.SMTP_PASSWORD || "your_smtp_password";
const RECEIVER_EMAIL = "yomogi.anko100pct@gmail.com"; // 受信者アドレス

// Nodemailerのトランスポータ設定 (Gmailを例としています)
const transporter = nodemailer.createTransport({
  // 例: Gmailの場合
  service: "gmail",
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_PASSWORD,
  },
  // その他のSMTPサービスを使用する場合は設定を変更してください
  // host: "smtp.example.com",
  // port: 587,
  // secure: false, // true for 465, false for other ports
});

// CodeSandboxのサーバーレス関数として動作するためのエクスポート
module.exports = async (req, res) => {
  // POSTメソッド以外は拒否 (このチェックがサーバーレス環境で正しく機能しているか確認)
  if (req.method !== "POST") {
    // Nginxが先に405を返している場合、このコードは実行されていない可能性が高い
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed (API code)" });
  }

  // リクエストボディからデータを取得 (React側でJSON.stringifyしているため)
  const { Iqname, email, message } = req.body;

  if (!Iqname || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  // メール本文の生成
  const mailContent = `
        フォームからの送信内容：

        お名前: ${Iqname}
        メールアドレス: ${email}
        お問い合わせ内容:
        --------------------
        ${message}
        --------------------
    `;

  const mailOptions = {
    from: `お問い合わせフォーム <${SENDER_EMAIL}>`, // 送信元アドレス
    to: RECEIVER_EMAIL, // 受信者アドレス
    subject: `ウェブサイトからのお問い合わせ: ${Iqname}様より`, // 件名
    text: mailContent, // テキスト形式の本文
    replyTo: email, // 返信先をユーザーのメールアドレスに設定
  };

  try {
    // メール送信
    await transporter.sendMail(mailOptions);

    // 成功応答を返す
    res
      .status(200)
      .json({ success: true, message: "メールが正常に送信されました。" });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    // エラー応答を返す
    res.status(500).json({
      success: false,
      message: "メール送信に失敗しました。サーバー側の設定を確認してください。",
      error: error.message,
    });
  }
};
