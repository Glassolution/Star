export type ErrorCode =
  | 'EMAIL_ALREADY_EXISTS'
  | 'INVALID_CREDENTIALS'
  | 'USER_NOT_FOUND'
  | 'INVALID_TOKEN'
  | 'VALIDATION_ERROR';

export type ErrorStatusCode = 400 | 401 | 404 | 409 | 422;

export class AppError extends Error {
  public readonly statusCode: ErrorStatusCode;
  public readonly code: ErrorCode;

  constructor(message: string, statusCode: ErrorStatusCode, code: ErrorCode) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

export const EmailAlreadyExistsError = () =>
  new AppError('Este email já está na lista de espera.', 409, 'EMAIL_ALREADY_EXISTS');

export const InvalidCredentialsError = () =>
  new AppError('Credenciais inválidas.', 401, 'INVALID_CREDENTIALS');

export const UserNotFoundError = () =>
  new AppError('Usuário não encontrado.', 404, 'USER_NOT_FOUND');

export const InvalidTokenError = () =>
  new AppError('Token inválido ou expirado.', 400, 'INVALID_TOKEN');

export const ValidationError = (message: string) =>
  new AppError(message, 422, 'VALIDATION_ERROR');

