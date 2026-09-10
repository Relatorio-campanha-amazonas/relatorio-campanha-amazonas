(()=>{
  const A = window.ELECTION_DATA;
  const B = window.ELECTION_2024;
  const E26 = window.ELEITORADO_2026;
  const fmt = new Intl.NumberFormat('pt-BR');
  const pct = n => Number(n).toFixed(2).replace('.', ',') + '%';

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
    amazoninoShare: 48.73,
    zonas: 8,
    totalZonas: 13
  };

  const C2026 = {
    aptos: E26.total,
    crescimento: E26.crescimento,
    obrigatorio: E26.obrigatorio,
    obrigatorioShare: E26.obrigatorio / E26.total * 100,
    facultativo: E26.facultativo,
    facultativoShare: E26.facultativo / E26.total * 100,
    baseManaus2024: 576171,
    manaus: E26.manaus,
    interior: E26.interior
  };

  const E2026 = E26.municipios.map(d => ({ ...d, share: d.aptos / E26.total * 100 }));
  [...E2026].sort((a,b)=>b.aptos-a.aptos).forEach((d,i)=>d.rank=i+1);

  const META = {
    '2018': {
      scope: '<strong>2018 • Governo do Amazonas</strong>62 municípios',
      notice: 'Campanha estadual • primeiro turno. O explorador territorial apresenta o desempenho municipal de David Almeida no Amazonas.',
      source: 'Fontes do painel: TSE — Resultados 2018 e IBGE — Malhas territoriais. Votação nominal de David Almeida no primeiro turno.'
    },
    '2020': {
      scope: '<strong>2020 • Prefeitura de Manaus</strong>2º turno • bairros agrupados por ZE',
      notice: 'Campanha municipal • segundo turno. O mapa abaixo separa Manaus por bairros, preservando o estilo do painel. Como a totalização disponível nesta versão está organizada por Zona Eleitoral, cada bairro herda os indicadores da respectiva ZE.',
      source: 'Fonte desta seção: TSE — totalização oficial do 2º turno de Manaus em 2020; distribuição territorial por Zona Eleitoral conforme o relatório e os dados consolidados por zona utilizados na análise.'
    },
    '2024': {
      scope: '<strong>2024 • Prefeitura de Manaus</strong>2º turno • bairros agrupados por ZE',
      notice: 'Campanha municipal • segundo turno. O mapa abaixo separa Manaus por bairros. Cada bairro carrega os indicadores oficiais da sua respectiva Zona Eleitoral no 2º turno de 2024.',
      source: 'Fonte: Tribunal Superior Eleitoral (TSE) — totalização oficial do 2º turno de Manaus em 2024. David Almeida: 576.171 votos (54,59%); Capitão Alberto Neto: 479.297 (45,41%).'
    },
    '2026': {
      scope: '<strong>2026 • Amazonas</strong>2.801.182 eleitores • 62 municípios',
      notice: 'Eleitorado oficial das Eleições 2026. O mapa municipal e os quantitativos de voto obrigatório/facultativo usam a base 2026 do TSE; as leituras de cenário e estratégia permanecem prospectivas, conforme o relatório.',
      source: 'Eleitorado 2026: Tribunal Superior Eleitoral (TSE) — Sistema ELO / Estatísticas Eleitorais. Análise estratégica: Relatório Analítico e Estratégico de Conjuntura Político-Eleitoral.'
    }
  };

  const ZONE_INFO = [
    { zone: 1, profile: 'Centro / Sul', neighborhoods: ['Adrianópolis','Cachoeirinha','Centro','Nossa Senhora Aparecida','Nossa Senhora das Graças','Praça 14 de Janeiro','Raiz','São Geraldo'] },
    { zone: 2, profile: 'Centro-Sul', neighborhoods: ['Aleixo','Flores','Parque 10 de Novembro'] },
    { zone: 31, profile: 'Sul', neighborhoods: ['Betânia','Colônia Oliveira Machado','Crespo','Educandos','Mauazinho','Morro da Liberdade','Santa Luzia','Vila Buriti'] },
    { zone: 32, profile: 'Oeste', neighborhoods: ['Compensa','Glória','Santo Antônio','São Jorge','Vila da Prata'] },
    { zone: 37, profile: 'Sul / Centro-Sul', neighborhoods: ['Japiim','Petrópolis','São Francisco'] },
    { zone: 40, profile: 'Centro-Oeste', neighborhoods: ['Alvorada','Dom Pedro','Lírio do Vale','Nova Esperança','Santo Agostinho','Zona Rural Centro-Oeste'] },
    { zone: 58, profile: 'Norte', neighborhoods: ['Cidade Nova','Colônia Santo Antônio','Novo Israel'] },
    { zone: 59, profile: 'Leste', neighborhoods: ['Armando Mendes','Colônia Antônio Aleixo','Coroado','Zumbi dos Palmares'] },
    { zone: 62, profile: 'Norte / Oeste', neighborhoods: ['Lago Azul','Paz','Planalto','Redenção','Santa Etelvina','Tarumã','Tarumã-Açu','Zona Rural Oeste'] },
    { zone: 63, profile: 'Leste', neighborhoods: ['Gilberto Mestrinho','São José Operário','Tancredo Neves'] },
    { zone: 65, profile: 'Norte', neighborhoods: ['Colônia Terra Nova','Monte das Oliveiras','Nova Cidade'] },
    { zone: 68, profile: 'Leste (Extrema)', neighborhoods: ['Jorge Teixeira','Puraquequara','Zona Rural Leste'] },
    { zone: 70, profile: 'Norte', neighborhoods: ['Cidade de Deus','Novo Aleixo'] }
  ];

  const ZONE_LAYOUT = {
    58: { x: 455, y: 152 },
    65: { x: 562, y: 205 },
    70: { x: 640, y: 175 },
    62: { x: 334, y: 214 },
    32: { x: 214, y: 364 },
    40: { x: 355, y: 346 },
    59: { x: 668, y: 334 },
    63: { x: 586, y: 402 },
    68: { x: 754, y: 434 },
    1:  { x: 418, y: 548 },
    2:  { x: 544, y: 510 },
    37: { x: 530, y: 596 },
    31: { x: 388, y: 644 }
  };

  const TILE_OFFSETS = {
    2: [[0,0],[1,0],[0,1]],
    3: [[0,0],[1,0],[0,1]],
    4: [[0,0],[1,0],[0,1],[1,1]],
    5: [[0,0],[1,0],[2,0],[0,1],[1,1]],
    6: [[0,0],[1,0],[2,0],[0,1],[1,1],[2,1]],
    8: [[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0.5,2],[1.5,2]]
  };

  const Z2020 = {
    1: { zone:1, david:28733, opponent:35046, opponentName:'Amazonino Mendes', winner:'Amazonino Mendes' },
    2: { zone:2, david:25454, opponent:29419, opponentName:'Amazonino Mendes', winner:'Amazonino Mendes' },
    31: { zone:31, david:31901, opponent:23050, opponentName:'Amazonino Mendes', winner:'David Almeida' },
    32: { zone:32, david:39825, opponent:40591, opponentName:'Amazonino Mendes', winner:'Amazonino Mendes' },
    37: { zone:37, david:32819, opponent:30254, opponentName:'Amazonino Mendes', winner:'David Almeida' },
    40: { zone:40, david:39819, opponent:40447, opponentName:'Amazonino Mendes', winner:'Amazonino Mendes' },
    58: { zone:58, david:39356, opponent:36110, opponentName:'Amazonino Mendes', winner:'David Almeida' },
    59: { zone:59, david:36212, opponent:33088, opponentName:'Amazonino Mendes', winner:'David Almeida' },
    62: { zone:62, david:40572, opponent:40935, opponentName:'Amazonino Mendes', winner:'Amazonino Mendes' },
    63: { zone:63, david:46344, opponent:38627, opponentName:'Amazonino Mendes', winner:'David Almeida' },
    65: { zone:65, david:39829, opponent:35886, opponentName:'Amazonino Mendes', winner:'David Almeida' },
    68: { zone:68, david:30986, opponent:25777, opponentName:'Amazonino Mendes', winner:'David Almeida' },
    70: { zone:70, david:35120, opponent:34513, opponentName:'Amazonino Mendes', winner:'David Almeida' }
  };
  Object.values(Z2020).forEach(d=>{
    d.validos = d.david + d.opponent;
    d.share = d.david / d.validos * 100;
    d.opponentShare = d.opponent / d.validos * 100;
    d.diff = Math.abs(d.david - d.opponent);
  });

  const zoneMeta = new Map(ZONE_INFO.map(z=>[z.zone,z]));
  const Z2024 = {};
  B.zonas.forEach(z=>{
    const meta = zoneMeta.get(z.zona) || {profile:'', neighborhoods:[]};
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
      diff: Math.abs(z.david-z.alberto),
      profile: meta.profile,
      neighborhoods: meta.neighborhoods
    };
  });

  Object.values(Z2020).forEach(z=>{
    const meta = zoneMeta.get(z.zone) || {profile:'', neighborhoods:[]};
    z.profile = meta.profile;
    z.neighborhoods = meta.neighborhoods;
  });

  function bairroRows(year){
    const source = year === '2020' ? Z2020 : Z2024;
    const rows = [];
    Object.values(source).forEach(zone => {
      (zone.neighborhoods || []).forEach((name, idx) => {
        rows.push({
          id: `${year}-${zone.zone}-${idx}`,
          year,
          name,
          zone: zone.zone,
          profile: zone.profile,
          aptos: zone.aptos || null,
          validos: zone.validos,
          david: zone.david,
          opponent: zone.opponent,
          opponentName: zone.opponentName,
          winner: zone.winner,
          share: zone.share,
          opponentShare: zone.opponentShare,
          diff: zone.diff,
          sameZoneCount: zone.neighborhoods.length
        });
      });
    });
    return rows;
  }

  const BAIRROS_2020 = bairroRows('2020');
  const BAIRROS_2024 = bairroRows('2024');
  const MAP_2020 = new Map(BAIRROS_2020.map(d=>[d.id,d]));
  const MAP_2024 = new Map(BAIRROS_2024.map(d=>[d.id,d]));

  function buildLayout(rows){
    const slotMap = new Map();
    rows.forEach(row => {
      const zoneRows = rows.filter(r=>r.zone===row.zone);
      if (slotMap.has(row.id)) return;
      const center = ZONE_LAYOUT[row.zone];
      const offsets = TILE_OFFSETS[zoneRows.length] || TILE_OFFSETS[6];
      const sorted = zoneRows.slice().sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));
      sorted.forEach((r, idx) => {
        const off = offsets[idx] || [idx % 3, Math.floor(idx / 3)];
        const x = center.x + off[0] * 52;
        const y = center.y + off[1] * 46;
        slotMap.set(r.id, {x,y});
      });
    });
    return slotMap;
  }

  const LAYOUT_2020 = buildLayout(BAIRROS_2020);
  const LAYOUT_2024 = buildLayout(BAIRROS_2024);

  let year = '2018';
  let metric = 'david';
  let query = '';
  let currentSelection = null;

  const svg = document.querySelector('#map svg');
  const tip = document.querySelector('#tooltip');
  const detail = document.querySelector('#detail');
  const story = document.querySelector('#campaignStory');
  const explorer = document.querySelector('#territorialExplorer');
  const source = document.querySelector('#source');
  const byCode = new Map(A.municipios.map(d=>[d.code,d]));
  const byCode2026 = new Map(E2026.map(d=>[d.code,d]));

  const pts=[];
  A.geo.features.forEach(f=>f.geometry.coordinates.forEach(p=>{
    const rs=f.geometry.type==='Polygon'?[p]:p;
    rs.forEach(r=>r.forEach(x=>pts.push(x)));
  }));
  const xs=pts.map(p=>p[0]), ys=pts.map(p=>p[1]);
  const x0=Math.min(...xs), x1=Math.max(...xs), y0=Math.min(...ys), y1=Math.max(...ys);
  const W=900, H=720, pad=24;
  const sc=Math.min((W-2*pad)/(x1-x0),(H-2*pad)/(y1-y0));
  const xy=p=>[pad+(p[0]-x0)*sc,H-pad-(p[1]-y0)*sc];
  const ring=r=>r.map((p,i)=>{ const q=xy(p); return (i?'L':'M')+q[0].toFixed(1)+','+q[1].toFixed(1); }).join('')+'Z';
  const path=f=>f.geometry.type==='Polygon'?f.geometry.coordinates.map(ring).join(''):f.geometry.coordinates.map(p=>p.map(ring).join('')).join('');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const gAmazonas = document.createElementNS(SVG_NS,'g');
  const gManaus = document.createElementNS(SVG_NS,'g');
  svg.appendChild(gAmazonas);
  svg.appendChild(gManaus);

  A.geo.features.forEach(f=>{
    const e=document.createElementNS(SVG_NS,'path');
    e.setAttribute('d',path(f));
    e.setAttribute('class','municipality amazonas-shape');
    e.dataset.code=f.properties.code;
    gAmazonas.appendChild(e);
    e.onclick=()=>select(year==='2026'?byCode2026.get(e.dataset.code):byCode.get(e.dataset.code));
    e.onpointermove=v=>showTip(v,year==='2026'?byCode2026.get(e.dataset.code):byCode.get(e.dataset.code));
    e.onpointerleave=()=>tip.style.display='none';
  });

  const background = document.createElementNS(SVG_NS, 'path');
  background.setAttribute('d', 'M154 518 C132 447 148 323 222 214 C282 126 380 84 492 84 C627 84 744 148 806 258 C850 336 853 441 806 528 C758 615 661 663 548 672 C424 682 250 642 154 518 Z');
  background.setAttribute('fill', 'rgba(14,40,33,.45)');
  background.setAttribute('stroke', 'rgba(125,179,174,.38)');
  background.setAttribute('stroke-width', '2.4');
  background.setAttribute('stroke-dasharray', '6 7');
  gManaus.appendChild(background);

  [
    ['Norte', 502, 117],
    ['Oeste', 206, 309],
    ['Leste', 733, 307],
    ['Sul', 451, 688]
  ].forEach(([label,x,y])=>{
    const t=document.createElementNS(SVG_NS,'text');
    t.setAttribute('x',x); t.setAttribute('y',y);
    t.setAttribute('fill','rgba(157,183,173,.45)');
    t.setAttribute('font-size','18');
    t.setAttribute('font-weight','800');
    t.setAttribute('text-anchor','middle');
    t.textContent=label;
    gManaus.appendChild(t);
  });

  function hexPath(cx, cy, r=22){
    const pts=[];
    for(let i=0;i<6;i++){
      const ang = (Math.PI/180) * (30 + i*60);
      pts.push([cx + Math.cos(ang)*r, cy + Math.sin(ang)*r]);
    }
    return pts.map((p,i)=>`${i?'L':'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('')+'Z';
  }

  function createBairroElements(rows, layoutMap, mapObj){
    rows.forEach(row=>{
      const pos = layoutMap.get(row.id);
      const pathEl = document.createElementNS(SVG_NS,'path');
      pathEl.setAttribute('d', hexPath(pos.x, pos.y));
      pathEl.setAttribute('class','municipality manaus-bairro');
      pathEl.dataset.id = row.id;
      gManaus.appendChild(pathEl);
      pathEl.onclick = ()=> select(mapObj.get(pathEl.dataset.id));
      pathEl.onpointermove = e => showTip(e, mapObj.get(pathEl.dataset.id));
      pathEl.onpointerleave = ()=> tip.style.display='none';
    });
  }

  createBairroElements(BAIRROS_2020, LAYOUT_2020, MAP_2020);
  createBairroElements(BAIRROS_2024, LAYOUT_2024, MAP_2024);

  function color(t){
    t=Math.max(0,Math.min(1,t));
    const a=t<.5?[18,54,44]:[232,169,76], b=t<.5?[232,169,76]:[255,106,22], u=t<.5?t*2:(t-.5)*2;
    return `rgb(${a.map((v,i)=>Math.round(v+(b[i]-v)*u)).join(',')})`;
  }

  function currentCards(){
    if(year==='2018'){
      const s=A.state;
      return [['Eleitores aptos',fmt.format(s.aptos),'100% da base'],['Votantes',fmt.format(s.comparecimento),pct(s.turnout)+' de comparecimento'],['Votos válidos',fmt.format(s.validos),pct(s.validos/s.comparecimento*100)+' dos votantes'],['Votação nominal',fmt.format(s.david),pct(s.share)+' dos válidos'],['Abstenção',fmt.format(s.aptos-s.comparecimento),pct(s.abstencao)]];
    }
    if(year==='2024'){
      const s=B.state;
      return [['Eleitores aptos',fmt.format(s.aptos),'100% da base'],['Votantes',fmt.format(s.comparecimento),pct(s.turnout)+' de comparecimento'],['Votos válidos',fmt.format(s.validos),pct(s.validos/s.comparecimento*100)+' dos votantes'],['David Almeida',fmt.format(s.david),pct(s.share)+' dos válidos'],['Abstenção',fmt.format(s.aptos-s.comparecimento),pct(s.abstencao)]];
    }
    if(year==='2020'){
      return [['Eleitores aptos',fmt.format(C2020.aptos),'2º turno'],['Comparecimento',fmt.format(C2020.comparecimento),'77,57% do eleitorado'],['Votos válidos',fmt.format(C2020.validos),'88,17% dos votantes'],['David Almeida',fmt.format(C2020.david),'51,27% dos válidos'],['Abstenções',fmt.format(C2020.abstencoes),'22,43% do eleitorado']];
    }
    return [['Eleitores aptos',fmt.format(C2026.aptos),'base oficial TSE 2026'],['Voto obrigatório',fmt.format(C2026.obrigatorio),pct(C2026.obrigatorioShare)+' do eleitorado'],['Voto facultativo',fmt.format(C2026.facultativo),pct(C2026.facultativoShare)+' do eleitorado'],['Manaus',fmt.format(C2026.manaus),pct(C2026.manaus/C2026.aptos*100)+' do estado'],['Interior',fmt.format(C2026.interior),pct(C2026.interior/C2026.aptos*100)+' do estado']];
  }

  function cards(){
    document.querySelector('#cards').innerHTML = currentCards().map(x => `<article class="card"><span>${x[0]}</span><strong>${x[1]}</strong><small>${x[2]}</small></article>`).join('');
  }

  function renderDetail(d){
    if(!d){
      detail.innerHTML = '<div class="eyebrow">Detalhamento</div><h3>Selecione uma localidade</h3><p class="sub">Os campos abaixo mudam conforme o ciclo eleitoral selecionado.</p>';
      return;
    }
    if(year==='2026'){
      detail.innerHTML = `<div class="eyebrow">2026 • eleitorado oficial TSE</div><h3>${d.name}</h3><div class="metrics"><div class="metric"><span>Eleitores aptos</span><strong>${fmt.format(d.aptos)}</strong></div><div class="metric"><span>% do eleitorado estadual</span><strong>${pct(d.share)}</strong></div><div class="metric"><span>Posição no Amazonas</span><strong>${d.rank}º</strong></div><div class="metric"><span>Base estadual</span><strong>${fmt.format(C2026.aptos)}</strong></div></div><p class="story-note">Quantitativo municipal da base oficial das Eleições 2026. A soma dos 62 municípios corresponde a ${fmt.format(C2026.aptos)} eleitores.</p>`;
      return;
    }
    if(year==='2020' || year==='2024'){
      const oppLabel = d.opponentName;
      const zoneLabel = `${d.zone}ª Zona Eleitoral`;
      const aptoBlock = d.aptos ? `<div class="metric"><span>Eleitores aptos da zona</span><strong>${fmt.format(d.aptos)}</strong></div>` : '';
      detail.innerHTML = `<div class="eyebrow">${year} • 2º turno • bairro</div><h3>${d.name}</h3><p class="sub">${zoneLabel} • ${d.profile}</p><div class="metrics">${aptoBlock}<div class="metric"><span>Votos válidos da zona</span><strong>${fmt.format(d.validos)}</strong></div><div class="metric"><span>David Almeida</span><strong>${fmt.format(d.david)}</strong><small>${pct(d.share)}</small></div><div class="metric"><span>${oppLabel}</span><strong>${fmt.format(d.opponent)}</strong><small>${pct(d.opponentShare)}</small></div><div class="metric"><span>Vencedor</span><strong>${d.winner}</strong></div><div class="metric"><span>Diferença</span><strong>${fmt.format(d.diff)}</strong></div></div><p class="story-note">Este bairro está vinculado à ${zoneLabel}. Nesta visualização, os bairros exibem os indicadores da sua respectiva zona eleitoral para preservar a coerência com a base disponível no relatório/painel.</p>`;
      return;
    }
    detail.innerHTML = `<div class="eyebrow">2018 • primeiro turno</div><h3>${d.name}</h3><div class="metrics"><div class="metric"><span>Eleitores aptos</span><strong>${fmt.format(d.aptos)}</strong></div><div class="metric"><span>Votantes</span><strong>${fmt.format(d.comparecimento)}</strong></div><div class="metric"><span>Votos válidos</span><strong>${fmt.format(d.validos)}</strong></div><div class="metric"><span>Votação nominal</span><strong>${fmt.format(d.david)}</strong></div><div class="metric"><span>% dos válidos</span><strong>${pct(d.share)}</strong></div><div class="metric"><span>Abstenção</span><strong>${pct(d.abstencao)}</strong></div></div>`;
  }

  function showTip(e, d){
    if(!d) return;
    if(year==='2026'){
      tip.innerHTML = `<b>${d.name}</b><div class="tipgrid"><span>Eleitores 2026</span><strong>${fmt.format(d.aptos)}</strong><span>% do estado</span><strong>${pct(d.share)}</strong><span>Ranking</span><strong>${d.rank}º</strong></div>`;
    } else if(year==='2018') {
      tip.innerHTML = `<b>${d.name}</b><div class="tipgrid"><span>Aptos</span><strong>${fmt.format(d.aptos)}</strong><span>Votantes</span><strong>${fmt.format(d.comparecimento)}</strong><span>Válidos</span><strong>${fmt.format(d.validos)}</strong><span>Votação</span><strong>${fmt.format(d.david)} · ${pct(d.share)}</strong></div>`;
    } else {
      tip.innerHTML = `<b>${d.name}</b><div class="tipgrid"><span>Zona</span><strong>${d.zone}ª ZE</strong><span>David Almeida</span><strong>${fmt.format(d.david)} · ${pct(d.share)}</strong><span>${d.opponentName}</span><strong>${fmt.format(d.opponent)} · ${pct(d.opponentShare)}</strong></div>`;
    }
    const b = document.querySelector('#map').getBoundingClientRect();
    tip.style.display='block';
    tip.style.left=Math.min(e.clientX-b.left+14,b.width-240)+'px';
    tip.style.top=Math.min(e.clientY-b.top+14,b.height-160)+'px';
  }

  function table(rows){
    const head=document.querySelector('#territorialExplorer thead tr');
    if(year==='2026'){
      head.innerHTML='<th>Município</th><th class="num">Eleitores 2026</th><th class="num">% do estado</th><th class="num">Ranking</th>';
      document.querySelector('#tbody').innerHTML=rows.map(d=>`<tr data-id="${d.code}"><td>${d.name}</td><td class="num">${fmt.format(d.aptos)}</td><td class="num">${pct(d.share)}</td><td class="num">${d.rank}º</td></tr>`).join('');
    } else if(year==='2018') {
      head.innerHTML='<th>Município</th><th class="num">Aptos</th><th class="num">Válidos</th><th class="num">Votação</th><th class="num">%</th>';
      document.querySelector('#tbody').innerHTML=rows.map(d=>`<tr data-id="${d.code}"><td>${d.name}</td><td class="num">${fmt.format(d.aptos)}</td><td class="num">${fmt.format(d.validos)}</td><td class="num">${fmt.format(d.david)}</td><td class="num">${pct(d.share)}</td></tr>`).join('');
    } else {
      head.innerHTML='<th>Bairro</th><th class="num">ZE</th><th class="num">David</th><th class="num">Adversário</th><th class="num">% David</th>';
      document.querySelector('#tbody').innerHTML=rows.map(d=>`<tr data-id="${d.id}"><td>${d.name}</td><td class="num">${d.zone}ª</td><td class="num">${fmt.format(d.david)}</td><td class="num">${fmt.format(d.opponent)}</td><td class="num">${pct(d.share)}</td></tr>`).join('');
    }
    document.querySelectorAll('#tbody tr[data-id]').forEach(r=>r.onclick=()=>{
      const id=r.dataset.id;
      if(year==='2018') select(byCode.get(id));
      else if(year==='2026') select(byCode2026.get(id));
      else if(year==='2020') select(MAP_2020.get(id));
      else if(year==='2024') select(MAP_2024.get(id));
    });
  }

  function select(d){
    currentSelection = d || null;
    renderDetail(d);
    document.querySelectorAll('.municipality').forEach(e=>e.classList.remove('active'));
    if(!d) return;
    if(year==='2018' || year==='2026'){
      const key = d.code;
      document.querySelectorAll('.amazonas-shape').forEach(e=>e.classList.toggle('active', e.dataset.code===key));
    } else {
      document.querySelectorAll('.manaus-bairro').forEach(e=>e.classList.toggle('active', e.dataset.id===d.id));
    }
  }

  function story2020(){
    return `<div class="story-grid"><article class="panel story-card"><div class="story-kicker">2020 • 1º turno</div><h2>Fragmentação e passagem ao segundo turno</h2><p>O relatório descreve uma disputa com 11 candidaturas e forte dispersão do voto em Manaus.</p><div class="result-list"><div class="result-row"><span>Amazonino Mendes</span><b>234.088</b><em>24,31%</em></div><div class="result-row primary"><span>David Almeida</span><b>218.929</b><em>22,74%</em></div><div class="result-row"><span>Zé Ricardo</span><b>—</b><em>14,52%</em></div><div class="result-row"><span>Ricardo Nicolau</span><b>—</b><em>12,29%</em></div></div></article><article class="panel story-card"><div class="story-kicker">2020 • 2º turno</div><h2>Virada matemática e vitória</h2><p>Em 29 de novembro de 2020, David Almeida venceu Amazonino Mendes e conquistou a Prefeitura de Manaus.</p><div class="result-list"><div class="result-row primary"><span>David Almeida • Avante</span><b>466.970</b><em>51,27%</em></div><div class="result-row"><span>Amazonino Mendes • Podemos</span><b>443.747</b><em>48,73%</em></div></div><div class="story-metrics"><div class="story-metric"><span>Diferença</span><strong>23.223 votos</strong></div><div class="story-metric"><span>Abstenções</span><strong>298.712</strong></div><div class="story-metric"><span>Brancos + nulos</span><strong>122.184</strong></div></div></article><article class="panel story-card"><div class="story-kicker">Cartografia eleitoral</div><h2>8 das 13 zonas conquistadas</h2><p>O novo mapa por bairros permite visualizar, no mesmo padrão do painel, como as zonas eleitorais vencedoras de David se distribuem pela cidade.</p><div class="meter-wrap"><div class="meter-label"><span>Zonas vencidas por David Almeida</span><strong>8 / 13 • 61,5%</strong></div><div class="meter"><i style="width:61.5%"></i></div></div><div class="chips"><span class="chip">31ª ZE • Sul</span><span class="chip">63ª ZE • Leste</span><span class="chip">58ª ZE • Norte</span><span class="chip">68ª ZE • Leste</span></div><p class="story-note">Os bairros do mapa herdaram os resultados da sua respectiva Zona Eleitoral, mantendo a coerência com a base territorial disponível no relatório.</p></article><article class="panel story-card"><div class="story-kicker">Leitura territorial</div><h2>Redutos e resistências</h2><p>O documento registra força mais intensa de David nas áreas Norte, Leste e Sul, enquanto a oposição retém zonas do eixo Oeste e Centro-Sul.</p><div class="chips"><span class="chip">1ª ZE</span><span class="chip">2ª ZE</span><span class="chip">32ª ZE</span><span class="chip">40ª ZE</span><span class="chip">62ª ZE</span></div><ul class="strategy-list"><li>A vitória de 2020 criou a base institucional para a expansão territorial posterior.</li><li>O desempenho de Norte e Leste se tornou o núcleo de retenção eleitoral para os ciclos seguintes.</li><li>A margem estreita do 2º turno evidencia a importância de ampliar a penetração fora dos redutos originais.</li></ul></article><article class="panel story-card wide"><div class="story-kicker">Dados consolidados • 2º turno</div><h2>Resumo do ciclo de 2020</h2><table class="story-table"><thead><tr><th>Indicador</th><th class="num">Volume</th><th class="num">Percentual</th></tr></thead><tbody><tr><td>Eleitorado total</td><td class="num">1.331.613</td><td class="num">100,00%</td></tr><tr><td>Comparecimento</td><td class="num">1.032.901</td><td class="num">77,57%</td></tr><tr><td>Votos válidos</td><td class="num">910.717</td><td class="num">88,17% dos votantes</td></tr><tr><td>David Almeida</td><td class="num">466.970</td><td class="num">51,27% dos válidos</td></tr><tr><td>Amazonino Mendes</td><td class="num">443.747</td><td class="num">48,73% dos válidos</td></tr><tr><td>Abstenções</td><td class="num">298.712</td><td class="num">22,43%</td></tr><tr><td>Votos brancos</td><td class="num">43.232</td><td class="num">4,19%</td></tr><tr><td>Votos nulos</td><td class="num">78.952</td><td class="num">7,64%</td></tr></tbody></table><p class="story-note">Os KPIs e a tabela desta seção reproduzem os números consolidados apresentados no relatório.</p></article></div>`;
  }

  function story2026(){
    return `<div class="story-grid"><article class="panel story-card"><div class="story-kicker">2026 • base oficial TSE</div><h2>2.801.182 eleitores no Amazonas</h2><p>O relatório já apontava o patamar de 2,8 milhões. Para esta versão do site, os indicadores demográficos foram atualizados com os quantitativos exatos da base eleitoral de 2026 do TSE.</p><div class="story-metrics"><div class="story-metric"><span>Eleitores aptos</span><strong>${fmt.format(C2026.aptos)}</strong></div><div class="story-metric"><span>Manaus</span><strong>${fmt.format(C2026.manaus)}</strong></div><div class="story-metric"><span>Interior</span><strong>${fmt.format(C2026.interior)}</strong></div></div><div class="chips"><span class="chip">Manaus • ${fmt.format(C2026.manaus)}</span><span class="chip">Manacapuru • 81.250</span><span class="chip">Itacoatiara • 76.342</span><span class="chip">Parintins • 73.461</span><span class="chip">Coari • 51.970</span></div></article><article class="panel story-card"><div class="story-kicker">Perfil do eleitorado • dado exato</div><h2>Obrigatório x facultativo</h2><p>O relatório utilizava uma aproximação nacional de 86%/14%. Aqui ela foi substituída pelo recorte exato do eleitorado amazonense de 2026.</p><div class="meter-wrap"><div class="meter-label"><span>Voto obrigatório</span><strong>${fmt.format(C2026.obrigatorio)} • ${pct(C2026.obrigatorioShare)}</strong></div><div class="meter"><i style="width:${C2026.obrigatorioShare}%"></i></div></div><div class="meter-wrap"><div class="meter-label"><span>Voto facultativo</span><strong>${fmt.format(C2026.facultativo)} • ${pct(C2026.facultativoShare)}</strong></div><div class="meter teal"><i style="width:${C2026.facultativoShare}%"></i></div></div><p class="story-note">Os dois grupos somam exatamente ${fmt.format(C2026.aptos)} eleitores.</p></article><article class="panel story-card wide"><div class="story-kicker">Ponte eleitoral</div><h2>Da consolidação em Manaus à disputa estadual</h2><p>O desafio estratégico descrito no relatório permanece: transformar o patrimônio eleitoral acumulado na capital em uma rede estadual capaz de recompor a capilaridade observada em 2018.</p><div class="campaign-bridge"><div class="bridge-box"><span>Base de referência em Manaus • 2024</span><strong>576.171 votos</strong><small>resultado do 2º turno citado no relatório</small></div><div class="bridge-arrow">→</div><div class="bridge-box"><span>Eleitorado estadual oficial • 2026</span><strong>${fmt.format(C2026.aptos)}</strong><small>base TSE das Eleições 2026</small></div></div></article><article class="panel story-card"><div class="story-kicker">Interiorização</div><h2>1.329.044 eleitores fora da capital</h2><p>Com ${fmt.format(C2026.interior)} eleitores, o interior representa ${pct(C2026.interior/C2026.aptos*100)} do eleitorado estadual. O mapa acima permite comparar o peso de cada um dos 62 municípios.</p><div class="chips"><span class="chip">Novo Airão • 13.383</span><span class="chip">Humaitá • 34.965</span><span class="chip">Iranduba • 46.056</span><span class="chip">Borba • 24.587</span><span class="chip">Silves • 9.687</span></div><ul class="strategy-list"><li>Conectar a base consolidada de Manaus aos grandes colégios eleitorais do interior.</li><li>Reduzir a dependência exclusiva da força metropolitana.</li><li>Operar uma logística estadual compatível com as distâncias e calhas fluviais do Amazonas.</li></ul></article><article class="panel story-card"><div class="story-kicker">Condicionantes estratégicas</div><h2>Três eixos destacados pelo relatório</h2><ul class="strategy-list"><li><strong>Não voto:</strong> converter parte da abstenção estrutural observada em Manaus em participação afirmativa.</li><li><strong>Expansão territorial:</strong> levar a experiência de 8 zonas em 2020 e 11 em 2024 para uma lógica estadual.</li><li><strong>Peso do interior:</strong> construir alianças e presença territorial para evitar vantagens adversárias fora da capital.</li></ul><p class="story-note">Os quantitativos de eleitorado nesta aba são oficiais de 2026; as interpretações de campanha continuam sendo prospecções estratégicas do relatório.</p></article></div>`;
  }

  function renderStory(){
    story.innerHTML = year==='2020' ? story2020() : year==='2026' ? story2026() : '';
  }

  function rowsForCurrentYear(){
    if(year==='2018') return A.municipios.filter(d=>d.name.toLowerCase().includes(query));
    if(year==='2026') return E2026.filter(d=>d.name.toLowerCase().includes(query)).sort((a,b)=>b.aptos-a.aptos);
    const base = year==='2020' ? BAIRROS_2020 : BAIRROS_2024;
    return base.filter(d => d.name.toLowerCase().includes(query) || String(d.zone).includes(query.replace(/\D/g,''))).sort((a,b)=>a.zone-b.zone || a.name.localeCompare(b.name,'pt-BR'));
  }

  function renderManausMap(rows){
    gAmazonas.style.display = 'none';
    gManaus.style.display = '';
    svg.setAttribute('aria-label', `Mapa de Manaus por bairros — ${year}`);

    const all = year==='2020' ? BAIRROS_2020 : BAIRROS_2024;
    const allShares = all.map(d=>d.share);
    const mn = Math.min(...allShares), mx = Math.max(...allShares);
    const visible = new Set(rows.map(d=>d.id));
    document.querySelectorAll('.manaus-bairro').forEach(el=>{
      const obj = year==='2020' ? MAP_2020.get(el.dataset.id) : MAP_2024.get(el.dataset.id);
      const ok = visible.has(el.dataset.id);
      el.classList.toggle('dim', !ok);
      el.style.fill = ok ? color((obj.share - mn)/(mx-mn || 1)) : '#183028';
      el.style.display = obj.year === year ? '' : 'none';
    });
  }

  function renderAmazonasMap(rows){
    gAmazonas.style.display = '';
    gManaus.style.display = 'none';
    svg.setAttribute('aria-label', year==='2026' ? 'Mapa do eleitorado municipal do Amazonas' : 'Mapa dos municípios do Amazonas');
    if(year==='2018'){
      const vals = rows.map(d=>d[metric]);
      const mn = Math.min(...vals), mx = Math.max(...vals);
      document.querySelectorAll('.amazonas-shape').forEach(e=>{
        const d = byCode.get(e.dataset.code), ok = rows.includes(d);
        e.classList.toggle('dim', !ok);
        e.style.fill = ok ? color((d[metric]-mn)/(mx-mn||1)) : '#183028';
      });
      return;
    }
    const logs = E2026.map(d=>Math.log1p(d.aptos));
    const mn = Math.min(...logs), mx = Math.max(...logs);
    document.querySelectorAll('.amazonas-shape').forEach(e=>{
      const d = byCode2026.get(e.dataset.code), ok = rows.includes(d);
      e.classList.toggle('dim', !ok);
      e.style.fill = ok ? color((Math.log1p(d.aptos)-mn)/(mx-mn||1)) : '#183028';
    });
  }

  function render(){
    cards();
    const meta = META[year];
    document.querySelector('#scope').innerHTML = meta.scope;
    document.querySelector('#notice').textContent = meta.notice;
    source.innerHTML = '<strong>Base:</strong> ' + meta.source + (year==='2026' ? ` <a href="${E26.fonteUrl}" target="_blank" rel="noopener">Consultar TSE</a>.` : year==='2024' ? ' <a href="https://www.tse.jus.br/comunicacao/noticias/2024/Outubro/david-almeida-e-eleito-prefeito-de-manaus-am" target="_blank" rel="noopener">Consultar TSE</a>.' : year==='2020' ? ' <a href="relatorio.html">Ver referências do relatório</a>.' : ' <a href="relatorio.html">Ler relatório completo</a>.');

    const hasExplorer = true;
    const hasStory = year==='2020' || year==='2026';
    explorer.classList.toggle('hidden', !hasExplorer);
    story.classList.toggle('hidden', !hasStory);
    if(hasStory) renderStory();

    document.querySelector('#zonegrid').style.display = 'none';
    document.querySelector('#map').classList.remove('hidden');
    document.querySelector('#legend').classList.remove('hidden');

    const is18 = year==='2018', is20 = year==='2020', is24 = year==='2024', is26 = year==='2026';
    document.querySelector('#metricField').classList.toggle('hidden', !is18);
    document.querySelector('#search').placeholder = is18 || is26 ? 'Buscar município' : 'Buscar bairro ou zona';
    document.querySelector('#visualTitle').textContent = is18 ? 'Mapa municipal — 2018' : is26 ? 'Mapa do eleitorado municipal — 2026' : `Mapa de Manaus por bairros — ${year}`;
    document.querySelector('#visualSub').textContent = is18 ? 'Clique em um município para visualizar seus dados' : is26 ? 'Eleitores aptos por município • clique para ver o quantitativo exato' : 'Visualização por bairros, com indicadores herdados da respectiva Zona Eleitoral';
    document.querySelector('#tableTitle').textContent = is18 ? 'Municípios' : is26 ? 'Eleitorado por município' : 'Bairros';

    const legendSpans = document.querySelectorAll('#legend span');
    if(legendSpans.length===2){
      legendSpans[0].textContent = is26 ? 'menor eleitorado' : is18 ? 'menor valor' : 'menor % David';
      legendSpans[1].textContent = is26 ? 'maior eleitorado' : is18 ? 'maior valor' : 'maior % David';
    }

    const rows = rowsForCurrentYear();
    if(is18 || is26) renderAmazonasMap(rows); else renderManausMap(rows);
    table(rows);

    if(currentSelection){
      if((is18||is26) && currentSelection.code) select(currentSelection);
      else if((is20||is24) && currentSelection.year === year) select(currentSelection);
      else renderDetail(null);
    } else {
      renderDetail(null);
      document.querySelectorAll('.municipality').forEach(e=>e.classList.remove('active'));
    }
  }

  document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{
    year=b.dataset.year;
    query='';
    currentSelection=null;
    document.querySelector('#search').value='';
    document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x===b));
    render();
  });
  document.querySelector('#metric').onchange=e=>{ metric=e.target.value; currentSelection=null; render(); };
  document.querySelector('#search').oninput=e=>{ query=e.target.value.trim().toLowerCase(); render(); };

  renderDetail(null);
  render();
})();
