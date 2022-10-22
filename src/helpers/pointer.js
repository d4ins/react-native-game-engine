export class Pointer {
  address = null;

  constructor() {
    const random = Math.random().toString(16).slice(2, 10);
    this.address = `0x${random}`;
  }
}
