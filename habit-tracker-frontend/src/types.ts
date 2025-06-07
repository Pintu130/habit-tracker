
export interface User {
  id: string;
  name: string;
  email: string;
  subscription?: SubscriptionDetails;
}

export interface Task {
  id: string;
  title: string;
  category: string;
  isRecurring: boolean;
  frequency: "daily" | "weekly";
  reminderTime?: string;
  isCompleted: boolean;
  date: string;
}

export interface SubscriptionDetails {
  status: "active" | "inactive" | "trial";
  type: "basic" | "premium";
  endDate: string;
}

export interface StripePaymentIntent {
  clientSecret: string;
}

export type Category = "work" | "personal" | "health" | "study" | "other";

export type CategoryOption = {
  value: Category;
  label: string;
  color: string;
};

export const CATEGORIES: CategoryOption[] = [
  { value: "work", label: "Work", color: "#6E62F9" },
  { value: "personal", label: "Personal", color: "#F97316" },
  { value: "health", label: "Health", color: "#4ADE80" },
  { value: "study", label: "Study", color: "#0EA5E9" },
  { value: "other", label: "Other", color: "#A1A1AA" }
];
