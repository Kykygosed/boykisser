/* ==========================================================
   BOYKISSER AIRLINES — Design system
   Palette dérivée du logo (maroon profond) + accent laiton
   type "carte d'embarquement" / "panneau d'aéroport à volets"
   ========================================================== */

@import url('https://fonts.googleapis.com/css2?family=Anton&family=Space+Mono:wght@400;700&family=Inter:wght@400;500;600;700;800&display=swap');

:root{
  --maroon-900:#420813;
  --maroon-800:#590A19;
  --maroon-700:#7A0E1F;   /* couleur de marque, tirée du logo */
  --maroon-600:#8F1226;
  --maroon-accent:#B3182F;

  --ink:#181110;
  --ink-soft:#3A2C2A;

  --cream:#FBF4E9;        /* fond clair "papier" */
  --paper:#FFFFFF;
  --paper-dim:#F1E6D6;

  --gold:#D8A752;         /* accent laiton, billets/tampons */
  --gold-soft:#EFD9A6;

  --ok:#2F8F5B;
  --ok-bg:#E4F3EA;
  --danger:#B3182F;

  --font-display:'Anton', 'Arial Narrow', sans-serif;
  --font-body:'Inter', system-ui, sans-serif;
  --font-mono:'Space Mono', ui-monospace, monospace;

  --radius-card:14px;
  --shadow-card:0 10px 30px rgba(24,17,16,.18);
  --shadow-soft:0 4px 14px rgba(24,17,16,.10);
}

*{box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{
  margin:0;
  font-family:var(--font-body);
  color:var(--ink);
  background:var(--cream);
  -webkit-font-smoothing:antialiased;
}
img{max-width:100%;display:block;}
a{color:inherit;text-decoration:none;}
button{font-family:inherit;cursor:pointer;}

:focus-visible{
  outline:3px solid var(--gold);
  outline-offset:2px;
}

.container{
  width:100%;
  max-width:1120px;
  margin:0 auto;
  padding:0 24px;
}

/* ---------- topbar ---------- */
.topbar{
  position:sticky;
  top:0;
  z-index:50;
  background:var(--maroon-700);
  border-bottom:4px solid var(--gold);
}
.topbar__inner{
  display:flex;
  align-items:center;
  gap:20px;
  padding:10px 24px;
  max-width:1120px;
  margin:0 auto;
}
.brand{
  display:flex;
  align-items:center;
  gap:12px;
  margin-right:auto;
}
.brand img{
  height:44px;
  width:auto;
}
.brand__text{
  display:flex;
  flex-direction:column;
  line-height:1;
}
.brand__text strong{
  font-family:var(--font-display);
  font-size:20px;
  letter-spacing:.5px;
  color:var(--cream);
}
.brand__text span{
  font-family:var(--font-mono);
  font-size:10px;
  letter-spacing:2px;
  color:var(--gold-soft);
  text-transform:uppercase;
}
.nav-links{
  display:flex;
  gap:22px;
  align-items:center;
}
.nav-links a{
  font-size:14px;
  font-weight:600;
  color:var(--cream);
  opacity:.85;
  padding:6px 2px;
  border-bottom:2px solid transparent;
  transition:opacity .15s, border-color .15s;
}
.nav-links a:hover{opacity:1;border-color:var(--gold);}

.btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  font-family:var(--font-body);
  font-weight:700;
  font-size:14px;
  padding:12px 22px;
  border-radius:999px;
  border:2px solid transparent;
  transition:transform .12s ease, box-shadow .12s ease, background .15s, color .15s;
  white-space:nowrap;
}
.btn:hover{transform:translateY(-1px);}
.btn:active{transform:translateY(0);}

