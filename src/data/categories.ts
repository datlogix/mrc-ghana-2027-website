/**
 * THE single controlled source for the seven MRC Ghana 2027 sports.
 *
 * Every menu, card, page, PDF, filter and registration link is generated from
 * this list. Do NOT add other H.E.R.O. sports (e.g. Marathon Turbo, Obstacle
 * Race, Wrestling, VEX IQ, Relay Race, Rowing, Sumo). `scripts/validate-content.ts`
 * fails the build if the list changes without the approved slugs.
 *
 * Content is an original plain-English summary of the official H.E.R.O. rules
 * (see `rulesUrl`). The official rules always take precedence. Where the
 * official rules are unclear, add an entry to `clarifications` instead of
 * inventing a definitive rule.
 */

export type AgeBand = { label: string; ages: string; note?: string };

export type Category = {
  slug: CategorySlug;
  /** Exact sport name as approved for the Ghana programme. */
  name: string;
  /** Heading used on the official H.E.R.O. rules page. */
  officialHeading: string;
  /** Short line for cards. */
  strapline: string;
  /** Plain-English summary for cards and meta descriptions (≤ 160 chars). */
  summary: string;
  /** Team size as published in the official rules; null when not yet published. */
  teamSize: string | null;
  icon: CategorySlug;
  rulesUrl: string;
  sourceId: string;
  rulesCheckedOn: string;
  /** Has the official rules page published detailed rules? */
  rulesPublished: boolean;
  overview: string[];
  objectives: string[];
  skills: string[];
  divisions: string | null;
  ageBands: AgeBand[];
  team: string[];
  equipment: string[];
  format: string[];
  scoring: string[];
  safety: string[];
  checklist: string[];
  /** Items awaiting clarification from H.E.R.O. / the Ghana organising committee. */
  clarifications: string[];
  /** Official H.E.R.O. practice resources (mats, targets) — links only. */
  officialResources: { label: string; url: string }[];
};

export const APPROVED_SLUGS = [
  "drones",
  "drone-soccer",
  "marathon",
  "football",
  "shooting",
  "archery",
  "exhibition",
] as const;
export type CategorySlug = (typeof APPROVED_SLUGS)[number];

const CHECKED = "2026-10-14";

/** Shared team rules that appear on the Drones, Drone Soccer, Marathon, Football, Shooting and Archery rules pages. */
const standardTeam = [
  "Teams of 2 to 3 members. Individual entries are not accepted.",
  "Each team names one Technician — the only team member allowed in the waiting and competition area. The Technician may change between attempts or matches.",
  "Every team member must be at least 10 years old.",
  "Each team needs a coach aged 20 or over. A coach must bring one assistant for every three teams they register.",
  "One robot per team. Robots may not be swapped during the competition or shared between teams.",
];

const ageAmbiguity =
  "The official rules publish age bands but do not state how age is calculated (for example, age on competition day or by year of birth), and adjacent bands share boundary ages (for example '10 to 12' and '12+'). The Ghana organising committee will confirm how ages are applied before registration closes.";

