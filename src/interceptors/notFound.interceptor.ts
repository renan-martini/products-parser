import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  NotFoundException,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  constructor(private errorMessage: string) {}

  intercept(_context: ExecutionContext, stream$: CallHandler): Observable<any> {
    return stream$.handle().pipe(
      tap((data) => {
        console.log('teste', data);
        if (data === undefined || data === null) {
          throw new NotFoundException(this.errorMessage);
        }
      }),
    );
  }
}
