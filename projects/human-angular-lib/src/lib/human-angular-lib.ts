import { Component, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-human',
  standalone: true,
  imports: [],
  templateUrl: './human.component.html',
  styleUrl: './human.component.css',
})
export class HumanComponent {
  @ViewChild('human') private humanDiv: any;
  private mousePositionFunction: Function | undefined;
  private mousePosition = { x: 0, y: 0 };
  private totalFrames = 4;

  private spritePositions = {
    idle: {
      shouldMove: false,
      clipset: {
        [1]: { x: '-64px', y: '-148px' },
      },
    },
    runNorth: {
      shouldMove: true,
      clipset: {
        [1]: { x: '0px', y: '-124px' },
        [2]: { x: '0px', y: '-148px' },
        [3]: { x: '0px', y: '-172px' },
        [4]: { x: '0px', y: '-148px' },
      },
    },
    runNorthEast: {
      shouldMove: true,
      clipset: {
        [1]: { x: '-15px', y: '-124px' },
        [2]: { x: '-15px', y: '-148px' },
        [3]: { x: '-15px', y: '-172px' },
        [4]: { x: '-15px', y: '-148px' },
      },
    },
    runEast: {
      shouldMove: true,
      clipset: {
        [1]: { x: '-32px', y: '-124px' },
        [2]: { x: '-32px', y: '-148px' },
        [3]: { x: '-32px', y: '-172px' },
        [4]: { x: '-32px', y: '-148px' },
      },
    },
    runSouthEast: {
      shouldMove: true,
      clipset: {
        [1]: { x: '-48px', y: '-124px' },
        [2]: { x: '-48px', y: '-148px' },
        [3]: { x: '-48px', y: '-172px' },
        [4]: { x: '-48px', y: '-148px' },
      },
    },
    runSouth: {
      shouldMove: true,
      clipset: {
        [1]: { x: '-64px', y: '-124px' },
        [2]: { x: '-64px', y: '-148px' },
        [3]: { x: '-64px', y: '-172px' },
        [4]: { x: '-64px', y: '-148px' },
      },
    },
    runSouthWest: {
      shouldMove: true,
      clipset: {
        [1]: { x: '-80px', y: '-124px' },
        [2]: { x: '-80px', y: '-148px' },
        [3]: { x: '-80px', y: '-172px' },
        [4]: { x: '-80px', y: '-148px' },
      },
    },
    runWest: {
      shouldMove: true,
      clipset: {
        [1]: { x: '-96px', y: '-124px' },
        [2]: { x: '-96px', y: '-148px' },
        [3]: { x: '-96px', y: '-172px' },
        [4]: { x: '-96px', y: '-148px' },
      },
    },
    runNorthWest: {
      shouldMove: true,
      clipset: {
        [1]: { x: '-113px', y: '-124px' },
        [2]: { x: '-113px', y: '-148px' },
        [3]: { x: '-113px', y: '-172px' },
        [4]: { x: '-113px', y: '-148px' },
      },
    },
  };

  private character = {
    x: 15,
    y: 19,
    speed: 0.3,
  };

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.mousePositionFunction = this.renderer.listen(
      'document',
      'mousemove',
      (event: MouseEvent) => {
        this.mousePosition.x = event.clientX;
        this.mousePosition.y = event.clientY;
      }
    );
    this.frame();
  }

  private frame() {
    let frameData = this.getSpriteSet(this.mousePosition.x, this.mousePosition.y);

    let humanSprite;
    if (frameData.shouldMove) {
      let currentFrame = (Math.floor(Date.now() / (1000 / 4)) % this.totalFrames) + 1;
      humanSprite = frameData.clipset[currentFrame];
    } else {
      humanSprite = frameData.clipset[1];
    }

    this.renderer.setStyle(
      this.humanDiv.nativeElement,
      'background-position',
      `${humanSprite.x} ${humanSprite.y}`
    );

    requestAnimationFrame(() => {
      this.frame();
    });
  }

  private getSpriteSet(mouseX: number, mouseY: number): any {
    let humanDimensions = this.humanDiv.nativeElement.getBoundingClientRect();
    let humanCenterX = humanDimensions.left + humanDimensions.width / 2;
    let humanCenterY = humanDimensions.top + humanDimensions.height / 2;

    let differenceX = mouseX - humanCenterX;
    let differenceY = mouseY - humanCenterY;
    let distance = Math.sqrt(differenceX * differenceX + differenceY * differenceY);

    if (distance > 50) {
      let angle = Math.atan2(differenceY, differenceX);

      let degrees = angle * (180 / Math.PI);

      //MIT: https://github.com/adryd325/oneko.js/blob/main/oneko.js
      this.character.x += (differenceX / distance) * this.character.speed;
      this.character.y += (differenceY / distance) * this.character.speed;

      this.character.x = Math.min(Math.max(7, this.character.x), window.innerWidth - 7);
      this.character.y = Math.min(Math.max(5, this.character.y), window.innerHeight - 5);

      this.renderer.setStyle(this.humanDiv.nativeElement, 'left', `${this.character.x}px`);
      this.renderer.setStyle(this.humanDiv.nativeElement, 'top', `${this.character.y}px`);

      if (degrees >= -22.5 && degrees < 22.5) {
        //East
        return this.spritePositions.runEast;
      } else if (degrees >= 22.5 && degrees < 67.5) {
        //South East
        return this.spritePositions.runSouthEast;
      } else if (degrees >= 67.5 && degrees < 112.5) {
        //South
        return this.spritePositions.runSouth;
      } else if (degrees >= 112.5 && degrees < 157.5) {
        //South West
        return this.spritePositions.runSouthWest;
      } else if (degrees >= 157.5 || degrees < -157.5) {
        //West
        return this.spritePositions.runWest;
      } else if (degrees >= -157.5 && degrees < -112.5) {
        //North West
        return this.spritePositions.runNorthWest;
      } else if (degrees >= -112.5 && degrees < -67.5) {
        //North
        return this.spritePositions.runNorth;
      } else if (degrees >= -67.5 && degrees < -22.5) {
        //North East
        return this.spritePositions.runNorthEast;
      }
    } else {
      return this.spritePositions.idle;
    }
  }

  ngOnDestroy() {
    if (this.mousePositionFunction) {
      this.mousePositionFunction();
    }
  }
}
