import {
  Body,
  Controller,
  Get,
  Delete,
  Patch,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NoteService } from '../services/services.service';
import { CreateNoteDto } from '../dtos/createNote.dto';
import { UpdateNoteDto } from '../dtos/updateNote.dto';

@Controller('notes')
export class ControllersController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  getNotes() {
    return this.noteService.findNotes();
  }

  @Get('stats')
  getStats() {
    return this.noteService.findStats();
  }

  @Get(':id')
  getNote(@Param('id', ParseIntPipe) id: number) {
    return this.noteService.findNote(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createUsers(@Body() CreateNoteDto: CreateNoteDto) {
    return this.noteService.createNote(CreateNoteDto);
  }

  @Delete(':id')
  deleteNote(@Param('id', ParseIntPipe) id: number) {
    return this.noteService.deleteNote(id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  updateNote(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateNoteDto: UpdateNoteDto,
  ) {
    return this.noteService.updateNote(id, UpdateNoteDto);
  }
}
