<?php
      if($_SEVER["REQUEST_METHOD"]=="POST"){
        //応答のContent-Typeをテキストとして設定
        header('Content-Type: text/plain; charset=UTF-8');

        //受信者メールアドレス
        $to="yomogi.anko100pct@gmail.com";
        $subject="フォームの送信内容";
    
        //フォームのデータをまとめる
        $message="フォームの送信内容：\n\n";

        foreach($_POST as $key=>$value){
            //サニタイズ（安全なものにする）
            $sanitized_key=htmlspecialcahrs($key,ENT_QUOTES,'UTF-8');
            

            if(is_array($value)){
                $value=implode(",",$value);
                $sanitized_value = htmlspecialchars(implode(", ", $value), ENT_QUOTES, 'UTF-8');
            }else{
                $sanitized_value = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
        }
            }
            $message.="{$sanitized_key}: {$sanitized_value}\n";
        }
           // メールのヘッダー
           $user_email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : 'noreply@example.com';
    
    $headers = "From: webmaster@example.com\r\n" .
               "Reply-To: {$user_email}\r\n" .
               "X-Mailer: PHP/" . phpversion();
    
// メール送信
if (mail($to, $subject, $message_body, $headers)) {
    // 成功時の応答
    echo "お問い合わせを受け付けました。メールが送信されました。";
} else {
    // 失敗時の応答
    http_response_code(500); // サーバーエラーを返す
    echo "メール送信に失敗しました。サーバー管理者に問い合わせてください。";
}

} else {
// POSTリクエスト以外でアクセスされた場合の処理
http_response_code(405); // Method Not Allowedを返す
echo "不正なリクエストです。";
}
      };
      ?>