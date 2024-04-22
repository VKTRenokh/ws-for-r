export class ChatService {
  private ws: WebSocket
  public onmessage: ((message: string[]) => void) | null =
    null
  private isOpened = false
  private messages: string[] = []

  constructor(url: string) {
    this.ws = new WebSocket(url)

    this.ws.onmessage = (message) => {
      this.handleMessage(message)
    }

    this.ws.onopen = () => {
      this.isOpened = true
    }

    this.ws.onclose = () => {
      this.isOpened = false
    }
  }

  private handleMessage(message: MessageEvent<any>) {
    this.messages.push(message.data)

    this.onmessage?.(this.messages)
  }

  public send(message: string) {
    if (!this.isOpened) {
      return
    }

    this.ws.send(message)
  }
}

console.log(import.meta.env)

export const chatService = new ChatService(
  import.meta.env.VITE_WS_URL,
)
