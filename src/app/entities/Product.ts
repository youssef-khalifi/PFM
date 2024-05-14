import {Category} from "./Category";

export class Product{
  private _id: number;
  private _name: string;
  private _price: number;
  private _image: string;
  private _description: string;
  private _dateTime: Date;
  private _category: Category;
  private _quantity: number;


  constructor(id: number, name: string, price: number, image: string, description: string, dateTime: Date, category: Category, quantity: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._image = image;
    this._description = description;
    this._dateTime = dateTime;
    this._category = category;
    this._quantity = quantity;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get dateTime(): Date {
    return this._dateTime;
  }

  set dateTime(value: Date) {
    this._dateTime = value;
  }

  get category(): Category {
    return this._category;
  }

  set category(value: Category) {
    this._category = value;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }
}
