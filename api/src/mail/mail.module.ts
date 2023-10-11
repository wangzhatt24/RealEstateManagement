import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfigs } from 'configs/configs';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: mailerConfigs.user,
          pass: mailerConfigs.password
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    })
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
