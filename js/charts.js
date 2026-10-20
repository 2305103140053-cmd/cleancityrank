/* ============================================================
   CleanCity Rank — Chart.js Dashboard
   Project : Cleanliness Ranking Dashboard for Cities
   ============================================================ */

/* ── Dataset ─────────────────────────────────────────────── */
const CITIES = [
  { rank:1,  city:'Indore',      state:'Madhya Pradesh', waste:95, san:93, hyg:94, water:92, air:91, total:94.2 },
  { rank:2,  city:'Surat',       state:'Gujarat',        waste:90, san:89, hyg:91, water:88, air:86, total:89.7 },
  { rank:3,  city:'Navi Mumbai', state:'Maharashtra',    waste:88, san:87, hyg:88, water:86, air:85, total:87.5 },
  { rank:4,  city:'Mysuru',      state:'Karnataka',      waste:86, san:84, hyg:87, water:84, air:83, total:85.3 },
  { rank:5,  city:'New Delhi',   state:'Delhi',          waste:82, san:81, hyg:83, water:82, air:78, total:82.1 },
  { rank:6,  city:'Pune',        state:'Maharashtra',    waste:81, san:80, hyg:82, water:80, air:79, total:80.9 },
  { rank:7,  city:'Ahmedabad',   state:'Gujarat',        waste:79, san:78, hyg:80, water:77, air:76, total:78.6 },
  { rank:8,  city:'Chennai',     state:'Tamil Nadu',     waste:77, san:76, hyg:77, water:75, air:74, total:76.4 },
  { rank:9,  city:'Hyderabad',   state:'Telangana',      waste:75, san:74, hyg:75, water:74, air:72, total:74.8 },
  { rank:10, city:'Kolkata',     state:'West Bengal',    waste:73, san:72, hyg:73, water:71, air:69, total:72.3 },
  { rank:11, city:'Bhopal',      state:'Madhya Pradesh', waste:71, san:70, hyg:71, water:69, air:68, total:70.1 },
  { rank:12, city:'Jaipur',      state:'Rajasthan',      waste:69, san:68, hyg:70, water:67, air:66, total:68.9 },
  { rank:13, city:'Lucknow',     state:'Uttar Pradesh',  waste:68, san:67, hyg:68, water:66, air:65, total:67.4 },
  { rank:14, city:'Nagpur',      state:'Maharashtra',    waste:66, san:65, hyg:67, water:64, air:63, total:65.8 },
  { rank:15, city:'Patna',       state:'Bihar',          waste:62, san:61, hyg:62, water:60, air:58, total:61.2 },
];

/* ── Chart defaults ──────────────────────────────────────── */
Chart.defaults.font.family = "'Poppins', sans-serif";
Chart.defaults.color       = 'rgba(255,255,255,0.5)';

const GRID = 'rgba(255,255,255,0.05)';

/* ── 1. City Rankings Bar Chart ──────────────────────────── */
function buildRankingChart() {
  const el = document.getElementById('rankingChart');
  if (!el) return;

  const top10  = CITIES.slice(0, 10);
  const labels = top10.map(c => c.city);
  const scores = top10.map(c => c.total);
  const colors = scores.map((_, i) =>
    i === 0 ? '#ffd700' : i === 1 ? '#c0c0c0' : i === 2 ? '#cd7f32' : '#2ecc71'
  );

  new Chart(el, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Cleanliness Score',
        data: scores,
        backgroundColor: colors,
        borderColor: colors.map(c => c + 'cc'),
        borderWidth: 1,
        borderRadius: 8,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor:'#1c2128', borderColor:'rgba(46,204,113,0.3)', borderWidth:1,
          titleColor:'#fff', bodyColor:'rgba(255,255,255,0.7)', padding:12,
          callbacks: { label: c => ` Score: ${c.parsed.y} / 100` }
        }
      },
      scales: {
        x: { grid:{ color:GRID }, ticks:{ color:'rgba(255,255,255,0.5)', font:{ size:11 } } },
        y: { grid:{ color:GRID }, ticks:{ color:'rgba(255,255,255,0.5)', font:{ size:11 } }, min:50, max:100 }
      }
    }
  });
}

/* ── 2. Parameter Weight Doughnut ────────────────────────── */
function buildParamPie() {
  const el = document.getElementById('paramPieChart');
  if (!el) return;

  new Chart(el, {
    type: 'doughnut',
    data: {
      labels: ['Waste Mgmt (30%)', 'Sanitation (25%)', 'Hygiene (20%)', 'Water (15%)', 'Air Quality (10%)'],
      datasets: [{
        data: [30, 25, 20, 15, 10],
        backgroundColor: ['#2ecc71','#3498db','#f39c12','#9b59b6','#e74c3c'],
        borderColor: '#1c2128', borderWidth: 3, hoverOffset: 8
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '68%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color:'rgba(255,255,255,0.6)', font:{ size:11 }, padding:12, usePointStyle:true, pointStyleWidth:7 }
        },
        tooltip: {
          backgroundColor:'#1c2128', borderColor:'rgba(255,255,255,0.1)', borderWidth:1,
          titleColor:'#fff', bodyColor:'rgba(255,255,255,0.7)', padding:12,
          callbacks: { label: c => ` Weight: ${c.parsed}%` }
        }
      }
    }
  });
}

