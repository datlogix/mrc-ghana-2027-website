import { event } from "@/config/event";

const closes = event.registration.deadline ? ` Registration closes on ${event.registration.deadline}.` : "";

/** Participation journey — used on /participate (all steps) and the homepage (summary). */
export const participationSteps = [
  { title: "Explore the competition", body: "Learn how MRC works and what happens across the two competition days in Accra." },
  { title: "Choose an eligible sport", body: "Pick from the seven categories and check that every team member fits the published age bands." },
  { title: "Read the official rules", body: "Each category links to its official H.E.R.O. rules. The current official rules always take precedence." },
  { title: "Form a team", body: "Most sports need 2–3 members and an adult coach aged 20 or over. Football and Drone Soccer are played in alliances of three teams." },
  { title: "Prepare your robot or project", body: "Build, program and test against the size, weight and equipment rules — and practise explaining your design." },
  { title: "Register your team", body: `Submit your team through the official MRC Ghana 2027 registration application.${closes}` },
  { title: "Complete organiser checks", body: "Watch for confirmation emails, programme updates, consent requirements and technical-inspection arrangements." },
  { title: "Compete at MRC Ghana 2027", body: "Pass technical inspection, then compete in Accra on 29–30 January 2027." },
  { title: "Follow results and selection", body: "Results and any international selection process will be published by the organisers. Selection is not automatic." },
] as const;

export const homeSteps = [
  { title: "Choose your sport", body: "Explore the seven categories and check the age bands and team rules." },
  { title: "Build and practise", body: "Prepare your robot, drone or project against the official specifications." },
  { title: "Register your team", body: `Submit your team through the official registration application.${closes}` },
  { title: "Compete in Accra", body: "Pass technical inspection and compete on 29–30 January 2027." },
] as const;
