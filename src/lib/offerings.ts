export type Offering = {
  name: string;
  description: string;
  cta?: string;
};

export type Category = {
  id: string;
  title: string;
  /** Compact label for chips/pills */
  short: string;
  description: string;
  image: string;
  imagePosition?: string;
  items: Offering[];
};

export const CATEGORIES: Category[] = [
  {
    id: "training",
    title: "Strength & conditioning",
    short: "Training",
    description:
      "The floor, the machines and the workouts to get stronger, fitter and faster.",
    image: "/offerings/hyrox.jpg",
    imagePosition: "object-[center_30%]",
    items: [
      {
        name: "Weightlifting",
        description: "Free weights, racks and platforms for every lift, from your first squat to your next PR.",
      },
      {
        name: "Cardio",
        description: "Train on the latest advanced cardio machines in the sector.",
      },
      {
        name: "Intense circuit workout",
        description: "Fast-paced, full-body circuits that build strength and burn calories.",
      },
      {
        name: "Cross Fitness",
        description: "Varied, high-intensity functional movements for all-round fitness.",
      },
      {
        name: "Hyrox training",
        description: "Running and functional workouts built to get you race-ready.",
      },
    ],
  },
  {
    id: "studio",
    title: "Studio classes",
    short: "Classes",
    description:
      "Group sessions that build strength, mobility and energy, with the right soundtrack.",
    image: "/offerings/pilates-yoga.jpg",
    items: [
      {
        name: "Hot Pilates",
        description: "Low-impact Pilates in a heated studio for deep core strength and flexibility.",
      },
      {
        name: "Yoga",
        description: "Flow, stretch and breathe. Improve your balance, mobility and focus.",
      },
      {
        name: "Aerobics",
        description: "Upbeat cardio classes that keep your heart rate up and the energy high.",
      },
      {
        name: "Zumba",
        description: "Dance-based workouts that feel more like a party than a session.",
      },
    ],
  },
  {
    id: "combat",
    title: "Combat sports",
    short: "Combat",
    description: "Learn to strike, defend and condition like a fighter, whatever your level.",
    image: "/offerings/combat.jpg",
    imagePosition: "object-[60%_center]",
    items: [
      {
        name: "MMA",
        description: "Striking, wrestling and grappling combined into one complete discipline.",
      },
      {
        name: "Kickboxing",
        description: "Punches and kicks drilled into fast, powerful combinations.",
      },
      {
        name: "Muay Thai",
        description: "The art of eight limbs: fists, elbows, knees and shins.",
      },
      {
        name: "Boxing",
        description: "Footwork, defence and sharp punching, from pad work to sparring.",
      },
    ],
  },
  {
    id: "recovery",
    title: "Recovery & spa",
    short: "Spa & recovery",
    description: "Recover properly so you can come back stronger.",
    image: "/offerings/spa.jpg",
    imagePosition: "object-[40%_center]",
    items: [
      {
        name: "Full spa & massage",
        description: "A traditional Moroccan bath for couples and a full menu of massages.",
      },
      {
        name: "Physiotherapy",
        description: "Treatment and rehab to help you recover from injury and move better.",
      },
      {
        name: "Red light therapy",
        description: "Relaxing red light sessions to support your recovery routine.",
      },
    ],
  },
  {
    id: "nutrition",
    title: "Nutrition & shop",
    short: "Nutrition",
    description: "Fuel your training, then gear up for it.",
    image: "/offerings/nutrition.jpg",
    items: [
      {
        name: "Meal prep & diet control",
        description: "Meal preparation for your diet goals, supported with AI simulation.",
      },
      {
        name: "Supplement shop",
        description: "Protein, pre-workout and everything in between, on site.",
        cta: "Visit the shop",
      },
      {
        name: "Sportswear shop",
        description: "Training gear and apparel to look the part on the floor.",
        cta: "Visit the shop",
      },
    ],
  },
  {
    id: "beauty",
    title: "Beauty",
    short: "Beauty",
    description: "Leave the gym looking as good as you feel.",
    image: "/offerings/beauty.jpg",
    items: [
      { name: "Hair salon", description: "Cuts, styling and care from our in-house salon." },
      { name: "Nails", description: "Manicures and pedicures to finish the look." },
      { name: "Wax", description: "Quick, professional waxing services." },
    ],
  },
];

export const OFFERING_COUNT = CATEGORIES.reduce((n, c) => n + c.items.length, 0);
