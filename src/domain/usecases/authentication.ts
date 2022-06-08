export interface AuthenticationModel {
  email: string
  password: string
}
export interface Authentication {
  auth: (autentication: AuthenticationModel) => Promise<string|null>
}
