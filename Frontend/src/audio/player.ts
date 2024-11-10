import Sound from 'react-native-sound';

export class Player {
    private sound: Sound | null = null;

    init(filePath: string) {
        this.sound = new Sound(filePath, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.error('Failed to load the sound', error);
                return;
            }
        });
    }

    play() {
        if (this.sound) {
            this.sound.play((success) => {
                if (!success) {
                    console.error('Sound playback failed');
                }
            });
        }
    }

    stop() {
        if (this.sound) {
            this.sound.stop(() => {
                console.log('Sound stopped');
            });
        }
    }
}
