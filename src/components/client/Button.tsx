import * as React from 'react'
import { useWaitForTransactionReceipt, useWriteContract, type BaseError } from 'wagmi'
import { abi } from '../../abi'
import { parseEther } from 'viem'

export function Button() {
  const [count, setCount] = React.useState(1)
  const { data: hash, isPending, error, writeContract } = useWriteContract()

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    writeContract({
      address: '0x66bdb713644859a2486547c2d879f7dc7fdf0db2',
      abi,
      functionName: 'mint',
      args: [BigInt(count)],
      value: parseEther((0.01 * count).toString()),
    })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash })

  return (
    <div className="flex justify-center items-center w-full h-full fixed">
      <form onSubmit={submit} className="flex flex-col items-center max-w-xs">
        <input
          type="number"
          min="1"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value, 10))}
          required
          className="w-64 h-24 text-center text-2xl font-extralight bg-transparent border-b border-stone-200 focus:outline-none focus:border-stone-400 transition-colors duration-300"
        />
        <button
          disabled={isPending}
          type="submit"
          className={`w-64 h-24 text-lg font-light rounded-full transition-all duration-300 flex items-center justify-center ${
            isPending ? 'text-stone-300' : 'text-stone-500 hover:text-stone-700'
          }`}
        >
          {isPending ? '・' : 'mint'}
        </button>
        <div className="text-center text-xs text-stone-400 h-8">
          {hash && <div className="break-all">{hash.slice(0, 10)}...{hash.slice(-8)}</div>}
          {isConfirming && <div>Confirming...</div>}
          {isConfirmed && <div>Confirmed</div>}
          {error && <div>{(error as BaseError).shortMessage || error.message}</div>}
        </div>
      </form>
    </div>
  )
}