export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export type CreateNoteDto = Omit<Note, 'id' | 'createdAt'>;
