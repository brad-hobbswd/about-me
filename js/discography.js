document.addEventListener("DOMContentLoaded", () => {
  const gridNode = document.getElementById("albumsGrid");
  if (!gridNode) return;

  const albums = [
    { title: "Playlist 01", note: "YouTube Playlist", playlistId: "PLd8_iqz-1-nJKrN3qwKuSv3I0hAGg1tLv" },
    { title: "Playlist 02", note: "YouTube Playlist", playlistId: "PLd8_iqz-1-nLrGL5ruI8mv2ypyMV3BGDs" },
    { title: "Playlist 03", note: "YouTube Playlist", playlistId: "PLd8_iqz-1-nKqdHElriaFTQTuCzPyIIv-" },
    { title: "Playlist 04", note: "YouTube Playlist", playlistId: "PLd8_iqz-1-nLRFXIlitLrN_f4NyVHWGPE" },
    { title: "Playlist 05", note: "YouTube Playlist", playlistId: "PLd8_iqz-1-nI7ZNrl6uNltohV-9qgESDk" },
    { title: "Playlist 06", note: "YouTube Playlist", playlistId: "PLd8_iqz-1-nJf1C-tJjOGMclk0J7T65pS" },
    { title: "Playlist 07", note: "YouTube Playlist", playlistId: "PLd8_iqz-1-nL-Kuhqh1mqDoJCXk7q3dj-" },
    { title: "Playlist 08", note: "YouTube Playlist", playlistId: "PLd8_iqz-1-nJjWvkDMVmrF3RlU3OYA3uA" },
    { title: "Playlist 09", note: "YouTube Playlist", playlistId: "PLd8_iqz-1-nInxhkMWfQ0fIMKpK_q2Zec" },
    { title: "Playlist 10", note: "YouTube Playlist", playlistId: "PLd8_iqz-1-nJNMunHYQ78II8Pb8VXvkZC" },
    { title: "Playlist 11", note: "YouTube Playlist", playlistId: "PLd8_iqz-1-nLoB9EOCMNKrqZ1xe6u-cki" },
    { title: "Playlist 12", note: "YouTube Playlist", playlistId: "PLd8_iqz-1-nIMHNu_rf4qzIDKfeHjRleJ" }
  ];

  const buildCard = (album) => {
    const card = document.createElement("article");
    card.className = "panel video-card";

    const titleNode = document.createElement("h3");
    titleNode.textContent = album.title;

    const noteNode = document.createElement("p");
    noteNode.className = "video-note";
    noteNode.textContent = album.note;

    const frameWrap = document.createElement("div");
    frameWrap.className = "video-frame";

    const iframe = document.createElement("iframe");
    iframe.loading = "lazy";
    iframe.allowFullscreen = true;
    iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
    iframe.src = `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(album.playlistId)}`;
    iframe.title = `${album.title} playlist`;

    const openBtn = document.createElement("a");
    openBtn.className = "btn full";
    openBtn.target = "_blank";
    openBtn.rel = "noreferrer";
    openBtn.href = `https://www.youtube.com/playlist?list=${encodeURIComponent(album.playlistId)}`;
    openBtn.textContent = "Open playlist";

    frameWrap.appendChild(iframe);
    card.appendChild(titleNode);
    card.appendChild(noteNode);
    card.appendChild(frameWrap);
    card.appendChild(openBtn);

    return card;
  };

  albums.forEach((album) => gridNode.appendChild(buildCard(album)));
});
