import 'pixi';
import 'p2';
import Phaser from 'phaser';
import evilShip from './assets/evil-ship.png';
import crossBullet from './assets/cross-bullet.png';

const state = {};


const preload = () => {
  state.game.load.image('evilShip', evilShip);
  state.game.load.image('crossBullet', crossBullet);
};

const create = () => {
    const ship = state.game.add.sprite(400, 300, 'evilShip');

    state.game.physics.arcade.enable(ship);

    const weapon = state.game.add.weapon(30, 'crossBullet');
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 400;
    weapon.fireRate = 60;
    weapon.bulletAngleVariance = 10;
    weapon.trackSprite(ship, 91, 60);

    const cursors = state.game.input.keyboard.createCursorKeys();
    const fireButton = state.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    state.ship = ship;
    state.weapon = weapon;
    state.controls = {
      cursors,
      fireButton
    };
}

const update = () => {
  state.ship.body.velocity.x = 0;
  state.ship.body.velocity.y = 0;

  if (state.controls.cursors.left.isDown)
  {
      state.ship.body.velocity.x = -200;
  }

  else if (state.controls.cursors.right.isDown)
  {
      state.ship.body.velocity.x = 200;
  }

  if (state.controls.cursors.up.isDown)
  {
      state.ship.body.velocity.y = -200;
  }

  else if (state.controls.cursors.down.isDown)
  {
      state.ship.body.velocity.y = 200;
  }

  if (state.controls.fireButton.isDown)
  {
      state.weapon.fire();
  }
};

const game = new Phaser.Game(
  800,
  600,
  Phaser.AUTO,
  'content',
  {
    create,
    preload,
    update
  }
);

state.game = game;
