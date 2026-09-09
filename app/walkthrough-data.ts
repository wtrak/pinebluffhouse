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
  view("living-01", "Living room", "East side", "the fireplace wall", 66, 34, 270),
  view("living-02", "Living room", "Southeast corner", "the fireplace and kitchen doorway", 65, 46, 315),
  view("living-03", "Living room", "West side", "the bedroom hall and front windows", 35, 31, 90),
  view("living-04", "Living room", "Southwest corner", "the front entry", 35, 45, 25),
  view("living-05", "Living room", "Northwest side", "the storage wall", 36, 15, 150),
  view("living-06", "Living room", "Storage alcove", "back into the living room", 44, 13, 170),
  view("living-07", "Living room", "Bedroom-hall side", "the kitchen and front entry", 66, 18, 265),
  view("living-08", "Living room", "Fireplace side", "across the main room", 48, 47, 5),

  view("kitchen-01", "Kitchen", "Southeast doorway", "across the U-shaped kitchen", 26, 23, 315),
  view("kitchen-02", "Kitchen", "South side", "the sink and front wall", 18, 23, 355),
  view("kitchen-03", "Kitchen", "East side", "the pantry and dining side", 26, 13, 235),
  view("kitchen-04", "Kitchen", "West side", "the cabinets and dining opening", 10, 16, 120),

  view("dining-01", "Dining room", "Southwest corner", "the kitchen peninsula", 10, 47, 35),
  view("dining-02", "Dining room", "West side", "the living-room doorway", 10, 35, 105),
  view("dining-03", "Dining room", "Southeast corner", "the west wall", 26, 47, 285),
  view("dining-04", "Dining room", "Kitchen side", "the bay windows", 25, 31, 245),

  view("sunroom-01", "Sunroom", "Northwest corner", "the rear slider", 33, 55, 155),
  view("sunroom-02", "Sunroom", "Northeast corner", "the service-hall side", 49, 55, 235),
  view("sunroom-03", "Sunroom", "Southeast corner", "the fireplace wall", 49, 64, 320),
  view("sunroom-04", "Sunroom", "Southwest corner", "the interior window", 33, 64, 45),
  view("sunroom-05", "Sunroom", "Center", "the rear deck", 42, 59, 180),

  view("primary-bed-01", "Primary bedroom", "Northwest corner", "the exterior wall", 77, 43, 120),
  view("primary-bed-02", "Primary bedroom", "Northeast corner", "the bath side", 92, 43, 235),
  view("primary-bed-03", "Primary bedroom", "Southeast corner", "the hall entry", 92, 55, 315),
  view("primary-bed-04", "Primary bedroom", "Southwest corner", "across the bedroom", 77, 55, 45),

  view("primary-bath-01", "Primary bath", "Northwest side", "the vanity and bedroom", 57, 50, 120),
  view("primary-bath-02", "Primary bath", "Northeast side", "the tub and deck slider", 70, 50, 225),
  view("primary-bath-03", "Primary bath", "Southeast side", "the vanity wall", 70, 62, 315),
  view("primary-bath-04", "Primary bath", "Southwest side", "the bedroom doorway", 57, 62, 35),

  view("primary-closet-01", "Primary closet", "West end", "along the closet", 77, 62, 90),
  view("primary-closet-02", "Primary closet", "Center", "the built-in storage", 85, 62, 90),
  view("primary-closet-03", "Primary closet", "East end", "back toward the bath", 93, 62, 270),

  view("bed-2-01", "Bedroom 2", "Southwest corner", "the paired windows", 81, 22, 25),
  view("bed-2-02", "Bedroom 2", "Southeast corner", "the closet wall", 92, 22, 315),
  view("bed-2-03", "Bedroom 2", "Northeast corner", "the hall entry", 92, 10, 220),
  view("bed-2-04", "Bedroom 2", "Northwest corner", "across the room", 81, 10, 135),

  view("bed-3-01", "Bedroom 3", "Southwest corner", "the front wall", 60, 20, 20),
  view("bed-3-02", "Bedroom 3", "Southeast corner", "the closet side", 71, 20, 315),
  view("bed-3-03", "Bedroom 3", "Northeast corner", "the hall entry", 71, 10, 220),
  view("bed-3-04", "Bedroom 3", "Northwest corner", "across the room", 60, 10, 135),

  view("hall-bath-01", "Hall bath", "Doorway", "the vanity and tub", 81, 32, 120),
  view("hall-bath-02", "Hall bath", "Tub side", "back toward the hall", 92, 36, 285),

  view("laundry-half-bath-01", "Laundry + half bath", "Service-hall doorway", "the laundry area", 22, 55, 250),
  view("laundry-half-bath-02", "Laundry + half bath", "Laundry side", "the half bath", 10, 56, 145),
  view("laundry-half-bath-03", "Laundry + half bath", "Half-bath side", "the service hall", 12, 64, 35),

  view("hall-01", "Hallways", "Kitchen / dining opening", "the living room", 29, 30, 90),
  view("hall-02", "Hallways", "Living-room opening", "the bedroom wing", 73, 29, 90),
  view("hall-03", "Hallways", "Bedroom hall", "the primary bedroom", 76, 39, 180),
  view("hall-04", "Hallways", "Carport entry", "the dining room", 26, 56, 0),
  view("hall-linen-01", "Hallways", "Hall linen cabinet", "the storage interior", 76, 34, 270),
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
