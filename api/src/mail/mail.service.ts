import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { commonConfigs } from 'configs/configs';
import { User } from 'schemas/user.schema';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService
  ) { }

  async sendForgotPassword(user: User, token: string) {
    const url = `${commonConfigs.appUrl}/account-management/forgot-password?token=${token}`
    console.log(`url: ${url}`)

    await this.mailerService.sendMail({
      to: user.email,
      // from
      subject: "Quản lý bất động sản - Đặt lại mật khẩu của bạn",
      template: "./forgot-password",
      context: {
        displayName: user.displayName,
        url: url
      }
    })
  }
}
