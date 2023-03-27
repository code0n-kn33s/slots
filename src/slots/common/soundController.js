import PIXIsound from "pixi-sound";

export default class SoundController {
    static instance = null;

    constructor() {
        SoundController.instance = this;
    }

    muteAllSounds() {
        PIXIsound.muteAll();
    }
    unmuteAllSounds() {
        PIXIsound.unmuteAll();
    }

    initSoundManifest(resources, soundsIsActive) {
        this.soundManifest = window.SLOT_CONFIG.soundManifest;
        this.sounds = {};
        for (let i = 0; i < this.soundManifest.length; i++) {
            const s = resources[this.soundManifest[i]];
            if (s) {
                this.sounds[this.soundManifest[i]] = s.sound;
            }
        }

        if(soundsIsActive) {
            this.unmuteAllSounds();
        } else {
            this.muteAllSounds();
        }
    }

    playSound(soundName, props) {
        if (this.sounds[soundName]) {
            const sound = this.sounds[soundName].play();

            if (props) {
                if ('loop' in props) {
                    sound.loop = props.loop;
                }
            }

            return sound;
        } else {
            console.log(`Sound with name '${soundName}' not found`);
        }
        return null
    }

    stopSound(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].stop();
        } else {
            console.log(`Sound with name '${soundName}' not found`);
        }
    }

    destroy() {
        PIXIsound.removeAll();
        this.soundManifest = {}
    }
}