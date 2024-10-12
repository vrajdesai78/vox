"use client";

import React from "react";
import {
  useSellFormStore,
  SplitPreference,
  TicketType,
} from "../../../store/store";

const SellForm: React.FC = () => {
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
    submitForm,
  } = useSellFormStore();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="bg-gray-100 p-2 rounded">
        <p className="text-sm text-gray-600">
          NOTE: You can edit your tickets later!
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Choose ticket type</h2>
        <p className="text-sm text-gray-600 mb-2">
          NOTE: You can edit your tickets later!
        </p>
        <div className="flex flex-wrap gap-2">
          {ticketTypes.map((type) => (
            <button
              key={type}
              type="button"
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
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Number of tickets</h2>
        <p className="text-sm text-gray-600 mb-2">
          NOTE: You can edit your tickets later!
        </p>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <button
              key={num}
              type="button"
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
        <h2 className="text-lg font-semibold mb-2">
          How do you want to split your tickets?
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          NOTE: You can edit your tickets later!
        </p>
        <div className="flex flex-wrap gap-2">
          {splitPreferences.map((pref) => (
            <button
              key={pref}
              type="button"
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
        <h2 className="text-lg font-semibold mb-2">Entering seating details</h2>
        <p className="text-sm text-gray-600 mb-2">
          NOTE: You can edit your tickets later!
        </p>
        <div className="space-y-2">
          <select
            value={section}
            onChange={(e) => setField("section", e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Section</option>
            {/* Add your section options here */}
          </select>
          {errors.section && (
            <p className="text-red-500 text-sm">{errors.section}</p>
          )}

          <select
            value={row}
            onChange={(e) => setField("row", e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Row</option>
            {/* Add your row options here */}
          </select>
          {errors.row && <p className="text-red-500 text-sm">{errors.row}</p>}

          <div className="flex space-x-2">
            <input
              type="text"
              value={fromSeat}
              onChange={(e) => setField("fromSeat", e.target.value)}
              placeholder="From: Seat number"
              className="w-1/2 p-2 border rounded"
            />
            <input
              type="text"
              value={toSeat}
              onChange={(e) => setField("toSeat", e.target.value)}
              placeholder="To: Seat number"
              className="w-1/2 p-2 border rounded"
              disabled={numberOfTickets === 1}
            />
          </div>
          {errors.fromSeat && (
            <p className="text-red-500 text-sm">{errors.fromSeat}</p>
          )}
          {errors.toSeat && (
            <p className="text-red-500 text-sm">{errors.toSeat}</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Select your price</h2>
        <p className="text-sm text-gray-600 mb-2">
          You can only list your tickets for up to 2x the original price.
        </p>
        <input
          type="number"
          value={price}
          onChange={(e) => setField("price", Number(e.target.value))}
          className="w-full p-2 border rounded"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={useSlippage}
          onChange={(e) => setField("useSlippage", e.target.checked)}
          id="useSlippage"
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <label htmlFor="useSlippage" className="text-sm text-gray-600">
          Would you like to sell with a slippage percentage? This has a higher
          chance of being sold.
        </label>
      </div>

      {useSlippage && (
        <div className="flex space-x-2">
          <input
            type="number"
            value={slippagePercentage}
            onChange={(e) =>
              setField("slippagePercentage", Number(e.target.value))
            }
            placeholder="Enter slippage percentage"
            className="w-2/3 p-2 border rounded"
          />
          <button
            type="button"
            onClick={() => console.log("Slippage saved")}
            className="w-1/3 bg-black text-white p-2 rounded"
          >
            Save slippage
          </button>
        </div>
      )}
      {errors.slippagePercentage && (
        <p className="text-red-500 text-sm">{errors.slippagePercentage}</p>
      )}

      <button type="submit" className="w-full bg-black text-white p-3 rounded">
        Next: Payment Details
      </button>
    </form>
  );
};

export default SellForm;