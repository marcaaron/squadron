const createAnims = (anims) => {
  anims.create({
    key: "forward",
    frames: anims.generateFrameNumbers("player1", { start: 1, end: 3 }),
    frameRate: 8,
    repeat: -1
  });

  anims.create({
    key: "stop",
    frames: [{ key: "player1", frame: 0 }],
    frameRate: 20
  });

  anims.create({
    key: "explode",
    frames: anims.generateFrameNumbers("explosion", { start: 0, end: 6 }),
    frameRate: 30,
    hideOnComplete: true
  });
}

export default createAnims;
