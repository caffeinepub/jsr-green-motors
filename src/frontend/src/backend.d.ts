import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: bigint;
    title: string;
    content: string;
    slug: string;
    tags: Array<string>;
    author: string;
    is_published: boolean;
    excerpt: string;
    category: string;
    published_date: Time;
}
export type Time = bigint;
export interface Vehicle {
    id: bigint;
    top_speed: bigint;
    brakes: string;
    charging_hours: number;
    name: string;
    description: string;
    is_featured: boolean;
    battery_kwh: number;
    category: string;
    suspension: string;
    brand: string;
    range_km: bigint;
    price_max: bigint;
    price_min: bigint;
    warranty: string;
    motor_watts: bigint;
}
export interface backendInterface {
    addAppointmentBooking(name: string, email: string, phone: string, service_type: string, preferred_date: string, preferred_time: string, notes: string): Promise<void>;
    addContactSubmission(name: string, email: string, phone: string, message: string): Promise<void>;
    addFranchiseApplication(name: string, email: string, phone: string, city: string, state: string, investment_capacity: bigint, message: string): Promise<void>;
    addNewsletterSubscriber(email: string): Promise<void>;
    addQuoteRequest(name: string, email: string, phone: string, vehicle_interest: string, message: string): Promise<void>;
    addVehicleEnquiry(vehicle_id: bigint, name: string, email: string, phone: string, city: string, message: string): Promise<void>;
    getAllPublishedBlogPosts(): Promise<Array<BlogPost>>;
    getAllVehicles(): Promise<Array<Vehicle>>;
    getBlogPostBySlug(slug: string): Promise<BlogPost>;
    getFeaturedVehicles(): Promise<Array<Vehicle>>;
    getVehicleById(id: bigint): Promise<Vehicle>;
    getVehiclesByCategory(category: string): Promise<Array<Vehicle>>;
    seedData(): Promise<void>;
}