.btn--gold{
  background:var(--gold);
  color:var(--maroon-900);
  box-shadow:0 6px 0 #A9803A, 0 10px 18px rgba(0,0,0,.25);
}
.btn--gold:hover{box-shadow:0 4px 0 #A9803A, 0 8px 14px rgba(0,0,0,.25);}

.btn--outline{
  background:transparent;
  border-color:var(--cream);
  color:var(--cream);
}
.btn--outline:hover{background:rgba(251,244,233,.1);}

.btn--dark{
  background:var(--ink);
  color:var(--cream);
}
.btn--dark:hover{background:var(--ink-soft);}

.btn--full{width:100%;}
.btn--sm{padding:9px 16px;font-size:13px;}

.btn--pilote{
  position:relative;
  background:var(--gold);
  color:var(--maroon-900);
  box-shadow:0 6px 0 #A9803A, 0 10px 22px rgba(0,0,0,.3);
  animation:pulse-pilote 2.4s ease-in-out infinite;
}
@keyframes pulse-pilote{
  0%,100%{box-shadow:0 6px 0 #A9803A, 0 10px 22px rgba(0,0,0,.3);}
  50%{box-shadow:0 6px 0 #A9803A, 0 10px 26px rgba(216,167,82,.55);}
}
@media (prefers-reduced-motion: reduce){
  .btn--pilote{animation:none;}
}

/* ---------- hero ---------- */
.hero{
  background:
    radial-gradient(ellipse at 20% 0%, rgba(216,167,82,.14), transparent 55%),
    linear-gradient(160deg, var(--maroon-800), var(--maroon-900) 70%);
  color:var(--cream);
  padding:72px 0 96px;
  position:relative;
  overflow:hidden;
}
.hero::after{
  content:"";
  position:absolute;
  inset:auto 0 0 0;
  height:60px;
  background:repeating-linear-gradient(90deg, var(--cream) 0 22px, transparent 22px 44px);
  opacity:.06;
}
.hero__grid{
  display:grid;
  grid-template-columns:1.1fr .9fr;
  gap:48px;
  align-items:center;
}
.eyebrow{
  font-family:var(--font-mono);
  font-size:12px;
  letter-spacing:3px;
  text-transform:uppercase;
  color:var(--gold);
  display:flex;
  align-items:center;
  gap:10px;
  margin-bottom:18px;
}
.eyebrow::before{
  content:"";
  width:26px;height:2px;background:var(--gold);
}
.hero h1{
  font-family:var(--font-display);
  font-size:clamp(38px,6vw,64px);
  line-height:.98;
  letter-spacing:.5px;
  margin:0 0 20px;
  text-transform:uppercase;
}
.hero h1 em{
  font-style:normal;
  color:var(--gold);
}
.hero p.lead{
  font-size:17px;
  line-height:1.65;
  color:var(--paper-dim);
  max-width:52ch;
  margin:0 0 30px;
}
.hero__cta{
  display:flex;
  gap:14px;
  flex-wrap:wrap;
}
.hero__art{
  display:flex;
  justify-content:center;
}
.sticker{
  max-width:440px;
  filter:drop-shadow(0 24px 40px rgba(0,0,0,.45));
  transform:rotate(-2deg);
}

.stat-strip{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:0;
  margin-top:46px;
  border-top:1px solid rgba(251,244,233,.18);
  padding-top:26px;
}
.stat-strip div{
  border-right:1px solid rgba(251,244,233,.18);
  padding-right:18px;
}
.stat-strip div:last-child{border-right:none;}
.stat-strip strong{
  display:block;
  font-family:var(--font-mono);
  font-size:26px;
  color:var(--gold);
}
.stat-strip span{
  font-size:12px;
  color:var(--paper-dim);
  letter-spacing:.4px;
}

/* ---------- sections ---------- */
section{padding:88px 0;}
.section-head{
  max-width:640px;
  margin:0 0 46px;
}
.section-head .eyebrow{color:var(--maroon-accent);}
.section-head h2{
  font-family:var(--font-display);
  font-size:clamp(28px,4vw,40px);
  text-transform:uppercase;
  margin:0 0 12px;
  color:var(--ink);
}
.section-head p{
  color:var(--ink-soft);
  line-height:1.6;
  font-size:15.5px;
}

.steps{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:28px;
}
.step{
  background:var(--paper);
  border-radius:var(--radius-card);
  padding:28px 24px;
  box-shadow:var(--shadow-soft);
  border:1px solid var(--paper-dim);
  position:relative;
}
.step .leg{
  font-family:var(--font-mono);
  font-size:12px;
  letter-spacing:2px;
  color:var(--gold);
  background:var(--maroon-900);
  display:inline-block;
  padding:4px 10px;
  border-radius:6px;
  margin-bottom:16px;
}
.step h3{
  font-family:var(--font-display);
  font-size:19px;
  text-transform:uppercase;
  margin:0 0 10px;
  letter-spacing:.3px;
}
.step p{
  color:var(--ink-soft);
  font-size:14.5px;
  line-height:1.6;
  margin:0;
}

.about{
  background:var(--paper);
  border-top:1px solid var(--paper-dim);
  border-bottom:1px solid var(--paper-dim);
}
.about__grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:52px;
  align-items:center;
}
.about__grid img{
  border-radius:var(--radius-card);
  box-shadow:var(--shadow-card);
}
.about__grid p{
  color:var(--ink-soft);
  line-height:1.7;
  font-size:15.5px;
}
.about__grid p + p{margin-top:14px;}

.cta-band{
  background:var(--maroon-700);
  color:var(--cream);
  text-align:center;
  padding:70px 0;
}
.cta-band h2{
  font-family:var(--font-display);
  font-size:clamp(26px,4vw,40px);
  text-transform:uppercase;
  margin:0 0 14px;
}
.cta-band p{
  color:var(--paper-dim);
  margin:0 0 28px;
}

footer{
  background:var(--ink);
  color:var(--paper-dim);
  padding:32px 0;
  font-size:13px;
}
.footer__inner{
  display:flex;
  justify-content:space-between;
  align-items:center;
  flex-wrap:wrap;
  gap:14px;
}
.footer__inner span{opacity:.6;}

/* ---------- boarding-pass style auth pages ---------- */
.auth-wrap{
  min-height:calc(100vh - 76px);
  display:flex;
  align-items:center;
  justify-content:center;
  padding:56px 20px;
  background:
    linear-gradient(160deg, var(--maroon-800), var(--maroon-900) 75%);
}
.boarding-pass{
  width:100%;
  max-width:460px;
  background:var(--paper);
  border-radius:18px;
  box-shadow:var(--shadow-card);
  overflow:hidden;
}
.boarding-pass__head{
  background:var(--maroon-700);
  color:var(--cream);
  padding:22px 26px;
  display:flex;
  align-items:center;
  gap:14px;
  border-bottom:3px dashed var(--gold);
}
.boarding-pass__head img{height:38px;}
.boarding-pass__head div strong{
  font-family:var(--font-display);
  font-size:18px;
  letter-spacing:.4px;
  display:block;
}
.boarding-pass__head div span{
  font-family:var(--font-mono);
  font-size:10.5px;
  color:var(--gold-soft);
  letter-spacing:1.5px;
}
.boarding-pass__body{
  padding:30px 26px 32px;
}
.boarding-pass__body h1{
  font-family:var(--font-display);
  font-size:24px;
  text-transform:uppercase;
  margin:0 0 6px;
}
.boarding-pass__body p.sub{
  color:var(--ink-soft);
  font-size:14px;
  margin:0 0 24px;
}

.field{margin-bottom:16px;}
.field label{
  display:block;
  font-size:12px;
  font-weight:700;
  letter-spacing:.6px;
  text-transform:uppercase;
  color:var(--ink-soft);
  margin-bottom:6px;
}
.field input, .field select, .field textarea{
  width:100%;
  padding:12px 14px;
  border:2px solid var(--paper-dim);
  border-radius:10px;
  font-family:var(--font-body);
  font-size:14.5px;
  background:var(--cream);
  color:var(--ink);
  transition:border-color .15s, background .15s;
}
.field input:focus, .field select:focus, .field textarea:focus{
  border-color:var(--gold);
  background:var(--paper);
  outline:none;
}
.field-row{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:14px;
}

.form-msg{
  font-size:13.5px;
  padding:11px 14px;
  border-radius:10px;
  margin-bottom:16px;
  display:none;
  line-height:1.5;
}
.form-msg.show{display:block;}
.form-msg.error{background:#FBE4E7;color:var(--danger);}
.form-msg.ok{background:var(--ok-bg);color:var(--ok);}

.switch-link{
  text-align:center;
  margin-top:20px;
  font-size:13.5px;
  color:var(--ink-soft);
}
.switch-link a{color:var(--maroon-accent);font-weight:700;}

/* ---------- dashboard ---------- */
.dash{
  background:var(--cream);
  min-height:calc(100vh - 76px);
  padding:40px 0 70px;
}
.dash__head{
  display:flex;
  justify-content:space-between;
  align-items:flex-end;
  gap:20px;
  margin-bottom:32px;
  flex-wrap:wrap;
}
.dash__head h1{
  font-family:var(--font-display);
  font-size:32px;
  text-transform:uppercase;
  margin:0 0 6px;
}
.dash__head p{
  color:var(--ink-soft);
  margin:0;
  font-size:14.5px;
}
.pilot-id{
  font-family:var(--font-mono);
  background:var(--ink);
  color:var(--gold);
  padding:8px 14px;
  border-radius:8px;
  font-size:12.5px;
  letter-spacing:1px;
}

.card{
  background:var(--paper);
  border-radius:var(--radius-card);
  border:1px solid var(--paper-dim);
  box-shadow:var(--shadow-soft);
}

.active-route{
  padding:0;
  overflow:hidden;
  margin-bottom:36px;
}
.active-route__strip{
  background:var(--maroon-700);
  color:var(--cream);
  padding:16px 24px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  flex-wrap:wrap;
  gap:10px;
}
.active-route__strip .tag{
  font-family:var(--font-mono);
  font-size:11px;
  letter-spacing:2px;
  background:var(--ok);
  color:#fff;
  padding:4px 10px;
  border-radius:6px;
}
.active-route__body{
  padding:26px 24px;
}
.route-line{
  display:flex;
  align-items:center;
  gap:18px;
  margin-bottom:22px;
}
.route-line .apt{
  font-family:var(--font-mono);
  font-size:34px;
  font-weight:700;
  letter-spacing:1px;
}
.route-line .apt small{
  display:block;
  font-family:var(--font-body);
  font-size:11px;
  font-weight:600;
  color:var(--ink-soft);
  letter-spacing:.5px;
  text-transform:uppercase;
}
.route-line .path{
  flex:1;
  height:2px;
  background:repeating-linear-gradient(90deg, var(--gold) 0 8px, transparent 8px 16px);
  position:relative;
}
.route-line .path::after{
  content:"✈";
  position:absolute;
  left:50%;
  top:50%;
  transform:translate(-50%,-58%);
  font-size:20px;
  color:var(--maroon-accent);
}
.route-meta{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:16px;
  margin-bottom:24px;
}
.route-meta div{
  background:var(--cream);
  border-radius:10px;
  padding:12px 14px;
}
.route-meta span{
  display:block;
  font-size:11px;
  text-transform:uppercase;
  letter-spacing:.5px;
  color:var(--ink-soft);
  margin-bottom:4px;
}
.route-meta strong{
  font-family:var(--font-mono);
  font-size:15px;
}

.map-box{
  height:320px;
  border-radius:12px;
  overflow:hidden;
  border:1px solid var(--paper-dim);
  position:relative;
  background:var(--paper-dim);
}
.map-box .map-note{
  position:absolute;
  z-index:400;
  left:12px;
  bottom:12px;
  background:rgba(24,17,16,.85);
  color:var(--cream);
  font-size:11.5px;
  padding:8px 12px;
  border-radius:8px;
  font-family:var(--font-mono);
  letter-spacing:.3px;
}

.empty-state{
  text-align:center;
  padding:60px 30px;
  color:var(--ink-soft);
}
.empty-state h3{
  font-family:var(--font-display);
  font-size:22px;
  text-transform:uppercase;
  color:var(--ink);
  margin:14px 0 8px;
}

.flights-head{
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom:18px;
  flex-wrap:wrap;
  gap:10px;
}
.flights-head h2{
  font-family:var(--font-display);
  font-size:22px;
  text-transform:uppercase;
  margin:0;
}

.flight-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(280px,1fr));
  gap:20px;
}
.flight-card{
  position:relative;
  background:var(--paper);
  border-radius:14px;
  border:1px solid var(--paper-dim);
  box-shadow:var(--shadow-soft);
  overflow:hidden;
  display:flex;
  flex-direction:column;
}
.flight-card__top{
  background:var(--ink);
  color:var(--gold);
  font-family:var(--font-mono);
  font-size:12.5px;
  letter-spacing:1.5px;
  padding:10px 16px;
  display:flex;
  justify-content:space-between;
}
.flight-card__body{
  padding:18px 16px 20px;
  flex:1;
  display:flex;
  flex-direction:column;
}
.flight-card .route-line{margin-bottom:16px;}
.flight-card .route-line .apt{font-size:24px;}
.flight-card .route-meta{
  grid-template-columns:repeat(2,1fr);
  margin-bottom:18px;
}
.flight-card .btn{margin-top:auto;}

.badge{
  display:inline-block;
  font-size:11px;
  font-weight:700;
  letter-spacing:.4px;
  padding:4px 10px;
  border-radius:999px;
  text-transform:uppercase;
}
.badge--ok{background:var(--ok-bg);color:var(--ok);}
.badge--muted{background:var(--paper-dim);color:var(--ink-soft);}

.two-col{
  display:grid;
  grid-template-columns:1.3fr .9fr;
  gap:28px;
  align-items:start;
}

.top-nav-slim{
  display:flex;
  align-items:center;
  gap:16px;
}
.top-nav-slim span{
  font-size:13.5px;
  color:var(--cream);
  opacity:.9;
}

/* ---------- admin ---------- */
.admin-shell{
  background:var(--cream);
  min-height:calc(100vh - 76px);
  padding:40px 0 80px;
}
.admin-shell h1{
  font-family:var(--font-display);
  font-size:30px;
  text-transform:uppercase;
  margin:0 0 6px;
}
.admin-shell > .container > p.sub{
  color:var(--ink-soft);
  margin:0 0 32px;
}
.admin-grid{
  display:grid;
  grid-template-columns:.85fr 1.15fr;
  gap:28px;
  align-items:start;
}
.admin-card{
  background:var(--paper);
  border-radius:14px;
  border:1px solid var(--paper-dim);
  box-shadow:var(--shadow-soft);
  padding:24px;
}
.admin-card h2{
  font-family:var(--font-display);
  font-size:19px;
  text-transform:uppercase;
  margin:0 0 18px;
}
.table-wrap{overflow-x:auto;}
table{
  width:100%;
  border-collapse:collapse;
  font-size:13.5px;
}
th,td{
  text-align:left;
  padding:10px 12px;
  border-bottom:1px solid var(--paper-dim);
  white-space:nowrap;
}
th{
  font-family:var(--font-mono);
  font-size:11px;
  letter-spacing:1px;
  text-transform:uppercase;
  color:var(--ink-soft);
}
td .callsign{
  font-family:var(--font-mono);
  font-weight:700;
  background:var(--ink);
  color:var(--gold);
  padding:3px 8px;
  border-radius:6px;
  font-size:12px;
}
.del-btn{
  background:none;
  border:1px solid var(--danger);
  color:var(--danger);
  padding:6px 10px;
  border-radius:8px;
  font-size:12px;
  font-weight:700;
}
.del-btn:hover{background:var(--danger);color:#fff;}

.gate{
  max-width:420px;
  margin:80px auto;
  text-align:center;
}
.gate .card{padding:40px 30px;}

/* ---------- utility ---------- */
.hidden{display:none !important;}
.loader{
  display:flex;
  align-items:center;
  justify-content:center;
  padding:60px 0;
  color:var(--ink-soft);
  font-family:var(--font-mono);
  font-size:13px;
  letter-spacing:1px;
}

@media (max-width: 880px){
  .hero__grid, .about__grid, .two-col, .admin-grid{grid-template-columns:1fr;}
  .hero__art{order:-1;}
  .stat-strip{grid-template-columns:1fr;gap:14px;}
  .stat-strip div{border-right:none;border-bottom:1px solid rgba(251,244,233,.18);padding-bottom:14px;}
  .nav-links{display:none;}
  .steps{grid-template-columns:1fr;}
  .route-meta{grid-template-columns:repeat(2,1fr);}
  .dash__head{align-items:flex-start;}
}
