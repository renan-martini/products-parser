import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private apiKeys: string[] = [process.env.API_KEY];
  validateApiKey(apiKey: string) {
    return this.apiKeys.find((apiK) => apiKey === apiK);
  }
}
