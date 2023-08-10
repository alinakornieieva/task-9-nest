import { IsNotEmpty } from 'class-validator';

export class UpdateNoteDto {
  @IsNotEmpty()
  note: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  content: string;

  dates: string | null;
}
