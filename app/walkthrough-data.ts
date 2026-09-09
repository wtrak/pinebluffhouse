export type Viewpoint = {
  id: string;
  room: string;
  position: string;
  facing: string;
  x: number;
  y: number;
  angle: number;
  image: string;
};

export type Album = {
  id: string;
  title: string;
  description: string;
  cover: string;
  images: string[];
};

const view = (
  id: string,
  room: string,
  position: string,
  facing: string,
  x: number,
  y: number,
  angle: number,
): Viewpoint => ({ id, room, position, facing, x, y, angle, image: `/house/${id}.jpg` });

export const rooms = [
  "Living room",
  "Kitchen",
  "Dining room",
  "Sunroom",
  "Primary bedroom",
  "Primary bath",
  "Primary closet",
  "Bedroom 2",
  "Bedroom 3",
  "Hall bath",
  "Laundry + half bath",
  "Hallways",
] as const;

export const viewpoints: Viewpoint[] = [
  view("living-01", "Living room", "Northwest corner", "the wall shared with the primary bath", 35, 15, 135),
  view("living-02", "Living room", "Northeast corner", "the dining and laundry side", 49, 13, 225),
  view("living-03", "Living room", "West side", "the bedroom hall and front windows", 35, 31, 90),
  view("living-04", "Living room", "South-center, beside View 8", "slightly left of View 8 across the main room", 47, 48, 345),
  view("living-05", "Living room", "Northeast of View 4", "directly right toward the bedroom side", 53, 39, 90),
  view("living-06", "Living room", "North of View 5", "right and slightly down toward the bedroom side", 53, 31, 110),
  view("living-07", "Living room", "Corner southeast of View 6", "the northwest corner at View 1", 68, 40, 315),
  view("living-08", "Living room", "East-side corner above View 7", "the dining room", 68, 33, 265),

  view("kitchen-01", "Kitchen", "Southeast doorway", "across the U-shaped kitchen", 26, 23, 315),
  view("kitchen-02", "Kitchen", "East side, beside View 3", "the pantry and dining side", 24.5, 13.5, 235),
  view("kitchen-03", "Kitchen", "West side, just above View 4", "the cabinets and dining opening", 11.5, 13, 120),
  view("kitchen-04", "Kitchen", "Lower west side", "View 2 on the east side", 11.5, 20, 60),

  view("dining-01", "Dining room", "Southeast side, beside View 3", "upward and slightly left toward the kitchen", 24.5, 46, 345),
  view("dining-02", "Dining room", "Southwest corner", "View 4 near the kitchen side", 10, 47, 45),
  view("dining-03", "Dining room", "West side, at View 2's former position", "View 1 on the southeast side", 10, 35, 130),
  view("dining-04", "Dining room", "Kitchen side", "the bay windows", 25, 31, 245),

  view("sunroom-01", "Sunroom", "Northwest corner", "View 3 in the southeast corner", 31, 55, 117),
  view("sunroom-02", "Sunroom", "Southeast corner", "View 1 in the northwest corner", 49, 64, 297),
  view("sunroom-03", "Sunroom", "Northeast corner", "View 4 in the southwest corner", 49, 55, 240),
  view("sunroom-04", "Sunroom", "Southwest corner", "the interior window", 33, 64, 45),
  view("sunroom-05", "Sunroom", "Center-left", "View 1 in the northwest corner", 37, 60, 310),

  view("primary-bed-01", "Primary bedroom", "Northwest corner", "the exterior wall", 74.5, 43, 120),
  view("primary-bed-02", "Primary bedroom", "Northeast corner", "the bath side", 92, 43, 235),
  view("primary-bed-03", "Primary bedroom", "Southeast corner", "the hall entry", 92, 55, 315),
  view("primary-bed-04", "Primary bedroom", "Southwest corner", "across the bedroom", 77, 55, 45),

  view("primary-bath-01", "Primary bath", "Northeast side, beside View 2", "the tub and deck slider", 68.5, 49.5, 225),
  view("primary-bath-02", "Primary bath", "South side, between Views 3 and 4", "the original View 1 position on the northwest side", 63.5, 62, 330),
  view("primary-bath-03", "Primary bath", "Southwest side, beside View 4", "View 1 on the northeast side", 58.5, 61.5, 40),
  view("primary-bath-04", "Primary bath", "Northwest side, at View 1's original position", "View 2 on the south side", 57, 50, 150),

  view("primary-closet-01", "Primary closet", "Center, beside View 2", "its original position at the west end", 84, 61, 270),
  view("primary-closet-02", "Primary closet", "Left side of the bedroom doorway", "straight down into the closet", 80, 58, 180),
  view("primary-closet-03", "Primary closet", "Below and left of View 2", "View 1 on the right side", 76, 62, 83),

  view("bed-2-01", "Bedroom 2", "Southwest corner", "the paired windows", 79, 22, 25),
  view("bed-2-02", "Bedroom 2", "Northwest corner, beside View 4", "its original position in the southeast corner", 79.5, 9, 137),
  view("bed-2-03", "Bedroom 2", "Northeast corner", "the hall entry", 90, 10, 220),
  view("bed-2-04", "Bedroom 2", "Southeast corner, at View 2's original position", "View 2 in the northwest corner", 90, 22, 316),

  view("bed-3-01", "Bedroom 3", "Southeast corner, beside View 2", "View 4 in the northwest corner", 68, 17, 318),
  view("bed-3-02", "Bedroom 3", "Southwest corner, at View 1's former position", "View 3 in the northeast corner", 58, 18, 48),
  view("bed-3-03", "Bedroom 3", "Northwest corner, beside View 4", "View 1 in the southeast corner", 59, 9, 132),
  view("bed-3-04", "Bedroom 3", "Northeast corner, at View 3's former position", "View 2 in the southwest corner", 69, 8, 228),

  view("hall-bath-01", "Hall bath", "Doorway", "directly right through the bathroom", 76.5, 34, 90),
  view("hall-bath-02", "Hall bath", "Upper-middle", "directly right through the bathroom", 85, 32, 90),

  view("laundry-half-bath-01", "Laundry + half bath", "Lower-left side, left of View 3", "its original position by the service hall", 9, 64, 55),
  view("laundry-half-bath-02", "Laundry + half bath", "Service-hall side, at View 1's original position", "View 1 on the lower-left side", 22, 55, 235),
  view("laundry-half-bath-03", "Laundry + half bath", "Lower-right side", "up and slightly left", 20, 64, 340),

  view("hall-01", "Hallways", "Dining-room side", "the living room", 22, 30, 90),
  view("hall-02", "Hallways", "Above Living Room View 6", "directly right toward the bedroom wing", 53, 24, 90),
  view("hall-03", "Hallways", "Bedroom hall", "the primary bedroom", 72.8, 27.5, 180),
  view("hall-04", "Hallways", "Carport entry", "the dining room", 26, 62.75, 0),
];

const numberedImages = (slug: string, count: number) =>
  Array.from({ length: count }, (_, index) => `/house/${slug}-${String(index + 1).padStart(2, "0")}.jpg`);

export const albums: Album[] = [
  {
    id: "outside",
    title: "Exterior + grounds",
    description: "Front, rear, deck, carport, outbuilding, and yard views",
    cover: "/house/outside-01.jpg",
    images: [...numberedImages("outside", 12), "/house/outbuilding-01.jpg"],
  },
  {
    id: "attic-roof",
    title: "Attic + roof structure",
    description: "Roof framing and attic-condition reference images",
    cover: "/house/attic-roof-01.jpg",
    images: numberedImages("attic-roof", 13),
  },
  {
    id: "systems",
    title: "Systems + utilities",
    description: "Equipment labels, water heater, electrical panel, and service details",
    cover: "/house/systems-01.jpg",
    images: numberedImages("systems", 6),
  },
];
