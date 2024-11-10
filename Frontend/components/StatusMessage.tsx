import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

type Properties = {
    isRecording: boolean;
};

export default function StatusMessage({ isRecording }: Properties) {
    if (!isRecording) {
        return <Text style={styles.text}>Not recording</Text>;
    }

    return (
        <View style={styles.container}>
            <Animated.View style={styles.barsContainer}>
                {[...Array(4)].map((_, i) => (
                    <Animated.View
                        key={i}
                        style={[styles.bar, { animationDelay: `${i * 100}ms` }]}
                    />
                ))}
            </Animated.View>
            <Text style={styles.text}>Conversation in progress</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    barsContainer: {
        flexDirection: 'row',
        height: 24,
        marginRight: 8,
    },
    bar: {
        width: 4,
        height: 8,
        backgroundColor: '#6b21a8',
        marginHorizontal: 2,
        borderRadius: 2,
        opacity: 0.8,
        animation: 'barHeight 1s ease-in-out infinite',
    },
    text: {
        fontSize: 16,
    },
});
