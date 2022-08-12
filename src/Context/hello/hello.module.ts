import { Module } from '@nestjs/common';
import { HelloController } from './infrastructure/hello.controller';
import { HelloService } from './application/hello.service';

@Module({
  imports: [],
  controllers: [HelloController],
  providers: [HelloService],
})
export class HelloModule {}
