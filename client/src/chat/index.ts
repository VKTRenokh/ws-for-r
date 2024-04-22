import { BaseComponent, button } from "@control.ts/signals"
import { ChatService } from "./services/chat.service"
import { classBcToFn } from ":/utils/class-bc-to-fn"

export class ChatComponent extends BaseComponent {
  constructor(private chatService: ChatService) {
    super(
      {},
      button({
        txt: "Send test",
        onclick: () => chatService.send("hello"),
      }),
    )

    this.chatService.onmessage = (message) => {
      console.log(message)
    }
  }
}

export const Chat = classBcToFn(ChatComponent)
