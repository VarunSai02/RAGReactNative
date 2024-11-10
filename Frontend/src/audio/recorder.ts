import AudioRecord from 'react-native-audio-record';

export class Recorder {
    onDataAvailable: (buffer: Iterable<number>) => void;

    constructor(onDataAvailable: (buffer: Iterable<number>) => void) {
        this.onDataAvailable = onDataAvailable;
    }

    async start() {
        AudioRecord.init({
            sampleRate: 24000,  // Adjust as needed
            channels: 1,
            bitsPerSample: 16,
            audioSource: 6,
        });

        AudioRecord.on('data', (data) => {
            // Convert the buffer to a usable format
            const buffer = new Uint8Array(data);
            this.onDataAvailable(buffer);
        });

        AudioRecord.start();
    }

    async stop() {
        const audioFile = await AudioRecord.stop();
        console.log('Recording saved to:', audioFile);
    }
}
