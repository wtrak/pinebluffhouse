const rooms = [
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
];

const numberedImages = (slug, count) =>
  Array.from(
    { length: count },
    (_, index) => "./house/" + slug + "-" + String(index + 1).padStart(2, "0") + ".jpg",
  );

const albums = [
  {
    id: "outside",
    title: "Exterior + grounds",
    description: "Front, rear, deck, carport, outbuilding, and yard views",
    cover: "./house/outside-01.jpg",
    images: [...numberedImages("outside", 12), "./house/outbuilding-01.jpg"],
  },
  {
    id: "attic",
    title: "Attic + roof",
    description: "Roof framing, attic structure, and overhead condition views",
    cover: "./house/attic-roof-01.jpg",
    images: numberedImages("attic-roof", 13),
  },
  {
    id: "systems",
    title: "Systems + utilities",
    description: "Equipment labels, water heater, electrical panel, and service details",
    cover: "./house/systems-01.jpg",
    images: numberedImages("systems", 6),
  },
];

let viewpoints = [];
let selectedRoom = rooms[0];
let active = null;
let albumState = null;

const roomNav = document.querySelector("#room-nav");
const planFrame = document.querySelector("#plan-frame");
const roomTitle = document.querySelector("#room-title");
const roomCount = document.querySelector("#room-count");
const viewCount = document.querySelector("#view-count");
const viewPosition = document.querySelector("#view-position");
const viewFacing = document.querySelector("#view-facing");
const heroImage = document.querySelector("#hero-image");
const heroPhoto = document.querySelector("#hero-photo");
const thumbnails = document.querySelector("#thumbnail-strip");
const markerNumber = document.querySelector("#marker-number");
const roomBadge = document.querySelector("#room-badge");
const photoLightbox = document.querySelector("#photo-lightbox");
const albumLightbox = document.querySelector("#album-lightbox");

function roomViews() {
  return viewpoints.filter((item) => item.room === selectedRoom);
}

function makeElement(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderRoomNav() {
  roomNav.replaceChildren();
  rooms.forEach((room) => {
    const button = makeElement("button", room === selectedRoom ? "is-active" : "", room);
    button.append(makeElement("small", "", String(viewpoints.filter((item) => item.room === room).length)));
    button.addEventListener("click", () => {
      selectedRoom = room;
      active = roomViews()[0];
      render();
    });
    roomNav.append(button);
  });
}

function renderPlan() {
  planFrame.querySelectorAll(".map-pin").forEach((pin) => pin.remove());
  roomViews().forEach((station, index) => {
    const pin = makeElement("button", "map-pin" + (active.id === station.id ? " is-active" : ""));
    pin.style.left = station.x + "%";
    pin.style.top = station.y + "%";
    pin.setAttribute("aria-label", station.room + ", " + station.position + ", facing " + station.facing);
    pin.append(makeElement("span", "", String(index + 1)));
    const arrow = makeElement("i");
    arrow.style.transform = "rotate(" + station.angle + "deg)";
    pin.append(arrow);
    pin.addEventListener("click", () => {
      active = station;
      renderPlan();
      renderViewer();
    });
    planFrame.append(pin);
  });
}

function renderViewer() {
  const views = roomViews();
  const index = views.findIndex((item) => item.id === active.id);
  roomTitle.textContent = selectedRoom;
  roomCount.textContent = views.length + (views.length === 1 ? " view" : " views");
  viewCount.textContent = "View " + (index + 1) + " of " + views.length;
  viewPosition.textContent = active.position;
  viewFacing.textContent = "Facing " + active.facing;
  heroImage.src = active.image;
  heroImage.alt = active.room + ", from the " + active.position + ", facing " + active.facing;
  markerNumber.textContent = "Marker " + (index + 1) + " on the plan";
  roomBadge.textContent = active.room;

  thumbnails.replaceChildren();
  views.forEach((station, stationIndex) => {
    const button = makeElement("button", active.id === station.id ? "is-active" : "");
    button.setAttribute("aria-label", "Select view " + (stationIndex + 1));
    const image = makeElement("img");
    image.src = station.image;
    image.alt = "";
    button.append(image, makeElement("span", "", String(stationIndex + 1)));
    button.addEventListener("click", () => {
      active = station;
      renderPlan();
      renderViewer();
    });
    thumbnails.append(button);
  });
}

function render() {
  renderRoomNav();
  renderPlan();
  renderViewer();
}

function stepView(direction) {
  const views = roomViews();
  const index = views.findIndex((item) => item.id === active.id);
  active = views[(index + direction + views.length) % views.length];
  renderPlan();
  renderViewer();
}

function renderAlbums() {
  const grid = document.querySelector("#album-grid");
  grid.replaceChildren();
  albums.forEach((album) => {
    const card = makeElement("button", "album-card");
    const image = makeElement("img");
    image.src = album.cover;
    image.alt = "";
    const copy = makeElement("span", "album-copy");
    copy.append(
      makeElement("small", "", album.images.length + " photos"),
      makeElement("strong", "", album.title),
      makeElement("span", "", album.description),
    );
    card.append(image, copy, makeElement("span", "album-arrow", "View album →"));
    card.addEventListener("click", () => {
      albumState = { album, index: 0 };
      renderAlbumLightbox();
      albumLightbox.hidden = false;
    });
    grid.append(card);
  });
}

function renderAlbumLightbox() {
  const image = albumLightbox.querySelector("img");
  const caption = albumLightbox.querySelector("p");
  image.src = albumState.album.images[
    (albumState.index + albumState.album.images.length) % albumState.album.images.length
  ];
  image.alt = albumState.album.title + ", item " + (albumState.index + 1);
  caption.textContent =
    albumState.album.title + " · " + (albumState.index + 1) + " of " + albumState.album.images.length;
}

document.querySelector("#previous-view").addEventListener("click", () => stepView(-1));
document.querySelector("#next-view").addEventListener("click", () => stepView(1));

heroPhoto.addEventListener("click", () => {
  photoLightbox.querySelector("img").src = active.image;
  photoLightbox.querySelector("img").alt = active.room + ", " + active.position;
  photoLightbox.querySelector("p").textContent =
    active.room + " · " + active.position + " · Facing " + active.facing;
  photoLightbox.hidden = false;
});

photoLightbox.querySelector(".close-button").addEventListener("click", () => {
  photoLightbox.hidden = true;
});

albumLightbox.querySelector(".close-button").addEventListener("click", () => {
  albumLightbox.hidden = true;
});

albumLightbox.querySelector(".previous").addEventListener("click", () => {
  albumState.index = (albumState.index - 1 + albumState.album.images.length) % albumState.album.images.length;
  renderAlbumLightbox();
});

albumLightbox.querySelector(".next").addEventListener("click", () => {
  albumState.index = (albumState.index + 1) % albumState.album.images.length;
  renderAlbumLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  photoLightbox.hidden = true;
  albumLightbox.hidden = true;
});

fetch("./walkthrough-data.json")
  .then((response) => {
    if (!response.ok) throw new Error("Could not load walkthrough data");
    return response.json();
  })
  .then((data) => {
    viewpoints = data.viewpoints;
    active = viewpoints.find((item) => item.room === selectedRoom);
    render();
    renderAlbums();
  })
  .catch((error) => {
    document.querySelector("main").textContent = "The walkthrough could not be loaded. " + error.message;
  });
