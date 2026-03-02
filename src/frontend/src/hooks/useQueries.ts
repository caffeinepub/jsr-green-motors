import { useMutation, useQuery } from "@tanstack/react-query";
import type { BlogPost, Vehicle } from "../backend.d";
import { useActor } from "./useActor";

export function useAllVehicles() {
  const { actor, isFetching } = useActor();
  return useQuery<Vehicle[]>({
    queryKey: ["vehicles", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllVehicles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFeaturedVehicles() {
  const { actor, isFetching } = useActor();
  return useQuery<Vehicle[]>({
    queryKey: ["vehicles", "featured"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedVehicles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useVehiclesByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Vehicle[]>({
    queryKey: ["vehicles", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      if (category === "All") return actor.getAllVehicles();
      return actor.getVehiclesByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useVehicleById(id: bigint) {
  const { actor, isFetching } = useActor();
  return useQuery<Vehicle>({
    queryKey: ["vehicles", "id", id.toString()],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getVehicleById(id);
    },
    enabled: !!actor && !isFetching && id > 0n,
  });
}

export function useAllBlogPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost[]>({
    queryKey: ["blog", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPublishedBlogPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBlogPostBySlug(slug: string) {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost>({
    queryKey: ["blog", "slug", slug],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getBlogPostBySlug(slug);
    },
    enabled: !!actor && !isFetching && !!slug,
  });
}

export function useAddContactSubmission() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      message,
    }: {
      name: string;
      email: string;
      phone: string;
      message: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.addContactSubmission(name, email, phone, message);
    },
  });
}

export function useAddQuoteRequest() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      vehicle_interest,
      message,
    }: {
      name: string;
      email: string;
      phone: string;
      vehicle_interest: string;
      message: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.addQuoteRequest(
        name,
        email,
        phone,
        vehicle_interest,
        message,
      );
    },
  });
}

export function useAddAppointmentBooking() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      service_type,
      preferred_date,
      preferred_time,
      notes,
    }: {
      name: string;
      email: string;
      phone: string;
      service_type: string;
      preferred_date: string;
      preferred_time: string;
      notes: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.addAppointmentBooking(
        name,
        email,
        phone,
        service_type,
        preferred_date,
        preferred_time,
        notes,
      );
    },
  });
}

export function useAddFranchiseApplication() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      city,
      state,
      investment_capacity,
      message,
    }: {
      name: string;
      email: string;
      phone: string;
      city: string;
      state: string;
      investment_capacity: bigint;
      message: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.addFranchiseApplication(
        name,
        email,
        phone,
        city,
        state,
        investment_capacity,
        message,
      );
    },
  });
}

export function useAddNewsletterSubscriber() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      if (!actor) throw new Error("No actor");
      return actor.addNewsletterSubscriber(email);
    },
  });
}

export function useAddVehicleEnquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      vehicle_id,
      name,
      email,
      phone,
      city,
      message,
    }: {
      vehicle_id: bigint;
      name: string;
      email: string;
      phone: string;
      city: string;
      message: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.addVehicleEnquiry(
        vehicle_id,
        name,
        email,
        phone,
        city,
        message,
      );
    },
  });
}

export function useSeedData() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.seedData();
    },
  });
}
