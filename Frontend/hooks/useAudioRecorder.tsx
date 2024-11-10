import { useRef } from 'react';
import AudioRecord from 'react-native-audio-record';

type Parameters = {
    onAudioRecorded: (base64: string) => void;
};

export default function useAudioRecorder({ onAudioRecorded }: Parameters) {
    const audioRecorder = useRef<boolean>(false);

    const start = async () => {
        const options = {
            sampleRate: 44100,
            channels: 1,
            bitsPerSample: 16,
            audioSource: 6, // Voice recognition
        };
        AudioRecord.init(options);
        AudioRecord.start();
        audioRecorder.current = true;

        AudioRecord.on('data', data => {
            const base64Audio = Buffer.from(data, 'binary').toString('base64');
            onAudioRecorded(base64Audio);
        });
    };

    const stop = async () => {
        if (audioRecorder.current) {
            const audioFile = await AudioRecord.stop();
            audioRecorder.current = false;
            return audioFile;
        }
    };

    return { start, stop };
}
