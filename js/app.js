/**
 * SAHIKOSQL Website Interactivity & Terminal Simulator
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initLiveSimulator();
  initFaqAccordion();
  initClipboardButtons();
  initDownloadTrackers();
});

/* -------------------------------------------------------------------------- */
/* 0️⃣ Mobile Drawer Navigation                                               */
/* -------------------------------------------------------------------------- */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    const navLinks = navMenu.querySelectorAll('.nav-links a, .nav-actions a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 1️⃣ Interactive Terminal & Audit Simulator                                  */
/* -------------------------------------------------------------------------- */
function initLiveSimulator() {
  const btnSimulate = document.getElementById('btnSimulate');
  const simUrlInput = document.getElementById('simUrl');
  const simTerminal = document.getElementById('simTerminal');
  const simResultMatrix = document.getElementById('simResultMatrix');
  const simChips = document.querySelectorAll('.sim-chip');

  if (!btnSimulate || !simTerminal) return;

  // Preset Chips
  simChips.forEach(chip => {
    chip.addEventListener('click', () => {
      simChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      if (chip.dataset.url) {
        simUrlInput.value = chip.dataset.url;
      }
    });
  });

  let isScanning = false;

  btnSimulate.addEventListener('click', () => {
    if (isScanning) return;
    const targetUrl = simUrlInput.value.trim() || 'http://vulnerable-site.local/product.php?id=1';
    
    isScanning = true;
    btnSimulate.disabled = true;
    btnSimulate.innerHTML = '<span class="font-mono">PROBING TARGET...</span>';
    
    simTerminal.innerHTML = '';
    simResultMatrix.style.display = 'none';

    const logs = [
      { time: getTimestamp(), type: 'info', text: `[Crawler] Initializing target crawling for ${targetUrl}` },
      { time: getTimestamp(), type: 'info', text: `[Crawler] Discovered query parameter: 'id' (GET request)` },
      { time: getTimestamp(), type: 'info', text: `[Engine] Executing heuristic column count detection using ORDER BY...` },
      { time: getTimestamp(), type: 'info', text: `[Engine] Testing payload: ' ORDER BY 1-- - -> HTTP 200 OK` },
      { time: getTimestamp(), type: 'info', text: `[Engine] Testing payload: ' ORDER BY 4-- - -> HTTP 200 OK` },
      { time: getTimestamp(), type: 'info', text: `[Engine] Testing payload: ' ORDER BY 5-- - -> HTTP 500 Error (Unknown column)` },
      { time: getTimestamp(), type: 'success', text: `[Engine] Confirmed structural column count: 4` },
      { time: getTimestamp(), type: 'info', text: `[Engine] Fingerprinting target database engine signature...` },
      { time: getTimestamp(), type: 'marker', text: `[Payload] Injecting CONCAT('[SQLI_START]', database(), '[SQLI_END]')` },
      { time: getTimestamp(), type: 'success', text: `[Engine] Identified DB Engine: MySQL 8.0.32 (Database: 'ecommerce_store')` },
      { time: getTimestamp(), type: 'vuln', text: `[VULNERABILITY DETECTED] Union-Based SQL Injection confirmed on parameter 'id'` },
      { time: getTimestamp(), type: 'info', text: `[Extraction] Requesting information_schema.columns schema structure...` },
      { time: getTimestamp(), type: 'marker', text: `[Payload] Injecting marker-delimited chunked row stream payload...` },
      { time: getTimestamp(), type: 'success', text: `[Extraction] Retrieved 2 tables: 'users' (4 rows), 'admin_credentials' (2 rows)` },
      { time: getTimestamp(), type: 'success', text: `[Complete] Full extraction completed successfully with zero memory errors!` }
    ];

    let delay = 0;
    logs.forEach((log, index) => {
      delay += Math.floor(Math.random() * 300) + 120;
      setTimeout(() => {
        appendLog(simTerminal, log);
        simTerminal.scrollTop = simTerminal.scrollHeight;

        if (index === logs.length - 1) {
          isScanning = false;
          btnSimulate.disabled = false;
          btnSimulate.innerHTML = '<span class="font-mono">START SIMULATED AUDIT</span>';
          renderSimulatedTable(simResultMatrix);
          showToast('Scan Simulation Complete! Extracted database table displayed below.');
        }
      }, delay);
    });
  });
}

function appendLog(container, log) {
  const div = document.createElement('div');
  div.className = 'log-line';
  
  let typeClass = 'log-info';
  if (log.type === 'vuln') typeClass = 'log-vuln';
  if (log.type === 'success') typeClass = 'log-success';
  if (log.type === 'marker') typeClass = 'log-marker';

  div.innerHTML = `<span class="log-time">[${log.time}]</span> <span class="${typeClass}">${log.text}</span>`;
  container.appendChild(div);
}

function getTimestamp() {
  const now = new Date();
  return now.toTimeString().split(' ')[0];
}

function renderSimulatedTable(container) {
  container.style.display = 'block';
  container.innerHTML = `
    <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
      <h4 class="font-mono text-white" style="font-size: 0.88rem;">
        Extracted Table: <span style="color: #fff;">admin_credentials</span> (Target DB: ecommerce_store)
      </h4>
      <span class="feature-tag-box" style="margin-bottom: 0;">2 Rows Extracted</span>
    </div>
    <div style="overflow-x: auto;">
      <table class="matrix-table">
        <thead>
          <tr>
            <th>id</th>
            <th>username</th>
            <th>password_hash</th>
            <th>role</th>
            <th>last_login</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>sysadmin</td>
            <td>$2b$12$e8YQz9z0...8kZqG</td>
            <td>SUPERADMIN</td>
            <td>2026-09-02 12:44:10</td>
          </tr>
          <tr>
            <td>2</td>
            <td>sec_auditor</td>
            <td>$2b$12$K1mL5p3...x9N2w</td>
            <td>SECURITY_AUDITOR</td>
            <td>2026-09-01 18:15:22</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

/* -------------------------------------------------------------------------- */
/* 2️⃣ FAQ Accordion                                                          */
/* -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 3️⃣ Clipboard Copy Buttons                                                  */
/* -------------------------------------------------------------------------- */
function initClipboardButtons() {
  const copyBtns = document.querySelectorAll('.btn-copy');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.dataset.copyText;
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast('Copied SHA-256 hash to clipboard!');
        });
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 4️⃣ Download Tracker & Toast Feedback                                      */
/* -------------------------------------------------------------------------- */
function initDownloadTrackers() {
  const downloadBtns = document.querySelectorAll('.btn-download-apk');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Downloading sahikosql-v1.0.0-release.apk (5.0 MB)...');
    });
  });
}

/* Toast Utility */
function showToast(message) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
