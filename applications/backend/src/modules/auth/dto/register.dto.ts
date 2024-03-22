import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UserDto {
  username: string;
  email: string;
  password: string;

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

class ProfileDto {
  firstName: string;
  lastName: string;

  gender: 'UNKNOWN' | 'MALE' | 'FEMALE';

  constructor(
    firstName: string,
    lastName: string,
    gender: 'UNKNOWN' | 'MALE' | 'FEMALE',
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
  }
}

class SkillsDto {
  frontend: number;
  backend: number;
  devOps: number;
  projectManagement: number;
  machineLearning: number;

  constructor(
    frontend: number,
    backend: number,
    devOps: number,
    projectManagement: number,
    machineLearning: number,
  ) {
    this.frontend = frontend;
    this.backend = backend;
    this.devOps = devOps;
    this.projectManagement = projectManagement;
    this.machineLearning = machineLearning;
  }
}

class OAuthDto {
  github: string;
  yandex: string;
  apple: string;
  google: string;

  constructor(github: string, yandex: string, apple: string, google: string) {
    this.github = github;
    this.yandex = yandex;
    this.apple = apple;
    this.google = google;
  }
}

export class RegisterDto {
  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;

  @ValidateNested()
  @Type(() => ProfileDto)
  profile: ProfileDto;

  @ValidateNested()
  @Type(() => SkillsDto)
  skills: SkillsDto;

  @ValidateNested()
  @Type(() => OAuthDto)
  oAuth: OAuthDto;

  constructor(
    user: UserDto,
    profile: ProfileDto,
    skills: SkillsDto,
    oAuth: OAuthDto,
  ) {
    this.user = user;
    this.profile = profile;
    this.skills = skills;
    this.oAuth = oAuth;
  }
}
