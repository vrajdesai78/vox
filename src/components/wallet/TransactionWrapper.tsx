"use client";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/utils/contract";
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from "@coinbase/onchainkit/transaction";
import type {
  TransactionError,
  TransactionResponse,
} from "@coinbase/onchainkit/transaction";
import type { Address, ContractFunctionParameters } from "viem";
import { baseSepolia } from "viem/chains";

interface TransactionWrapperProps {
  functionName: string;
  args: any[];
}

export default function TransactionWrapper({
  functionName,
  args,
}: TransactionWrapperProps) {
  const contracts = [
    {
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName,
      args,
    },
  ] as unknown as ContractFunctionParameters[];

  const handleError = (err: TransactionError) => {
    console.error("Transaction error:", err);
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log("Transaction successful", response);
  };

  return (
    <div className='flex '>
      <Transaction
        capabilities={{
          paymasterService: {
            url: process.env.NEXT_PUBLIC_PAYMASTER_URL!,
          },
        }}
        contracts={contracts}
        chainId={baseSepolia.id}
        onError={handleError}
        onSuccess={handleSuccess}
      >
        <TransactionButton
          className='mt-0 mr-auto ml-auto max-w-full text-[white]'
          text='List now'
        />
      </Transaction>
    </div>
  );
}
