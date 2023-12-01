import { Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import * as nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'qpfjf56@gmail.com',
      },
    });
  }

  async sendMemberJoinVerification(
    email: string,
    signupVerifyToken: string,
  ): Promise<void> {
    const baseUrl = 'http://localhost:3000';

    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;

    const emailOptions: EmailOptions = {
      to: email,
      subject: '회원가입 인증 메일입니다.',
      html: `
        <div>
          <p>아래 링크를 클릭하시면 회원가입이 완료됩니다.</p>
          <form action="${url}" method="post">
            <button>인증하기</button> 
          </form>
        </div>
      `,
    };

    return await this.transporter.sendMail(emailOptions);
  }
}
