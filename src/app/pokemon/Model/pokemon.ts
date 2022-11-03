export class Pokemon {
  id!: number;
  hp!: number;
  cp!: number;
  name!: string;
  picture!: string;
  types!: Array<string>;
  created!: Date;

  constructor(
    name: string = 'enter un nom...',
    hp: number = 100,
    cp: number = 10,
    picture: string = '230.png',
    types: Array<string> = ['Eau'],
    created: Date = new Date()
  ) {
    this.name = name;
    this.hp = hp;
    this.cp = cp;
    this.types = types;
    this.picture = picture;
    this.created = created;
  }
}
