import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // New icon library import

type Properties = {
    value: { name: string };
    onClick: () => void;
};

export default function GroundingFile({ value, onClick }: Properties) {
    return (
        <TouchableOpacity onPress={onClick} style={styles.button}>
            <MaterialCommunityIcons name="file-outline" size={16} color="black" style={styles.icon} /> {/* Updated icon */}
            <Text style={styles.text}>{value.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 8,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    icon: {
        marginRight: 8,
    },
    text: {
        fontSize: 14,
    },
});
