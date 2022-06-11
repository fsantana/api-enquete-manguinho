import { LogErrorRepository } from '../../../../data/protocols/db/log/log-error-repository'
import { MongoHelper } from '../helpers/mongo-helper'
export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const collection = MongoHelper.getCollection('errors')
    await (await collection).insertOne({
      stack,
      date: new Date()
    })
  }
}
