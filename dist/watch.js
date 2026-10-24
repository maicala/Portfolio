const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const project = window.portfolioVideos.find(item => item.id === id);
const title = document.querySelector('#watch-title');
const kind = document.querySelector('#watch-kind');
const player = document.querySelector('#watch-player');
document.querySelector('#year').textContent = new Date().getFullYear();
const watchBack = document.querySelector('.watch-back');
const watchHome = document.querySelector('.watch-home-link');
const previousButton = document.querySelector('#previous-video');
const nextButton = document.querySelector('#next-video');
const originCategory = params.get('from');
const validOrigin = ['ads', 'short', 'long'].includes(originCategory);
const backGroup = validOrigin ? originCategory : (project?.group || 'ads');
if (params.get('return') === 'category') watchBack.href = `category.html?type=${backGroup}`;
else watchBack.href = `index.html#${backGroup === 'short' ? 'shorts' : backGroup === 'long' ? 'long' : 'ads'}`;

const groupProjects = project ? window.portfolioVideos.filter(item => item.group === project.group) : [];
const projectPosition = groupProjects.findIndex(item => item.id === id);
const returnTarget = params.get('return') === 'category' ? 'category' : 'home';
function navigateToProject(target) {
  if (!target) return;
  const nextParams = new URLSearchParams({ id: target.id, return: returnTarget, from: project.group });
  window.location.href = `watch.html?${nextParams}`;
}
previousButton.disabled = !project || projectPosition <= 0;
nextButton.hidden = !project;
previousButton.hidden = !project;
previousButton.addEventListener('click', () => navigateToProject(groupProjects[projectPosition - 1]));
nextButton.addEventListener('click', () => {
  const nextProject = groupProjects[projectPosition + 1];
  if (nextProject) navigateToProject(nextProject);
  else window.location.href = `category.html?type=${project.group}`;
});
watchBack.addEventListener('click', event => {
  const directory = window.location.pathname.slice(0, window.location.pathname.lastIndexOf('/') + 1);
  let previousPageIsInSite = false;
  try {
    const previousPage = new URL(document.referrer);
    previousPageIsInSite = previousPage.pathname.startsWith(directory) && previousPage.pathname !== window.location.pathname;
  } catch {}
  if (previousPageIsInSite && window.history.length > 1) {
    event.preventDefault();
    window.history.back();
  }
});

