(()=>{
  const A = window.ELECTION_DATA;
  const B = window.ELECTION_2024;
  const E26 = window.ELEITORADO_2026;
  const fmt = new Intl.NumberFormat('pt-BR');
  const pct = n => Number(n).toFixed(2).replace('.', ',') + '%';
  const SVG_NS = 'http://www.w3.org/2000/svg';

  const C2020 = {
    aptos: 1331613,
    comparecimento: 1032901,
    validos: 910717,
    david: 466970,
    share: 51.27,
    abstencoes: 298712,
    brancos: 43232,
    nulos: 78952,
    amazonino: 443747,
    amazoninoShare: 48.73
  };

  const C2026 = {
    aptos: E26.total,
    obrigatorio: E26.obrigatorio,
    obrigatorioShare: E26.obrigatorio / E26.total * 100,
    facultativo: E26.facultativo,
    facultativoShare: E26.facultativo / E26.total * 100,
    manaus: E26.manaus,
    interior: E26.interior
  };

  const E2026 = E26.municipios.map(d => ({ ...d, share: d.aptos / E26.total * 100 }));
  [...E2026].sort((a,b)=>b.aptos-a.aptos).forEach((d,i)=>d.rank=i+1);

  const META = {
    '2018': {
      scope: '<strong>2018 • Governo do Amazonas</strong>62 municípios',
      notice: 'Campanha estadual • primeiro turno. O mapa apresenta os municípios do Amazonas.',
      source: 'Fontes do painel: TSE — Resultados 2018 e IBGE — Malhas territoriais. Votação nominal de David Almeida no primeiro turno.'
    },
    '2020': {
      scope: '<strong>2020 • Prefeitura de Manaus</strong>2º turno • bairros de Manaus',
      notice: 'Campanha municipal • segundo turno. O mapa abaixo carrega os bairros oficiais de Manaus e colore cada bairro pelos indicadores da sua Zona Eleitoral correspondente.',
      source: 'Fontes: TSE — totalização oficial do 2º turno de Manaus em 2020; geometria de bairros: SEMEF/IPAAM.'
    },
    '2024': {
      scope: '<strong>2024 • Prefeitura de Manaus</strong>2º turno • bairros de Manaus',
      notice: 'Campanha municipal • segundo turno. O mapa abaixo carrega os bairros oficiais de Manaus e aplica os dados oficiais do 2º turno de 2024 por Zona Eleitoral.',
      source: 'Fontes: Tribunal Superior Eleitoral (TSE) — 2º turno de Manaus em 2024; geometria de bairros: SEMEF/IPAAM.'
    },
    '2026': {
      scope: '<strong>2026 • Amazonas</strong>2.801.182 eleitores • 62 municípios',
      notice: 'Eleitorado oficial das Eleições 2026. O mapa apresenta os municípios do Amazonas e o número de eleitores de cada município.',
      source: 'Eleitorado 2026: Tribunal Superior Eleitoral (TSE) — Sistema ELO / Estatísticas Eleitorais.'
    }
  };

  const ZONE_INFO = [
    { zone: 1, profile: 'Centro / Sul', neighborhoods: ['Adrianópolis','Cachoeirinha','Centro','Nossa Senhora Aparecida','Nossa Senhora das Graças','Praça 14 de Janeiro','Raiz','São Geraldo','Presidente Vargas'] },
    { zone: 2, profile: 'Centro-Sul', neighborhoods: ['Aleixo','Flores','Parque 10 de Novembro','Chapada'] },
    { zone: 31, profile: 'Sul', neighborhoods: ['Betânia','Colônia Oliveira Machado','Crespo','Educandos','Mauazinho','Morro da Liberdade','Santa Luzia','Vila Buriti','Distrito Industrial I','Distrito Industrial II'] },
    { zone: 32, profile: 'Oeste', neighborhoods: ['Compensa','Glória','Santo Antônio','São Jorge','Vila da Prata'] },
    { zone: 37, profile: 'Sul / Centro-Sul', neighborhoods: ['Japiim','Petrópolis','São Francisco'] },
    { zone: 40, profile: 'Centro-Oeste', neighborhoods: ['Alvorada','Dom Pedro','Dom Pedro I','Dom Pedro II','Lírio do Vale','Nova Esperança','Santo Agostinho'] },
    { zone: 58, profile: 'Norte', neighborhoods: ['Cidade Nova','Colônia Santo Antônio','Novo Israel'] },
    { zone: 59, profile: 'Leste', neighborhoods: ['Armando Mendes','Colônia Antônio Aleixo','Coroado','Zumbi dos Palmares'] },
    { zone: 62, profile: 'Norte / Oeste', neighborhoods: ['Lago Azul','Paz','Da Paz','Planalto','Redenção','Santa Etelvina','Tarumã','Tarumã-Açu'] },
    { zone: 63, profile: 'Leste', neighborhoods: ['Gilberto Mestrinho','São José Operário','Tancredo Neves'] },
    { zone: 65, profile: 'Norte', neighborhoods: ['Colônia Terra Nova','Monte das Oliveiras','Nova Cidade'] },
    { zone: 68, profile: 'Leste', neighborhoods: ['Jorge Teixeira','Puraquequara'] },
    { zone: 70, profile: 'Norte', neighborhoods: ['Cidade de Deus','Novo Aleixo'] }
  ];

  const Z2020 = {
    1: { zone:1, david:28733, opponent:35046, opponentName:'Amazonino Mendes', winner:'Amazonino Mendes' },
    2: { zone:2, david:25454, opponent:29419, opponentName:'Amazonino Mendes', winner:'Amazonino Mendes' },
    31:{ zone:31, david:31901, opponent:23050, opponentName:'Amazonino Mendes', winner:'David Almeida' },
    32:{ zone:32, david:39825, opponent:40591, opponentName:'Amazonino Mendes', winner:'Amazonino Mendes' },
    37:{ zone:37, david:32819, opponent:30254, opponentName:'Amazonino Mendes', winner:'David Almeida' },
    40:{ zone:40, david:39819, opponent:40447, opponentName:'Amazonino Mendes', winner:'Amazonino Mendes' },
    58:{ zone:58, david:39356, opponent:36110, opponentName:'Amazonino Mendes', winner:'David Almeida' },
    59:{ zone:59, david:36212, opponent:33088, opponentName:'Amazonino Mendes', winner:'David Almeida' },
    62:{ zone:62, david:40572, opponent:40935, opponentName:'Amazonino Mendes', winner:'Amazonino Mendes' },
    63:{ zone:63, david:46344, opponent:38627, opponentName:'Amazonino Mendes', winner:'David Almeida' },
    65:{ zone:65, david:39829, opponent:35886, opponentName:'Amazonino Mendes', winner:'David Almeida' },
    68:{ zone:68, david:30986, opponent:25777, opponentName:'Amazonino Mendes', winner:'David Almeida' },
    70:{ zone:70, david:35120, opponent:34513, opponentName:'Amazonino Mendes', winner:'David Almeida' }
  };
  Object.values(Z2020).forEach(d => {
    d.validos = d.david + d.opponent;
    d.share = d.david / d.validos * 100;
    d.opponentShare = d.opponent / d.validos * 100;
    d.diff = Math.abs(d.david - d.opponent);
  });

  const Z2024 = {};
  B.zonas.forEach(z => {
    Z2024[z.zona] = {
      zone: z.zona,
      aptos: z.aptos,
      validos: z.validos,
      david: z.david,
      opponent: z.alberto,
      opponentName: 'Capitão Alberto Neto',
      winner: z.vencedor,
      share: z.share,
      opponentShare: z.albertoShare,
      diff: Math.abs(z.david - z.alberto)
    };
  });

  function normalize(str=''){
    return str.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .replace(/[^a-z0-9]+/g,' ')
      .trim();
  }

  const aliases = {
    'bairro da paz':'da paz',
    'nossa sra aparecida':'nossa senhora aparecida',
    'nossa sra das gracas':'nossa senhora das gracas',
    'praca 14':'praca 14 de janeiro',
    'colonia ant aleixo':'colonia antonio aleixo',
    's jose operario':'sao jose operario',
    'ns das gracas':'nossa senhora das gracas',
    'ns aparecida':'nossa senhora aparecida',
    'santo agostinho':'santo agostinho',
    'dom pedro i':'dom pedro',
    'dom pedro ii':'dom pedro'
  };

  const zoneByBairro = new Map();
  const profileByZone = new Map();
  ZONE_INFO.forEach(z => {
    profileByZone.set(z.zone, z.profile);
    z.neighborhoods.forEach(n => zoneByBairro.set(normalize(n), z.zone));
  });

  function zoneForBairro(name){
    const n = normalize(name);
    if(zoneByBairro.has(n)) return zoneByBairro.get(n);
    if(aliases[n] && zoneByBairro.has(normalize(aliases[n]))) return zoneByBairro.get(normalize(aliases[n]));
    for(const [key, zone] of zoneByBairro.entries()){
      if(n === key || n.includes(key) || key.includes(n)) return zone;
    }
    return null;
  }

  const dom = {
    svg: document.querySelector('#map svg'),
    tip: document.querySelector('#tooltip'),
    detail: document.querySelector('#detail'),
    story: document.querySelector('#campaignStory'),
    explorer: document.querySelector('#territorialExplorer'),
    source: document.querySelector('#source')
  };

  let year = '2018';
  let metric = 'david';
  let query = '';
  let currentSelection = null;
  let manausLoaded = false;
  let manausError = null;
  let manausRows = [];
  let manausLookup2020 = new Map();
  let manausLookup2024 = new Map();

  const byCode = new Map(A.municipios.map(d=>[d.code,d]));
  const byCode2026 = new Map(E2026.map(d=>[d.code,d]));

  const pts=[];
  A.geo.features.forEach(f=>f.geometry.coordinates.forEach(p=>{ const rs=f.geometry.type==='Polygon'?[p]:p; rs.forEach(r=>r.forEach(x=>pts.push(x))); }));
  const xs=pts.map(p=>p[0]), ys=pts.map(p=>p[1]);
  const x0=Math.min(...xs), x1=Math.max(...xs), y0=Math.min(...ys), y1=Math.max(...ys);
  const W=900, H=720, pad=24;
  const sc=Math.min((W-2*pad)/(x1-x0),(H-2*pad)/(y1-y0));
  const xy=p=>[pad+(p[0]-x0)*sc,H-pad-(p[1]-y0)*sc];
  const ring=r=>r.map((p,i)=>{ const q=xy(p); return (i?'L':'M')+q[0].toFixed(1)+','+q[1].toFixed(1); }).join('')+'Z';
  const pathAmazonas=f=>f.geometry.type==='Polygon'?f.geometry.coordinates.map(ring).join(''):f.geometry.coordinates.map(p=>p.map(ring).join('')).join('');
  dom.svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

  const gAmazonas = document.createElementNS(SVG_NS,'g');
  const gManaus = document.createElementNS(SVG_NS,'g');
  dom.svg.appendChild(gAmazonas);
  dom.svg.appendChild(gManaus);

  A.geo.features.forEach(f=>{
    const e=document.createElementNS(SVG_NS,'path');
    e.setAttribute('d',pathAmazonas(f));
    e.setAttribute('class','municipality amazonas-shape');
    e.dataset.code=f.properties.code;
    gAmazonas.appendChild(e);
    e.onclick=()=>select(year==='2026'?byCode2026.get(e.dataset.code):byCode.get(e.dataset.code));
    e.onpointermove=v=>showTip(v,year==='2026'?byCode2026.get(e.dataset.code):byCode.get(e.dataset.code));
    e.onpointerleave=()=>dom.tip.style.display='none';
  });

  const GEO_URL = 'https://gis.ipaam.am.gov.br/server/rest/services/01_Publicacoes_MPF/bairros_manaus_semef/MapServer/0/query?where=1%3D1&outFields=nome&returnGeometry=true&f=geojson';

  function projectManaus(geo){
    const features = geo.features || [];
    const allPts=[];
    features.forEach(f=>collectCoords(f.geometry, allPts));
    const xs=allPts.map(p=>p[0]), ys=allPts.map(p=>p[1]);
    const x0=Math.min(...xs), x1=Math.max(...xs), y0=Math.min(...ys), y1=Math.max(...ys);
    const pad=16, W=900, H=720;
    const scale=Math.min((W-2*pad)/(x1-x0),(H-2*pad)/(y1-y0));
    const proj = p => [pad+(p[0]-x0)*scale, H-pad-(p[1]-y0)*scale];
    const ring = r => r.map((p,i)=>{ const q=proj(p); return (i?'L':'M')+q[0].toFixed(1)+','+q[1].toFixed(1); }).join('')+'Z';
    const geomPath = geom => {
      if(geom.type === 'Polygon') return geom.coordinates.map(ring).join('');
      if(geom.type === 'MultiPolygon') return geom.coordinates.map(poly=>poly.map(ring).join('')).join('');
      return '';
    };
    return { features, geomPath };
  }

  function collectCoords(geom, out){
    if(!geom) return;
    if(geom.type === 'Polygon') geom.coordinates.forEach(r=>r.forEach(p=>out.push(p)));
    if(geom.type === 'MultiPolygon') geom.coordinates.forEach(poly=>poly.forEach(r=>r.forEach(p=>out.push(p))));
  }

  async function ensureManaus(){
    if(manausLoaded || manausError) return;
    try {
      const res = await fetch(GEO_URL, { mode:'cors' });
      if(!res.ok) throw new Error('Falha ao carregar bairros de Manaus');
      const geo = await res.json();
      buildManausFromGeoJSON(geo);
      manausLoaded = true;
    } catch(err){
      manausError = err;
      console.error(err);
    }
  }

  function buildManausFromGeoJSON(geo){
    gManaus.innerHTML = '';
    const { features, geomPath } = projectManaus(geo);

    const outline = document.createElementNS(SVG_NS,'g');
    outline.setAttribute('opacity', '0.25');
    gManaus.appendChild(outline);

    manausRows = features.map((f, idx) => {
      const name = (f.properties && (f.properties.nome || f.properties.NOME || f.properties.name)) || `Bairro ${idx+1}`;
      const zone = zoneForBairro(name);
      const d20 = zone ? Z2020[zone] : null;
      const d24 = zone ? Z2024[zone] : null;
      const base = {
        id: `bairro-${idx}`,
        name,
        zone,
        profile: zone ? (profileByZone.get(zone) || '') : 'Zona não mapeada'
      };
      const row20 = { ...base, year:'2020', aptos: d20?.aptos || null, validos: d20?.validos || null, david: d20?.david || null, opponent: d20?.opponent || null, opponentName: d20?.opponentName || '—', winner: d20?.winner || '—', share: d20?.share || null, opponentShare: d20?.opponentShare || null, diff: d20?.diff || null };
      const row24 = { ...base, year:'2024', aptos: d24?.aptos || null, validos: d24?.validos || null, david: d24?.david || null, opponent: d24?.opponent || null, opponentName: d24?.opponentName || '—', winner: d24?.winner || '—', share: d24?.share || null, opponentShare: d24?.opponentShare || null, diff: d24?.diff || null };
      manausLookup2020.set(base.id, row20);
      manausLookup2024.set(base.id, row24);

      const p = document.createElementNS(SVG_NS,'path');
      p.setAttribute('d', geomPath(f.geometry));
      p.setAttribute('class','municipality manaus-bairro');
      p.dataset.id = base.id;
      gManaus.appendChild(p);

      p.onclick = () => select(year==='2020' ? manausLookup2020.get(base.id) : manausLookup2024.get(base.id));
      p.onpointermove = ev => showTip(ev, year==='2020' ? manausLookup2020.get(base.id) : manausLookup2024.get(base.id));
      p.onpointerleave = () => dom.tip.style.display='none';

      return { base, row20, row24 };
    });
  }

  function currentCards(){
    if(year==='2018'){
      const s=A.state;
      return [['Eleitores aptos',fmt.format(s.aptos),'100% da base'],['Votantes',fmt.format(s.comparecimento),pct(s.turnout)+' de comparecimento'],['Votos válidos',fmt.format(s.validos),pct(s.validos/s.comparecimento*100)+' dos votantes'],['Votação nominal',fmt.format(s.david),pct(s.share)+' dos válidos'],['Abstenção',fmt.format(s.aptos-s.comparecimento),pct(s.abstencao)]];
    }
    if(year==='2020'){
      return [['Eleitores aptos',fmt.format(C2020.aptos),'2º turno'],['Comparecimento',fmt.format(C2020.comparecimento),'77,57% do eleitorado'],['Votos válidos',fmt.format(C2020.validos),'88,17% dos votantes'],['David Almeida',fmt.format(C2020.david),'51,27% dos válidos'],['Abstenções',fmt.format(C2020.abstencoes),'22,43% do eleitorado']];
    }
    if(year==='2024'){
      const s=B.state;
      return [['Eleitores aptos',fmt.format(s.aptos),'100% da base'],['Votantes',fmt.format(s.comparecimento),pct(s.turnout)+' de comparecimento'],['Votos válidos',fmt.format(s.validos),pct(s.validos/s.comparecimento*100)+' dos votantes'],['David Almeida',fmt.format(s.david),pct(s.share)+' dos válidos'],['Abstenção',fmt.format(s.aptos-s.comparecimento),pct(s.abstencao)]];
    }
    return [['Eleitores aptos',fmt.format(C2026.aptos),'base oficial TSE 2026'],['Voto obrigatório',fmt.format(C2026.obrigatorio),pct(C2026.obrigatorioShare)+' do eleitorado'],['Voto facultativo',fmt.format(C2026.facultativo),pct(C2026.facultativoShare)+' do eleitorado'],['Manaus',fmt.format(C2026.manaus),pct(C2026.manaus/C2026.aptos*100)+' do estado'],['Interior',fmt.format(C2026.interior),pct(C2026.interior/C2026.aptos*100)+' do estado']];
  }

  function cards(){
    document.querySelector('#cards').innerHTML = currentCards().map(x => `<article class="card"><span>${x[0]}</span><strong>${x[1]}</strong><small>${x[2]}</small></article>`).join('');
  }

  function renderDetail(d){
    if(!d){
      dom.detail.innerHTML = '<div class="eyebrow">Detalhamento</div><h3>Selecione uma localidade</h3><p class="sub">Os campos abaixo mudam conforme o ciclo eleitoral selecionado.</p>';
      return;
    }
    if(year==='2018'){
      dom.detail.innerHTML = `<div class="eyebrow">2018 • primeiro turno</div><h3>${d.name}</h3><div class="metrics"><div class="metric"><span>Eleitores aptos</span><strong>${fmt.format(d.aptos)}</strong></div><div class="metric"><span>Votantes</span><strong>${fmt.format(d.comparecimento)}</strong></div><div class="metric"><span>Votos válidos</span><strong>${fmt.format(d.validos)}</strong></div><div class="metric"><span>Votação nominal</span><strong>${fmt.format(d.david)}</strong></div><div class="metric"><span>% dos válidos</span><strong>${pct(d.share)}</strong></div><div class="metric"><span>Abstenção</span><strong>${pct(d.abstencao)}</strong></div></div>`;
      return;
    }
    if(year==='2026'){
      dom.detail.innerHTML = `<div class="eyebrow">2026 • eleitorado oficial TSE</div><h3>${d.name}</h3><div class="metrics"><div class="metric"><span>Eleitores aptos</span><strong>${fmt.format(d.aptos)}</strong></div><div class="metric"><span>% do estado</span><strong>${pct(d.share)}</strong></div><div class="metric"><span>Ranking</span><strong>${d.rank}º</strong></div></div>`;
      return;
    }
    const david = d.david == null ? '—' : fmt.format(d.david);
    const opp = d.opponent == null ? '—' : fmt.format(d.opponent);
    const val = d.validos == null ? '—' : fmt.format(d.validos);
    const share = d.share == null ? '—' : pct(d.share);
    const oppShare = d.opponentShare == null ? '—' : pct(d.opponentShare);
    const diff = d.diff == null ? '—' : fmt.format(d.diff);
    const zone = d.zone ? `${d.zone}ª Zona Eleitoral` : 'Zona não identificada';
    dom.detail.innerHTML = `<div class="eyebrow">${year} • campanha municipal</div><h3>${d.name}</h3><p class="sub">${zone} • ${d.profile || ''}</p><div class="metrics"><div class="metric"><span>Votos válidos</span><strong>${val}</strong></div><div class="metric"><span>David Almeida</span><strong>${david}</strong><small>${share}</small></div><div class="metric"><span>${d.opponentName || 'Adversário'}</span><strong>${opp}</strong><small>${oppShare}</small></div><div class="metric"><span>Vencedor</span><strong>${d.winner || '—'}</strong></div><div class="metric"><span>Diferença</span><strong>${diff}</strong></div></div><p class="story-note">Indicadores herdados da Zona Eleitoral correspondente ao bairro.</p>`;
  }

  function showTip(e,d){
    if(!d) return;
    if(year==='2018'){
      dom.tip.innerHTML = `<b>${d.name}</b><div class="tipgrid"><span>Aptos</span><strong>${fmt.format(d.aptos)}</strong><span>Votação</span><strong>${fmt.format(d.david)} · ${pct(d.share)}</strong></div>`;
    } else if(year==='2026'){
      dom.tip.innerHTML = `<b>${d.name}</b><div class="tipgrid"><span>Eleitores 2026</span><strong>${fmt.format(d.aptos)}</strong><span>% do estado</span><strong>${pct(d.share)}</strong></div>`;
    } else {
      dom.tip.innerHTML = `<b>${d.name}</b><div class="tipgrid"><span>Zona</span><strong>${d.zone ? d.zone+'ª ZE' : '—'}</strong><span>David</span><strong>${d.david == null ? '—' : fmt.format(d.david)}${d.share == null ? '' : ' · ' + pct(d.share)}</strong><span>${d.opponentName}</span><strong>${d.opponent == null ? '—' : fmt.format(d.opponent)}${d.opponentShare == null ? '' : ' · ' + pct(d.opponentShare)}</strong></div>`;
    }
    const b = document.querySelector('#map').getBoundingClientRect();
    dom.tip.style.display='block';
    dom.tip.style.left=Math.min(e.clientX-b.left+14,b.width-260)+'px';
    dom.tip.style.top=Math.min(e.clientY-b.top+14,b.height-160)+'px';
  }

  function rowsForYear(){
    if(year==='2018') return A.municipios.filter(d=>d.name.toLowerCase().includes(query));
    if(year==='2026') return E2026.filter(d=>d.name.toLowerCase().includes(query)).sort((a,b)=>b.aptos-a.aptos);
    const list = year==='2020' ? Array.from(manausLookup2020.values()) : Array.from(manausLookup2024.values());
    return list.filter(d => d.name.toLowerCase().includes(query) || String(d.zone || '').includes(query.replace(/\D/g,''))).sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));
  }

  function table(rows){
    const head = document.querySelector('#territorialExplorer thead tr');
    if(year==='2018'){
      head.innerHTML = '<th>Município</th><th class="num">Aptos</th><th class="num">Válidos</th><th class="num">Votação</th><th class="num">%</th>';
      document.querySelector('#tbody').innerHTML = rows.map(d=>`<tr data-id="${d.code}"><td>${d.name}</td><td class="num">${fmt.format(d.aptos)}</td><td class="num">${fmt.format(d.validos)}</td><td class="num">${fmt.format(d.david)}</td><td class="num">${pct(d.share)}</td></tr>`).join('');
    } else if(year==='2026'){
      head.innerHTML = '<th>Município</th><th class="num">Eleitores 2026</th><th class="num">% do estado</th><th class="num">Ranking</th>';
      document.querySelector('#tbody').innerHTML = rows.map(d=>`<tr data-id="${d.code}"><td>${d.name}</td><td class="num">${fmt.format(d.aptos)}</td><td class="num">${pct(d.share)}</td><td class="num">${d.rank}º</td></tr>`).join('');
    } else {
      head.innerHTML = '<th>Bairro</th><th class="num">ZE</th><th class="num">David</th><th class="num">Adversário</th><th class="num">% David</th>';
      document.querySelector('#tbody').innerHTML = rows.map(d=>`<tr data-id="${d.id}"><td>${d.name}</td><td class="num">${d.zone ? d.zone+'ª' : '—'}</td><td class="num">${d.david == null ? '—' : fmt.format(d.david)}</td><td class="num">${d.opponent == null ? '—' : fmt.format(d.opponent)}</td><td class="num">${d.share == null ? '—' : pct(d.share)}</td></tr>`).join('');
    }
    document.querySelectorAll('#tbody tr[data-id]').forEach(r=>r.onclick=()=>{
      const id = r.dataset.id;
      if(year==='2018') select(byCode.get(id));
      else if(year==='2026') select(byCode2026.get(id));
      else if(year==='2020') select(manausLookup2020.get(id));
      else select(manausLookup2024.get(id));
    });
  }

  function select(d){
    currentSelection = d || null;
    renderDetail(d);
    document.querySelectorAll('.municipality').forEach(e=>e.classList.remove('active'));
    if(!d) return;
    if(year==='2018' || year==='2026'){
      document.querySelectorAll('.amazonas-shape').forEach(e=>e.classList.toggle('active', e.dataset.code===d.code));
    } else {
      document.querySelectorAll('.manaus-bairro').forEach(e=>e.classList.toggle('active', e.dataset.id===d.id));
    }
  }

  function color(t){
    t=Math.max(0,Math.min(1,t));
    const a=t<.5?[18,54,44]:[232,169,76], b=t<.5?[232,169,76]:[255,106,22], u=t<.5?t*2:(t-.5)*2;
    return `rgb(${a.map((v,i)=>Math.round(v+(b[i]-v)*u)).join(',')})`;
  }

  function renderAmazonasMap(rows){
    gAmazonas.style.display = '';
    gManaus.style.display = 'none';
    if(year==='2018'){
      const vals = rows.map(d=>d[metric]);
      const mn = Math.min(...vals), mx = Math.max(...vals);
      document.querySelectorAll('.amazonas-shape').forEach(e=>{
        const d = byCode.get(e.dataset.code), ok = rows.includes(d);
        e.classList.toggle('dim', !ok);
        e.style.fill = ok ? color((d[metric]-mn)/(mx-mn||1)) : '#183028';
      });
    } else {
      const logs = E2026.map(d=>Math.log1p(d.aptos));
      const mn = Math.min(...logs), mx = Math.max(...logs);
      document.querySelectorAll('.amazonas-shape').forEach(e=>{
        const d = byCode2026.get(e.dataset.code), ok = rows.includes(d);
        e.classList.toggle('dim', !ok);
        e.style.fill = ok ? color((Math.log1p(d.aptos)-mn)/(mx-mn||1)) : '#183028';
      });
    }
  }

  function renderManausMap(rows){
    gAmazonas.style.display = 'none';
    gManaus.style.display = '';
    const all = year==='2020' ? Array.from(manausLookup2020.values()) : Array.from(manausLookup2024.values());
    const shares = all.map(d=>d.share).filter(v=>v != null);
    const mn = Math.min(...shares), mx = Math.max(...shares);
    const visible = new Set(rows.map(d=>d.id));
    document.querySelectorAll('.manaus-bairro').forEach(el=>{
      const d = year==='2020' ? manausLookup2020.get(el.dataset.id) : manausLookup2024.get(el.dataset.id);
      const ok = visible.has(el.dataset.id);
      const unknown = d && d.share == null;
      el.classList.toggle('dim', !ok);
      el.style.display = '';
      el.style.fill = !ok ? '#183028' : unknown ? 'rgba(106,126,117,.6)' : color((d.share-mn)/(mx-mn||1));
    });
  }

  function story2020(){
    return `<div class="story-grid"><article class="panel story-card"><div class="story-kicker">2020 • 2º turno</div><h2>Vitória em Manaus</h2><p>David Almeida venceu Amazonino Mendes e conquistou a Prefeitura de Manaus.</p><div class="result-list"><div class="result-row primary"><span>David Almeida • Avante</span><b>466.970</b><em>51,27%</em></div><div class="result-row"><span>Amazonino Mendes • Podemos</span><b>443.747</b><em>48,73%</em></div></div><div class="story-metrics"><div class="story-metric"><span>Diferença</span><strong>23.223 votos</strong></div><div class="story-metric"><span>Abstenções</span><strong>298.712</strong></div><div class="story-metric"><span>Brancos + nulos</span><strong>122.184</strong></div></div></article><article class="panel story-card"><div class="story-kicker">Mapa oficial de bairros</div><h2>Campanha municipal em Manaus</h2><p>Nesta versão, o mapa da campanha municipal passou a usar a malha oficial dos bairros de Manaus, em vez do mapa do Amazonas.</p></article></div>`;
  }

  function story2026(){
    return `<div class="story-grid"><article class="panel story-card"><div class="story-kicker">2026 • base oficial TSE</div><h2>2.801.182 eleitores no Amazonas</h2><p>Os indicadores demográficos foram atualizados com os quantitativos exatos da base eleitoral de 2026 do TSE.</p><div class="story-metrics"><div class="story-metric"><span>Eleitores aptos</span><strong>${fmt.format(C2026.aptos)}</strong></div><div class="story-metric"><span>Manaus</span><strong>${fmt.format(C2026.manaus)}</strong></div><div class="story-metric"><span>Interior</span><strong>${fmt.format(C2026.interior)}</strong></div></div></article></div>`;
  }

  function renderStory(){
    dom.story.innerHTML = year==='2020' ? story2020() : year==='2026' ? story2026() : '';
  }

  async function render(){
    cards();
    const meta = META[year];
    document.querySelector('#scope').innerHTML = meta.scope;
    document.querySelector('#notice').textContent = meta.notice;
    dom.source.innerHTML = '<strong>Base:</strong> ' + meta.source + (year==='2026' ? ` <a href="${E26.fonteUrl}" target="_blank" rel="noopener">Consultar TSE</a>.` : year==='2024' ? ' <a href="https://www.tse.jus.br/comunicacao/noticias/2024/Outubro/david-almeida-e-eleito-prefeito-de-manaus-am" target="_blank" rel="noopener">Consultar TSE</a>.' : year==='2020' ? ' <a href="relatorio.html">Ver referências do relatório</a>.' : ' <a href="relatorio.html">Ler relatório completo</a>.');

    dom.explorer.classList.remove('hidden');
    dom.story.classList.toggle('hidden', !(year==='2020'||year==='2026'));
    if(!dom.story.classList.contains('hidden')) renderStory();

    const is18 = year==='2018';
    const is26 = year==='2026';
    const isMunicipal = year==='2020' || year==='2024';

    document.querySelector('#metricField').classList.toggle('hidden', !is18);
    document.querySelector('#search').placeholder = isMunicipal ? 'Buscar bairro ou zona' : 'Buscar município';
    document.querySelector('#visualTitle').textContent = is18 ? 'Mapa municipal — 2018' : is26 ? 'Mapa do eleitorado municipal — 2026' : `Mapa de Manaus por bairros — ${year}`;
    document.querySelector('#visualSub').textContent = is18 ? 'Clique em um município para visualizar seus dados' : is26 ? 'Eleitores aptos por município • clique para ver o quantitativo exato' : 'Bairros oficiais de Manaus • campanha municipal';
    document.querySelector('#tableTitle').textContent = isMunicipal ? 'Bairros de Manaus' : is26 ? 'Eleitorado por município' : 'Municípios';
    document.querySelector('#zonegrid').style.display = 'none';
    document.querySelector('#map').classList.remove('hidden');
    document.querySelector('#legend').classList.remove('hidden');
    const legendSpans = document.querySelectorAll('#legend span');
    if(legendSpans.length===2){
      legendSpans[0].textContent = is26 ? 'menor eleitorado' : is18 ? 'menor valor' : 'menor % David';
      legendSpans[1].textContent = is26 ? 'maior eleitorado' : is18 ? 'maior valor' : 'maior % David';
    }

    if(isMunicipal){
      if(!manausLoaded && !manausError){
        document.querySelector('#tbody').innerHTML = '<tr><td colspan="5">Carregando bairros oficiais de Manaus...</td></tr>';
        await ensureManaus();
      }
      if(manausError){
        document.querySelector('#tbody').innerHTML = '<tr><td colspan="5">Não foi possível carregar a malha oficial dos bairros de Manaus. Verifique a conexão.</td></tr>';
        renderDetail(null);
        return;
      }
    }

    const rows = rowsForYear();
    table(rows);
    if(is18 || is26) renderAmazonasMap(rows); else renderManausMap(rows);

    if(currentSelection){
      if((is18||is26) && currentSelection.code) select(currentSelection);
      else if(isMunicipal && currentSelection.year === year) select(currentSelection);
      else renderDetail(null);
    } else {
      renderDetail(null);
      document.querySelectorAll('.municipality').forEach(e=>e.classList.remove('active'));
    }
  }

  document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{
    year = b.dataset.year;
    query = '';
    currentSelection = null;
    document.querySelector('#search').value = '';
    document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active', x===b));
    render();
  });
  document.querySelector('#metric').onchange = e => { metric = e.target.value; currentSelection = null; render(); };
  document.querySelector('#search').oninput = e => { query = e.target.value.trim().toLowerCase(); render(); };

  renderDetail(null);
  render();
})();
