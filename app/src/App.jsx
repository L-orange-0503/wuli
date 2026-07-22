import { useEffect, useMemo, useState } from "react";
import { assetSlots, slotStyle } from "./assetSlots.js";

const navItems = [
  { label: "首页", href: "#home" },
  {
    label: "科普资源",
    href: "#resources",
    children: ["科普视频", "实验演示", "趣味问答", "科学家故事"],
  },
  {
    label: "AI赋能",
    href: "#ai",
    children: ["教授讲座", "智能体", "AI实验平台", "虚拟仿真"],
  },
  {
    label: "线上研学",
    href: "#courses",
    children: ["小学课程", "初中课程", "高中课程"],
  },
  {
    label: "科普活动",
    href: "#activities",
    children: ["创新大赛", "专题展", "志愿者行动"],
  },
  {
    label: "主题日",
    href: "#theme-day",
    children: ["光之日", "能量之日", "宇宙之日"],
  },
  {
    label: "实验室预约",
    href: "#lab-booking",
    children: ["实验预约", "设备查询", "开放时间", "使用指南"],
  },
  {
    label: "关于我们",
    href: "#about",
    children: ["学院介绍", "联系我们", "隐私政策"],
  },
];

const newsItems = [
  ["物理之光科普课堂暑期活动报名中", "05-18"],
  ["趣味实验探究营（初中组）火热报名中", "05-15"],
  ["物理之光科普助力大赛启动通知", "05-10"],
  ["物理前沿讲座：量子科技与未来生活", "05-08"],
];

const notices = [
  ["关于五一假期实验室开放安排的通知", "04-28"],
  ["第十届科普讲座报名通知", "04-25"],
  ["平台系统维护公告", "04-20"],
  ["磁悬浮活动作品提交截止时间调整通知", "04-18"],
];

const resources = [
  ["resourceVideo", "科普视频", "趣味讲解 问题聆听", "播放"],
  ["resourceExperiment", "实验演示", "动手探索 直观理解", "进入"],
  ["resourceQa", "趣味问答", "互动挑战 激发兴趣", "挑战"],
  ["resourceScientist", "科学家故事", "致敬先贤 超越未来", "阅读"],
];

const aiCards = [
  ["aiLecture", "教授科普讲座", "名师讲解 洞见物理"],
  ["aiFrontierPhysics", "前沿物理系列", "追踪前沿 拓展视野"],
  ["aiExperimentGuide", "实验操作指导", "步骤详解 安全规范"],
  ["aiCompanionBot", "科普伴学智能体", "个性陪伴 答疑解惑"],
  ["aiTeachingAssistant", "教研辅助智能体", "教研助力 智慧备课"],
  ["aiPlatform", "睿析AI实验平台", "ruixi.tech"],
  ["aiVrSimulation", "虚拟仿真资源", "三学段覆盖 沉浸体验"],
];

const courseCards = [
  ["coursePrimary", "小学（趣味启蒙）", "趣味引导 激发好奇"],
  ["courseMiddle", "初中（生活探究）", "联系生活 探究发现"],
  ["courseHigh", "高中（先修实验）", "实验探究 视野先行"],
];

const themeDates = [
  ["05.25", "光之日"],
  ["06.15", "能量之日"],
  ["07.12", "电磁之日"],
  ["08.10", "宇宙之日"],
];

const labActions = [
  ["labActionReserve", "实验预约"],
  ["labActionEquipment", "设备查询"],
  ["labActionOpenTime", "开放时间"],
  ["labActionGuide", "使用指南"],
];

