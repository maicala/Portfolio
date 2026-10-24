window.portfolioCardMarkup = function (project, index, returnToCategory = false) {
  const title = (window.siteLanguage === 'ar' ? project.title : (project.titleEn || project.title)).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const number = String(index + 1).padStart(2, '0');
  const isAd = project.group === 'ads';
  const kindKey = project.group === 'short' ? 'kind-short' : project.group === 'long' ? 'kind-long' : 'kind-ad';
  const kind = window.siteText ? window.siteText(kindKey) : project.group === 'short' ? 'فيديو قصير' : project.group === 'long' ? 'فيديو طويل' : 'إعلان';
  const query = new URLSearchParams({ id: project.id });
  if (returnToCategory) {
    query.set('return', 'category');
    query.set('from', project.group);
  } else {
    query.set('return', 'home');
    query.set('from', project.group);
  }
  const isYouTube = !project.type || project.type === 'youtube';
  const thumbnailUrl = project.thumbnail || (isYouTube ? `https://i.ytimg.com/vi/${project.id}/${project.group === 'short' ? 'hq2.jpg' : 'hqdefault.jpg'}` : '');
  const visual = thumbnailUrl
    ? `<img class="project-thumb ${project.group === 'short' ? 'is-short' : ''} ${isAd ? 'is-ad-thumb' : ''}" src="${thumbnailUrl}" alt="" loading="lazy" decoding="async">`
    : `<div class="project-placeholder ad-placeholder" aria-hidden="true"><span>AI</span><small>${isAd ? 'ADVERTISEMENT' : project.group === 'short' ? 'SHORT VIDEO' : 'LONG VIDEO'}</small></div>`;
  const source = project.type === 'streamable' ? 'STREAMABLE' : project.type === 'vimeo' ? 'VIMEO' : isAd ? 'LOCAL' : 'YOUTUBE';
  const watchLabel = window.siteText ? window.siteText('watch-aria') : 'شاهد';
  return `<a class="project-card" href="watch.html?${query}" aria-label="${watchLabel}: ${title}" data-group="${project.group}">
    <div class="project-visual">${visual}<span class="project-index">${source} / ${number}</span><span class="play-button" aria-hidden="true">▶</span></div>
    <div class="project-meta"><div><h3>${title}</h3><p>${kind}</p></div><span class="project-kind">${kind}</span></div>
  </a>`;
};
