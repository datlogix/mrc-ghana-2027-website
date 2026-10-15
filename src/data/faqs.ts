/**
 * Frequently asked questions. Only publish verified answers.
 * Undecided matters must say "To be announced".
 * `group` controls grouping on /faq. `home: true` shows the item on the homepage.
 */
export type Faq = { q: string; a: string; group: FaqGroup; home?: boolean };
export type FaqGroup = "The event" | "Participation" | "Registration" | "Preparation" | "International pathway" | "Partnerships";

export const faqGroups: FaqGroup[] = ["The event", "Participation", "Registration", "Preparation", "International pathway", "Partnerships"];

export const faqs: Faq[] = [
  {
    group: "The event",
    home: true,
    q: "When and where is MRC Ghana 2027?",
    a: "MRC Ghana 2027 takes place on Friday 29 and Saturday 30 January 2027 in Accra, Ghana. The venue will be announced once confirmed.",
  },
  {
    group: "The event",
    q: "Who organises MRC Ghana 2027?",
    a: "MRC Ghana 2027 is organised in Ghana by The MakersPlace. The Minoan RobotSports Competition is an international programme of the Hellenic Educational Robotics Organization (H.E.R.O.) in Greece.",
  },
  {
    group: "The event",
    q: "What is the daily timetable?",
    a: "To be announced. The official programme for both days will be published on the Programme page once it has been approved.",
  },
  {
    group: "Participation",
    home: true,
    q: "Which sports can we enter?",
    a: "Seven sports are on the MRC Ghana 2027 programme: Drones, Drone Soccer 3×3, Marathon, Football 3×3, Shooting, Archery and Exhibition. Each has its own page with a summary and a link to the official H.E.R.O. rules.",
  },
  {
    group: "Participation",
    home: true,
    q: "Who can take part?",
    a: "Participation is based on age, not school class. For the six sports with published rules, all team members must be at least 10 years old and are placed in age categories (for example Kids 10–12, Teens/Senior 12+–18 and Adults 18+; Marathon also separates Teens 12+–15 and Senior 15+–18). How exact ages are calculated will be confirmed by the organisers. Exhibition eligibility is awaiting official rules.",
  },
  {
    group: "Participation",
    q: "How big is a team?",
    a: "For the sports with published rules, teams have 2 to 3 members plus a coach aged 20 or over. Drone Soccer 3×3 and Football 3×3 are played in alliances of three teams, which the official rules say should come from the same school or institution.",
  },
  {
    group: "Participation",
    q: "Can a team enter more than one sport?",
    a: "The official MRC rules allow a team to enter several sports, with one robot per sport. Please confirm Ghana-specific arrangements when registering.",
  },
  {
    group: "Registration",
    home: true,
    q: "How do we register?",
    a: "Use the Register a Team button. It takes you to the official MRC Ghana 2027 registration application, where you sign in with your email, add your organisation, team and robot details, and submit an expression of interest. The MakersPlace then reviews each entry against the current H.E.R.O. rules and contacts you.",
  },
  {
    group: "Registration",
    q: "Is there a registration fee or deadline?",
    a: "To be announced. Fees and deadlines will be published here and in the registration application once approved by the organisers.",
  },
  {
    group: "Registration",
    q: "Is my information safe?",
    a: "Participant information is collected only through the official registration application. Website enquiry forms do not ask for children's personal details. See our Privacy page for more.",
  },
  {
    group: "Preparation",
    q: "Where do we find the rules?",
    a: "Every sport page links to its official H.E.R.O. rules page and offers a downloadable information sheet. The official H.E.R.O. rules always take precedence over our summaries.",
  },
  {
    group: "Preparation",
    q: "Do robots have to pass an inspection?",
    a: "Yes. Every robot or drone is checked against its category's specifications before competing, and teams may be asked to explain their design and program. Inspection arrangements for MRC Ghana 2027 will be announced with the programme.",
  },
  {
    group: "International pathway",
    home: true,
    q: "Can Ghanaian teams go to the Global Olympiad in Greece?",
    a: "The MRC Global Olympiad 2027 takes place on 23–26 April 2027 in Chania, Crete, Greece. Any progression from Ghana depends on official eligibility, the national selection arrangements, compliance with the rules and any international places confirmed. Winning a Ghana category does not by itself guarantee selection.",
  },
  {
    group: "International pathway",
    q: "Are flights and accommodation included for selected teams?",
    a: "No. Selection does not include flights, accommodation, international registration fees or sponsorship unless this is separately confirmed in writing.",
  },
  {
    group: "Partnerships",
    q: "How can our organisation support MRC Ghana 2027?",
    a: "Visit the Partners page to see partnership areas and send an enquiry. Our team will respond with the current partnership information.",
  },
];
