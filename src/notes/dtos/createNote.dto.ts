import { IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  note: string;

  @IsNotEmpty()
  created: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  content: string;

  dates: string | null;
}
