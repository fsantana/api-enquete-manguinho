import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return 'hash'
  },
  async compare (): Promise<boolean> {
    return await new Promise(resolve => resolve(true))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a valid hash on hash sucess', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_value')
    expect(hash).toBe('hash')
  })

  test('Should thrown if bcrypt hash throws', async () => {
    const sut = makeSut()
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async (data: string | Buffer, saltOrRounds: string | number): Promise<string> => {
      // eslint-disable-next-line @typescript-eslint/return-await
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })

  test('Should call bcrypt compare with correct values', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })

  test('Should return true on compare sucess', async () => {
    const sut = makeSut()
    const isvalid = await sut.compare('any_value', 'any_hash')
    expect(isvalid).toBe(true)
  })

  test('Should return false on compare fails', async () => {
    const sut = makeSut()
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(async (data: string | Buffer, encrypted: string): Promise<boolean> => {
      // eslint-disable-next-line @typescript-eslint/return-await
      return new Promise(resolve => resolve(false))
    })
    const isvalid = await sut.compare('any_value', 'any_hash')
    expect(isvalid).toBe(false)
  })

  test('Should thrown if bcrypt compare throws', async () => {
    const sut = makeSut()
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(async (data: string | Buffer, saltOrRounds: string | number): Promise<string> => {
      // eslint-disable-next-line @typescript-eslint/return-await
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const promise = sut.compare('any_value', 'any_hash')
    await expect(promise).rejects.toThrow()
  })
})
