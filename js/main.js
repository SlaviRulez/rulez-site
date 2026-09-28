/* content.json is the editable content source. HTML keeps the approved V3
   content as a readable fallback if the connection or JavaScript fails. */
async function loadContent() {
  try {
    const response = await fetch('content.json');
    if (!response.ok) throw new Error(`Content: ${response.status}`);
    const content = await response.json();
    const element = (tag, className, text) => {
      const node = document.createElement(tag);
      if (className) node.className = className;
      if (text !== undefined) node.textContent = text;
      return node;
    };
    const titleLink = (text, url) => {
      if (!url || !url.startsWith('https://')) return document.createTextNode(text);
      const link = element('a', 'text-link', `${text} ↗`);
      link.href = url; link.target = '_blank'; link.rel = 'noopener'; return link;
    };
    const renderReleases = (id, items) => {
      if (!Array.isArray(items)) return;
      const rows = items.map(item => {
        const row = element('div', 'release');
        const detail = element('div');
        const title = element('div', 'release-title');
        title.append(titleLink(item.title, item.url));
        detail.append(title, element('div', 'release-label', item.label));
        row.append(element('div', 'year', item.year), detail); return row;
      });
      document.getElementById(id).replaceChildren(...rows);
    };
    renderReleases('forthcoming', content.forthcoming);
    renderReleases('selected-releases', content.releases);
    if (Array.isArray(content.projects)) {
      document.getElementById('projects-list').replaceChildren(...content.projects.map(item => {
        const card = element('article', 'project');
        const top = element('div'); const title = element('h3');
        title.append(titleLink(item.title, item.url));
        top.append(title, element('div', 'role', item.role));
        card.append(top, element('p', '', item.description)); return card;
      }));
    }
    if (Array.isArray(content.media_support)) document.querySelector('.support-row').textContent = content.media_support.join('\n');
    document.querySelectorAll('[data-text]').forEach(element => {
      const value = content.text?.[element.dataset.text];
      if (typeof value === 'string') element.textContent = value;
    });
    document.querySelectorAll('[data-link]').forEach(element => {
      const value = content.links?.[element.dataset.link];
      if (typeof value === 'string' && /^(https:\/\/|mailto:)/.test(value)) element.href = value;
    });
    document.querySelectorAll('[data-media]').forEach(element => {
      const value = content.media?.[element.dataset.media];
      if (!value?.src || !/^media\/[^?#]+$/.test(value.src) || value.src.includes('..')) return;
      if (element.getAttribute('src') !== value.src) {
        element.src = value.src;
        if (element.tagName === 'SOURCE') element.parentElement.load();
      }
      if (element.tagName === 'IMG' && value.alt) element.alt = value.alt;
    });
    const mix = content.soundcloud_mix;
    if (mix && /^https:\/\/(api\.)?soundcloud\.com\//.test(mix.embed_url)) {
      document.querySelector('.mix-title').textContent = mix.title;
      const player = document.querySelector('#soundcloud-player');
      const url = new URL(player.src);
      if (url.searchParams.get('url') !== mix.embed_url) {
        url.searchParams.set('url', mix.embed_url);
        player.src = url.href;
      }
      player.title = `${mix.title} — SoundCloud player`;
      if (/^https:\/\/soundcloud\.com\//.test(mix.url)) document.querySelector('#mix-link').href = mix.url;
    }
  } catch (error) {
    console.warn('Using the V3 HTML content fallback.', error);
  }
}
document.querySelectorAll('video').forEach(video => {
  video.addEventListener('play', () => {
    document.querySelectorAll('video').forEach(other => { if (other !== video) other.pause(); });
  });
});
loadContent();
