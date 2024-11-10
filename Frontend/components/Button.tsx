import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type ButtonProps = {
    variant?: 'default' | 'outline' | 'destructive';
    size?: 'default' | 'sm' | 'lg';
    onPress: () => void;
    children: React.ReactNode;
};

const Button = ({ variant = 'default', size = 'default', onPress, children }: ButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, styles[variant], styles[size]]}>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    default: {
        backgroundColor: '#6200ea',
    },
    outline: {
        borderColor: '#6200ea',
        borderWidth: 1,
        backgroundColor: 'transparent',
    },
    destructive: {
        backgroundColor: '#d32f2f',
    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
    sm: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    lg: {
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
});

export default Button;