export const categories: Category[] = [
  {
    slug: "drones",
    name: "Drones",
    officialHeading: "DRONES",
    strapline: "Precision piloting missions",
    summary:
      "Teams pilot a small indoor drone through a secret course of hoops, obstacles and landing pads, scoring points for precision and order.",
    teamSize: "2–3 team members",
    icon: "drones",
    rulesUrl: "https://www.he-ro.gr/mrc-drones",
    sourceId: "rules-drones",
    rulesCheckedOn: CHECKED,
    rulesPublished: true,
    overview: [
      "Drones is a precision flying challenge. A team's pilot (the Technician) flies a small, guarded indoor drone by remote control through a course of hoops, obstacles, take-off points and landing pads.",
      "Each element on the course carries its own points value. The layout, route and points are kept secret until the competition day, so teams win through solid piloting skills rather than memorising a course.",
      "This is not Drone Soccer: Drones is an individual-team piloting mission, while Drone Soccer 3×3 is an alliance-based aerial football match.",
    ],
    objectives: [
      "Fly the announced route in the correct order — elements completed out of order do not score.",
      "Pass through hoops and over obstacles cleanly and land accurately on the marked pads.",
      "Complete the mission within the three-minute attempt limit.",
    ],
    skills: [
      "Steady manual piloting and spatial awareness",
      "Planning a route quickly when the course is revealed",
      "Calm decision-making under time pressure",
      "Drone setup, battery management and pre-flight checks",
    ],
    divisions: "One division; each age category competes separately.",
    ageBands: [
      { label: "Kids", ages: "10 to 12 years" },
      { label: "Teens / Senior", ages: "12+ to 18 years" },
      { label: "Adults", ages: "18+ years" },
    ],
    team: standardTeam,
    equipment: [
      "Remote-controlled flight only — autonomous flight is not permitted. Wireless links may be used for flight control only.",
      "Maximum size 25 × 25 cm including propeller guards and anything mounted on the drone.",
      "Maximum all-up weight 300 g, including battery, guards and camera.",
      "Plastic propellers with guards around the full perimeter. No sharp parts.",
      "1S or 2S LiPo/LiHV batteries only; teams may bring up to two packs.",
      "Indoor micro-class drones. The official page lists examples of accepted and not-accepted models — check it before buying. Models not listed need organiser pre-approval at least 7 days before the event.",
      "At inspection the drone must hold a flight height of 1–2 m without the pilot controlling altitude, and must be able to cut power instantly (kill switch).",
    ],
    format: [
      "Each team has two attempts. Every team completes Round 1 before Round 2 begins.",
      "Each attempt lasts up to three minutes. The drone must take off within five seconds of the referee's whistle.",
      "Flight height must stay at or below 2 m at all times.",
      "Start order is first-come, first-served in the Technicians' queue.",
    ],
    scoring: [
      "Points are shown on each pad or hoop and count only when that element is completed correctly and in order.",
      "The attempt score is the total of points earned. An attempt that runs out of time scores no points.",
      "Ranking uses each team's best attempt. Ties are broken by fastest time, then combined score, then an extra mission.",
      "1st, 2nd and 3rd place are awarded in each age category.",
    ],
    safety: [
      "The pilot must wear protective goggles.",
      "Propeller guards, battery condition, the 2 m height limit and the kill switch are all checked at technical inspection.",
      "Missing the technical inspection slot means automatic exclusion.",
      "Rule ZERO applies: if you are not sure something is allowed, assume it is not and ask the organisers.",
    ],
    checklist: [
      "Confirm your drone model meets the size, weight and battery rules (or request pre-approval).",
      "Fit full-perimeter propeller guards and remove any sharp parts.",
      "Test altitude hold at 1–2 m and practise using the kill switch.",
      "Prepare two charged batteries and a safe charging/storage bag.",
      "Practise hoop runs, precision landings and fast route planning.",
      "Pack protective goggles for the pilot.",
    ],
    clarifications: [
      ageAmbiguity,
      "The official page describes both a three-minute 'demonstration' and a precision mission announced on the day; it is not fully clear whether these are the same attempt.",
      "The page excludes DIY and 3D-printed micro drones but permits DIY drones in the Adults category if they meet the specifications.",
      "The altitude-hold inspection requirement may not suit every model on the indicative list; confirm with the organisers before buying.",
    ],
    officialResources: [],
  },
  {
    slug: "drone-soccer",
    name: "Drone Soccer 3×3",
    officialHeading: "DRONE SOCCER 3x3",
    strapline: "Alliance aerial football",
    summary:
      "Alliances of three caged 'drone balls' play aerial football in a netted arena — only the Golden Ball drone can score through the opponents' hoop.",
    teamSize: "2–3 team members",
    icon: "drone-soccer",
    rulesUrl: "https://www.he-ro.gr/drone-soccer",
    sourceId: "rules-drone-soccer",
    rulesCheckedOn: CHECKED,
    rulesPublished: true,
    overview: [
      "Drone Soccer 3×3 is a team sport played in the air. Two alliances, each made of three teams flying one caged 'drone ball', face off inside a netted arena with a hanging hoop goal at each end.",
      "Each alliance assigns three roles — Defender, Attacker and Golden Ball Drone. Only the Golden Ball Drone can score, by flying completely through the opponents' hoop.",
      "This is not the Drones category: Drone Soccer is an alliance-based match game, while Drones is a solo precision-piloting mission.",
    ],
    objectives: [
      "Work as a three-team alliance to score more goals than the opposing alliance in each match.",
      "Protect your own hoop while setting up scoring chances for your Golden Ball Drone.",
      "Progress from the group stage through the knockout rounds.",
    ],
    skills: [
      "Manual piloting in a crowded, fast-moving airspace",
      "Team communication and tactical roles",
      "Quick recovery after collisions",
      "Battery and equipment management across several matches",
    ],
    divisions: "One division; each age category competes separately.",
    ageBands: [
      { label: "Kids", ages: "10 to 12 years" },
      { label: "Teens / Senior", ages: "12+ to 18 years" },
      { label: "Adults", ages: "18+ years" },
    ],
    team: [
      ...standardTeam,
      "An alliance is made of three teams. For 2027 the official rules state that all three teams in an alliance should come from the same school or institution.",
      "If one team is absent the alliance may play with two drones, provided one is the Golden Ball Drone.",
    ],
    equipment: [
      "Only the drone-ball model specified by the organisers may be used, without modification to the drone, controller or motors.",
      "Remote-controlled operation.",
      "LEDs that can show at least red and blue, so each alliance flies in its own colour.",
      "Maximum size 20 × 20 × 18 cm (±1 cm) and maximum weight 140 g.",
      "At least one spare battery.",
    ],
    format: [
      "Arena: a 4 m × 6 m netted field with an 80 cm hoop goal hanging at each end.",
      "Matches last four minutes with no half-time; the clock does not stop.",
      "Group stage followed by knockout rounds, a Final and a Small Final (3rd/4th).",
      "After a goal the scoring alliance must return to its own half.",
    ],
    scoring: [
      "A goal counts only when the Golden Ball Drone passes completely through the opponents' hoop.",
      "Group stage: 3 points for a win, 1 for a draw, 0 for a loss. Ties are separated by goals scored, then goals conceded, then penalties.",
      "Drawn knockout matches go to a penalty shoot-out (10-second attempts, three each, then sudden death).",
      "1st, 2nd and 3rd place are announced in each age category.",
    ],
    safety: [
      "Matches are flown inside a fully netted arena.",
      "Deliberately trying to damage an opponent's drone results in a red card and ejection.",
      "Drone balls and controllers are checked at an initial technical inspection; failing it means disqualification.",
      "Rule ZERO applies: if you are not sure something is allowed, assume it is not and ask the organisers.",
    ],
    checklist: [
      "Confirm with the organisers which drone-ball model is specified for MRC Ghana 2027.",
      "Form an alliance of three teams from your school or institution.",
      "Agree alliance roles (Defender, Attacker, Golden Ball Drone) and practise together.",
      "Check LED colours, weight and size; prepare spare batteries.",
      "Practise penalty attempts and returning to your half after goals.",
    ],
    clarifications: [
      ageAmbiguity,
      "The official rules require 'the specified Drone Ball model' but do not name it on the rules page. The Ghana organisers will confirm the model.",
      "The tournament structure depends on the number of alliances entered; the group and knockout format will be confirmed before the event.",
    ],
    officialResources: [],
  },
  {
    slug: "marathon",
    name: "Marathon",
    officialHeading: "MARATHON",
    strapline: "Autonomous line-following race",
    summary:
      "An autonomous robot follows a black line around a secret track. The fastest clean run within three minutes wins. Basic and Advanced divisions.",
    teamSize: "2–3 team members",
    icon: "marathon",
    rulesUrl: "https://www.he-ro.gr/mrc-marathon",
    sourceId: "rules-marathon",
    rulesCheckedOn: CHECKED,
    rulesPublished: true,
    overview: [
      "Marathon is a race against the clock for fully autonomous robots. Once started, the robot must follow a black line on a white track all the way to the finish with no remote driving.",
      "The track layout stays secret until the competition day, so robots must be programmed to follow any line reliably — through curves and straight across intersections.",
      "There are two divisions. Marathon Basic is for robots built from educational robotics kits with limits on motors and sensors; Marathon Advanced is open to custom electronics and fabrication.",
    ],
    objectives: [
      "Build and program a robot that follows a 1.8 cm black line autonomously.",
      "Complete the track as fast as possible within the three-minute limit.",
      "Stay on the line — the robot may leave it for no more than three seconds.",
    ],
    skills: [
      "Sensor calibration and line-following algorithms (e.g. PID control)",
      "Mechanical design for speed and stability",
      "Testing, tuning and iteration",
      "Explaining your own code to the judges",
    ],
    divisions: "Two divisions: Marathon Basic and Marathon Advanced. Each age category competes separately.",
    ageBands: [
      { label: "Kids", ages: "10 to 12 years" },
      { label: "Teens", ages: "12+ to 15 years" },
      { label: "Senior", ages: "15+ to 18 years" },
      { label: "Adults", ages: "18+ years", note: "Not eligible for Marathon Basic" },
    ],
    team: [
      ...standardTeam,
      "In Marathon Advanced, Senior and Adults teams may register up to two robots.",
    ],
    equipment: [
      "Fully autonomous robot with a start/stop button. In Advanced, a controller may be used only to start the robot.",
      "Maximum footprint 25 × 25 cm, maximum weight 1 kg, height between 5 cm and 15 cm.",
      "Basic: an educational kit with its official controller (for example LEGO, VEX, mBot and similar), up to 1 controller, 4 motors and 4 sensors, no external microcontrollers and no 3D-printed or modified parts.",
      "Advanced: custom electronics (e.g. Arduino, ESP32, Raspberry Pi), custom PCBs, separate batteries and 3D-printed or machined parts are allowed.",
      "Banned in all divisions: pneumatics, pullback motors, gas canisters, circuits above 24 V nominal, sticky wheels and suction devices.",
    ],
    format: [
      "Technical inspection at the first attempt — have your program open on a laptop. Teams who clearly cannot explain their code receive a time penalty.",
      "Each robot must start within five seconds of the whistle. Each attempt is limited to three minutes.",
      "Teams make repeated attempts during the session; adjustments are allowed between attempts but testing on the track is not.",
    ],
    scoring: [
      "Ranking is by each robot's best (shortest) time.",
      "A run that exceeds three minutes, fails to start, loses the line or leaves the track records the maximum time.",
      "1st, 2nd and 3rd place are awarded per age category in both Basic and Advanced.",
    ],
    safety: [
      "No circuit may exceed 24 V nominal.",
      "No gases, pneumatics or parts that could injure people or damage the track.",
      "Rule ZERO applies: if you are not sure something is allowed, assume it is not and ask the organisers.",
    ],
    checklist: [
      "Choose Basic or Advanced and check your kit against that division's rules.",
      "Confirm size (25 × 25 cm), weight (≤ 1 kg) and height (5–15 cm).",
      "Fit and test the start/stop button.",
      "Practise on unfamiliar tracks with curves and intersections (go straight at crossings).",
      "Print the official practice track sample and time your runs.",
      "Bring a laptop with your program ready to explain to judges.",
    ],
    clarifications: [
      ageAmbiguity,
      "The rules require full autonomy and ban wireless links during runs, but also mention starting the robot with a remote in Advanced. Confirm acceptable start methods with the organisers.",
    ],
    officialResources: [
      {
        label: "H.E.R.O. practice track sample (PDF)",
        url: "https://www.he-ro.gr/_files/ugd/75e4cb_af8241d0fdd5480787aa77940115e4ee.pdf",
      },
    ],
  },
  {
    slug: "football",
    name: "Football 3×3",
    officialHeading: "FOOTBALL 3x3",
    strapline: "Remote-controlled robot football",
    summary:
      "Alliances of three remote-controlled robots play five-minute football matches, using motorised kicking mechanisms to score goals.",
    teamSize: "2–3 team members",
    icon: "football",
    rulesUrl: "https://www.he-ro.gr/mrc-soccer",
    sourceId: "rules-football",
    rulesCheckedOn: CHECKED,
    rulesPublished: true,
    overview: [
      "Football 3×3 is robot football on a compact pitch. Each side is an alliance of three teams, each controlling one remote-controlled robot.",
      "Robots must use a motor-driven kicking mechanism to shoot. Teams win through good robot design, accurate driving and alliance teamwork.",
    ],
    objectives: [
      "Score more goals than the opposing alliance in five-minute matches.",
      "Design a robust robot with an effective, motor-driven kicker.",
      "Advance from the group stage through the knockout rounds.",
    ],
    skills: [
      "Mechanical design and drivetrain engineering",
      "Remote-control driving and ball control",
      "Teamwork and tactics within an alliance",
      "Fast repairs between matches",
    ],
    divisions: "One division; all robot types compete together. Each age category competes separately.",
    ageBands: [
      { label: "Kids", ages: "10 to 12 years" },
      { label: "Teens / Senior", ages: "12+ to 18 years" },
      { label: "Adults", ages: "18+ years" },
    ],
    team: [
      ...standardTeam,
      "An alliance is made of three teams, which the official rules state must belong to the same school or institution.",
      "Each alliance's robots carry a visible shared identifier (flag, label or colours), checked at inspection.",
    ],
    equipment: [
      "Remote-controlled robot (remote or app). Venue Wi-Fi is not available to teams.",
      "Maximum footprint 20 × 20 cm, weight 700–800 g, height up to 15 cm.",
      "A motor-driven kicking mechanism that stays within 20 × 20 cm when fully extended.",
      "Up to 4 motors and a single controller, plus a start/stop button.",
      "Ball: LEGO Mindstorms ball, 52 mm diameter.",
      "No holding or carrying the ball; banned items include pneumatics, glue, suction and deliberately detachable parts.",
    ],
    format: [
      "Pitch: about 2.36 × 1.14 m with a low perimeter barrier and green surface.",
      "Matches last five minutes with no half-time; the clock does not stop.",
      "Group stage, then quarter-finals, semi-finals, a Small Final and a Final.",
      "Drawn knockout matches go to a two-minute golden goal, then penalties.",
    ],
    scoring: [
      "A goal counts when the whole ball crosses the goal line.",
      "Group stage: 3 points for a win, 1 for a draw, 0 for a loss; ties separated by goals scored, then conceded.",
      "1st, 2nd and 3rd place are announced in each age category.",
    ],
    safety: [
      "Deliberately trying to damage an opponent results in a red card.",
      "Technicians may not touch robots during play without the referee's permission.",
      "Rule ZERO applies: if you are not sure something is allowed, assume it is not and ask the organisers.",
    ],
    checklist: [
      "Form an alliance of three teams from your school or institution.",
      "Check robot size, weight (700–800 g) and height; test the kicker at full extension.",
      "Practise driving, passing and shooting with a 52 mm LEGO ball.",
      "Prepare spare parts and batteries for quick repairs between matches.",
      "Agree your alliance identifier (flag or colours).",
    ],
    clarifications: [
      ageAmbiguity,
      "The bracket used for the group stage is shown only in images on the official page; the exact format will depend on the number of alliances.",
    ],
    officialResources: [],
  },
  {
    slug: "shooting",
    name: "Shooting",
    officialHeading: "SHOOTING",
    strapline: "Robotic foam-dart precision",
    summary:
      "Teams build a handheld, sensor-triggered foam-dart launcher and aim for three scoring targets at two distances.",
    teamSize: "2–3 team members",
    icon: "shooting",
    rulesUrl: "https://www.he-ro.gr/mrc-shooting",
    sourceId: "rules-shooting",
    rulesCheckedOn: CHECKED,
    rulesPublished: true,
    overview: [
      "Shooting is a precision challenge using soft foam darts. Teams design and build their own handheld launcher, controlled by a microcontroller and triggered by a button or sensor, and must program it to beep one second before each shot.",
      "The Technician aims at three targets worth different points, first from 120 cm and then from 160 cm. The sport rewards careful mechanical design, accurate calibration and steady aim.",
    ],
    objectives: [
      "Build a compliant, self-contained foam-dart launcher with a programmed trigger.",
      "Hit as many targets as possible from both distances in a single attempt.",
      "Maximise the best single attempt score during the session.",
    ],
    skills: [
      "Mechanism design (springs or elastic launch systems)",
      "Programming sensors and timed sequences",
      "Measurement, calibration and consistency",
      "Safe handling and focus",
    ],
    divisions: "One division; each age category competes separately.",
    ageBands: [
      { label: "Kids", ages: "10 to 12 years" },
      { label: "Teens / Senior", ages: "12+ to 18 years" },
      { label: "Adults", ages: "18+ years", note: "The official page lists Adults as 'only for the Advanced category'" },
    ],
    team: standardTeam,
    equipment: [
      "Home-made launcher from cardboard, light plastic, 3D-printed parts, light laser-cut wood or kit parts. No metal launchers and no ready-made toy launchers or their shells.",
      "Maximum size 25 × 25 cm and maximum mass 500 g.",
      "Must include a hub or microcontroller and a button or pressure sensor that triggers the shot, firing one dart at a time.",
      "Must be programmed to beep one second before firing.",
      "Shape and design rules apply (single grip, trigger, forward-facing outlet, rounded corners). Read the official page carefully before building.",
      "Standard unmodified foam darts. Referees may supply their own darts.",
    ],
    format: [
      "Field about 2.36 × 1.14 m with a marked Technician position and a hand-rest base.",
      "Three targets of different weights are mounted 50 cm above the surface.",
      "From each distance (120 cm, then 160 cm) the Technician fires once at each target.",
      "Teams make repeated attempts during the session; there are no restarts within an attempt.",
    ],
    scoring: [
      "Targets are worth 10, 25 and 50 points. An attempt's score is the total from both distances.",
      "Only each team's best single attempt counts.",
      "Teams who clearly cannot explain their own program lose 20% of their score.",
      "1st, 2nd and 3rd place are awarded in each age category.",
    ],
    safety: [
      "Safety glasses and protective equipment are mandatory on the field — teams without them are disqualified.",
      "No propellant gases, chemicals, pneumatics or anything added to increase force.",
      "Darts must not be modified. Unsafe aiming or darts leaving the field stop the attempt.",
      "Teams travelling by air should pack the launcher disassembled.",
    ],
    checklist: [
      "Read the official design and shape rules before you start building.",
      "Check size (25 × 25 cm) and mass (≤ 500 g); use only permitted materials.",
      "Program the one-second warning beep and single-dart firing.",
      "Practise at 120 cm and 160 cm and record your accuracy.",
      "Pack safety glasses and protective equipment.",
      "Bring a laptop with your program ready to explain to judges.",
    ],
    clarifications: [
      ageAmbiguity,
      "The page requires the launcher to be 'semi-autonomous' while elsewhere referring to autonomous operation; the human Technician aims and triggers each shot.",
      "Adults are listed as 'only for the Advanced category', but the sport is described as having one division.",
    ],
    officialResources: [
      { label: "H.E.R.O. Shooting mat file", url: "https://drive.google.com/file/d/1bFZyh20PcvhAz85sh_JpSKi9GNWq2Dtk/view?usp=sharing" },
      { label: "H.E.R.O. 3D-printable targets", url: "https://drive.google.com/drive/folders/1hvM0UAv3Gtp2yfskg3nFhlZt8lrBuy0p?usp=sharing" },
    ],
  },
  {
    slug: "archery",
    name: "Archery",
    officialHeading: "ARCHERY",
    strapline: "Autonomous robotic bow",
    summary:
      "An autonomous robot bow adjusts its own aim and fires a team-made, blunt-tipped arrow at a ten-ring target from four distances.",
    teamSize: "2–3 team members",
    icon: "archery",
    rulesUrl: "https://www.he-ro.gr/mrc-archery",
    sourceId: "rules-archery",
    rulesCheckedOn: CHECKED,
    rulesPublished: true,
    overview: [
      "Archery challenges teams to build an autonomous robot bow, powered by a rubber band, that fires a lightweight, blunt-tipped arrow at a ten-ring target.",
      "The target is shot from four distances — 40, 80, 120 and 160 cm. The robot must adjust its own aim height for each distance; adjusting by hand scores zero at that distance.",
    ],
    objectives: [
      "Build an autonomous, vertically held robot bow with a start/stop button.",
      "Program automatic aim adjustment for four distances.",
      "Score as many ring points as possible in a single attempt.",
    ],
    skills: [
      "Projectile physics, angles and calibration",
      "Mechanical design and repeatable launch systems",
      "Programming motors and sensors",
      "Methodical testing and data recording",
    ],
    divisions: "One division; each age category competes separately.",
    ageBands: [
      { label: "Kids", ages: "10 to 12 years" },
      { label: "Teens / Senior", ages: "12+ to 18 years" },
      { label: "Adults", ages: "18+ years", note: "The official page lists Adults as 'only for the Advanced category'" },
    ],
    team: standardTeam,
    equipment: [
      "Autonomous robot: it fires by itself five seconds after the start button is pressed and adjusts its own aim height.",
      "The bow must be held vertically like an archer's bow, not horizontally like a crossbow.",
      "Maximum 25 × 25 cm footprint and 800 g. Robot plus fully drawn arrow no longer than 30 cm in the shooting direction.",
      "Up to 1 controller, 4 motors and 4 sensors.",
      "Rubber bands up to 4 mm wide.",
      "Arrow made by the team, under 30 g, with a rounded, non-sharp tip.",
    ],
    format: [
      "The robot sits on a raised base inside a marked square on the field.",
      "Target: a 40 cm foam disc with ten rings, centre 35 cm above the surface.",
      "Each attempt covers all four distances in turn: 40, 80, 120 and 160 cm.",
      "Code and robot adjustments are allowed between attempts, but testing is not.",
    ],
    scoring: [
      "The centre ring scores 10, decreasing by one per ring; a miss scores 0. An arrow touching two rings scores the higher value.",
      "An attempt's score is the sum of all four distances.",
      "Only the best single attempt counts. Ties are broken by the previous best attempt.",
      "1st, 2nd and 3rd place are awarded in each age category.",
    ],
    safety: [
      "Safety glasses and protective equipment are mandatory — teams without them are disqualified.",
      "Arrows must have rounded, non-sharp tips.",
      "The Technician steps back during the five-second start delay.",
      "No remote control, wireless links, pneumatics or parts that could cause harm.",
    ],
    checklist: [
      "Design a vertical bow mechanism and check size, weight and drawn length.",
      "Make and weigh several blunt-tipped arrows (under 30 g).",
      "Program the five-second delayed start and automatic height adjustment.",
      "Print the official target and practise at all four distances.",
      "Pack safety glasses and protective equipment.",
      "Bring a laptop with your program ready to explain to judges.",
    ],
    clarifications: [
      ageAmbiguity,
      "The official page refers both to a single start-button press and to a button press after each shot; confirm the start procedure with the organisers.",
      "Adults are listed as 'only for the Advanced category', but the sport is described as having one division.",
    ],
    officialResources: [
      { label: "H.E.R.O. Archery target (PDF)", url: "https://www.he-ro.gr/_files/ugd/75e4cb_2affb5053a994de2aa69324844587cfc.pdf" },
    ],
  },
  {
    slug: "exhibition",
    name: "Exhibition",
    officialHeading: "EUREKA / EXHIBITION",
    strapline: "Innovation showcase",
    summary:
      "A showcase category for original robotics and engineering projects. Detailed H.E.R.O. rules for 2027 are awaiting publication.",
    teamSize: null,
    icon: "exhibition",
    rulesUrl: "https://www.he-ro.gr/mrc-exhibition",
    sourceId: "rules-exhibition",
    rulesCheckedOn: CHECKED,
    rulesPublished: false,
    overview: [
      "Exhibition is the showcase category of MRC. H.E.R.O. lists it on its website as 'EUREKA / Exhibition' and describes EUREKA as an innovation exhibition held alongside the Global Olympiad.",
      "When this page was last checked, the official H.E.R.O. Exhibition page did not yet display detailed rules. We will publish requirements, age bands and judging criteria here as soon as they are confirmed.",
    ],
    objectives: [
      "Details will be published once the official rules are available.",
    ],
    skills: [
      "Engineering design and prototyping",
      "Research and problem-solving",
      "Presenting and explaining a project",
    ],
    divisions: null,
    ageBands: [],
    team: [],
    equipment: [],
    format: [],
    scoring: [],
    safety: [
      "General MRC safety expectations apply. Category-specific safety rules will be published with the official rules.",
    ],
    checklist: [
      "Register your interest and follow this page for updates.",
      "Start documenting your project idea, design process and testing.",
      "Check the official H.E.R.O. page regularly for the published rules.",
    ],
    clarifications: [
      "The official H.E.R.O. Exhibition page (which redirects to /eureka-exhibition) did not display rules content on 14 October 2026. Age eligibility, team composition, project requirements and judging criteria are awaiting confirmation.",
    ],
    officialResources: [],
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const categoryPdfPath = (slug: CategorySlug) => `/downloads/categories/mrc-ghana-2027-${slug}.pdf`;
