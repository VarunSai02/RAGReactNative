import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import GroundingFile from './GroundingFile';

type GroundingFileType = {
    id: string;
    name: string;
    content: string;
};

type Properties = {
    files: GroundingFileType[];
    onSelected: (file: GroundingFileType) => void;
};

export function GroundingFiles({ files, onSelected }: Properties) {
    if (files.length === 0) {
        return null;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Grounding Files</Text>
            <View style={styles.fileList}>
                {files.map((file, index) => (
                    <GroundingFile key={index} value={file} onClick={() => onSelected(file)} />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    fileList: {
        flexDirection: 'column',
    },
});
