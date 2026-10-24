const categoryParams = new URLSearchParams(window.location.search);
const categoryKey = categoryParams.get('type');
const categories = {
  ads: { title: 'الإعلانات', titleEn: 'Advertisements', description: 'أفكار إعلانية تتحول إلى مشاهد مصممة بالذكاء الاصطناعي.', descriptionEn: 'Advertising ideas transformed into AI-crafted scenes.' },
  short: { title: 'فيديوهات قصيرة', titleEn: 'Short Videos', description: 'قصص سريعة وإيقاع بصري مكثف في صيغة قصيرة.', descriptionEn: 'Quick stories with a concentrated visual rhythm.' },
  long: { title: 'فيديوهات طويلة', titleEn: 'Long Videos', description: 'مشاريع أطول تبني الفكرة والمشهد والحكاية على مهل.', descriptionEn: 'Longer projects that let ideas, scenes, and stories unfold.' }
};
const category = categories[categoryKey] || categories.ads;
const items = window.portfolioVideos.filter(project => project.group === (categories[categoryKey] ? categoryKey : 'ads'));
const grid = document.querySelector('#category-grid');
document.querySelector('#year').textContent = new Date().getFullYear();
document.body.dataset.category = categoryKey || 'ads';
document.querySelector('.category-topbar .watch-back').href = `index.html#${categoryKey === 'short' ? 'shorts' : categoryKey === 'long' ? 'long' : 'ads'}`;

function renderCategory() {
  const english = window.siteLanguage !== 'ar';
  const title = english ? category.titleEn : category.title;
  document.querySelector('#category-title').textContent = title;
  document.querySelector('#category-description').textContent = english ? category.descriptionEn : category.description;
  document.querySelector('#category-count').textContent = `${String(items.length).padStart(2, '0')} ${window.siteText(items.length === 1 ? 'count-one' : 'count-many')}`;
  document.title = `${title} — ${english ? 'Abdelrahman Abu Risha' : 'عبدالرحمن أبو ريشة'}`;
  if (items.length) grid.innerHTML = items.map((project, index) => window.portfolioCardMarkup(project, index, true)).join('');
  else grid.innerHTML = `<p class="category-empty">${window.siteText('category-empty')}</p>`;
}
renderCategory();
document.addEventListener('languagechange', renderCategory);
