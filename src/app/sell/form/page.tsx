"use client";

import React, { useRef, useState } from "react";
import { useSellFormStore, TicketType, SplitPreference } from "@/store/store";
import { useAccount } from "wagmi";
import { ConnectWallet, ConnectWalletText } from "@coinbase/onchainkit/wallet";
import TransactionWrapper from "@/components/wallet/TransactionWrapper";
import { addTicket, getReclaimConfig } from "@/app/_actions";
import { ReclaimProofRequest } from "@reclaimprotocol/js-sdk";
import { useRouter, useSearchParams } from "next/navigation";

const SellFormPage: React.FC = () => {
  const {
    ticketType,
    numberOfTickets,
    splitPreference,
    section,
    row,
    fromSeat,
    toSeat,
    price,
    useSlippage,
    slippagePercentage,
    errors,
    setField,
    validateForm,
    setUploadedFile,
  } = useSellFormStore();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const { address } = useAccount();

  const ticketTypes: TicketType[] = [
    "Paper",
    "E-Ticket",
    "Mobile QR Code",
    "Mobile Ticket Transfer",
  ];
  const splitPreferences: SplitPreference[] = [
    "No preference",
    "Avoid leaving 1 ticket",
    "Sell together",
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadedFile(file);
      console.log("File selected:", file.name);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      console.log("Form is valid, proceed with submission");
      // Here you would typically call your submitForm function from the store
      // or handle the submission logic
    } else {
      console.log("Form validation failed");
    }
  };

  const searchParams = useSearchParams();

  return (
    <form onSubmit={handleSubmit} className='max-w-2xl mx-auto p-4 space-y-6'>
      <div className='bg-gray-100 p-2 rounded'>
        <p className='text-sm text-gray-600'>
          NOTE: You can edit your tickets later!
        </p>
      </div>

      <div>
        <h2 className='text-lg font-semibold mb-2'>Choose ticket type</h2>
        <div className='flex flex-wrap gap-2'>
          {ticketTypes.map((type) => (
            <button
              key={type}
              type='button'
              onClick={() => setField("ticketType", type)}
              className={`py-2 px-4 rounded ${
                ticketType === type
                  ? "bg-green-200 text-green-800"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        {(ticketType === "E-Ticket" || ticketType === "Mobile QR Code") && (
          <div className='mt-4'>
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileUpload}
              className='hidden'
              accept='image/*,.pdf'
            />
            <button
              type='button'
              onClick={handleUploadClick}
              className='w-full py-2 px-4 bg-gradient-to-r from-gray-800 to-black text-white rounded-lg shadow-md hover:from-gray-700 hover:to-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-colors duration-200'
            >
              {selectedFile
                ? `Uploaded: ${selectedFile.name}`
                : "Upload Ticket"}
            </button>
            {errors.uploadedFile && (
              <p className='text-red-500 text-sm mt-1'>{errors.uploadedFile}</p>
            )}
          </div>
        )}
      </div>

      <div>
        <h2 className='text-lg font-semibold mb-2'>Number of tickets</h2>
        <div className='flex flex-wrap gap-2'>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <button
              key={num}
              type='button'
              onClick={() => setField("numberOfTickets", num)}
              className={`py-2 px-4 rounded ${
                numberOfTickets === num
                  ? "bg-blue-200 text-blue-800"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-lg font-semibold mb-2'>
          How do you want to split your tickets?
        </h2>
        <div className='flex flex-wrap gap-2'>
          {splitPreferences.map((pref) => (
            <button
              key={pref}
              type='button'
              onClick={() => setField("splitPreference", pref)}
              className={`py-2 px-4 rounded ${
                splitPreference === pref
                  ? "bg-green-200 text-green-800"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {pref}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-lg font-semibold mb-2'>Entering seating details</h2>
        <div className='space-y-2'>
          <select
            value={section}
            onChange={(e) => setField("section", e.target.value)}
            className='w-full p-2 border rounded'
          >
            <option value=''>Select Section</option>
            <option value='section1'>A</option>
            <option value='section2'>B</option>
            <option value='section3'>C</option>
            <option value='section4'>D</option>
            <option value='section5'>E</option>
            <option value='section6'>P</option>
            <option value='section7'>O</option>
            <option value='section8'>N</option>
            <option value='section9'>M</option>
            <option value='section10'>L</option>
          </select>
          {errors.section && (
            <p className='text-red-500 text-sm'>{errors.section}</p>
          )}

          <select
            value={row}
            onChange={(e) => setField("row", e.target.value)}
            className='w-full p-2 border rounded'
          >
            <option value=''>Select Level</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </select>
          {errors.row && <p className='text-red-500 text-sm'>{errors.row}</p>}

          <div className='flex space-x-2'>
            <input
              type='text'
              value={fromSeat}
              onChange={(e) => setField("fromSeat", e.target.value)}
              placeholder='From: Seat number'
              className='w-1/2 p-2 border rounded'
            />
            <input
              type='text'
              value={toSeat}
              onChange={(e) => setField("toSeat", e.target.value)}
              placeholder='To: Seat number'
              className='w-1/2 p-2 border rounded'
              disabled={numberOfTickets === 1}
            />
          </div>
          {errors.fromSeat && (
            <p className='text-red-500 text-sm'>{errors.fromSeat}</p>
          )}
          {errors.toSeat && (
            <p className='text-red-500 text-sm'>{errors.toSeat}</p>
          )}
        </div>
      </div>

      <div>
        <h2 className='text-lg font-semibold mb-2'>Select your price</h2>
        <p className='text-sm text-gray-600 mb-2'>
          You can only list your tickets for up to 2x the original price.
        </p>
        <input
          type='number'
          value={price}
          onChange={(e) => setField("price", Number(e.target.value))}
          className='w-full p-2 border rounded'
        />
        {errors.price && <p className='text-red-500 text-sm'>{errors.price}</p>}
      </div>

      <div className='flex items-center space-x-2'>
        <input
          type='checkbox'
          checked={useSlippage}
          onChange={(e) => setField("useSlippage", e.target.checked)}
          id='useSlippage'
          className='form-checkbox h-5 w-5 text-blue-600'
        />
        <label htmlFor='useSlippage' className='text-sm text-gray-600'>
          Would you like to sell with a slippage percentage? This has a higher
          chance of being sold.
        </label>
      </div>

      {useSlippage && (
        <div className='flex space-x-2'>
          <input
            type='number'
            value={slippagePercentage}
            onChange={(e) =>
              setField("slippagePercentage", Number(e.target.value))
            }
            placeholder='Enter slippage percentage'
            className='w-2/3 p-2 border rounded'
          />
          <button
            type='button'
            onClick={() => console.log("Slippage saved")}
            className='w-1/3 bg-black text-white p-2 rounded'
          >
            Save slippage
          </button>
        </div>
      )}
      {errors.slippagePercentage && (
        <p className='text-red-500 text-sm'>{errors.slippagePercentage}</p>
      )}

      {/* <button
        type='button'
        onClick={async () => {
          const relcaimProofRequest = await getReclaimConfig(
            window.location.href
          );
          const proofRequest = await ReclaimProofRequest.fromJsonString(
            relcaimProofRequest
          );
          const requestUrl = await proofRequest.getRequestUrl();
          console.log("requestUrl", requestUrl);

          await proofRequest.startSession({
            onSuccess: (proofs) => {
              console.log("Verification success", proofs);
            },
            onError: (error) => {
              console.error("Verification failed", error);
            },
          });
          window.open(requestUrl, "_blank");
        }}
      >
        Verify Ticket
      </button> */}

      {!address ? (
        <ConnectWallet className='w-full'>
          <ConnectWalletText>Sign In to List</ConnectWalletText>
        </ConnectWallet>
      ) : (
        <TransactionWrapper
          functionName='listTicket'
          args={[Number(searchParams.get("eventId")), fromSeat, price]}
          isApprovalTx={false}
          onSuccess={async () => {
            await addTicket({
              ticketId: Number(fromSeat),
              eventId: Number(searchParams.get("eventId")),
              seatDetails: {
                seatNumber: Number(fromSeat),
                row: Number(row),
                section: section,
              },
            });
            router.push(`/sell/${fromSeat}`);
          }}
          onError={() => {
            console.log("Transaction error");
          }}
        />
      )}
    </form>
  );
};

export default SellFormPage;
