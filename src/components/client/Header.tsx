import { ConnectKitButton } from 'connectkit'
import { Dev } from '@/server'

export function Header() {
  return (
    <div className="flex justify-between items-center p-4">
      <Dev />
      <div className="flex items-center gap-8">
        <ConnectKitButton />
      </div>
    </div>
  )
}
