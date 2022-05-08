import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class BaseService<Document> {
  constructor(private documentSchema: Model<Document>) { }

  /**
   * create method
   * @param createDto 
   * @returns 
   */
  async create(createDto: any) {
    return this.documentSchema.create(createDto);
  }

  /**
   * get method
   * @returns 
   */
  async get() {
    const data = await this.documentSchema.find({});
    return data;
  }

  /**
   * find method
   * @param id 
   * @returns 
   */
  async find(id: string) {
    const data = await this.documentSchema.findById(id);
    return data;
  }

  /**
   * update
   * @param updateDto 
   * @returns 
   */
  async update(updateDto: any) {
    const filter = { _id: updateDto._id }
    delete updateDto._id;

    const data = await this.documentSchema.findOneAndUpdate(filter, updateDto);
    return data;
  }

  /**
   * remove
   * @param id 
   * @returns 
   */
  async remove(id: string) {
    const data = await this.documentSchema.findByIdAndRemove(id);
    return data;
  }

  /**
   * remove list
   * @param ids 
   * @returns 
   */
  async removeList(ids: string[]) {
    return await this.documentSchema.remove({
      _id: {
        $in: ids
      }
    });
  }
}
