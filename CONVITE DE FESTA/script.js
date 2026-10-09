    // ── COLORS ──
    const COLORS = [
      { name: 'Azul',     hex: '#3B82F6' },
      { name: 'Índigo',   hex: '#6366F1' },
      { name: 'Roxo',     hex: '#9B59D0' },
      { name: 'Rosa',     hex: '#E8547A' },
      { name: 'Vermelho', hex: '#EF4444' },
      { name: 'Laranja',  hex: '#F97316' },
      { name: 'Âmbar',    hex: '#F59E0B' },
      { name: 'Lima',     hex: '#84CC16' },
      { name: 'Verde',    hex: '#22C55E' },
      { name: 'Turquesa', hex: '#14B8A6' },
      { name: 'Ciano',    hex: '#06B6D4' },
    ];
 
    let activeColor = '#E8547A';
 
    const colorGrid = document.getElementById('colorGrid');
    COLORS.forEach(c => {
      const s = document.createElement('div');
      s.className = 'color-swatch' + (c.hex === activeColor ? ' active' : '');
      s.style.background = c.hex;
      s.style.setProperty('--swatch-color', c.hex);
      s.title = c.name;
      s.addEventListener('click', () => {
        document.querySelectorAll('.color-swatch').forEach(x => x.classList.remove('active'));
        s.classList.add('active');
        activeColor = c.hex;
        applyAccent(c.hex);
      });
      colorGrid.appendChild(s);
    });
 
    function hexToRgb(hex) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `${r}, ${g}, ${b}`;
    }
 
    function applyAccent(hex) {
      document.documentElement.style.setProperty('--accent', hex);
      document.documentElement.style.setProperty('--accent-rgb', hexToRgb(hex));
      document.getElementById('accentBar').style.background = hex;
      document.getElementById('previewBtn').style.background = hex;
      document.getElementById('previewBadge').style.color = hex;
      document.getElementById('previewBadge').style.borderColor = `rgba(${hexToRgb(hex)}, 0.3)`;
      document.getElementById('previewBadge').style.background = `rgba(${hexToRgb(hex)}, 0.12)`;
    }
    applyAccent(activeColor);
 
    // ── THEMES ──
    const THEMES = [
      { id: 'aniversario', label: 'Aniversário',   icon: '🎂' },
      { id: 'infantil',    label: 'Infantil',       icon: '🪀' },
      { id: 'formatura',   label: 'Formatura',      icon: '🎓' },
      { id: 'casamento',   label: 'Casamento',      icon: '💍' },
      { id: 'cha-bebe',    label: 'Chá de bebê',    icon: '🍼' },
      { id: 'cha-panela',  label: 'Chá de panela',  icon: '🍳' },
      { id: 'carnaval',    label: 'Carnaval',        icon: '🎭' },
      { id: 'pascoa',      label: 'Páscoa',          icon: '🐣' },
      { id: 'sao-joao',    label: 'São João',        icon: '🎆' },
      { id: 'halloween',   label: 'Halloween',       icon: '🎃' },
      { id: 'natal',       label: 'Natal',           icon: '🎄' },
      { id: 'outro',       label: 'Outro',           icon: '🎊' },
    ];
 
    let activeTheme = 'aniversario';
 
    const themeGrid = document.getElementById('themeGrid');
    THEMES.forEach(t => {
      const card = document.createElement('div');
      card.className = 'theme-card' + (t.id === activeTheme ? ' active' : '');
      card.innerHTML = `<div class="theme-card-img">${t.icon}</div><div class="theme-card-label">${t.label}</div>`;
      card.addEventListener('click', () => {
        document.querySelectorAll('.theme-card').forEach(x => x.classList.remove('active'));
        card.classList.add('active');
        activeTheme = t.id;
        document.getElementById('previewThemeIcon').textContent = t.icon;
        document.getElementById('previewBadge').textContent = t.label;
      });
      themeGrid.appendChild(card);
    });
 
    // ── STYLE TOGGLE ──
    const darkToggle  = document.getElementById('darkToggle');
    const toggleLabel = document.getElementById('toggleLabel');
    const inviteCard  = document.getElementById('inviteCard');
 
    darkToggle.addEventListener('change', () => {
      if (darkToggle.checked) {
        inviteCard.className = 'invite-card dark-style';
        toggleLabel.textContent = 'Escuro';
      } else {
        inviteCard.className = 'invite-card light-style';
        toggleLabel.textContent = 'Claro';
      }
    });
 
    // ── RADIO ──
    document.querySelectorAll('.radio-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.radio-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const val = btn.querySelector('input').value;
        document.getElementById('local').placeholder =
          val === 'online' ? 'Informe o link do evento' : 'Informe o endereço do evento';
      });
    });
 
    // ── UPLOAD ──
    document.getElementById('coverUpload').addEventListener('change', function () {
      const file = this.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = e => {
        const src = e.target.result;
        const img = document.getElementById('coverImg');
        img.src = src;
        img.classList.add('visible');
        const thumb = document.getElementById('uploadThumb');
        thumb.src = src;
        thumb.classList.add('visible');
      };
      reader.readAsDataURL(file);
      document.getElementById('uploadFilename').textContent = file.name;
    });
 
    // ── LIVE PREVIEW ──
    document.getElementById('titulo').addEventListener('input', function () {
      document.getElementById('previewTitle').textContent = this.value || 'Nome do evento';
    });
 
    document.getElementById('inicio').addEventListener('change', updateDate);
    document.getElementById('fim').addEventListener('change', updateDate);
 
    function updateDate() {
      const s = document.getElementById('inicio').value;
      const e = document.getElementById('fim').value;
      if (s) {
        const fmt = new Date(s).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
        document.getElementById('previewDate').textContent = e
          ? fmt + ' – ' + new Date(e).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
          : fmt;
      } else {
        document.getElementById('previewDate').textContent = 'DD/MM/AAAA';
      }
    }
 
    document.getElementById('local').addEventListener('input', function () {
      document.getElementById('previewLocal').textContent = this.value || 'A definir';
    });
 
    document.getElementById('descricao').addEventListener('input', function () {
      document.getElementById('previewDesc').textContent = this.value || 'Detalhes do evento aparecerão aqui.';
    });
 
    // ── PHONE MASK ──
    document.getElementById('tel').addEventListener('input', function () {
      let v = this.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6)      v = '(' + v.slice(0, 2) + ') ' + v.slice(2, 7) + '-' + v.slice(7);
      else if (v.length > 2) v = '(' + v.slice(0, 2) + ') ' + v.slice(2);
      else if (v.length > 0) v = '(' + v;
      this.value = v;
    });
 
    // ── VALIDATION ──
    function showErr(id, msg) {
      const el = document.getElementById('err-' + id);
      if (msg) el.textContent = msg;
      el.classList.add('visible');
      const input = document.getElementById(id);
      if (input) input.classList.add('error');
    }
 
    function clearErr(id) {
      const el = document.getElementById('err-' + id);
      if (el) el.classList.remove('visible');
      const input = document.getElementById(id);
      if (input) input.classList.remove('error');
    }
 
    ['titulo', 'inicio', 'fim', 'local', 'descricao', 'nome', 'email', 'tel'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', () => clearErr(id));
    });
 
    document.getElementById('btnGerar').addEventListener('click', () => {
      let valid = true;
 
      const titulo = document.getElementById('titulo').value.trim();
      const inicio = document.getElementById('inicio').value;
      const fim    = document.getElementById('fim').value;
      const local  = document.getElementById('local').value.trim();
      const desc   = document.getElementById('descricao').value.trim();
      const nome   = document.getElementById('nome').value.trim();
      const email  = document.getElementById('email').value.trim();
      const tel    = document.getElementById('tel').value.trim();
      const termos = document.getElementById('termos').checked;
 
      if (!titulo) { showErr('titulo'); valid = false; }
      if (!inicio) { showErr('inicio'); valid = false; }
      if (!fim)    { showErr('fim');    valid = false; }
      if (inicio && fim && new Date(fim) <= new Date(inicio)) {
        showErr('fim', 'A data final deve ser posterior à data inicial');
        valid = false;
      }
      if (!local) { showErr('local');    valid = false; }
      if (!desc)  { showErr('descricao'); valid = false; }
      if (!nome)  { showErr('nome');      valid = false; }
 
      const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRx.test(email)) { showErr('email', 'Informe um e-mail válido'); valid = false; }
 
      const telClean = tel.replace(/\D/g, '');
      if (!tel || telClean.length < 10) { showErr('tel', 'Informe um telefone válido'); valid = false; }
 
      if (!termos) { showErr('termos', 'Aceite os termos para continuar'); valid = false; }
      else clearErr('termos');
 
      if (valid) openModal();
      else {
        const firstErr = document.querySelector('.field-error.visible');
        if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
 
    function openModal()  { document.getElementById('successModal').classList.add('visible'); }
    function closeModal() { document.getElementById('successModal').classList.remove('visible'); }
    document.getElementById('successModal').addEventListener('click', e => {
      if (e.target === e.currentTarget) closeModal();
    });