function Icon({ name }) {
  const icons = {
    logo: (
      <>
        <path d="M28 8a20 20 0 1 0 0 40 20 20 0 0 0 0-40Zm0 7.5a12.5 12.5 0 1 1 0 25 12.5 12.5 0 0 1 0-25Z" />
        <path d="M13 29c8.5-1.2 18.4-1 30 .6-6.6 2.8-16 4.6-28.3 5.1L13 29Z" />
      </>
    ),
    cube: (
      <>
        <path d="m18 9 14 8v16l-14 8-14-8V17l14-8Z" />
        <path d="m4 17 14 8 14-8M18 25v16" />
      </>
    ),
    ai: (
      <>
        <path d="M8 9h15a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H8V9Z" />
        <path d="M7 17H3m4 7H3m26-9h4m-4 8h4M12 15v8m8-8v8M11 23l4-8 4 8" />
      </>
    ),
    headset: (
      <>
        <path d="M7 20a13 13 0 0 1 26 0v8a4 4 0 0 1-4 4h-3v-9h7" />
        <path d="M7 23h7v9h-3a4 4 0 0 1-4-4v-5Zm17 14h4a5 5 0 0 0 5-5" />
      </>
    ),
    calendar: (
      <>
        <path d="M7 8h26v27H7V8Zm0 9h26M14 5v7m12-7v7" />
        <path d="M13 23h5m5 0h5m-15 7h5m5 0h5" />
      </>
    ),
    search: (
      <>
        <path d="M18.5 32a13.5 13.5 0 1 0 0-27 13.5 13.5 0 0 0 0 27Z" />
        <path d="m29 29 8 8" />
      </>
    ),
    user: (
      <>
        <path d="M20 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
        <path d="M6 36c2-7 7-10.5 14-10.5S32 29 34 36" />
      </>
    ),
    arrow: <path d="M8 20h24M23 11l9 9-9 9" />,
    chevronDown: <path d="m10 15 10 10 10-10" />,
    up: <path d="m8 24 12-12 12 12M20 13v23" />,
    edit: (
      <>
        <path d="M8 31h24" />
        <path d="m11 24 14-14 5 5-14 14H11v-5Z" />
      </>
    ),
    lab: (
      <>
        <path d="M14 5h12M17 5v10L8 33a5 5 0 0 0 4.5 7h15a5 5 0 0 0 4.5-7l-9-18V5" />
        <path d="M12 29h16" />
      </>
    ),
    megaphone: (
      <>
        <path d="M5 22h7l16-9v22l-16-9H5v-4Z" />
        <path d="M12 26v9h5l-2-8" />
      </>
    ),
    heart: (
      <path d="M20 35S6 27 6 16a7 7 0 0 1 12-5 7 7 0 0 1 12 5c0 11-14 19-14 19Z" />
    ),
    book: (
      <>
        <path d="M8 8h11a5 5 0 0 1 5 5v23H13a5 5 0 0 0-5 5V8Z" />
        <path d="M24 13a5 5 0 0 1 5-5h11v33a5 5 0 0 0-5-5H24V13Z" />
      </>
    ),
    atom: (
      <>
        <path d="M20 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
        <path d="M5 18.5c0-4.1 6.7-7.5 15-7.5s15 3.4 15 7.5S28.3 26 20 26 5 22.6 5 18.5Z" />
        <path d="M12.5 5.5c3.5-2 9.8 2.8 14 10.2s5 14.8 1.5 16.8-9.8-2.8-14-10.2-5-14.8-1.5-16.8Z" />
        <path d="M27.5 5.5c-3.5-2-9.8 2.8-14 10.2s-5 14.8-1.5 16.8 9.8-2.8 14-10.2 5-14.8 1.5-16.8Z" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={`icon icon-${name}`}>
      {icons[name]}
    </svg>
  );
}

function MediaSlot({ slotKey, className = "", children }) {
  const slot = assetSlots[slotKey];
  return (
    <div
      className={`media-slot ${className}`}
      data-asset={slot?.file}
      data-placeholder={!slot?.ready ? slot?.file : undefined}
      data-ready={slot?.ready ? "true" : "false"}
      data-target-path={slot?.targetPath}
      title={slot ? `${slot.file} -> ${slot.targetPath}` : undefined}
      style={slotStyle(slot)}
    >
      {children}
    </div>
  );
}

function ImageSlot({ slotKey, className = "", alt = "" }) {
  const slot = assetSlots[slotKey];
  const isReady = Boolean(slot?.ready && slot?.targetPath);

  return (
    <span
      className={`image-slot ${className}`}
      data-asset={slot?.file}
      data-placeholder={!isReady ? slot?.file : undefined}
      data-ready={isReady ? "true" : "false"}
      data-target-path={slot?.targetPath}
      title={slot ? `${slot.file} -> ${slot.targetPath}` : undefined}
      aria-hidden={alt ? undefined : "true"}
    >
      {isReady ? <img src={slot.targetPath} alt={alt} draggable="false" decoding="async" /> : null}
    </span>
  );
}

function SectionTitle({ iconSlot, children, more, id }) {
  return (
    <div className="section-head">
      <h2 id={id} className="section-title">
        <ImageSlot slotKey={iconSlot} className="title-icon image-icon-slot" />
        {children}
      </h2>
      {more ? (
        <a className="section-more" href={more.href}>
          {more.label}
          <Icon name="arrow" />
        </a>
      ) : null}
    </div>
  );
}

function ListCard({ title, items, className, backgroundSlotKey }) {
  return (
    <article className={`info-card ${className || ""}`}>
      {backgroundSlotKey ? <MediaSlot slotKey={backgroundSlotKey} className="info-card-bg" /> : null}
      <div className="card-topline">
        <h3>{title}</h3>
        <a href="#activities">更多 &gt;</a>
      </div>
      <ul>
        {items.map(([text, date]) => (
          <li key={text}>
            <span>{text}</span>
            <time>{date}</time>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isNavBlurred, setNavBlurred] = useState(false);
  const heroDots = useMemo(() => [0, 1, 2, 3, 4], []);

  useEffect(() => {
    const updateNavState = () => {
      const hero = document.querySelector(".hero");
      const nav = document.querySelector(".top-nav");
      if (!hero || !nav) return;

      const threshold = hero.offsetTop + hero.offsetHeight - nav.offsetHeight;
      setNavBlurred(window.scrollY >= Math.max(0, threshold));
    };

    updateNavState();
    window.addEventListener("scroll", updateNavState, { passive: true });
    window.addEventListener("resize", updateNavState);
    return () => {
      window.removeEventListener("scroll", updateNavState);
      window.removeEventListener("resize", updateNavState);
    };
  }, []);

  return (
    <div className="site-shell" id="home">
      <header className={`top-nav ${isNavBlurred ? "is-blurred" : ""}`}>
        <div className="top-nav-inner">
          <a className="brand" href="#home" aria-label="返回首页">
            <MediaSlot slotKey="brandLogoFull" className="brand-logo-slot" />
          </a>

          <nav className={`nav-links ${isMenuOpen ? "is-open" : ""}`} aria-label="主导航">
            {navItems.map((item) => (
              <div className={item.children ? "nav-item has-submenu" : "nav-item"} key={item.label}>
                <a className={item.label === "首页" ? "nav-link active" : "nav-link"} href={item.href}>
                  {item.label}
                </a>
                {item.children ? (
                  <div className="submenu">
                    {item.children.map((child) => (
                      <a href={item.href} key={child}>
                        {child}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="nav-actions">
            <button className="login-button" type="button" aria-label="李世杰账号菜单">
              <MediaSlot slotKey="userAvatar" className="user-avatar-slot" />
              <span>李世杰</span>
              <Icon name="chevronDown" />
            </button>
            <button className="menu-button" type="button" onClick={() => setMenuOpen((value) => !value)}>
              菜单
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" aria-label="物理之光大中小数字化科普平台">
          <MediaSlot slotKey="heroBackground" className="hero-bg" />
          <button className="hero-arrow hero-prev" type="button" aria-label="上一张">
            ‹
          </button>
          <button className="hero-arrow hero-next" type="button" aria-label="下一张">
            ›
          </button>
          <div className="hero-content">
            <MediaSlot slotKey="heroTitleCalligraphy" className="calligraphy-slot" />
            <p className="hero-subtitle">大中小数字化科普平台</p>
            <p className="hero-slogan">探索物理之美　点亮科学未来</p>
          </div>
          <div className="hero-dots" aria-label="轮播分页">
            {heroDots.map((dot) => (
              <button className={dot === 0 ? "is-active" : ""} key={dot} type="button" aria-label={`第${dot + 1}张`} />
            ))}
          </div>
        </section>

        <section className="intro-grid section-wrap" id="about">
          <article className="intro-card info-card">
            <h3>科普平台介绍</h3>
            <p>
              “物理之光”大中小数字化科普平台由北京邮电大学物理科学与技术学院联合打造，面向大中小学生及社会公众，提供沉浸式物理科普资源与智能化学习体验。
            </p>
            <a className="outline-link" href="#about">
              了解更多
              <Icon name="arrow" />
            </a>
            <MediaSlot slotKey="introCampus" className="intro-building" />
          </article>
          <ListCard title="活动资讯" items={newsItems} backgroundSlotKey="activityNewsCard" />
          <ListCard title="通知公告" items={notices} backgroundSlotKey="noticeCard" />
        </section>

        <section className="section-wrap" aria-labelledby="resources-title">
          <SectionTitle id="resources-title" iconSlot="sectionIconResources" more={{ label: "更多资源", href: "#resources" }}>
            基础科普资源
          </SectionTitle>
          <div className="resource-grid" id="resources">
            {resources.map(([slot, title, text, action]) => (
              <a className="resource-card" href="#resources" key={slot}>
                <MediaSlot slotKey={slot} className="resource-media">
                  <span className="resource-copy">
                    <strong className="item-title">{title}</strong>
                    <span>{text}</span>
                  </span>
                  <span className="play-chip">{action}</span>
                </MediaSlot>
              </a>
            ))}
          </div>
        </section>

        <section className="section-wrap" aria-labelledby="ai-title">
          <SectionTitle id="ai-title" iconSlot="sectionIconAi">
            AI赋能 · 智慧科普
          </SectionTitle>
          <div className="ai-grid" id="ai">
            {aiCards.map(([slot, title, text]) => (
              <a className="ai-card" href="#ai" key={slot}>
                <MediaSlot slotKey={slot} className="ai-media">
                  <strong className="item-title">{title}</strong>
                  <span>{text}</span>
                </MediaSlot>
              </a>
            ))}
          </div>
        </section>

        <section className="section-wrap" aria-labelledby="courses-title">
          <SectionTitle id="courses-title" iconSlot="sectionIconCourses" more={{ label: "更多课程", href: "#courses" }}>
            线上课程化研学
          </SectionTitle>
          <div className="course-grid" id="courses">
            {courseCards.map(([slot, title, text]) => (
              <a className="course-card" href="#courses" key={slot}>
                <MediaSlot slotKey={slot} className="course-media">
                  <strong className="item-title">{title}</strong>
                  <span>{text}</span>
                </MediaSlot>
              </a>
            ))}
          </div>
        </section>

        <section className="section-wrap activity-banners" id="activities" aria-label="科普活动">
          <a className="banner-card banner-contest" href="#activities">
            <MediaSlot slotKey="bannerContest" className="banner-media">
              <span>
                <strong className="item-title">“物理之光”科普创新大赛<br />暨征集活动</strong>
                <em>激发创新思维　展示科学魅力</em>
                <b>立即参与 <Icon name="arrow" /></b>
              </span>
            </MediaSlot>
          </a>
          <a className="banner-card" href="#activities">
            <MediaSlot slotKey="bannerGallery" className="banner-media">
              <span>
                <strong className="item-title">优秀作品线上专题展</strong>
                <em>优秀作品展示　灵感相互链接</em>
                <b>加入我们 <Icon name="arrow" /></b>
              </span>
            </MediaSlot>
          </a>
        </section>

        <section className="bottom-grid section-wrap" id="theme-day" aria-label="服务入口">
          <article className="bottom-panel theme-panel">
            <MediaSlot slotKey="bottomThemeDay" className="bottom-bg" />
            <div className="bottom-content">
              <div className="panel-title-row">
                <h3><ImageSlot slotKey="sectionIconThemeDay" className="title-icon image-icon-slot" />物理主题日</h3>
                <a href="#theme-day">更多主题日 <Icon name="arrow" /></a>
              </div>
              <p>探寻主题之美　感受科学魅力</p>
              <div className="date-grid">
                {themeDates.map(([date, label]) => (
                  <span key={date}>
                    <strong>{date}</strong>
                    <em>{label}</em>
                  </span>
                ))}
              </div>
            </div>
          </article>
          <article className="bottom-panel">
            <MediaSlot slotKey="bottomVolunteer" className="bottom-bg" />
            <div className="bottom-content">
              <h3><ImageSlot slotKey="sectionIconVolunteer" className="title-icon image-icon-slot" />志愿者行动</h3>
              <p>传播科学知识　点亮更多未来</p>
              <a className="solid-link volunteer-link" href="#activities">加入我们 <Icon name="arrow" /></a>
            </div>
          </article>
          <article className="bottom-panel lab-panel" id="lab-booking">
            <MediaSlot slotKey="bottomLabBooking" className="bottom-bg" />
            <div className="bottom-content">
              <h3><ImageSlot slotKey="sectionIconLabBooking" className="title-icon image-icon-slot" />实验室预约</h3>
              <p>开放共享　安全有序</p>
              <div className="lab-actions">
                {labActions.map(([slot, item]) => (
                  <a href="#lab-booking" key={item}>
                    <ImageSlot slotKey={slot} className="lab-action-icon image-icon-slot" />
                    <span>{item}</span>
                  </a>
                ))}
              </div>
            </div>
          </article>
        </section>
      </main>

      <aside className="floating-tools" aria-label="快捷工具">
        <a href="#ai"><Icon name="headset" />在线客服</a>
        <a href="#activities"><Icon name="edit" />意见反馈</a>
        <a href="#home"><Icon name="up" />返回顶部</a>
      </aside>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <MediaSlot slotKey="footerLogoFull" className="footer-logo-slot" />
          </div>
          <p>© 2024 北京邮电大学物理科学与技术学院 版权所有</p>
          <p>京ICP备 05067940号</p>
          <nav>
            <a href="#about">联系我们</a>
            <a href="#about">隐私政策</a>
            <a href="#about">使用条款</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
