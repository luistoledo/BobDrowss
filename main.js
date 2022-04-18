// ____        _       ____                            
// | __ )  ___ | |__   |  _ \ _ __ _____      _____ ___ 
// |  _ \ / _ \| '_ \  | | | | '__/ _ \ \ /\ / / __/ __|
// | |_) | (_) | |_) | | |_| | | | (_) \ V  V /\__ \__ \
// |____/ \___/|_.__/  |____/|_|  \___/ \_/\_/ |___/___/
//                                                  
// luistoledo - 2022

const OBJECTS = {
    TREE      : "tree",
    BACKGROUND: "background",
    LAND      : "land"
}
const MODIFIERS = {
    HAPPY     : "happy",
    OLD       : "old",
    LARGE     : "large"
}

const add_btn   = document.getElementById("add")
const obj_sel   = document.getElementById("object")
const mod_sel   = document.getElementById("modifier")
const canvas_el = document.getElementById("canvas")
const mute_btn  = document.getElementById("mute")
const save_btn  = document.getElementById("save")
const reset_btn = document.getElementById("reset")

const canvas = canvas_el.getContext("2d")
const WIDTH = canvas_el.clientWidth
const HEIGHT = canvas_el.clientHeight

// let synthA = new Tone.FMSynth().toDestination()
// let synthB = new Tone.AMSynth().toDestination()
// let loopA = new Tone.Loop()
// let loopB = new Tone.Loop()
// let loopC = new Tone.Loop()
// let loopD = new Tone.Loop()

let sound_pads1  = new Tone.Player("assets/loop_pads1.mp3").toDestination()
let sound_pads2  = new Tone.Player("assets/loop_pads2.mp3").toDestination()
let sound_pads3  = new Tone.Player("assets/loop_pads3.mp3").toDestination()
let sound_drums1 = new Tone.Player("assets/drums_soft1.mp3").toDestination()
let sound_drums2 = new Tone.Player("assets/drums_weird1.mp3").toDestination()
let sound_drums3 = new Tone.Player("assets/drums_hard1.mp3").toDestination()
let sound_leads1 = new Tone.Player("assets/lead_string1.mp3").toDestination()
let sound_leads2 = new Tone.Player("assets/lead_space2.mp3").toDestination()
let sound_leads3 = new Tone.Player("assets/lead_space1.mp3").toDestination()


add_btn.addEventListener("click", () =>
{
    switch (obj_sel.value) {
        case OBJECTS.TREE:
            tree.add( mod_sel.value )
            break;
        case OBJECTS.LAND:
            land.add( mod_sel.value )
            break;    
        case OBJECTS.BACKGROUND:
            background.add( mod_sel.value )
            break;
        default:
            break;
    }
})

save_btn.addEventListener("click", ()=> {
    var link = document.createElement('a');
    link.download = '🖼️.jpg';
    link.href = canvas_el.toDataURL()
    link.click();
});
reset_btn.addEventListener("click", ()=>{
    location.reload()
});
mute_btn.addEventListener("click", ()=> {
    sound_pads1.stop()
    sound_pads2.stop()
    sound_pads3.stop()
    sound_drums1.stop()
    sound_drums2.stop()
    sound_drums3.stop()
    sound_leads1.stop()
    sound_leads2.stop()
    sound_leads3.stop()
    Tone.Transport.stop()
});
    
g = {
    landHeight: 100,
    brightness: 200,
    var1 : 0,
    var2 : 0.5
}


tree = {
    add: function (mod) {
        if (!this.treesImgs) {
            this.treesImgs = [document.getElementById("tree1"), document.getElementById("tree2"), document.getElementById("tree3"), document.getElementById("tree4") ]
        }
        var snd = [sound_leads1, sound_leads2, sound_leads3]

        if (mod==MODIFIERS.HAPPY){
            snd = snd[0]
            tr = this.treesImgs[0]
        } 
        if (mod==MODIFIERS.LARGE) {
            snd = snd[1]
            tr = this.treesImgs[1]
        }
        if (mod==MODIFIERS.OLD) {
            snd = snd[2]
            tr = this.treesImgs[2]
        }   
        
        x = Math.random() * WIDTH 
        y = Math.random() * g.landHeight
        canvas.drawImage(tr, x,y)

        snd.start()
    },
    soundHit: function (mod) {
    }
}

land = {
    add: function (mod) {
        if (!this.landsImgs) {
            this.landsImgs = [document.getElementById("land1"), document.getElementById("land2"), document.getElementById("land3"), document.getElementById("land4") ]
        }
        var snd = [sound_drums1, sound_drums2, sound_drums3]

        if (mod==MODIFIERS.HAPPY) {
            lnd = this.landsImgs[Math.floor(Math.random()*4)]
            snd = snd[0]
        } else if (mod==MODIFIERS.LARGE) { 
            lnd = this.landsImgs[1]
            snd = snd[1] 
        } else if (mod==MODIFIERS.OLD) { 
            lnd = this.landsImgs[2]
            snd = snd[2]
        }
        x =  Math.random() * ((WIDTH - lnd.width) /2)
        y = (HEIGHT - lnd.height)  + Math.random() * lnd.height
        g.landHeight = y + Math.random() * lnd.height / 4 
        console.log(x + "-" + y)

        canvas.drawImage(lnd, x,y)

        snd.start()
    }
}

background = {
    add: function(mod) {
        var my_gradient = canvas.createLinearGradient(0, HEIGHT, 0, 0)
        let snd = "C1"

        if (mod==MODIFIERS.LARGE) {
            sound_pads1.start()

            my_gradient = canvas.createLinearGradient(0, HEIGHT, 0, 0)
            g.var2 += 0.1
            my_gradient.addColorStop(0, "#eeeeeeaa")
            my_gradient.addColorStop(Math.min(g.var2,1) , "#33f8")
        }
        else if (mod==MODIFIERS.HAPPY) {
            sound_pads2.start()

            g.var2 += Math.random()
            my_gradient = canvas.createLinearGradient(0, HEIGHT, 0, 0)
            my_gradient.addColorStop(0, "#9449")
            my_gradient.addColorStop(Math.min(g.var2,1) , "#fa09")
            my_gradient.addColorStop(1, "#35a9")
        }
        else if (mod==MODIFIERS.OLD) {
            sound_pads3.start()

            const x1 = 50+ (Math.random()*WIDTH-100)
            // const x2 = x1 + 10 + Math.random()*30
            const y= 20 + (Math.random()*100)
            const r1 = 10 + Math.random()*10
            const r2 = r1 + 10 + Math.random()*70
            my_gradient = canvas.createRadialGradient(x1, y, r1, x1, y, r2)
            console.log(x1, y, r1, x1, y, r2)

            const g1 = Math.min(Math.abs(Math.random() - 0.4), 0.4)
            const g2 = g1 + Math.random()*0.3
            my_gradient.addColorStop(0 , "#fa0a")
            my_gradient.addColorStop(g1, "#f99a")
            my_gradient.addColorStop(g2, "#ff9a")
            my_gradient.addColorStop(1, "#fff3")
        }
        canvas.fillStyle = my_gradient
        canvas.fillRect(0, 0, WIDTH, HEIGHT)

        // loopA = new Tone.Loop(time => {
        // sampler1.triggerAttackRelease(snd)
        // }, "40").start(0)
        // Tone.Transport.start()
        // sound_pads1.start()
        // const sound_pads1 = new Tone.Player("assets/loop_pads1.mp3")
        // sound_pads1.autostart = true
        // sound_pads1.start()
    }
}






