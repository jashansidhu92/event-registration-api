export interface Event {
  id?: string;
  name: string;
  date: string;      
  location: string;
  capacity: number;
  status?: "active" | "completed" | "cancelled";
  createdAt?: string;
}