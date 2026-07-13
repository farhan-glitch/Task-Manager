export function dateFormatter() {
  const headerDate = document.getElementById("header-date");
  const desktopDate = document.getElementById("desktop-date");

  if (!headerDate) return;
  if (!desktopDate) return;

  const now = new Date();

  const weekday = new Intl.DateTimeFormat("fa-IR", { weekday: "long" }).format(
    now,
  );
  const day = new Intl.DateTimeFormat("fa-IR", { day: "numeric" }).format(now);
  const month = new Intl.DateTimeFormat("fa-IR", { month: "long" }).format(now);
  const year = new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(
    now,
  );

  const formattedDate = `${weekday}، ${day} ${month} ${year}`;

  headerDate.textContent = `امروز، ${formattedDate}`;
  desktopDate.textContent = `امروز، ${formattedDate}`;
}
