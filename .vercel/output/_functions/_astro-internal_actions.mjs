import './chunks/_astro_actions_qV6r5rZa.mjs';
import * as z from 'zod';
import { Resend } from 'resend';
import { d as defineAction } from './chunks/server_Bs8bwSnh.mjs';

const resend = new Resend(undefined                              );
const FROM_EMAIL = "onboarding@resend.dev";
const ADMIN_EMAIL = "stsrjk@gmail.com";
const server = {
  sendConsultation: defineAction({
    accept: "form",
    input: z.object({
      name: z.string().min(1, { message: "お名前を入力してください" }),
      email: z.string().email({ message: "正しいメールアドレスを入力してください" }),
      grade: z.string().min(1, { message: "学年を選択してください" }),
      message: z.string().min(5, { message: "ご相談内容は5文字以上で入力してください" }),
      reservationDate: z.string().min(1, { message: "予約日時が選択されていません" })
    }),
    handler: async (input) => {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          replyTo: input.email,
          subject: `【予約あり】学習相談: ${input.name}様 (${input.reservationDate})`,
          html: `
            <h2>Webサイトから学習相談の予約が入りました</h2>
            <div style="background: #e6f7ff; padding: 15px; border-radius: 5px; border: 1px solid #91d5ff;">
              <p><strong>予約日時:</strong> <span style="font-size: 1.2em; color: #0050b3;">${input.reservationDate}</span></p>
              <p style="color: red; font-weight: bold;">※この予約はお客様へ「予約確定」として案内済みです。</p>
            </div>
            <p><strong>お名前:</strong> ${input.name}</p>
            <p><strong>メール:</strong> ${input.email}</p>
            <p><strong>学年:</strong> ${input.grade}</p>
            <p><strong>相談内容:</strong></p>
            <pre style="background: #f4f4f4; padding: 10px;">${input.message}</pre>
          `
        });
        await resend.emails.send({
          from: FROM_EMAIL,
          to: input.email,
          replyTo: ADMIN_EMAIL,
          subject: `【さとう数理塾】無料相談のご予約を承りました`,
          html: `
            <p>${input.name} 様</p>
            <p>さとう数理塾です。<br>この度は無料相談のご予約、誠にありがとうございます。</p>
            <p>以下の日時でご予約を承りました。<br>
            当日は教室へ直接お越しください。お待ちしております。</p>
            
            <div style="margin: 20px 0; padding: 20px; background: #f0f5ff; border: 2px solid #009DE0; border-radius: 8px;">
              <h3 style="margin-top: 0; color: #009DE0;">ご予約日時</h3>
              <p style="font-size: 1.3em; font-weight: bold; margin-bottom: 0;">${input.reservationDate}</p>
            </div>
            
            <p><strong>アクセス:</strong><br>
            〒410-0052 静岡県沼津市沢田町1-3 牧原ビル102<br>
            塾の前に駐車スペースがあります。</p>

            <p><strong>当日の緊急連絡先:</strong><br>
            080-8108-0767（佐藤）<br>
            <span style="font-size: 0.9em; color: #666;">※道に迷われた際などは、お気軽にお電話ください。</span></p>

            <hr>
            <p><strong>お名前:</strong> ${input.name}</p>
            <p><strong>学年:</strong> ${input.grade}</p>
            <p><strong>ご相談内容:</strong><br>${input.message}</p>
            <hr>
            
            <p>※日時の変更やキャンセルの場合は、本メールへの返信にてお知らせください。</p>
            <p>さとう数理塾<br>Webサイト: https://stsrjk.com</p>
          `
        });
        return { success: true };
      } catch (error) {
        console.error("Email sending failed:", error);
        throw new Error("メール送信に失敗しました。");
      }
    }
  })
};

export { server };
