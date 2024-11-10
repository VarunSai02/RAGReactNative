import { useEffect, useRef } from 'react';

type Parameters = {
    onWebSocketOpen?: () => void;
    onWebSocketClose?: () => void;
    onWebSocketError?: (event: Event) => void;
    onWebSocketMessage?: (event: MessageEvent<any>) => void;
    // Add custom callback types as needed (e.g., onReceivedResponseAudioDelta, etc.)
};

export default function useRealTime({
    onWebSocketOpen,
    onWebSocketClose,
    onWebSocketError,
    onWebSocketMessage,
}: Parameters) {
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket('ws://your-websocket-endpoint'); // Replace with actual endpoint

        ws.current.onopen = () => {
            onWebSocketOpen?.();
            console.log('WebSocket connection opened');
        };

        ws.current.onclose = () => {
            onWebSocketClose?.();
            console.log('WebSocket connection closed');
        };

        ws.current.onerror = (event) => {
            onWebSocketError?.(event);
            console.error('WebSocket error:', event);
        };

        ws.current.onmessage = (event) => {
            onWebSocketMessage?.(event);
            console.log('Message from server:', event.data);
        };

        return () => {
            ws.current?.close();
        };
    }, [onWebSocketOpen, onWebSocketClose, onWebSocketError, onWebSocketMessage]); // Add dependencies as needed

    const sendMessage = (message: string) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(message);
        } else {
            console.warn('WebSocket is not open. Unable to send message:', message);
        }
    };

    return { sendMessage };
}
