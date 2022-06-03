import { MissingParamError } from '../../errors'
import { badRequest, ok } from '../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requireFields = ['email', 'password']
    for (const field of requireFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    this.emailValidator.isValid(httpRequest.body.email)
    return await new Promise(resolve => resolve(ok({})))
  }
}
