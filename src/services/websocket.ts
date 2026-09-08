export class TelemetrySocket {
  private socket: WebSocket | null = null;

  connect(
    onMessage: (data: any) => void
  ) {
    this.socket = new WebSocket(
      "ws://127.0.0.1:8000/ws"
    );

    this.socket.onopen = () => {
      console.log("WS Connected");
    };

    this.socket.onmessage = (event) => {
      const payload = JSON.parse(
        event.data
      );

      onMessage(payload);
    };

    this.socket.onclose = () => {
      console.log("WS Closed");
    };

    this.socket.onerror = (err) => {
      console.error(err);
    };
  }

  disconnect() {
    this.socket?.close();
  }
}