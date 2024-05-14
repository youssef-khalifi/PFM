import {Role} from './Role';

export class _User{


  private _userID: number;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _image: string;
  private _password: string;
  private _role: Role;

  constructor(userID: number, firstName: string, lastName: string, email: string, image: string, password: string, role: Role) {
    this._userID = userID;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._image = image;
    this._password = password;
    this._role = role;
  }

  get userID(): number {
    return this._userID;
  }

  set userID(value: number) {
    this._userID = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get role(): Role {
    return this._role;
  }

  set role(value: Role) {
    this._role = value;
  }
}


