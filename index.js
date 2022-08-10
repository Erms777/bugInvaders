const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = innerWidth;
canvas.height = innerHeight

class Player {
    constructor() {

        this.velocity = {
            x: 0,
            y: 0
        }

        this.rotation = 0

        const image = new Image()
        image.src = './imgs/JbqDev.png'
        image.onload = () => {
            this.image = image
            this.width = image.width
            this.height = image.height
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20
            }
        }
    }

    draw() {
        // context.fillStyle = 'red'
        // context.fillRect(this.position.x, this.position.y, this.width, this.height)
        context.save()
        context.translate(
            player.position.x + player.width / 2,
            player.position.y + player.height / 2
        )

        context.rotate(this.rotation)

        context.translate(
            -player.position.x - player.width / 2,
            -player.position.y - player.height / 2
        )

        context.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )

        context.restore()
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
        }
    }

}

class Projectile {
    constructor({
        position,
        velocity
    }) {
        this.position = position
        this.velocity = velocity

        this.radius = 3
    }

    draw() {
        context.beginPath()
        context.arc(
            this.position.x, this.position.y, this.radius, 0, Math.PI * 2
        )
        context.fillStyle = 'yellow'
        context.fill()
        context.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

const player = new Player()
const projectiles = []
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

function animate() {
    requestAnimationFrame(animate)
    context.fillStyle = 'gray'
    context.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    projectiles.forEach((projectile, index) => {
        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(() => {
                projectiles.slice(index, 1)
            },0)
        } else {
            projectile.update()
        }
    })

    if (keys.a.pressed && player.position.x - player.width * 0.2 >= 0) {
        player.velocity.x = -7
        player.rotation = -.1
    } else if (keys.d.pressed && player.position.x + player.width * 1.2 <= canvas.width) {
        player.velocity.x = 7
        player.rotation = .1
    } else {
        player.velocity.x = 0
        player.rotation = 0
    }
}

animate()

addEventListener('keydown', ({
    key
}) => {
    switch (key) {
        case 'a':
            keys.a.pressed = true
            break
        case 'd':
            keys.d.pressed = true
            break
        case ' ':
            keys.space.pressed = true
            projectiles.push(new Projectile({
                position: {
                    x: player.position.x + player.width / 2,
                    y: player.position.y 
                },
                velocity: {
                    x: 0,
                    y: -7
                }
            }))
            break
    }
})

addEventListener('keyup', ({
    key
}) => {
    switch (key) {
        case 'a':
            keys.a.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        case ' ':
            keys.space.pressed = false
            break
    }
})