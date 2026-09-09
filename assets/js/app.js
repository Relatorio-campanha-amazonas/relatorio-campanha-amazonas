(() => {
  const data = window.REPORT_DATA;
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const fmt = n => new Intl.NumberFormat('pt-BR').format(Math.round(n));
  const pct = (n, d) => d ? (n / d * 100) : 0;
  const pctFmt = n => `${n.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})}%`;

  // theme
  const savedTheme = localStorage.getItem('relatorio-theme');
  if (savedTheme === 'light') document.documentElement.dataset.theme = 'light';
  $('#themeToggle').addEventListener('click', () => {
    const light = document.documentElement.dataset.theme !== 'light';
    document.documentElement.dataset.theme = light ? 'light' : 'dark';
    localStorage.setItem('relatorio-theme', light ? 'light' : 'dark');
  });

  // scroll progress
  const updateProgress = () => {
    const h = document.documentElement;
    const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    $('#pageProgress').style.width = `${Math.max(0, Math.min(100, p))}%`;
  };
  window.addEventListener('scroll', updateProgress, {passive:true});
  updateProgress();

  function renderSnapshot(year) {
    const c = data.cycles[year];
    const participation = pct(c.turnout, c.apt);
    const abst = pct(c.abstention, c.apt);
    const blank = pct(c.blank, c.apt);
    const nul = pct(c.nullVotes, c.apt);
    const davidTotal = pct(c.david, c.apt);

    const kpis = [
      {label:'Eleitorado apto', value:fmt(c.apt), sub:c.scope},
      {label:'Comparecimento', value:pctFmt(participation), sub:`${fmt(c.turnout)} pessoas`},
      {label:'Votos válidos', value:fmt(c.valid), sub:`${pctFmt(pct(c.valid,c.turnout))} do comparecimento`},
      {label:'David Almeida', value:fmt(c.david), sub:`${c.davidPctValid.toLocaleString('pt-BR',{minimumFractionDigits:2})}% dos válidos`},
      {label:'Abstenção', value:fmt(c.abstention), sub:`${pctFmt(abst)} dos aptos`, warn:true}
    ];
    $('#kpiGrid').innerHTML = kpis.map(k => `<article class="kpi ${k.warn?'kpi--warn':''}"><span>${k.label}</span><strong>${k.value}</strong><small>${k.sub}</small></article>`).join('');

    $('#snapshotKicker').textContent = c.label;
    $('#snapshotTitle').textContent = `Composição do eleitorado — ${year}`;
    $('#snapshotTag').textContent = `${fmt(c.apt)} aptos`;
    $('#donutCenter').textContent = pctFmt(participation);
    const donut = $('#compositionDonut');
    const validShare = pct(c.valid, c.apt);
    const startBlank = validShare;
    const startNull = startBlank + blank;
    const startAbst = startNull + nul;
    donut.style.setProperty('--valid', validShare);
    donut.style.setProperty('--blankEnd', startBlank + blank);
    donut.style.setProperty('--nullEnd', startNull + nul);
    donut.style.setProperty('--abstStart', startAbst);

    const items = [
      ['Válidos', validShare, 'valid'],
      ['Brancos', blank, 'blank'],
      ['Nulos', nul, 'null'],
      ['Abstenções', abst, 'abst']
    ];
    $('#compositionLegend').innerHTML = items.map(([label,v,cls]) => `<div><span><i class="dot dot--${cls}"></i>${label}</span><b>${pctFmt(v)}</b></div>`).join('');

    $$('#yearSwitcher button').forEach(b => b.classList.toggle('active', b.dataset.year === year));
  }

  $('#yearSwitcher').addEventListener('click', e => {
    const b = e.target.closest('button[data-year]');
    if (b) renderSnapshot(b.dataset.year);
  });
  renderSnapshot('2024');

  // vote bars
  const maxVote = Math.max(...data.voteSeries.map(d => d.value));
  $('#votesBarChart').innerHTML = data.voteSeries.map(d => `
    <div class="bar-row">
      <div class="bar-row__label"><span>${d.label}</span><b>${fmt(d.value)}</b></div>
      <div class="bar-track"><i style="width:${(d.value/maxVote*100).toFixed(1)}%"></i></div>
      <small>${d.sub}</small>
    </div>`).join('');

  // timeline
  $('#timeline').innerHTML = data.timeline.map((d,i) => `
    <article class="timeline-item ${i===2?'timeline-item--active':''}">
      <div class="timeline-item__year">${d.year}</div><span class="timeline-item__dot"></span>
      <h3>${d.title}</h3><strong>${d.value}</strong><p>${d.text}</p>
    </article>`).join('');

  // turnout compare
  const compareMetrics = [
    {key:'turnout', label:'Comparecimento'},
    {key:'valid', label:'Votos válidos'},
    {key:'abstention', label:'Abstenção'},
    {key:'blank', label:'Brancos'},
    {key:'nullVotes', label:'Nulos'}
  ];
  $('#turnoutCompare').innerHTML = compareMetrics.map(m => {
    const a = data.cycles['2020'], b = data.cycles['2024'];
    const pa = pct(a[m.key], a.apt), pb = pct(b[m.key], b.apt);
    return `<div class="compare-row"><span class="compare-row__label">${m.label}</span><div class="compare-row__series"><div><b>2020</b><span><i style="width:${pa}%"></i></span><em>${pctFmt(pa)}</em></div><div><b>2024</b><span><i style="width:${pb}%"></i></span><em>${pctFmt(pb)}</em></div></div></div>`;
  }).join('');

  // zones filters
  const profiles = [...new Set(data.zones.map(z => z.profile))].sort((a,b)=>a.localeCompare(b,'pt-BR'));
  $('#profileFilter').innerHTML += profiles.map(p => `<option value="${p}">${p}</option>`).join('');

  function renderZones() {
    const q = $('#zoneSearch').value.trim().toLocaleLowerCase('pt-BR');
    const profile = $('#profileFilter').value;
    const sort = $('#zoneSort').value;
    let zones = data.zones.filter(z => {
      const hay = `${z.label} ${z.profile} ${z.neighborhoods.join(' ')}`.toLocaleLowerCase('pt-BR');
      return (!q || hay.includes(q)) && (profile === 'all' || z.profile === profile);
    });
    zones.sort((a,b) => sort==='electorate-desc' ? b.max-a.max : sort==='electorate-asc' ? a.max-b.max : a.zone-b.zone);
    $('#zoneGrid').innerHTML = zones.map(z => `
      <article class="zone-card">
        <div class="zone-card__head"><strong>${z.label}</strong><span>${z.profile}</span></div>
        <p>${z.neighborhoods.join(' · ')}</p>
        <div class="zone-card__meta"><span><b>${z.min===z.max?fmt(z.max):`${fmt(z.min)}–${fmt(z.max)}`}</b> eleitores</span><span>${z.sections} seções</span></div>
        ${z.highlight?`<small class="zone-card__highlight">${z.highlight}</small>`:''}
      </article>`).join('');
    $('#emptyState').hidden = zones.length > 0;
  }
  ['input','change'].forEach(evt => {
    $('#zoneSearch').addEventListener(evt, renderZones);
    $('#profileFilter').addEventListener(evt, renderZones);
    $('#zoneSort').addEventListener(evt, renderZones);
  });
  renderZones();

  // municipality bars
  const maxMunicipality = Math.max(...data.municipalities2018.map(m => m.pct));
  $('#municipalityBars').innerHTML = data.municipalities2018.map((m,i)=>`
    <div class="rank-row"><span class="rank-row__n">${String(i+1).padStart(2,'0')}</span><div class="rank-row__main"><div><b>${m.name}</b><span>${fmt(m.votes)} votos</span></div><div class="rank-row__bar"><i style="width:${m.pct/maxMunicipality*100}%"></i></div></div><strong>${m.pct.toLocaleString('pt-BR',{minimumFractionDigits:2})}%</strong></div>`).join('');

  // population chart
  const popMax = Math.max(...data.population.flatMap(d => [d.y2022,d.y2026]));
  $('#populationChart').innerHTML = data.population.map(p => `
    <div class="population-row"><div class="population-row__label"><b>${p.place}</b><span>crescimento: ${pctFmt((p.y2026/p.y2022-1)*100)}</span></div><div class="population-bars"><div><span>2022</span><i style="width:${p.y2022/popMax*100}%"></i><b>${fmt(p.y2022)}</b></div><div><span>2026</span><i style="width:${p.y2026/popMax*100}%"></i><b>${fmt(p.y2026)}</b></div></div></div>`).join('');

  // CSV export
  $('#exportCsv').addEventListener('click', () => {
    const rows = [
      ['Ano','Escopo','Aptos','Comparecimento','Válidos','David Almeida','% David válidos','Abstenções','Brancos','Nulos'],
      ...['2018','2020','2024'].map(y => { const c=data.cycles[y]; return [y,c.scope,c.apt,c.turnout,c.valid,c.david,c.davidPctValid,c.abstention,c.blank,c.nullVotes]; })
    ];
    const csv = '\uFEFF' + rows.map(r => r.map(v => `"${String(v).replaceAll('"','""')}"`).join(';')).join('\n');
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href=url; a.download='resumo-eleitoral-2018-2024.csv'; a.click();
    URL.revokeObjectURL(url);
  });

  // reveal animation
  const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('is-visible');obs.unobserve(e.target);}}), {threshold:.08});
  $$('.card,.kpi,.timeline-item,.forecast-card,.forecast-primary').forEach(el => { el.classList.add('reveal'); obs.observe(el); });
})();
