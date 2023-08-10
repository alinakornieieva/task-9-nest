import { Module } from '@nestjs/common';
import { ControllersController } from './controllers/controllers.controller';
import { NoteService } from './services/services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [ControllersController],
  providers: [NoteService],
})
export class NotesModule {}
