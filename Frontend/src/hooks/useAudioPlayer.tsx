import { useRef } from "react";
import Sound from "react-native-sound";
import { Buffer } from "buffer";

const SAMPLE_RATE = 24000;

export default function useAudioPlayer() {
    const audioPlayer = useRef<Sound | null>(null);

    const reset = () => {
        // Reset the player (if needed)
        audioPlayer.current = null;
    };

    const play = (base64Audio: string) => {
        // Convert base64 string to binary
        const binary = Buffer.from(base64Audio, 'base64');
        const filePath = `${Sound.MAIN_BUNDLE}/temp_audio_file.pcm`; // Modify as necessary

        // You might need to write this binary data to a file using `react-native-fs`:
        import RNFS from 'react-native-fs';

        const writeFileAndPlay = async () => {
            try {
                const path = `${RNFS.DocumentDirectoryPath}/temp_audio_file.pcm`; // Path to save the file
                await RNFS.writeFile(path, binary.toString('base64'), 'base64');

                // Initialize and play the audio
                audioPlayer.current = new Sound(path, '', (error) => {
                    if (error) {
                        console.error('Failed to load the sound', error);
                        return;
                    }
                    audioPlayer.current?.play((success) => {
                        if (!success) {
                            console.error('Audio playback failed');
                        }
                    });
                });
            } catch (error) {
                console.error('Error writing file', error);
            }
        };

        writeFileAndPlay();
    };

    const stop = () => {
        audioPlayer.current?.stop(() => {
            console.log('Audio playback stopped');
            audioPlayer.current = null;
        });
    };

    return { reset, play, stop };
}
