export type Plan = "free" | "pro" | "max";

export type User = {
  id: string;
  firstName: string;
  fullName: string;
  emailAddress: string;
  plan: Plan;
};
