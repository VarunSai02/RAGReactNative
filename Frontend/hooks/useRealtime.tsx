import { useEffect, useRef } from 'react';

type Parameters = {
    onWebSocketOpen?: () => void;
    onWebSocketClose?: () => void;
    onWebSocketError?: (event: Event) => void;
    onWebSocketMessage?: (event: MessageEvent<any>) => void;
    // Add other callback types as needed
};

export default function useRealTime({
    onWebSocketOpen,
    onWebSocketClose,
    onWebSocketError,
    onWebSocketMessage,
}: Parameters) {
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket('ws://your-websocket-endpoint');

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
    }, []);

    const sendMessage = (message: string) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(message);
        }
    };

    return { sendMessage };
}
