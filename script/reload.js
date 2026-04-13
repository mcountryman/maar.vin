const checkMs = 500;

const buildIdQuery = `meta[name="build-id"]`;
const buildId = document.querySelector(buildIdQuery).content;

async function reloadIfChanged() {
  try {
    const res = await fetch(location.href);
    const text = await res.text();
    const html = new DOMParser().parseFromString(text, "text/html");
    const buildIdCurrent = html.querySelector(buildIdQuery).content;

    if (buildIdCurrent != buildId) {
      console.log(`Reloading: build-id '${buildId}' != '${buildIdCurrent}'`);
      setTimeout(() => location.reload(), checkMs);
      return;
    }
  } catch (err) {
    console.error(`Reload issue: ${err}`);
  }

  setTimeout(reloadIfChanged, checkMs);
}

reloadIfChanged();
