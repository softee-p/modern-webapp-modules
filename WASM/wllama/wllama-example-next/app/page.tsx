'use client'

import { MessagesProvider } from './contexts/messages.context'
import { WllamaProvider } from './contexts/wllama.context'
import App from './components/App'

export default function Home() {
  return (
    <MessagesProvider>
      <WllamaProvider>
        <App />
      </WllamaProvider>
    </MessagesProvider>
  )
}