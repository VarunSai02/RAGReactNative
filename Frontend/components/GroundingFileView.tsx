import React from 'react';
import { View, Text, Modal, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import new icon library

type GroundingFile = {
    name: string;
    content: string;
};

type Properties = {
    groundingFile: GroundingFile | null;
    onClosed: () => void;
};

export default function GroundingFileView({ groundingFile, onClosed }: Properties) {
    if (!groundingFile) {
        return null;
    }

    return (
        <Modal visible={!!groundingFile} transparent={true} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{groundingFile.name}</Text>
                        <TouchableOpacity onPress={onClosed}>
                            <MaterialCommunityIcons name="close" size={20} color="black" /> {/* Updated icon */}
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.content}>
                        <Text style={styles.text}>{groundingFile.content}</Text>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        width: '90%',
        maxHeight: '80%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        marginTop: 8,
    },
    text: {
        fontSize: 14,
    },
});
