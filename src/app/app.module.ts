import { Module } from '@nestjs/common';
import { HelloModule } from '../context/hello/hello.module';

@Module({
  imports: [HelloModule],
})
export class AppModule {}
