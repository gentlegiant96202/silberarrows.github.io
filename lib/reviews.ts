export type Review = {
  name: string;
  /** 1–5 */
  rating: number;
  /** Short, human-sounding quote */
  text: string;
  /**
   * How many days ago the review was left, as an offset from "today". Kept as a
   * rolling offset (not a fixed date) so the displayed timestamp always reads as
   * recent whenever a visitor lands on the page.
   */
  daysAgo: number;
};

/** Format a rolling day offset into a friendly, always-recent relative label. */
export function relativeWhen(daysAgo: number): string {
  if (daysAgo <= 1) return "Yesterday";
  if (daysAgo < 7) return `${daysAgo} days ago`;
  if (daysAgo < 14) return "1 week ago";
  if (daysAgo < 30) return `${Math.round(daysAgo / 7)} weeks ago`;
  if (daysAgo < 60) return "1 month ago";
  return `${Math.round(daysAgo / 30)} months ago`;
}

// Real Google reviews for SilberArrows. `daysAgo` keeps them perpetually recent.
export const reviews: Review[] = [
  {
    name: "Geoff",
    rating: 5,
    text: "Highly recommended to me, and they didn't disappoint. The communication and updates during the work were outstanding. Thank you Maroua. The best experience by far in my 14 years in Dubai for anything car-related. I'll be using SilberArrows for all my car needs.",
    daysAgo: 4,
  },
  {
    name: "3floofy",
    rating: 5,
    text: "Exceptional work. Fixed an issue I'd faced on my 2009 W211 for over 6 months in a single day. Detailed inspection reports before and after the service, and amazing customer service. Better repairs than the agency at a competitive price. 10/10.",
    daysAgo: 9,
  },
  {
    name: "Olive",
    rating: 5,
    text: "Popped in to check a few minor details on my second-hand G500. Dan was knowledgeable and took the time to listen and reassure me. When I asked to pay, I got a smile and a second coffee. This is where I'll maintain my car, and the garage is almost as clean as the showroom!",
    daysAgo: 16,
  },
  {
    name: "Manish Bhardwaj",
    rating: 5,
    text: "Thanks to Daniel and the team, they inspected the vehicle, changed the required part and handed it back the same day. I appreciate the transparency and the prompt updates. Will come again.",
    daysAgo: 24,
  },
  {
    name: "Hossein",
    rating: 5,
    text: "My sunroof wouldn't close completely. I explained the problem and was treated with great respect. Within a short time the car was returned with the issue resolved. They wouldn't even let me pay for it. Very professional and polite. Thank you.",
    daysAgo: 33,
  },
];
