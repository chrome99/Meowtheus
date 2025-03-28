import { IsString, IsISO8601 } from 'class-validator';

export class MeowEvent {
  @IsString()
  catId: string;

  @IsISO8601()
  timestamp: string;
}
