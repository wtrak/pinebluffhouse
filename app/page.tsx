"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { albums, rooms, viewpoints, type Album, type Viewpoint } from "./walkthrough-data";

type AlbumView = { album: Album; index: number };

export default function Home() {
  const [selectedRoom, setSelectedRoom] = useState<string>(rooms[0]);
  const [active, setActive] = useState<Viewpoint>(viewpoints[0]);
  const [expanded, setExpanded] = useState(false);
  const [albumView, setAlbumView] = useState<AlbumView | null>(null);

  const roomViews = viewpoints.filter((item) => item.room === selectedRoom);
  const activeIndex = roomViews.findIndex((item) => item.id === active.id);

  const chooseRoom = (room: string) => {
    const firstView = viewpoints.find((item) => item.room === room);
    if (!firstView) return;
    setSelectedRoom(room);
    setActive(firstView);
  };

  const stepView = (direction: number) => {
    const nextIndex = (activeIndex + direction + roomViews.length) % roomViews.length;
    setActive(roomViews[nextIndex]);
  };

  const stepAlbum = (direction: number) => {
    setAlbumView((current) => {
      if (!current) return null;
      const nextIndex = (current.index + direction + current.album.images.length) % current.album.images.length;
      return { ...current, index: nextIndex };
    });
  };

  return (
    <main>
      <header className="site-header">
        <div>
          <p className="eyebrow">Interactive photo map</p>
          <h1>Pine Bluff House</h1>
        </div>
        <div className="header-stats" aria-label="Walkthrough contents">
          <span><strong>{viewpoints.length}</strong> interior views</span>
          <span><strong>32</strong> property details</span>
        </div>
      </header>

      <section className="intro">
        <p>Choose a room, then select a numbered camera marker to see the view from that position.</p>
        <span><b>Orientation</b> Front / Calloway Hill Drive is at the top</span>
      </section>

      <nav className="room-nav" aria-label="Choose a room">
        {rooms.map((room) => {
          const count = viewpoints.filter((item) => item.room === room).length;
          return (
            <button
              key={room}
              className={selectedRoom === room ? "is-active" : ""}
              onClick={() => chooseRoom(room)}
            >
              {room}<small>{count}</small>
            </button>
          );
        })}
      </nav>

      <section className="walkthrough" aria-label="Interactive house walkthrough">
        <div className="plan-card">
          <div className="card-heading">
            <div>
              <p className="eyebrow">Camera map</p>
              <h2>{selectedRoom}</h2>
            </div>
            <p>{roomViews.length} {roomViews.length === 1 ? "view" : "views"}</p>
          </div>
          <div className="plan-frame">
            <img className="floor-plan" src="/house/floor-plan.jpg" alt="Measured floor plan of the Pine Bluff house" />
            {roomViews.map((station, index) => (
              <button
                key={station.id}
                className={"map-pin " + (active.id === station.id ? "is-active" : "")}
                style={{ left: station.x + "%", top: station.y + "%" }}
                onClick={() => setActive(station)}
                aria-label={`${station.room}, ${station.position}, facing ${station.facing}`}
              >
                <span>{index + 1}</span>
                <i style={{ transform: "rotate(" + station.angle + "deg)" }} />
              </button>
            ))}
          </div>
          <p className="plan-note"><span /> Arrow shows the direction the camera is facing.</p>
        </div>
        <aside className="viewer-card">
          <div className="viewer-copy">
            <div>
              <p className="eyebrow">View {activeIndex + 1} of {roomViews.length}</p>
              <h2>{active.position}</h2>
              <p>Facing {active.facing}</p>
            </div>
            <div className="viewer-controls">
              <button onClick={() => stepView(-1)} aria-label="Previous view">←</button>
              <button onClick={() => stepView(1)} aria-label="Next view">→</button>
            </div>
          </div>
          <button className="hero-photo" onClick={() => setExpanded(true)} aria-label="Open this photograph full screen">
            <img src={active.image} alt={`${active.room}, from the ${active.position}, facing ${active.facing}`} />
            <span>Expand photo ↗</span>
          </button>
          <div className="thumbnail-strip" aria-label={`All ${selectedRoom} photographs`}>
            {roomViews.map((station, index) => (
              <button
                key={station.id}
                className={active.id === station.id ? "is-active" : ""}
                onClick={() => setActive(station)}
                aria-label={`Select view ${index + 1}`}
              >
                <img src={station.image} alt="" />
                <span>{index + 1}</span>
              </button>
            ))}
          </div>
          <div className="viewer-footer">
            <span>Marker {activeIndex + 1} on the plan</span>
            <span className="room-badge">{active.room}</span>
          </div>
        </aside>
      </section>

      <section className="property-section" aria-labelledby="property-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Beyond the rooms</p>
            <h2 id="property-heading">Property reference albums</h2>
          </div>
          <p>Exterior, structure, and utility documentation from the tour.</p>
        </div>
        <div className="album-grid">
          {albums.map((album) => (
            <button key={album.id} className="album-card" onClick={() => setAlbumView({ album, index: 0 })}>
              <img src={album.cover} alt="" />
              <span className="album-copy">
                <small>{album.images.length} photos</small>
                <strong>{album.title}</strong>
                <span>{album.description}</span>
              </span>
              <span className="album-arrow">View album →</span>
            </button>
          ))}
        </div>
      </section>

      <footer>
        <p>Photo positions and directions were reconstructed from the measured plan and overlapping room views.</p>
        <span>Planning reference · not a survey or architectural drawing</span>
      </footer>

      {expanded && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Expanded room photograph">
          <button className="close-button" onClick={() => setExpanded(false)} aria-label="Close expanded photograph">×</button>
          <img src={active.image} alt={`${active.room}, ${active.position}`} />
          <p>{active.room} · {active.position} · Facing {active.facing}</p>
        </div>
      )}

      {albumView && (
        <div className="lightbox album-lightbox" role="dialog" aria-modal="true" aria-label={albumView.album.title}>
          <button className="close-button" onClick={() => setAlbumView(null)} aria-label="Close album">×</button>
          <button className="lightbox-step previous" onClick={() => stepAlbum(-1)} aria-label="Previous photograph">←</button>
          <img src={albumView.album.images[albumView.index]} alt={`${albumView.album.title}, item ${albumView.index + 1}`} />
          <button className="lightbox-step next" onClick={() => stepAlbum(1)} aria-label="Next photograph">→</button>
          <p>{albumView.album.title} · {albumView.index + 1} of {albumView.album.images.length}</p>
        </div>
      )}
    </main>
  );
}