/* ── 3. National Average Trend Line ──────────────────────── */
function buildTrendChart() {
  const el = document.getElementById('trendChart');
  if (!el) return;
  const ctx = el.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 0, 260);
  grad.addColorStop(0, 'rgba(46,204,113,0.22)');
  grad.addColorStop(1, 'rgba(46,204,113,0.01)');

  new Chart(el, {
    type: 'line',
    data: {
      labels: ['2021','2022','2023','2024','2025'],
      datasets: [
        {
          label: 'National Avg',
          data: [61.2, 65.4, 69.8, 73.5, 76.4],
          borderColor:'#2ecc71', backgroundColor: grad,
          borderWidth:2.5, fill:true, tension:0.4,
          pointBackgroundColor:'#2ecc71', pointBorderColor:'#1c2128',
          pointBorderWidth:2, pointRadius:5, pointHoverRadius:7,
        },
        {
          label: 'Top City Score',
          data: [82.1, 85.6, 88.9, 91.5, 94.2],
          borderColor:'#f39c12', backgroundColor:'transparent',
          borderWidth:2, borderDash:[5,3], fill:false, tension:0.4,
          pointBackgroundColor:'#f39c12', pointBorderColor:'#1c2128',
          pointBorderWidth:2, pointRadius:4, pointHoverRadius:6,
        }
      ]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins: {
        legend: { position:'bottom', labels:{ color:'rgba(255,255,255,0.6)', font:{size:11}, usePointStyle:true, padding:14 } },
        tooltip: { backgroundColor:'#1c2128', borderColor:'rgba(255,255,255,0.1)', borderWidth:1, titleColor:'#fff', bodyColor:'rgba(255,255,255,0.7)', padding:12 }
      },
      scales: {
        x: { grid:{color:GRID}, ticks:{color:'rgba(255,255,255,0.5)',font:{size:11}} },
        y: { grid:{color:GRID}, ticks:{color:'rgba(255,255,255,0.5)',font:{size:11}}, min:50, max:100 }
      }
    }
  });
}

/* ── 4. Radar — Top 3 City Comparison ───────────────────── */
function buildRadar() {
  const el = document.getElementById('radarChart');
  if (!el) return;

  new Chart(el, {
    type: 'radar',
    data: {
      labels: ['Waste Mgmt','Sanitation','Hygiene','Water','Air Quality'],
      datasets: [
        {
          label: 'Indore',
          data: [95,93,94,92,91],
          borderColor:'#ffd700', backgroundColor:'rgba(255,215,0,0.11)',
          borderWidth:2, pointBackgroundColor:'#ffd700', pointRadius:4
        },
        {
          label: 'Surat',
          data: [90,89,91,88,86],
          borderColor:'#c0c0c0', backgroundColor:'rgba(192,192,192,0.09)',
          borderWidth:2, pointBackgroundColor:'#c0c0c0', pointRadius:4
        },
        {
          label: 'Navi Mumbai',
          data: [88,87,88,86,85],
          borderColor:'#cd7f32', backgroundColor:'rgba(205,127,50,0.09)',
          borderWidth:2, pointBackgroundColor:'#cd7f32', pointRadius:4
        }
      ]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins: {
        legend: { position:'bottom', labels:{ color:'rgba(255,255,255,0.6)', font:{size:11}, usePointStyle:true, padding:12 } },
        tooltip: { backgroundColor:'#1c2128', borderColor:'rgba(255,255,255,0.1)', borderWidth:1, titleColor:'#fff', bodyColor:'rgba(255,255,255,0.7)', padding:12 }
      },
      scales: {
        r: {
          grid:{ color:'rgba(255,255,255,0.06)' },
          angleLines:{ color:'rgba(255,255,255,0.06)' },
          pointLabels:{ color:'rgba(255,255,255,0.6)', font:{size:11} },
          ticks:{ color:'rgba(255,255,255,0.38)', font:{size:9}, backdropColor:'transparent' },
          min:70, max:100
        }
      }
    }
  });
}

/* ── 5. Rankings Table ───────────────────────────────────── */
function buildTable() {
  const tbody = document.getElementById('tableBody');
  if (!tbody) return;

  const grade = t =>
    t >= 90 ? ['A+','gA'] : t >= 80 ? ['A','gA'] : t >= 70 ? ['B','gB'] : t >= 60 ? ['C','gC'] : ['D','gD'];

  const render = data => {
    tbody.innerHTML = data.map(c => {
      const [g, gc] = grade(c.total);
      const rClass = c.rank === 1 ? 'r1' : c.rank === 2 ? 'r2' : c.rank === 3 ? 'r3' : '';
      return `
        <tr class="${rClass}">
          <td><span class="rnk-badge">${c.rank}</span></td>
          <td><span class="city-name">${c.city}</span></td>
          <td><span class="state-name">${c.state}</span></td>
          <td><span class="sc-num">${c.waste}</span></td>
          <td><span class="sc-num">${c.san}</span></td>
          <td><span class="sc-num">${c.hyg}</span></td>
          <td><span class="sc-num">${c.water}</span></td>
          <td><span class="sc-num">${c.air}</span></td>
          <td><span class="total-num">${c.total}</span></td>
          <td><span class="grade-pill ${gc}">${g}</span></td>
        </tr>`;
    }).join('');
  };

  render(CITIES);

  // live search
  const inp = document.getElementById('searchCity');
  if (inp) {
    inp.addEventListener('input', e => {
      const q = e.target.value.toLowerCase();
      render(CITIES.filter(c =>
        c.city.toLowerCase().includes(q) || c.state.toLowerCase().includes(q)
      ));
    });
  }
}

/* ── Boot ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildRankingChart();
  buildParamPie();
  buildTrendChart();
  buildRadar();
  buildTable();
});
