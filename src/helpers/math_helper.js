export class MathHelper {
  static randomize = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
}
