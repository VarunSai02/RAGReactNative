import React, { useState } from 'react';
import 'intl-pluralrules';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // New import for icons
import { useTranslation } from 'react-i18next';



import * as RNLocalize from 'react-native-localize';

import { GroundingFiles } from './components/GroundingFiles';
import GroundingFileView from './components/GroundingFileView';
import StatusMessage from './components/StatusMessage';
import Button from './components/Button';

import useAudioPlayer from './hooks/useAudioPlayer';
import useAudioRecorder from './hooks/useAudioRecorder';
import useRealTime from './hooks/useRealtime';

import { GroundingFile, ToolResult } from './types';

const logo = require('./assets/logo.png'); // Ensure the image is in a format compatible with React Native

function App() {
    const [isRecording, setIsRecording] = useState(false);
    const [groundingFiles, setGroundingFiles] = useState<GroundingFile[]>([]);
    const [selectedFile, setSelectedFile] = useState<GroundingFile | null>(null);

    const { startSession, addUserAudio, inputAudioBufferClear } = useRealTime({
        onWebSocketOpen: () => console.log('WebSocket connection opened'),
        onWebSocketClose: () => console.log('WebSocket connection closed'),
        onWebSocketError: event => console.error('WebSocket error:', event),
        onReceivedError: message => console.error('error', message),
        onReceivedResponseAudioDelta: message => {
            isRecording && playAudio(message.delta);
        },
        onReceivedInputAudioBufferSpeechStarted: () => {
            stopAudioPlayer();
        },
        onReceivedExtensionMiddleTierToolResponse: message => {
            const result: ToolResult = JSON.parse(message.tool_result);

            const files: GroundingFile[] = result.sources.map(x => {
                return { id: x.chunk_id, name: x.title, content: x.chunk };
            });

            setGroundingFiles(prev => [...prev, ...files]);
        }
    });

    const { reset: resetAudioPlayer, play: playAudio, stop: stopAudioPlayer } = useAudioPlayer();
    const { start: startAudioRecording, stop: stopAudioRecording } = useAudioRecorder({ onAudioRecorded: addUserAudio });

    const onToggleListening = async () => {
        if (!isRecording) {
            startSession();
            await startAudioRecording();
            resetAudioPlayer();

            setIsRecording(true);
        } else {
            await stopAudioRecording();
            stopAudioPlayer();
            inputAudioBufferClear();

            setIsRecording(false);
        }
    };

    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
            </View>
            <View style={styles.main}>
                <Text style={styles.title}>{t('app.title')}</Text>
                <TouchableOpacity
                    onPress={onToggleListening}
                    style={[styles.button, isRecording ? styles.buttonRecording : styles.buttonIdle]}
                    accessibilityLabel={isRecording ? t('app.stopRecording') : t('app.startRecording')}
                >
                    {isRecording ? (
                        <>
                            <MaterialCommunityIcons name="microphone-off" size={24} color="white" />
                            <Text style={styles.buttonText}>{t('app.stopConversation')}</Text>
                        </>
                    ) : (
                        <>
                            <MaterialCommunityIcons name="microphone" size={24} color="white" />
                        </>
                    )}
                </TouchableOpacity>
                <StatusMessage isRecording={isRecording} />
                <GroundingFiles files={groundingFiles} onSelected={setSelectedFile} />
            </View>
            <Text style={styles.footer}>{t('app.footer')}</Text>
            <GroundingFileView groundingFile={selectedFile} onClosed={() => setSelectedFile(null)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        position: 'absolute',
        top: 16,
        left: 16,
    },
    logo: {
        height: 64,
        width: 64,
    },
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginBottom: 32,
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        height: 48,
        width: 240,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 8,
    },
    buttonIdle: {
        backgroundColor: '#6b21a8',
    },
    buttonRecording: {
        backgroundColor: '#dc2626',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    footer: {
        paddingVertical: 16,
        textAlign: 'center',
    },
});

export default App;
