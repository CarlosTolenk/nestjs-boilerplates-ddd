import { Injectable } from '@nestjs/common';
import { Hello } from '../domain/hello';

@Injectable()
export class HelloService {
  getHello(): Hello {
    return new Hello('Hello World!');
  }
}
