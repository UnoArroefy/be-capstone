import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  loginGoogle() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async callbackURL(@Req() req, @Res() res) {
    const user = await this.authService.handleUser(req.user);

    return res.json(user);
  }
}
