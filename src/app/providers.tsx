'use client'

import { ConnectKitProvider } from 'connectkit'
import * as React from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '../wagmi'
import { Button } from '../components/client'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider theme="minimal">{children}</ConnectKitProvider>
        <Button />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
