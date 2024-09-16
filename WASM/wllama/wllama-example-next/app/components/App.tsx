'use client'

import { useWllama } from '../contexts/wllama.context'
import ChatScreen from './ChatScreen'
import GuideScreen from './GuideScreen'
import LogScreen from './LogScreen'
import ModelScreen from './ModelScreen'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Screen } from '../utils/types'

export default function App() {
  const { currScreen } = useWllama()

  return (
    <div className="flex flex-col drawer h-screen w-screen overflow-hidden">
      <Navbar />
      <div className="grow flex flex-row lg:drawer-open h-[calc(100vh-4rem)]">
        <Sidebar>
          {currScreen === Screen.MODEL && <ModelScreen />}
          {currScreen === Screen.CHAT && <ChatScreen />}
          {currScreen === Screen.GUIDE && <GuideScreen />}
          {currScreen === Screen.LOG && <LogScreen />}
        </Sidebar>
      </div>
    </div>
  )
}