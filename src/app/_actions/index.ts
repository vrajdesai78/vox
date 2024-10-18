"use server";

import { TEventDetails, TTicket } from "@/types";
import buy from "@/utils/buy";
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

  return data;
};

export const getShowsByName = async (eventName: string) => {
  const supabase = getClient();
  const { data, error } = await supabase.from("Concerts").select("*");

  if (error) {
    console.error("Error fetching events:", error);
  }

  return data as TTicket[];
};

export const getShowsByEventId = async (eventId: number) => {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("Tickets")
    .select("*")
    .eq("eventId", eventId)
    .order("createdAt", { ascending: true })
    .single();

  console.log("data", data);

  if (error) {
    console.error("Error fetching event details:", error);
  }

  return data as TTicket;
};

export const getEventDetails = async (name: string) => {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("Concerts")
    .select("*")
    .eq("name", name);

  if (error) {
    console.error("Error fetching event details:", error);
  }

  return data as TEventDetails[];
};

export const getShows = async () => {
  try {
    const buyData = buy[0];
    const formattedData = {
      title: buyData.title,
      bgImage: buyData.bgImage,
      description: buyData.description,
      location: buyData.location,
      dateRange: buyData.dateRange,
      trending: buyData.trending,
      shows: buyData.shows.map(async (show, idx) => {
        const showData = await getShowsByEventId(show.id);
        return {
          id: buyData.shows[idx].id,
          ticketId: showData?.ticketId,
          date: buyData.shows[idx].date,
          day: buyData.shows[idx].day,
          time: buyData.shows[idx].time,
          price: showData?.price ?? 0,
          currency: buyData.shows[idx].currency,
          bestSelling: buyData.shows[idx].bestSelling,
        };
      }),
      mostSoldTickets: buyData.mostSoldTickets,
      otherLocations: buyData.otherLocations,
    };

    const resolvedShows = await Promise.all(formattedData.shows);

    const finalFormattedData = {
      ...formattedData,
      shows: resolvedShows,
    };
    console.log("finalFormatted", finalFormattedData);
    return [finalFormattedData];
  } catch (error) {
    console.error("Error fetching shows:", error);
    throw error;
  }
};

export const recentlyAdded = async () => {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("Tickets")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(1);

  if (error) {
    console.error("Error fetching recently added:", error);
  }

  return data as TTicket[];
};
