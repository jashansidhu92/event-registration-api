export interface Event {
  id?: string;

  name: string;
  date: string;
  location: string;

  category: "conference" | "workshop" | "meetup" | "seminar" | "general";
  capacity: number;
  registrationCount: number;

  status: "active" | "completed" | "cancelled";
  createdAt?: string;
}