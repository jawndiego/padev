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
    useWaitForTransactionReceipt({
      hash,
    })

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white">
      <form onSubmit={submit} className="w-64 space-y-4">
        <div>
          <input
            id="count"
            name="count"
            type="number"
            min="1"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value, 10))}
            required
            className="w-full px-3 py-2 border-b border-gray-300 focus:border-gray-700 focus:outline-none text-center"
            placeholder="# of mints"
          />
        </div>
        <button
          disabled={isPending}
          type="submit"
          className={`w-full py-2 text-black font-medium rounded-none transition-colors ${
            isPending ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:bg-gray-50'
          }`}
        >
          {isPending ? '...' : 'mint'}
        </button>
        {(hash || isConfirming || isConfirmed || error) && (
          <div className="text-xs text-center text-gray-500 mt-2">
            {hash && 'Transaction sent'}
            {isConfirming && 'Confirming...'}
            {isConfirmed && 'Confirmed'}
            {error && ((error as BaseError).shortMessage || 'Error occurred')}
          </div>
        )}
      </form>
    </div>
  )
}