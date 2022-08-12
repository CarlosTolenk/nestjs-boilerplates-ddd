import { Controller, Get } from '@nestjs/common';
import { HelloService } from '../application/hello.service';

@Controller()
export class HelloController {
  constructor(private readonly appService: HelloService) {}

  @Get()
  getHello(): string {
    const result = this.appService.getHello();
    return result.value;
  }
}
