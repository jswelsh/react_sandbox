interface IPerson {
  name:string;
  city:string;
  age:number;
  printDetails: function(): string;
  anotherFunc(a: number, b:number): number;
}



const tom: IPerson = {
  name: "Tom",
  city: "Munich",
  age: 33,
  printDetails: function() {
    return `${this.name} - ${this.city}`;
  }
};