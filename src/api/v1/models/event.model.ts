export interface Event {
  id?: string;
  name: string;
  date: string;      
  location: string;
  capacity: number;
  status?: "draft" | "published" | "cancelled";
  createdAt?: string;
}