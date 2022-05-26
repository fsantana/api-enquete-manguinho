import { Collection, MongoClient, InsertOneResult } from 'mongodb'

export const MongoHelper = {
  client: null,

  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(url)
  },

  async disconnect () {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map (orignalData: any, result: InsertOneResult) {
    const id = result.insertedId.toString()
    const object = { id, ...orignalData }
    return object
  }
}
