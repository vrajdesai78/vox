"use server";

import { TEventDetails, TTicket } from "@/types";
import buy from "@/utils/buy";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/utils/contract";
import { ReclaimProofRequest } from "@reclaimprotocol/js-sdk";
import { createClient } from "@supabase/supabase-js";
import { createPublicClient, formatUnits, http, parseUnits } from "viem";
import { baseSepolia } from "viem/chains";
import sgMail from "@sendgrid/mail";

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
    price: ticket.price,
    ticketUrl: ticket.ticketUrl,
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
    .order("createdAt", { ascending: true });

  console.log("data", data);

  if (error) {
    console.error("Error fetching event details:", error);
  }

  return data?.[0] as TTicket;
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
          price: Number((showData?.price * 84.06).toFixed(2)),
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

export const getTicketbyId = async (ticketId: number) => {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("Tickets")
    .select("*")
    .eq("ticketId", ticketId);

  return data?.[0] as TTicket;
};

export const getActiveBids = async (user: string) => {
  const client = createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });

  const activeBids = (await client.readContract({
    abi: CONTRACT_ABI,
    functionName: "getCurrentBidsOnListedTickets",
    args: [user],
    address: CONTRACT_ADDRESS,
  })) as any[];

  console.log("activeBids", activeBids);

  const ticket = await getTicketbyId(activeBids?.[1] as number);
  const requestedPrice =
    Number(formatUnits(activeBids?.[2] as bigint, 18)) * 84.06;
  const formattedPrice = Number((ticket?.price * 84.06).toFixed(2));

  console.log("price", requestedPrice);

  const requests = {
    coldplay: {
      artist: "Coldplay",
      event: "Music Festival",
      eventId: ticket?.eventId,
      ticketUrl: ticket?.ticketUrl,
      ticketId: ticket?.ticketId,
      location: "Mumbai",
      date: "18th Jaunuary 2025",
      yourPrice: formattedPrice,
      requestedPrice: Number(requestedPrice.toFixed(2)),
      bidRequester: activeBids?.[3][0],
      priceChange: Number(
        (
          ((Number(requestedPrice) - formattedPrice) / formattedPrice) *
          100
        ).toFixed(2)
      ),
      imageSrc: "/profile/request.svg",
    },
  };

  return requests;
};

export const sendEmail = async (url: string, email?: string) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  const msg = {
    from: "manav18gadhiya@gmail.com",
    to: email ?? "vrajdesai78@gmail.com",
    subject: "Turn up the heat, your coldplay ticket is here!",
    html: `<p>Your ticket is ready to be claimed. Click on the link below to claim your ticket.
    <a href=${url}>Get Ticket</a>
    </p>`,
  };

  try {
    const response = await sgMail.send(msg);
    console.log(response);
  } catch (error: any) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};
