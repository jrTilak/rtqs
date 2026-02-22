import { Controller, Get } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { AppService } from "./app.service";
import { ApiResponse } from "./common/dto/response/api-response.dto";
import { ApiGetSuccess } from "./common/decorators/response/api-response-success.decorator";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";

@Controller()
export class AppController {
  constructor(private readonly _appService: AppService) {}

  @AllowAnonymous()
  @Get()
  @ApiOperation({
    summary: "Hello World",
  })
  @ApiGetSuccess({
    type: String,
    example: "Hello World",
  })
  get(): ApiResponse<string> {
    const res = this._appService.get();
    return new ApiResponse(res);
  }
}
