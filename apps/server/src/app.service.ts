import { Injectable } from '@nestjs/common';
import { ApiResponse } from './common/dto/response/api-response.dto';

@Injectable()
export class AppService {
  getHello() {
    return new ApiResponse({
      messsage: "Hello World!"
    })
  }
}
