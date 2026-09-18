(async function addLikesVisualWithControls() {
    const prevHud = document.getElementById('yam-hud');
    if (prevHud) prevHud.remove();

    window.yamState = {
        running: true,
        paused: false
    };

    const waitFlow = async () => {
        while (window.yamState.paused && window.yamState.running) {
            await new Promise(r => setTimeout(r, 200));
        }
        return window.yamState.running;
    };

    const hud = document.createElement('div');
    hud.id = 'yam-hud';
    hud.style.cssText = `
        position: fixed; top: 24px; right: 24px; z-index: 999999;
        background: rgba(18, 18, 20, 0.92); backdrop-filter: blur(14px);
        border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 16px;
        padding: 16px 20px; color: #fff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        box-shadow: 0 12px 36px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
        width: 320px; box-sizing: border-box;
        transition: opacity 0.3s ease, transform 0.3s ease; user-select: none;
    `;
    hud.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:12px;">
            <div style="display:flex; align-items:center; gap:8px; min-width:0; overflow:hidden;">
                <div id="yam-dot" style="width:10px; height:10px; border-radius:50%; background:#22c55e; box-shadow:0 0 10px #22c55e; flex-shrink:0;"></div>
                <div style="font-weight:700; font-size:13px; letter-spacing:0.5px; text-transform:uppercase; color:#f43f5e; white-space:nowrap;">YM AutoLike</div>
            </div>
            <div style="display:flex; gap:6px; flex-shrink:0;">
                <button id="yam-btn-pause" style="width:68px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:6px; color:#fff; cursor:pointer; padding:5px 0; font-size:11px; font-weight:600; text-align:center; transition:all 0.2s;">Пауза</button>
                <button id="yam-btn-stop" style="width:54px; background:rgba(239,68,68,0.2); border:1px solid rgba(239,68,68,0.4); border-radius:6px; color:#f87171; cursor:pointer; padding:5px 0; font-size:11px; font-weight:600; text-align:center; transition:all 0.2s;">Стоп</button>
            </div>
        </div>
        <div id="yam-status" style="font-size:12px; color:#9ca3af; margin-bottom:8px;">Промотка плейлиста...</div>
        <div style="display:flex; align-items:baseline; justify-content:space-between;">
            <span style="font-size:11px; text-transform:uppercase; letter-spacing:0.5px; color:#6b7280;">Лайкнуто</span>
            <span id="yam-counter" style="font-size:26px; font-weight:800; color:#fff; font-variant-numeric:tabular-nums;">0</span>
        </div>
        <div id="yam-track" style="font-size:11px; color:#a1a1aa; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; width:100%; margin-top:4px;">-</div>
    `;
    document.body.appendChild(hud);

    const statusEl = hud.querySelector('#yam-status');
    const counterEl = hud.querySelector('#yam-counter');
    const trackEl = hud.querySelector('#yam-track');
    const dotEl = hud.querySelector('#yam-dot');
    const btnPause = hud.querySelector('#yam-btn-pause');
    const btnStop = hud.querySelector('#yam-btn-stop');

    const dismissHud = () => {
        hud.style.opacity = '0';
        hud.style.transform = 'translateY(-10px) scale(0.95)';
        setTimeout(() => hud.remove(), 300);
    };

    btnStop.addEventListener('click', () => {
        window.yamState.running = false;
        window.yamState.paused = false;
        dismissHud();
    });

    const initialDevToolsOpen = (window.outerHeight - window.innerHeight > 160) || (window.outerWidth - window.innerWidth > 160);
    const checkDevToolsClose = () => {
        const isOpen = (window.outerHeight - window.innerHeight > 160) || (window.outerWidth - window.innerWidth > 160);
        if (initialDevToolsOpen && !isOpen) {
            window.yamState.running = false;
            window.yamState.paused = false;
            window.removeEventListener('resize', checkDevToolsClose);
            dismissHud();
        }
    };
    window.addEventListener('resize', checkDevToolsClose);

    btnPause.addEventListener('click', () => {
        window.yamState.paused = !window.yamState.paused;
        if (window.yamState.paused) {
            btnPause.textContent = 'Дальше';
            btnPause.style.background = 'rgba(234,179,8,0.25)';
            btnPause.style.color = '#fde047';
            dotEl.style.background = '#eab308';
            dotEl.style.boxShadow = '0 0 10px #eab308';
            statusEl.textContent = 'Пауза';
            statusEl.style.color = '#eab308';
        } else {
            btnPause.textContent = 'Пауза';
            btnPause.style.background = 'rgba(255,255,255,0.08)';
            btnPause.style.color = '#fff';
            dotEl.style.background = '#22c55e';
            dotEl.style.boxShadow = '0 0 10px #22c55e';
            statusEl.textContent = 'Обработка треков ↑';
            statusEl.style.color = '#38bdf8';
        }
    });

    const getScroller = () => {
        const anyItem = document.querySelector('[role="row"], [class*="Track"], [class*="track"]');
        let el = anyItem ? anyItem.parentElement : null;
        while (el && el !== document.body) {
            const style = window.getComputedStyle(el);
            if (['auto', 'scroll'].includes(style.overflowY) && el.scrollHeight > el.clientHeight) {
                return el;
            }
            el = el.parentElement;
        }
        return window;
    };

    const scroller = getScroller();
    const isWindow = scroller === window;

    let unchangedRounds = 0;
    while (unchangedRounds < 3) {
        if (!await waitFlow()) return;

        const currentScroll = isWindow ? window.scrollY : scroller.scrollTop;
        if (isWindow) {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
        } else {
            scroller.scrollTop = scroller.scrollHeight;
        }

        await new Promise(r => setTimeout(r, 450));

        const newScroll = isWindow ? window.scrollY : scroller.scrollTop;
        if (newScroll === currentScroll) {
            unchangedRounds++;
        } else {
            unchangedRounds = 0;
        }
    }

    if (!window.yamState.paused) {
        statusEl.textContent = 'Обработка треков ↑';
        statusEl.style.color = '#38bdf8';
    }

    let addedCount = 0;
    const handledTrackIds = new Set();
    let atTopCount = 0;

    while (atTopCount < 3) {
        if (!await waitFlow()) break;

        const trackRows = Array.from(document.querySelectorAll('[role="row"], [class*="Track_root"], [class*="track-row"]'))
            .filter(row => !row.closest('[class*="PlayerBar"], [class*="player"]'))
            .reverse();

        for (const row of trackRows) {
            if (!await waitFlow()) break;

            const link = row.querySelector('a[href*="/album/"], a[href*="/track/"]');
            const titleEl = row.querySelector('[class*="title"], [class*="Title"], a[href*="/album/"]');
            const trackTitle = titleEl ? titleEl.innerText.trim() : (row.innerText.split('\n')[0] || 'Трек');
            const trackKey = row.getAttribute('data-id') || (link ? link.getAttribute('href') : null) || trackTitle;

            if (handledTrackIds.has(trackKey)) continue;

            const btn = row.querySelector('button[aria-label*="нравится"], button[aria-label*="лайк"], button[aria-pressed]');
            if (!btn) {
                handledTrackIds.add(trackKey);
                continue;
            }

            const label = (btn.getAttribute('aria-label') || '').toLowerCase();
            const pressed = btn.getAttribute('aria-pressed');

            const isAlreadyLiked = pressed === 'true' || 
                                  label.includes('удалить из понравившихся') || 
                                  label.includes('убрать из');

            if (!isAlreadyLiked) {
                btn.click();
                handledTrackIds.add(trackKey);
                addedCount++;

                counterEl.textContent = addedCount;
                trackEl.textContent = trackTitle;
                console.log(`%c[+❤️] %c${trackTitle}`, 'color: #f43f5e; font-weight: bold;', 'color: #fff;');
                await new Promise(r => setTimeout(r, 120));
            } else {
                handledTrackIds.add(trackKey);
            }
        }

        if (!window.yamState.running) break;

        const currentScroll = isWindow ? window.scrollY : scroller.scrollTop;
        if (currentScroll <= 0) {
            atTopCount++;
        } else {
            atTopCount = 0;
        }

        if (isWindow) {
            window.scrollBy({ top: -600, behavior: 'instant' });
        } else {
            scroller.scrollBy({ top: -600, behavior: 'instant' });
        }

        await new Promise(r => setTimeout(r, 550));
    }

    window.removeEventListener('resize', checkDevToolsClose);

    if (window.yamState.running) {
        statusEl.textContent = 'Завершено';
        statusEl.style.color = '#22c55e';
        btnPause.remove();
        btnStop.remove();
        setTimeout(dismissHud, 3500);
    }
})();