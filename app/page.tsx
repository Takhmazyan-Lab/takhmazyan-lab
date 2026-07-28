import fs from 'node:fs';
import path from 'node:path';
import publications from '@/content/publications.json';
import timeline from '@/content/timeline.json';

type JournalEntry = { date: string; text: string };
type Project = {
  slug: string; title: string; description: string; status: string; started: string; updated: string;
  tags: string[]; version?: string; link?: string; reason?: string; conclusion?: string; journal: JournalEntry[];
};

function getProjects(): Project[] {
  const root = path.join(process.cwd(), 'content', 'projects');
  return fs.readdirSync(root, { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => {
    const folder = path.join(root, entry.name);
    const project = JSON.parse(fs.readFileSync(path.join(folder, 'project.json'), 'utf8'));
    const journalFolder = path.join(folder, 'journal');
    const journal = fs.readdirSync(journalFolder).filter(file => file.endsWith('.md')).sort().map(file => ({
      date: file.replace('.md', ''), text: fs.readFileSync(path.join(journalFolder, file), 'utf8').trim(),
    })).reverse();
    return { ...project, journal } as Project;
  }).sort((a, b) => b.updated.localeCompare(a.updated));
}

const formatDate = (date: string) => new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date));
const shortDate = (date: string) => new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(date));
function Arrow() { return <span className="arrow" aria-hidden="true">↗</span>; }

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <article className="project-card" id={project.slug}>
    <div className="card-visual"><span className="visual-code">T / {String(index + 1).padStart(2, '0')}</span><span className="visual-word">{project.title.slice(0, 1)}</span><span className="visual-orbit" /></div>
    <div className="card-content">
      <div className="project-topline"><span className={`status-dot ${project.status === 'Архив' ? 'is-archived' : project.status === 'Выпущен' ? 'is-released' : ''}`} /><span>{project.status}</span><span className="project-date">Обновлено {shortDate(project.updated)}</span></div>
      <div className="project-main"><div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><span className="project-index">{String(index + 1).padStart(2, '0')}</span></div>
      {project.status === 'Выпущен' && <div className="release-row"><span>Версия <b>{project.version}</b></span><a href={`https://${project.link}`} target="_blank" rel="noreferrer">Открыть проект <Arrow /></a></div>}
      {project.status === 'Архив' && <div className="archive-note"><p><strong>Почему закрыт</strong> {project.reason}</p><p>{project.conclusion}</p></div>}
      <details className="journal"><summary><span>Журнал разработки <i>{project.journal.length} записи</i></span><span className="summary-arrow">＋</span></summary><div className="journal-list">{project.journal.map(entry => <div className="journal-entry" key={entry.date}><time>{formatDate(entry.date)}</time><p>{entry.text}</p></div>)}</div></details>
    </div>
  </article>;
}

export default function Home() {
  const projects = getProjects();
  const current = projects.filter(p => p.status !== 'Архив');
  const archived = projects.filter(p => p.status === 'Архив');
  const active = projects.filter(p => p.status === 'В разработке').length;
  return <main>
    <header className="site-header"><a className="brand" href="#top"><span className="brand-mark">Т</span><span>Тахмазян Лаб</span></a><nav><a href="#projects">Проекты</a><a href="#activity">Лента</a><a href="#archive">Архив</a><a href="#about">О лаборатории</a></nav><a className="header-contact" href="mailto:contact@тахмазянлаб.рф">Связаться <Arrow /></a></header>
    <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow"><span className="signal" />Фамильная лаборатория исследований и инженерных разработок <span>·</span> 2026</p><h1>Тахмазян<br /><em>Лаб</em></h1><p className="hero-description">Создаем программные продукты, экспериментируем с идеями и открыто документируем путь их развития.</p><a className="hero-link" href="#projects"><span>Открыть рабочий стол</span><Arrow /></a></div><div className="hero-console"><div className="console-head"><span>LAB / 001</span><span>ONLINE</span></div><div className="console-grid"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div><div className="console-caption"><strong>{String(projects.length).padStart(2, '0')}</strong><span>проекта<br />в системе</span></div></div></section>
    <section className="stats"><div><strong>{String(projects.length).padStart(2, '0')}</strong><span>Проектов</span></div><div><strong>{String(active).padStart(2, '0')}</strong><span>В работе</span></div><div><strong>{String(projects.length - active - archived.length).padStart(2, '0')}</strong><span>Выпущено</span></div><div><strong>{String(archived.length).padStart(2, '0')}</strong><span>Архив</span></div><div className="stats-update"><span>Последний сигнал</span><strong>27.07.2026 / 18:42</strong></div></section>
    <section className="section projects-section" id="projects"><div className="section-heading"><div><p className="eyebrow">01 / Рабочий стол</p><h2>Проекты</h2></div><p>{current.length} активных направления<br />в лаборатории сейчас</p></div><div className="projects-list">{current.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}</div></section>
    <section className="section activity-section" id="activity"><div className="section-heading"><div><p className="eyebrow">02 / Сигналы</p><h2>Лента</h2></div><p>Хронология изменений<br />всей лаборатории</p></div><div className="timeline">{timeline.map((item, index) => <div className="timeline-item" key={`${item.date}-${item.title}`}><time>{shortDate(item.date)}</time><div className="timeline-marker">{index === 0 ? '●' : '·'}</div><div><span className="timeline-kind">{item.kind}</span><h3>{item.title}</h3><p>{item.text}</p></div></div>)}</div></section>
    <section className="section archive-section" id="archive"><div className="archive-intro"><p className="eyebrow">03 / Память</p><h2>Архив</h2><p>Проекты, которые завершились. Не кладбище идей, а место, где остаётся опыт.</p></div><div className="archive-list">{archived.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}</div></section>
    <section className="section publications-section"><div className="section-heading"><div><p className="eyebrow">04 / Мысли</p><h2>Публикации</h2></div><a className="text-link" href="#publications">Все материалы <Arrow /></a></div><div className="publication-list" id="publications">{publications.map(item => <article className="publication" key={item.title}><time>{shortDate(item.date)}</time><div><span>{item.type}</span><h3>{item.title}</h3><p>{item.description}</p></div><Arrow /></article>)}</div></section>
    <section className="about-section" id="about"><div className="about-label"><p className="eyebrow">05 / Лаборатория</p></div><div><h2>Место, где идеи<br /><em>становятся опытом.</em></h2><p>Тахмазян Лаб — фамильная лаборатория исследований и инженерных разработок. Выбираем интересные задачи, доводим их до результата и сохраняем то, чему они нас научили.</p><p>Здесь будут появляться проекты, удачные решения и неудачные попытки. Всё, что помогает двигаться дальше.</p></div></section>
    <footer><a className="brand" href="#top"><span className="brand-mark">Т</span><span>Тахмазян Лаб</span></a><p>Небольшая лаборатория<br />большого пути.</p><div className="footer-links"><a href="mailto:contact@тахмазянлаб.рф">Email <Arrow /></a><a href="https://github.com/Takhmazyan-Lab" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href="https://max.ru/se13744552_biz" target="_blank" rel="noreferrer">MAX <Arrow /></a><a href="https://orcid.org/0009-0005-1376-4573" target="_blank" rel="noreferrer">ORCID <Arrow /></a><a href="https://t.me/takhmazyan_lab" target="_blank" rel="noreferrer">Telegram <Arrow /></a></div><div className="footer-links footer-nav"><a href="#projects">Проекты <Arrow /></a><a href="#archive">Архив <Arrow /></a></div><small>© 2026 Тахмазян Лаб</small></footer>
  </main>;
}
