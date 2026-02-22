export interface Event {
  id?: string;

  name: string;
  date: string;
  location: string;

  category: string;              
  capacity: number;
  registrationCount: number;    

  status: "active" | "completed" | "cancelled";

  createdAt?: string;
}