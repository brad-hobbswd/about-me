document.addEventListener("DOMContentLoaded", async () => {
  const gridNode = document.getElementById("albumsGrid");
  if (!gridNode) return;

  const buildCard = (album) => {
    const titleText = String(album.title || "Album");
    const noteText = String(album.note || "Playlist");
    const listId = String(album.playlistId || "").trim();

    const card = document.createElement("article");
    card.className = "panel video-card";

    const titleNode = document.createElement("h3");
    titleNode.textContent = titleText;

    const noteNode = document.createElement("p");
    noteNode.className = "video-note";
    noteNode.textContent = noteText;

    const frameWrap = document.createElement("div");
    frameWrap.className = "video-frame";

    const iframe = document.createElement("iframe");
    iframe.loading = "lazy";
    iframe.allowFullscreen = true;
    iframe.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    );

    const openBtn = document.createElement("a");
    openBtn.className = "btn full";
    openBtn.target = "_blank";
    openBtn.rel = "noreferrer";
    openBtn.textContent = "Open playlist";

    iframe.src = `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(listId)}`;
    iframe.title = `${titleText} playlist`;
    openBtn.href = `https://www.youtube.com/playlist?list=${encodeURIComponent(listId)}`;

    frameWrap.appendChild(iframe);
    card.appendChild(titleNode);
    card.appendChild(noteNode);
    card.appendChild(frameWrap);
    card.appendChild(openBtn);

    return card;
  };

  try {
    const resp = await fetch("data/discography.json", { cache: "no-store" });
    const data = await resp.json();
    const albums = Array.isArray(data.albums) ? data.albums : [];

    albums.forEach((album) => {
      gridNode.appendChild(buildCard(album));
    });
  } catch (err) {
    const failNode = document.createElement("p");
    failNode.className = "muted";
    failNode.textContent = "Discography data load failed.";
    gridNode.appendChild(failNode);
  }
});
