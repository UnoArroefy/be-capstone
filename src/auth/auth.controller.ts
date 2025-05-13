import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  loginGoogle() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async callbackURL(@Req() req, @Res() res) {
    const token: string = await this.authService.handleUser(req.user);

    const redirect = this.configService.get<string>('FRONTEND_URL');

    if (redirect) {
      return res.redirect(redirect + `?token=${token}`);
    }

    return res.json({
      message: 'success',
      token: token,
    });
  }
}