if (project) {
  player.classList.toggle('is-short', project.group === 'short');
  if (project.type === 'local') {
    player.classList.add('is-local-video');
    const shell = document.createElement('div');
    shell.className = 'local-video-player';
    const video = document.createElement('video');
    video.className = 'local-video';
    video.src = project.url;
    video.preload = 'auto';
    video.playsInline = true;
    video.muted = false;
    video.volume = 1;
    video.setAttribute('aria-label', project.title);

    const centerPlay = document.createElement('button');
    centerPlay.className = 'local-player-center-play';
    centerPlay.type = 'button';
    centerPlay.innerHTML = '<span aria-hidden="true">▶</span>';

    const controls = document.createElement('div');
    controls.className = 'local-player-controls';
    const playButton = document.createElement('button');
    playButton.className = 'local-player-button local-player-toggle';
    playButton.type = 'button';
    const seek = document.createElement('input');
    seek.className = 'local-player-seek';
    seek.type = 'range';
    seek.min = '0';
    seek.max = '1000';
    seek.value = '0';
    const time = document.createElement('span');
    time.className = 'local-player-time';
    time.textContent = '0:00 / 0:00';
    const muteButton = document.createElement('button');
    muteButton.className = 'local-player-button local-player-mute';
    muteButton.type = 'button';
    const volume = document.createElement('input');
    volume.className = 'local-player-volume';
    volume.type = 'range';
    volume.min = '0';
    volume.max = '1';
    volume.step = '0.05';
    volume.value = '1';
    const fullscreenButton = document.createElement('button');
    fullscreenButton.className = 'local-player-button local-player-fullscreen';
    fullscreenButton.type = 'button';
    fullscreenButton.innerHTML = '<span aria-hidden="true">⛶</span>';
    controls.append(playButton, seek, time, muteButton, volume);
    shell.append(video, centerPlay, controls, fullscreenButton);
    player.append(shell);

    const formatTime = seconds => {
      if (!Number.isFinite(seconds)) return '0:00';
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
      return `${mins}:${secs}`;
    };
    const syncControls = () => {
      const isPlaying = !video.paused && !video.ended;
      shell.classList.toggle('is-playing', isPlaying);
      playButton.innerHTML = `<span aria-hidden="true">${isPlaying ? '❚❚' : '▶'}</span>`;
      muteButton.innerHTML = `<span aria-hidden="true">${video.muted || video.volume === 0 ? '◖̸' : '◖))'}</span>`;
      seek.value = video.duration ? String(Math.round(video.currentTime / video.duration * 1000)) : '0';
      seek.style.setProperty('--seek-progress', `${seek.value / 10}%`);
      volume.style.setProperty('--volume-progress', `${Math.round(video.volume * 100)}%`);
      time.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
      playButton.setAttribute('aria-label', window.siteText(isPlaying ? 'player-pause' : 'player-play'));
      centerPlay.setAttribute('aria-label', window.siteText('player-play'));
      muteButton.setAttribute('aria-label', window.siteText(video.muted ? 'player-unmute' : 'player-mute'));
      seek.setAttribute('aria-label', window.siteText('player-seek'));
      volume.setAttribute('aria-label', window.siteText('player-volume'));
      fullscreenButton.setAttribute('aria-label', window.siteText('player-fullscreen'));
      const localQuality = document.querySelector('#quality-chip-primary');
      const alternateQuality = document.querySelector('#quality-chip-secondary');
      if (project.group === 'ads' && video.videoWidth && localQuality) {
        const sourceHeight = Math.min(video.videoWidth, video.videoHeight);
        localQuality.textContent = `${sourceHeight}p`;
        localQuality.title = window.siteText('ad-original-quality');
        alternateQuality.hidden = true;
      }
    };
    const togglePlayback = () => {
      if (video.paused || video.ended) video.play().catch(() => {});
      else video.pause();
    };
    playButton.addEventListener('click', togglePlayback);
    centerPlay.addEventListener('click', togglePlayback);
    video.addEventListener('click', togglePlayback);
    video.addEventListener('play', syncControls);
    video.addEventListener('pause', syncControls);
    video.addEventListener('ended', syncControls);
    video.addEventListener('timeupdate', syncControls);
    video.addEventListener('loadedmetadata', syncControls);
    seek.addEventListener('input', () => {
      if (video.duration) video.currentTime = Number(seek.value) / 1000 * video.duration;
      syncControls();
    });
    muteButton.addEventListener('click', () => { video.muted = !video.muted; syncControls(); });
    volume.addEventListener('input', () => {
      video.volume = Number(volume.value);
      video.muted = video.volume === 0;
      syncControls();
    });
    fullscreenButton.addEventListener('click', () => {
      if (document.fullscreenElement) document.exitFullscreen?.();
      else if (shell.requestFullscreen) {
        shell.requestFullscreen().catch(() => {
          if (typeof video.webkitEnterFullscreen === 'function') video.webkitEnterFullscreen();
        });
      } else if (typeof video.webkitEnterFullscreen === 'function') video.webkitEnterFullscreen();
    });
    document.addEventListener('languagechange', syncControls);
    syncControls();
  } else if (project.type === 'streamable' || project.type === 'vimeo') {
    if (project.group === 'ads' || project.group === 'short') player.classList.add('is-streamable-video');
    const frame = document.createElement('iframe');
    frame.src = project.url;
    frame.allow = 'fullscreen; picture-in-picture';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.allowFullscreen = true;
    frame.loading = 'eager';
    player.append(frame);
  } else {
    const frame = document.createElement('iframe');
    const playerParams = new URLSearchParams({ autoplay: '1', controls: '1', rel: '0', playsinline: '1', disablekb: '1' });
    frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(project.id)}?${playerParams}`;
    frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.allowFullscreen = true;
    frame.loading = 'eager';
    player.append(frame);
  }
}

function renderWatchText() {
  const english = window.siteLanguage !== 'ar';
  const streamableInfo = document.querySelector('#streamable-info');
  const isAdvertisement = project?.group === 'ads';
  const isStreamableAd = isAdvertisement && project?.type === 'streamable';
  const isLocalAd = isAdvertisement && project?.type === 'local';
  streamableInfo.hidden = !isAdvertisement;
  document.querySelector('#streamable-quality-row').hidden = !isAdvertisement;
  document.querySelector('#streamable-quality-note').hidden = !isAdvertisement;
  document.querySelector('#streamable-apology').textContent = window.siteText('streamable-apology');
  const qualityLabel = document.querySelector('#streamable-quality-label');
  const qualityNote = document.querySelector('#streamable-quality-note');
  const primaryQuality = document.querySelector('#quality-chip-primary');
  const secondaryQuality = document.querySelector('#quality-chip-secondary');
  if (isLocalAd) {
    qualityLabel.textContent = window.siteText('ad-original-quality-label');
    primaryQuality.textContent = window.siteText('ad-original-quality');
    secondaryQuality.hidden = true;
    qualityNote.textContent = window.siteText('ad-fixed-quality-note');
  } else if (isStreamableAd) {
    qualityLabel.textContent = window.siteText('streamable-quality-label');
    primaryQuality.textContent = '720p';
    secondaryQuality.textContent = '360p';
    secondaryQuality.hidden = false;
    qualityNote.textContent = window.siteText('streamable-quality-note');
  } else if (isAdvertisement && project?.type === 'vimeo') {
    qualityLabel.textContent = window.siteText('ad-provider-quality-label');
    primaryQuality.textContent = 'Vimeo';
    secondaryQuality.hidden = true;
    qualityNote.textContent = window.siteText('ad-provider-quality-note');
  }
  document.querySelector('#streamable-whatsapp-label').textContent = window.siteText('streamable-whatsapp-label');
  watchBack.innerHTML = `<span aria-hidden="true">${english ? '←' : '→'}</span> ${window.siteText(params.get('return') === 'category' ? 'watch-back-category' : 'watch-back-gallery')}`;
  watchHome.querySelector('.watch-home-label').textContent = window.siteText('watch-home');
  watchHome.querySelector('[aria-hidden="true"]').textContent = english ? '←' : '→';
  previousButton.setAttribute('aria-label', window.siteText('player-previous'));
  nextButton.setAttribute('aria-label', window.siteText(projectPosition === groupProjects.length - 1 ? 'player-browse' : 'player-next'));
  if (project) {
    const projectTitle = english ? (project.titleEn || project.title) : project.title;
    title.textContent = projectTitle;
    kind.textContent = window.siteText(project.group === 'short' ? 'kind-short' : project.group === 'long' ? 'kind-long' : 'kind-ad');
    document.title = `${projectTitle} — ${english ? 'Abdelrahman Abu Risha' : 'عبدالرحمن أبو ريشة'}`;
    const media = player.querySelector('video, iframe');
    if (media) {
      media.setAttribute('aria-label', projectTitle);
      if (media instanceof HTMLIFrameElement) media.title = projectTitle;
    }
    document.querySelector('.watch-caption').textContent = window.siteText(project.type === 'local' ? 'watch-caption-ad' : 'watch-caption-youtube');
  } else {
    title.textContent = window.siteText('watch-missing-title');
    kind.textContent = window.siteText('watch-missing-kind');
    player.innerHTML = `<p class="watch-error">${window.siteText('watch-error')}</p>`;
    document.title = `${window.siteText('watch-missing-title')} — ${english ? 'Abdelrahman Abu Risha' : 'عبدالرحمن أبو ريشة'}`;
  }
}
renderWatchText();
document.addEventListener('languagechange', renderWatchText);
