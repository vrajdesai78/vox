"use server";

import { TTicket } from "@/types";
import { ReclaimProofRequest } from "@reclaimprotocol/js-sdk";
import { createClient } from "@supabase/supabase-js";

export const getReclaimConfig = async (url: string) => {
  const APP_ID = process.env.APP_ID!;
  const APP_SECRET = process.env.APP_SECRET!;
  const PROVIDER_ID = process.env.PROVIDER_ID!;

  try {
    const relcaimProtocolRequest = await ReclaimProofRequest.init(
      APP_ID,
      APP_SECRET,
      PROVIDER_ID
    );

    relcaimProtocolRequest.setAppCallbackUrl(url);
    return relcaimProtocolRequest.toJsonString();
  } catch (error) {
    console.error("Error fetching reclaim config:", error);
    throw error;
  }
};

const getClient = () => {
  const supabaseClient = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
  );
  return supabaseClient;
};

export const addTicket = async (ticket: TTicket) => {
  const supabase = getClient();
  const { data, error } = await supabase.from("Tickets").insert({
    ticketId: ticket.ticketId,
    eventId: ticket.eventId,
    seatDetails: ticket.seatDetails,
  });

  if (error) {
    console.error("Error adding ticket:", error);
  }

  return data;
};

export const getTickets = async (eventId: number) => {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("Tickets")
    .select("*")
    .eq("eventId", eventId);

  if (error) {
    console.error("Error fetching tickets:", error);
  }
};
