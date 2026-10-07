namespace SpriteKind {
    export const Crosshair = SpriteKind.create()
}
function placeEnemies () {
    enemyTiles = tiles.getTilesByType(assets.tile`myTile0`)
    for (let tile of enemyTiles) {
        monster = sprites.create(img`
            ........................
            ........................
            ........................
            ........................
            .........fffff..........
            ........f11111ff........
            .......fb111111bf.......
            .......f1111111dbf......
            ......fd111111dddf......
            ......fd11111ddddf......
            ......fd11dddddddf......
            ......f111dddddddf......
            ......f11fcddddddf......
            .....fb1111bdddbf.......
            .....f1b1bdfcfff........
            .....fbfbffffffff.......
            ......fffffffffff.ff....
            ...........ffffffff.....
            ........f1b1bffffff.....
            ........fbfbffffff......
            ........................
            ........................
            ........................
            ........................
            `, SpriteKind.Enemy)
        tiles.placeOnTile(monster, tile)
        tiles.setTileAt(tile, sprites.castle.tilePath5)
        monster.follow(mySprite, 30)
    }
}
function placePlayer () {
    spawnTiles = tiles.getTilesByType(assets.tile`playerstart`)
    if (spawnTiles.length > 0) {
        spawnLoc = spawnTiles[0]
        tiles.placeOnTile(mySprite, spawnLoc)
        tiles.setTileAt(spawnLoc, sprites.castle.tilePath5)
    }
}
function generateMap () {
    tiles.setCurrentTilemap(tilemap`gamemap`)
    mapIndex = 0
    for (let map of room) {
        for (let col = 0; col <= 15; col++) {
            for (let row = 0; row <= 15; row++) {
                tiles.setTileAt(tiles.getTileLocation(col + mapIndex * 16, row), tileUtil.getTileImage(map, tiles.getTileLocation(col, row)))
            }
        }
        mapIndex += 1
    }
}
browserEvents.onMouseMove(function (x, y) {
    mouseX = x
    mouseY = y
})
function createWalls () {
    tileUtil.setWalls(sprites.castle.tileGrass2, true)
}
browserEvents.MouseLeft.onEvent(browserEvents.MouseButtonEvent.Pressed, function (x, y) {
    bullet = sprites.createProjectileFromSprite(img`
        . 2 2 . 
        2 4 4 2 
        2 4 4 2 
        . 2 2 . 
        `, mySprite, 0, 0)
    spriteutils.setVelocityAtAngle(bullet, spriteutils.angleFrom(mySprite, crosshair), 200)
    bullet.setFlag(SpriteFlag.DestroyOnWall, true)
    music.play(music.createSoundEffect(WaveShape.Sine, 5000, 0, 255, 0, 100, SoundExpressionEffect.Tremolo, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
})
function placeTreasure () {
    treasureTiles = tiles.getTilesByType(assets.tile`myTile`)
    for (let tile2 of treasureTiles) {
        treasure = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 4 4 4 . . . . . . 
            . . . . 4 4 4 5 5 4 4 4 . . . . 
            . . . 3 3 3 3 4 4 4 4 4 4 . . . 
            . . 4 3 3 3 3 2 2 2 1 1 4 4 . . 
            . . 3 3 3 3 3 2 2 2 1 1 5 4 . . 
            . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 . 
            . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 . 
            . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 . 
            . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 . 
            . . 4 2 3 3 2 4 4 4 4 4 2 4 . . 
            . . 4 2 2 3 2 2 4 4 4 2 4 4 . . 
            . . . 4 2 2 2 2 2 2 2 2 4 . . . 
            . . . . 4 4 2 2 2 2 4 4 . . . . 
            . . . . . . 4 4 4 4 . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Food)
        tiles.placeOnTile(treasure, tile2)
        tiles.setTileAt(tile2, sprites.castle.tilePath5)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
    music.play(music.createSoundEffect(WaveShape.Square, 3569, 5000, 255, 0, 500, SoundExpressionEffect.Warble, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    myEffect2 = extraEffects.createCustomSpreadEffectData(
    [
    3,
    4,
    2,
    12,
    8,
    9
    ],
    false,
    extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Cloud),
    extraEffects.createPercentageRange(50, 100),
    extraEffects.createPercentageRange(50, 100),
    extraEffects.createTimeRange(200, 400)
    )
    extraEffects.createSpreadEffectOnAnchor(otherSprite, myEffect2, 1000)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite)
})
let myEffect2: SpreadEffectData = null
let treasure: Sprite = null
let treasureTiles: tiles.Location[] = []
let bullet: Sprite = null
let mouseY = 0
let mouseX = 0
let mapIndex = 0
let spawnLoc: tiles.Location = null
let spawnTiles: tiles.Location[] = []
let monster: Sprite = null
let enemyTiles: tiles.Location[] = []
let room: tiles.TileMapData[] = []
let crosshair: Sprite = null
let mySprite: Sprite = null
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 256
    export const ARCADE_SCREEN_HEIGHT = 256
}
info.setScore(0)
info.setLife(3)
mySprite = sprites.create(img`
    . . . . . . . . . . b 5 b . . . 
    . . . . . . . . . b 5 b . . . . 
    . . . . . . . . . b c . . . . . 
    . . . . . . b b b b b b . . . . 
    . . . . . b b 5 5 5 5 5 b . . . 
    . . . . b b 5 d 1 f 5 5 d f . . 
    . . . . b 5 5 1 f f 5 d 4 c . . 
    . . . . b 5 5 d f b d d 4 4 . . 
    b d d d b b d 5 5 5 4 4 4 4 4 b 
    b b d 5 5 5 b 5 5 4 4 4 4 4 b . 
    b d c 5 5 5 5 d 5 5 5 5 5 b . . 
    c d d c d 5 5 b 5 5 5 5 5 5 b . 
    c b d d c c b 5 5 5 5 5 5 5 b . 
    . c d d d d d d 5 5 5 5 5 d b . 
    . . c b d d d d d 5 5 5 b b . . 
    . . . c c c c c c c c b b . . . 
    `, SpriteKind.Player)
scene.cameraFollowSprite(mySprite)
controller.moveSprite(mySprite)
crosshair = sprites.create(img`
    . . . . 2 . . . . 
    . . . . 2 . . . . 
    . . . . . . . . . 
    . . . . . . . . . 
    2 2 . . 2 . . 2 2 
    . . . . . . . . . 
    . . . . . . . . . 
    . . . . 2 . . . . 
    . . . . 2 . . . . 
    `, SpriteKind.Crosshair)
crosshair.setFlag(SpriteFlag.Ghost, true)
crosshair.z = 100
let start_rooms = [tilemap`start1`, tilemap`start2`]
let middle_rooms = [tilemap`mid1`, tilemap`level`]
let end_rooms = [tilemap`level0`, tilemap`level5`]
room = [start_rooms._pickRandom(), middle_rooms._pickRandom(), end_rooms._pickRandom()]
generateMap()
placePlayer()
createWalls()
placeTreasure()
placeEnemies()
game.onUpdate(function () {
    // Put the crosshair at the mouse's position in the world
    crosshair.setPosition(mouseX + scene.cameraProperty(CameraProperty.X) - scene.screenWidth() / 2, mouseY + scene.cameraProperty(CameraProperty.Y) - scene.screenHeight() / 2)
})
