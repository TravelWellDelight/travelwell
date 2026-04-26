// src/types/booking.ts

export interface TravellerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  specialRequests?: string;
}

export interface Booking {
  _id?: string;
  packageId: string;
  packageTitle: string;
  packageSlug: string;
  travelDates: {
    start: string;   // ISO date string
    end: string;
  };
  traveller: TravellerDetails;
  amount: number;   // total in INR paise (Razorpay unit)
  currency: "INR";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  status: "pending" | "paid" | "failed" | "refunded";
  createdAt: string;
}

// src/types/enquiry.ts

export interface Enquiry {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  packageId?: string;
  packageTitle?: string;
  travelMonth?: string;
  groupSize?: number;
  message: string;
  status: "new" | "responded" | "converted";
  createdAt: string;
}
