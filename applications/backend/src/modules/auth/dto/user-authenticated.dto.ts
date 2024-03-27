export class UserAuthenticatedDto {
  isAuthenticated: boolean;

  constructor(isAuthenticated: boolean) {
    this.isAuthenticated = isAuthenticated;
  }
}
