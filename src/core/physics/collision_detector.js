export class CollisionDetector {
  static _instance = null;

  static get instance() {
    if (!this._instance) {
      this._instance = new this();
    }

    return this._instance;
  }

  detect = objects => {
    let collided = false;

    if (!objects) {
      return collided;
    }

    const colladableObjects = this.findColladableObjects(objects);
    const obstacleObjects = this.findObstacleObjects(objects);

    colladableObjects.every(colladableObject => {
      const colladableBoundaries = this.boundaries(colladableObject.layout);

      return obstacleObjects.every(obstacleObject => {
        const obstacleBoundaries = this.boundaries(obstacleObject.layout);

        const leftWithTopVerticalLineCollision = this.intersects(
          colladableBoundaries.left,
          colladableBoundaries.top,
          colladableBoundaries.left,
          colladableBoundaries.bottom,
          obstacleBoundaries.left,
          obstacleBoundaries.top,
          obstacleBoundaries.right,
          obstacleBoundaries.top,
        );

        const leftWithBottomVerticalLineCollision = this.intersects(
          colladableBoundaries.left,
          colladableBoundaries.top,
          colladableBoundaries.left,
          colladableBoundaries.bottom,
          obstacleBoundaries.left,
          obstacleBoundaries.bottom,
          obstacleBoundaries.right,
          obstacleBoundaries.bottom,
        );

        const rightWithTopVerticalLineCollision = this.intersects(
          colladableBoundaries.right,
          colladableBoundaries.top,
          colladableBoundaries.right,
          colladableBoundaries.bottom,
          obstacleBoundaries.left,
          obstacleBoundaries.top,
          obstacleBoundaries.right,
          obstacleBoundaries.top,
        );

        const rightWithBottomVerticalLineCollision = this.intersects(
          colladableBoundaries.right,
          colladableBoundaries.top,
          colladableBoundaries.right,
          colladableBoundaries.bottom,
          obstacleBoundaries.left,
          obstacleBoundaries.bottom,
          obstacleBoundaries.right,
          obstacleBoundaries.bottom,
        );

        const topWithLeftHorizontalCollision = this.intersects(
          colladableBoundaries.left,
          colladableBoundaries.top,
          colladableBoundaries.right,
          colladableBoundaries.top,
          obstacleBoundaries.left,
          obstacleBoundaries.top,
          obstacleBoundaries.left,
          obstacleBoundaries.bottom,
        );

        const topWithRightHorizontalCollision = this.intersects(
          colladableBoundaries.left,
          colladableBoundaries.top,
          colladableBoundaries.right,
          colladableBoundaries.top,
          obstacleBoundaries.right,
          obstacleBoundaries.top,
          obstacleBoundaries.right,
          obstacleBoundaries.bottom,
        );

        const bottomWithLeftHorizontalCollision = this.intersects(
          colladableBoundaries.left,
          colladableBoundaries.bottom,
          colladableBoundaries.right,
          colladableBoundaries.bottom,
          obstacleBoundaries.left,
          obstacleBoundaries.top,
          obstacleBoundaries.left,
          obstacleBoundaries.bottom,
        );

        const bottomWithRightHorizontalCollision = this.intersects(
          colladableBoundaries.left,
          colladableBoundaries.bottom,
          colladableBoundaries.right,
          colladableBoundaries.bottom,
          obstacleBoundaries.right,
          obstacleBoundaries.top,
          obstacleBoundaries.right,
          obstacleBoundaries.bottom,
        );

        if (
          leftWithTopVerticalLineCollision ||
          leftWithBottomVerticalLineCollision ||
          rightWithTopVerticalLineCollision ||
          rightWithBottomVerticalLineCollision ||
          topWithLeftHorizontalCollision ||
          topWithRightHorizontalCollision ||
          bottomWithLeftHorizontalCollision ||
          bottomWithRightHorizontalCollision
        ) {
          collided = true;
          return false;
        }

        return true;
      });
    });

    return collided;
  };

  intersects = (p1x1, p1y1, p1x2, p1y2, p2x1, p2y1, p2x2, p2y2) => {
    const det = (p1x2 - p1x1) * (p2y2 - p2y1) - (p2x2 - p2x1) * (p1y2 - p1y1);

    if (det === 0) {
      return false;
    }

    const lambda =
      ((p2y2 - p2y1) * (p2x2 - p1x1) + (p2x1 - p2x2) * (p2y2 - p1y1)) / det;
    const gamma =
      ((p1y1 - p1y2) * (p2x2 - p1x1) + (p1x2 - p1x1) * (p2y2 - p1y1)) / det;

    return lambda > 0 && lambda < 1 && gamma > 0 && gamma < 1;
  };

  boundaries = layout => {
    return {
      top: layout.y,
      bottom: layout.y + layout.height,
      left: layout.x,
      right: layout.x + layout.width,
    };
  };

  findColladableObjects = objects => {
    return objects.filter(object => object.environmentAttributes.colladable);
  };

  findObstacleObjects = objects => {
    return objects.filter(object => object.environmentAttributes.obstacle);
  };
}
