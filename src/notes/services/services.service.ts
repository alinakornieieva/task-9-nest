import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from '../dtos/createNote.dto';
import { UpdateNoteDto } from '../dtos/updateNote.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>,
  ) {}

  async findNotes() {
    return await this.noteRepository.find();
  }

  async findNote(id: number) {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) {
      throw new BadRequestException('Such note doesn`t exist');
    }
    return note;
  }

  async findStats() {
    const notes = await this.noteRepository.find();
    const result = [];
    let categories = [];
    notes.forEach((item) => {
      categories.push(item.category);
    });
    categories = Array.from(new Set(categories));
    categories.forEach((item) => {
      const active = notes.filter(
        (cur) => cur.category === item && !cur.archived,
      ).length;
      const archived = notes.filter(
        (cur) => cur.category === item && cur.archived,
      ).length;
      result.push({ item, active, archived });
    });
    return result;
  }

  async createNote(createNoteDto: CreateNoteDto) {
    const newNote = await this.noteRepository.create(createNoteDto);
    return this.noteRepository.save(newNote);
  }

  async deleteNote(id: number) {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) {
      throw new BadRequestException('Such note doesn`t exist');
    }
    await this.noteRepository.delete(id);
    return { message: 'Note was deleted' };
  }

  async updateNote(id: number, UpdateNoteDto: UpdateNoteDto) {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) {
      throw new BadRequestException('Such note doesn`t exist');
    }
    await this.noteRepository.update(id, UpdateNoteDto);
    return { message: 'Note was updated' };
  }
}
