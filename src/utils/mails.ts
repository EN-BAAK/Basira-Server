import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: process.env.MAIL_MESSAGE_HOST as string,
  port: parseInt(process.env.MAIL_MESSAGE_PORT || "587", 10),
  auth: {
    user: process.env.MAIL_MESSAGE_EMAIL as string,
    pass: process.env.MAIL_MESSAGE_PASS as string,
  },
});

const codeTemplate = (title: string, description: string, code: string, expiryText: string) => `
  <div style="background-color:#F8FAFC;padding:40px 0;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;direction:rtl;">
    <div style="max-width:500px;margin:0 auto;background:#FFFFFF;border-radius:16px;box-shadow:0 4px 20px rgba(15,23,42,0.05);overflow:hidden;border: 1px solid #E2E8F0;">
      
      <div style="background:#2563EB;padding:32px;text-align:center;">
        <h1 style="margin:0;font-size:28px;font-weight:700;letter-spacing:0.5px;color:#FFFFFF;font-family:'IBM Plex Arabic','Segoe UI',sans-serif;">
          بصيرة
        </h1>
        <p style="margin:6px 0 0 0;font-size:12px;color:#06B6D4;letter-spacing:1px;font-weight:600;">منصة إدارة المتجر</p>
      </div>

      <div style="padding:40px 32px;text-align:center;color:#0F172A">
        <h2 style="margin-top:0;margin-bottom:16px;font-size:22px;color:#0F172A;font-weight:700;">
          ${title}
        </h2>
        <p style="margin-bottom:28px;font-size:15px;line-height:1.6;color:#475569">
          ${description}
        </p>

        <div style="display:inline-block;background:#EEF2F7;color:#2563EB;
          font-size:26px;font-weight:bold;letter-spacing:4px;border:1px dashed #06B6D4;
          padding:14px 36px;border-radius:12px;margin-bottom:28px;">
          ${code}
        </div>

        <p style="margin:0;font-size:13px;color:#64748B">
          هذا الرمز صالح لمدة <strong style="color:#0F172A">${expiryText}</strong>.
        </p>
      </div>

      <div style="background:#F8FAFC;padding:20px;text-align:center;font-size:12px;color:#64748B;border-top:1px solid #E2E8F0;">
        إذا لم تكن أنت من قام بهذا الإجراء، يمكنك تجاهل هذا البريد الإلكتروني بأمان.
      </div>
    </div>
  </div>
`;

export const resetEmailMessage = (code: string): string => {
  return codeTemplate(
    "طلب إعادة تعيين كلمة المرور",
    "تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بك في منصة بصيرة. استخدم الرمز أدناه لإتمام العملية:",
    code,
    "15 دقيقة"
  );
};

export const sendEmail = async (email: string, subject: string, msg: string): Promise<void> => {
  await transporter.sendMail({
    from: `"Basira Support" <${process.env.MAIL_MESSAGE_EMAIL}>`,
    to: email,
    subject: subject,
    html: msg,
  });
};