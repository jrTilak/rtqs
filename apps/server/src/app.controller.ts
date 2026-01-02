import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { ApiResponse } from './common/dto/response/api-response.dto';
import { ApiDocs } from './common/decorators/api-docs.decorators';

@Controller()
export class AppController {
  constructor(private readonly _appService: AppService) {}

  @ApiDocs({
    path: 'app/get-hello.md',
  })
  @AllowAnonymous()
  @Get('/')
  getHello() {
    const res = this._appService.getHello();
    return new ApiResponse(res);
  }
}
