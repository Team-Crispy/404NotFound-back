import { Injectable } from '@nestjs/common';

@Injectable()
export class ThemesService {
  findAll() {
    return `This action returns all themes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} theme`;
  }
}
