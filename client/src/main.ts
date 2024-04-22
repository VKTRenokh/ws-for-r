import { BaseComponent, mount } from "@control.ts/signals"
import { Chat } from "./chat"
import { chatService } from "./chat/services/chat.service"

class App extends BaseComponent {
  constructor() {
    super({ txt: "hello world" }, Chat(chatService))
  }
}

mount(document.body, new App())
