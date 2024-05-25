export class Adresse {
  private _street: string;
  private _city: string;
  private _state: string;
  private _postalCode: string;
  private _country: string;

  constructor(street: string, city: string, state: string, postalCode: string, country: string) {
    this._street = street;
    this._city = city;
    this._state = state;
    this._postalCode = postalCode;
    this._country = country;
  }

  get street(): string {
    return this._street;
  }

  set street(value: string) {
    this._street = value;
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }

  get state(): string {
    return this._state;
  }

  set state(value: string) {
    this._state = value;
  }

  get postalCode(): string {
    return this._postalCode;
  }

  set postalCode(value: string) {
    this._postalCode = value;
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
  }
}
