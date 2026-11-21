// =============================================================
// CONFIGURATION & SETUP
// =============================================================
const API_KEY = 'AIzaSyDm-xk-2x0bDbW0FikDJDBMYT5t33QA6BQ';

const QUIET_START_MINUTES = (20 * 60) + 15; // 20:15 (8:15 PM)
const QUIET_END_MINUTES   = (6 * 60) + 30;  // 06:30 (6:30 AM)
const BEDTIME_WARN_MIN    = (20 * 60) + 10; // 20:10 (8:10 PM)

const MAX_WATCH_MINUTES   = 90;               // Allowed watch limit for timed channels
const WINDOW_HOURS        = 4;                // Rolling window size in hours
const STORAGE_KEY_LOG     = 'boystube_watch_log_v2';
const STORAGE_KEY_MODE    = 'boystube_device_mode';
const STORAGE_KEY_WATCHED = 'boystube_watched_videos_v1';
const CACHE_TTL_MS        = 14400000;         // 4 hours

const ALLOWED_CHANNELS = [
    // ALWAYS ALLOWED (Mobile + Desktop; No watch time logging)
    { id: 'UUPOxZjoHULhsO95SRN4ScPg', name: 'Badgerland Birding', limit: 'none' },
    { id: 'UUkUlhi62gcJaSM8K4oKmwxw', name: 'Badgerland Birding Extras', limit: 'none' },
    { id: 'UUuL60_Ko4m9xCaa4QDNgJrw', name: 'Bird Watching HQ', limit: 'none' },
    { id: 'UU5Lz88Rt3GT75YT2ORAmaMQ', name: 'Cornell Lab', limit: 'none' },
    { id: 'UUDjdXwT-KrFPsqOSg4KL8Nw', name: 'Lesley the Bird Nerd', limit: 'none' },
    { id: 'UUkMCoe_j9MEtkGh9zsZGzLw', name: 'Wild Birds Unlimited', limit: 'none' },
    { id: 'UU1QwrenXUp09s05EhFH-Hmw', name: 'Warbler Ridge Birds', limit: 'none' },
    { id: 'PLlBVuTSjOrclb0iCMSRpS_H1lSrlSVeEm', name: 'Science Buddies-Elenco', limit: 'none' },
    { id: 'UUNepEAWZH0TBu7dkxIbluDw', name: 'Dad, How Do I?', limit: 'none' },
    { id: 'UU1usuCeFHj1tQikOJ00SWyA', name: 'Patriot DIY', limit: 'none' },
    { id: 'UU3-GqvQtVl0x5o3TiQi2gCg', name: 'Meyer Makes', limit: 'none' },
    { id: 'UUq0fxytZwEYul4AmfEiXL_w', name: 'Zen Garden Oasis', limit: 'none' },
    { id: 'UUasG9kJWi1eVxM0QkyqKVJQ', name: 'Hand Tool Rescue', limit: 'none' },
    { id: 'UUUtWNBWbFL9We-cdXkiAuJA', name: 'This Old House', limit: 'none' },
    { id: 'UUs7ywDt1v4zHhn7sfCao-lQ', name: 'Sam Eckholm', limit: 'none' },
    { id: 'UUShDR6hPfOqyUjMbasOrb8w', name: 'Warrior Kids', limit: 'none' },
    { id: 'UU8H3lzJU5Qm-s3WVroB87kw', name: 'AWMI', limit: 'none' },
    { id: 'UU8TdKeCw11lF9QYX33wmWeQ', name: 'Rick McFarland - River Rock', limit: 'none' },
    { id: 'UUmPBWknVW9b4oCkgtqnfCyA', name: 'Greg Mohr', limit: 'none' },
    { id: 'UUPfldVy-GUtV-0n7n9v_xhg', name: 'Keith Moore Faith Life', limit: 'none' },
    { id: 'UUsljKOcYKll4vQmvPOsovkQ', name: 'Charis', limit: 'none' },
    { id: 'UUxrLpZPsYKvE7qSiULRaT7g', name: 'GTN', limit: 'none' },
    { id: 'UUZA2cbFAHOcwY3V1T6tLfYQ', name: 'Barry Bennett', limit: 'none' },

    // TIMED ENTERTAINMENT (Desktop/Windows Only; Subject to 90-min rolling limit)
    { id: 'UUKq3tXnvXnA0feJYmOx9MPw', name: 'The Wildlife Homestead', limit: 'timed' },
    { id: 'UUR1p6wj-IYFiZ77D5zPy0jA', name: 'Captain Factory', limit: 'timed' },
    { id: 'UUDBRkd8deH-Vk1nWQKWJ72w', name: 'Captain Factory 2', limit: 'timed' },
    { id: 'UUfpCQ89W9wjkHc8J_6eTbBg', name: 'Outdoor Boys', limit: 'timed' },
    { id: 'UUiLW00N3_Qe5yazpDk8xxjA', name: 'Outdoor Tom', limit: 'timed' },
    { id: 'PLLb4Aujw26R6FsJJ3py4ponBlBxp0UnRA', name: 'Discovery UK', limit: 'timed' },
    { id: 'UUIMXKin1fXXCeq2UJePJEog', name: 'My Self Reliance', limit: 'timed' },
    { id: 'PLU6AbyBWHPOtBBMOm7HwK2dEvGkrnpZvy', name: 'Prager-Trailblazers', limit: 'timed' },
    { id: 'PLU6AbyBWHPOsDaw5dQ4VVNVlhWKe0MaCx', name: 'Prager-Hustle', limit: 'timed' },
    { id: 'PLU6AbyBWHPOuH5OQLqaSi2xZqth4WTW_c', name: 'Prager-History', limit: 'timed' },
    { id: 'PLU6AbyBWHPOsqu6Oylcqp0GoOdAAETK72', name: 'Prager-U.S.Citizenship', limit: 'timed' },
    { id: 'PLU6AbyBWHPOvJNhiuJ2oKLOg77Udus7Fs', name: 'Prager-Cash Course', limit: 'timed' },
    { id: 'UUzWn_gTaXyH5Idyo8Raf7_A', name: 'Catfish and Carp', limit: 'timed' },
    { id: 'UU9tPS5igk3NOyDP0XLX96bw', name: 'Duck Dynasty', limit: 'timed' },
    { id: 'UUEDp4UbPxHjGT7B1cRZXt_w', name: 'Shotgun Scientists', limit: 'timed' },
    { id: 'UUfU5tYD7fuHC9E4DaxsTH-g', name: 'Stalekracker', limit: 'timed' },
    { id: 'UU_IlCLa1YyWetqtzU_eR6-g', name: 'Bruce Mitchell', limit: 'timed' },
    { id: 'UUHstNaT6R-1zA0lBU_XBr_Q', name: 'Marines', limit: 'timed' },
    { id: 'UUpuofAxlrUAgnu7QEwKQwxw', name: 'DoW', limit: 'timed' }
];

const videoList = document.getElementById('video-list');
const playerContainer = document.getElementById('player-container');
const scrollSentinel = document.getElementById('scroll-sentinel');
const unwatchedToggleBtn = document.getElementById('unwatched-toggle');

let isAPIReady = false;
let ytPlayer = null;
let currentPlayingLimit = 'none';
let warningShownType = null;
let hideWatchedOnly = false;

// Active Channel Pagination State
let activeSessionId = 0;
let activeChannel = null; // { id, name, limit, nextPageToken, items, isFetching }

// =============================================================
// WATCHED VIDEO TRACKING & FILTERING
// =============================================================
function getWatchedSet() {
    try {
        const raw = JSON.parse(localStorage.getItem(STORAGE_KEY_WATCHED)) || [];
        return new Set(raw);
    } catch (e) {
        return new Set();
    }
}

function markVideoWatched(videoId) {
    const watched = getWatchedSet();
    watched.add(videoId);
    // Keep last 3,000 watched IDs (~45 KB max)
    const trimmed = Array.from(watched).slice(-3000);
    try {
        localStorage.setItem(STORAGE_KEY_WATCHED, JSON.stringify(trimmed));
    } catch (e) {}

    const card = document.querySelector(`.video-card[data-video-id="${videoId}"]`);
    if (card && !card.classList.contains('watched')) {
        card.classList.add('watched');
        const badge = document.createElement('div');
        badge.className = 'watched-badge';
        badge.textContent = '✓ Watched';
        card.appendChild(badge);
    }
}

function toggleUnwatchedFilter() {
    hideWatchedOnly = !hideWatchedOnly;
    if (videoList) {
        videoList.classList.toggle('hide-watched', hideWatchedOnly);
    }
    if (unwatchedToggleBtn) {
        unwatchedToggleBtn.classList.toggle('active', hideWatchedOnly);
        unwatchedToggleBtn.textContent = hideWatchedOnly ? 'Showing Unwatched' : 'Hide Watched';
    }
    // If hiding watched videos cleared the viewport, auto-pull older pages
    if (hideWatchedOnly && activeChannel && activeChannel.nextPageToken) {
        const visibleCards = videoList.querySelectorAll('.video-card:not(.watched)').length;
        if (visibleCards < 12) {
            loadMoreChannelVideos();
        }
    }
}

// =============================================================
// DEVICE PROFILE & CHANNEL FILTERING
// =============================================================
function getDeviceMode() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('mode')) {
        const mode = urlParams.get('mode').toLowerCase();
        localStorage.setItem(STORAGE_KEY_MODE, mode);
        return mode;
    }

    const savedMode = localStorage.getItem(STORAGE_KEY_MODE);
    if (savedMode) return savedMode;

    const ua = navigator.userAgent || '';
    const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    
    return (isIOS || isMobileUA || window.innerWidth < 768) ? 'mobile' : 'desktop';
}

function getVisibleChannels() {
    const mode = getDeviceMode();
    const modeIndicator = document.getElementById('mode-indicator');
    
    if (mode === 'mobile') {
        if (modeIndicator) modeIndicator.textContent = "Mobile (Always-On Only)";
        return ALLOWED_CHANNELS.filter(c => c.limit === 'none');
    }
    
    if (modeIndicator) modeIndicator.textContent = "Desktop (All Channels)";
    return ALLOWED_CHANNELS;
}

// =============================================================
// WATCH LOG & TIME LIMIT SYSTEM
// =============================================================
function getWatchLog() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY_LOG)) || [];
    } catch (e) {
        return [];
    }
}

function saveWatchLog(log) {
    localStorage.setItem(STORAGE_KEY_LOG, JSON.stringify(log));
}

function cleanOldLogs(log) {
    const cutoffTime = Date.now() - (WINDOW_HOURS * 60 * 60 * 1000);
    return log.filter(entry => entry.timestamp > cutoffTime);
}

function getWatchedSeconds() {
    const log = cleanOldLogs(getWatchLog());
    return log.reduce((sum, entry) => sum + entry.duration, 0);
}

function tickWatchTime() {
    let isPlaying = false;
    if (typeof YT !== 'undefined' && ytPlayer && typeof ytPlayer.getPlayerState === 'function') {
        isPlaying = (ytPlayer.getPlayerState() === YT.PlayerState.PLAYING);
    }

    const isPlayerActive = playerContainer && playerContainer.classList.contains('active');
    if (!isPlaying || !isPlayerActive || currentPlayingLimit !== 'timed') return;

    let log = cleanOldLogs(getWatchLog());
    const now = Date.now();

    // Interval runs every 5000ms -> add 5 seconds of elapsed watch time
    if (log.length > 0 && (now - log[log.length - 1].timestamp) < 7000) {
        log[log.length - 1].duration += 5;
        log[log.length - 1].timestamp = now;
    } else {
        log.push({ timestamp: now, duration: 5 });
    }

    saveWatchLog(log);
}

function checkLimits() {
    const now = new Date();
    const currentMinutes = (now.getHours() * 60) + now.getMinutes();

    // Bedtime Check
    const isQuietTime = (currentMinutes >= QUIET_START_MINUTES) || (currentMinutes < QUIET_END_MINUTES);
    if (isQuietTime) {
        showLockout("🌙", "Quiet Time", "BoysTube is off for the night. Time to get off screens!", "Unlocks at 6:30 AM");
        triggerMediaStop();
        return;
    }

    // Timed Channel Watch Limit Check
    const watchedSeconds = getWatchedSeconds();
    const maxAllowedSeconds = MAX_WATCH_MINUTES * 60;
    const remainingSeconds = maxAllowedSeconds - watchedSeconds;

    if (remainingSeconds <= 0 && currentPlayingLimit === 'timed') {
        const log = cleanOldLogs(getWatchLog());
        let timerText = "Try again later";
        if (log.length > 0) {
            const unlockTime = log[0].timestamp + (WINDOW_HOURS * 60 * 60 * 1000);
            const minsLeft = Math.ceil(Math.max(0, unlockTime - Date.now()) / 60000);
            timerText = `Unlocks in: ~${minsLeft} min`;
        }
        showLockout("⏳", "Watch Limit Reached", `You've used ${MAX_WATCH_MINUTES} minutes of timed watch time. Take a break!`, timerText);
        triggerMediaStop();
        return;
    }

    const lockoutScreen = document.getElementById('lockout-screen');
    if (lockoutScreen) lockoutScreen.style.display = 'none';

    // Warnings
    if (currentMinutes >= BEDTIME_WARN_MIN && currentMinutes < QUIET_START_MINUTES) {
        if (warningShownType !== 'bedtime') {
            showToast("🌙 5 minutes until quiet time!");
            warningShownType = 'bedtime';
        }
    } else if (remainingSeconds <= 300 && remainingSeconds > 0 && currentPlayingLimit === 'timed') {
        if (warningShownType !== 'timelimit') {
            showToast("⏳ 5 minutes of watch time remaining!");
            warningShownType = 'timelimit';
        }
    }
}

function showToast(message) {
    const toast = document.getElementById('bedtime-warning');
    const toastText = document.getElementById('warning-text');
    const okBtn = document.getElementById('warning-ok-btn');
    if (!toast) return;

    if (toastText) toastText.textContent = message;
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    
    setTimeout(() => { toast.style.opacity = '1'; }, 50);

    const fadeOut = () => {
        toast.style.opacity = '0';
        setTimeout(() => { toast.style.display = 'none'; }, 500);
    };

    const autoFadeTimer = setTimeout(fadeOut, 5000);

    okBtn.onclick = () => {
        clearTimeout(autoFadeTimer);
        fadeOut();
    };
}

function showLockout(icon, title, msg, timerText) {
    const screen = document.getElementById('lockout-screen');
    const iconEl = document.getElementById('lockout-icon');
    const titleEl = document.getElementById('lockout-title');
    const msgEl = document.getElementById('lockout-msg');
    const timerEl = document.getElementById('lockout-timer');

    if (!screen) return;

    if (iconEl) iconEl.textContent = icon;
    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.textContent = msg;
    if (timerEl) timerEl.textContent = timerText;

    screen.style.display = 'flex';
}

// =============================================================
// YOUTUBE IFRAME PLAYER (SANDBOXED)
// =============================================================
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

function onYouTubeIframeAPIReady() {
    isAPIReady = true;
    
    const cleanOrigin = (window.location.origin && window.location.origin.startsWith('http'))
        ? window.location.origin
        : 'http://localhost';

    ytPlayer = new YT.Player('video-player', {
        height: '100%',
        width: '100%',
        videoId: '',
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
            'autoplay': 1,
            'rel': 0,             
            'modestbranding': 1,  
            'playsinline': 1,     
            'fs': 0,              
            'iv_load_policy': 3,  
            'enablejsapi': 1,
            'cc_load_policy': 0,
            'origin': cleanOrigin,
            'widget_referrer': cleanOrigin
        },
        events: {
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

function onPlayerError(event) {
    console.error("YouTube Player Error:", event.data);
    triggerMediaStop();
    alert("This video restricts embedded playback. Please pick another.");
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        try { ytPlayer.setOption('captions', 'track', {}); } catch (e) {}
    }
    if (event.data === YT.PlayerState.ENDED) {
        showHome();
    }
}

function playVideo(videoId, limitType) {
    currentPlayingLimit = limitType || 'none';

    if (currentPlayingLimit === 'timed') {
        const watchedSeconds = getWatchedSeconds();
        if (watchedSeconds >= (MAX_WATCH_MINUTES * 60)) {
            checkLimits();
            return;
        }
    }

    markVideoWatched(videoId);

    if (playerContainer) {
        playerContainer.classList.remove('hidden-player');
        playerContainer.classList.add('active');
    }
    
    const backBtn = document.getElementById('back-btn');
    if (backBtn) backBtn.style.display = 'block';

    if (isAPIReady && ytPlayer && typeof ytPlayer.loadVideoById === 'function') {
        ytPlayer.loadVideoById(videoId);
    }
}

function triggerMediaStop() {
    if (ytPlayer && typeof ytPlayer.stopVideo === 'function') {
        try { ytPlayer.stopVideo(); } catch (e) {}
    }
    showHome();
}

function showHome() {
    activeSessionId++;
    activeChannel = null;

    if (playerContainer) {
        playerContainer.classList.remove('active');
        playerContainer.classList.add('hidden-player');
    }
    const backBtn = document.getElementById('back-btn');
    if (backBtn) backBtn.style.display = 'none';

    if (unwatchedToggleBtn) {
        unwatchedToggleBtn.style.display = 'none';
    }
    if (scrollSentinel) {
        scrollSentinel.textContent = '';
    }
    
    if (ytPlayer && typeof ytPlayer.stopVideo === 'function') {
        try { ytPlayer.stopVideo(); } catch (e) {}
    }
    
    const header = document.getElementById('page-title');
    if (header) header.innerText = "Pick a Channel";
    
    if (videoList) {
        videoList.classList.remove('hide-watched');
        videoList.innerHTML = '';
    }

    const visibleChannels = getVisibleChannels();

    visibleChannels.forEach(channel => {
        const folder = document.createElement('div');
        folder.className = 'video-card';
        
        const cacheKey = `cache_v3_${channel.id}`;
        const cachedData = localStorage.getItem(cacheKey);
        let folderThumb = 'https://i.ytimg.com/vi/38pP0_Z-kMw/mqdefault.jpg';
        
        if (cachedData) {
            try {
                const parsed = JSON.parse(cachedData);
                if (parsed?.items?.length > 0 && parsed.items[0].thumb) {
                    folderThumb = parsed.items[0].thumb;
                }
            } catch (e) {}
        }

        folder.innerHTML = `
            <div style="position:relative;">
                <img class="video-thumb" loading="lazy" src="${folderThumb}" style="border: 3px solid #333; filter: brightness(0.7);">
                <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); font-weight:bold; font-size:18px; text-shadow: 2px 2px 4px #000; color:#fff;">OPEN</div>
            </div>
            <div class="video-title" style="text-align:center; font-weight:bold; padding: 10px 0;">${channel.name}</div>
        `;
        
        folder.onclick = () => openChannel(channel.id, channel.name, channel.limit);
        if (videoList) videoList.appendChild(folder);
    });
}

// =============================================================
// UNCAPPED PAGINATED DATA CATALOG FETCHING
// =============================================================
function isEnglishVideoTitle(title) {
    const langRegex = /\b(Vietnamese|Turkish|Thai|Swahili|Spanish|Español|French|Français|German|Deutsch|Russian|Portuguese|Hindi|Arabic|Italian|Tagalog|Korean|Chinese|Japanese|Farsi|Urdu)\b/i;
    if (langRegex.test(title)) return false;

    const nonEnglishScriptRegex = /[\u0e00-\u0e7f\u0400-\u04FF\u0600-\u06FF\u0900-\u097F\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fffİıĞğŞşÇçÖöÜü]/;
    if (nonEnglishScriptRegex.test(title)) return false;

    return true;
}

function saveChannelCache(playlistId, items, nextPageToken, timestamp) {
    const cacheKey = `cache_v3_${playlistId}`;
    const payload = JSON.stringify({
        items: items,
        nextPageToken: nextPageToken || null,
        timestamp: timestamp || Date.now()
    });
    try {
        localStorage.setItem(cacheKey, payload);
    } catch (e) {
        // Evict oldest cache_v3_* entry if iOS Safari 5MB quota is reached
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith('cache_v3_') && k !== cacheKey) {
                localStorage.removeItem(k);
                try { localStorage.setItem(cacheKey, payload); } catch (err) {}
                break;
            }
        }
    }
}

async function openChannel(playlistId, name, limitType) {
    activeSessionId++;
    const session = activeSessionId;

    const header = document.getElementById('page-title');
    if (header) header.innerHTML = `<span onclick="showHome()" style="color:#3498db; cursor:pointer;">← Back</span> | ${name}`;

    if (unwatchedToggleBtn) {
        unwatchedToggleBtn.style.display = 'inline-block';
        unwatchedToggleBtn.classList.toggle('active', hideWatchedOnly);
        unwatchedToggleBtn.textContent = hideWatchedOnly ? 'Showing Unwatched' : 'Hide Watched';
    }

    if (videoList) {
        videoList.innerHTML = '';
        videoList.classList.toggle('hide-watched', hideWatchedOnly);
    }

    // Remove legacy v2 cache if present
    localStorage.removeItem(`cache_v2_${playlistId}`);
    localStorage.removeItem(`cache_v2_${playlistId}_time`);

    const cacheKey = `cache_v3_${playlistId}`;
    const cachedRaw = localStorage.getItem(cacheKey);
    let cachedObj = null;

    if (cachedRaw) {
        try {
            const parsed = JSON.parse(cachedRaw);
            if (parsed && Array.isArray(parsed.items) && (Date.now() - parsed.timestamp < CACHE_TTL_MS)) {
                cachedObj = parsed;
            }
        } catch (e) {
            localStorage.removeItem(cacheKey);
        }
    }

    activeChannel = {
        id: playlistId,
        name: name,
        limit: limitType,
        nextPageToken: cachedObj ? cachedObj.nextPageToken : '',
        items: cachedObj ? [...cachedObj.items] : [],
        cacheTimestamp: cachedObj ? cachedObj.timestamp : Date.now(),
        isFetching: false,
        exhausted: cachedObj ? !cachedObj.nextPageToken : false
    };

    if (activeChannel.items.length > 0) {
        appendVideoCards(activeChannel.items, limitType);
        updateSentinelStatus();
        // If user has Hide Watched active and screen has few unwatched cards, pull more immediately
        if (hideWatchedOnly && activeChannel.nextPageToken) {
            const visibleCount = videoList.querySelectorAll('.video-card:not(.watched)').length;
            if (visibleCount < 12) {
                loadMoreChannelVideos(session);
            }
        }
        return;
    }

    await loadMoreChannelVideos(session);
}

async function loadMoreChannelVideos(sessionOverride) {
    if (!activeChannel || activeChannel.isFetching || activeChannel.exhausted) return;
    const session = sessionOverride || activeSessionId;

    activeChannel.isFetching = true;
    if (scrollSentinel) scrollSentinel.textContent = `Loading more ${activeChannel.name} videos...`;

    try {
        let newlyApproved = [];

        // Keep fetching pages until at least 20 full-length videos are gathered or archive ends
        while (newlyApproved.length < 20 && !activeChannel.exhausted) {
            if (session !== activeSessionId) return;

            const tokenParam = activeChannel.nextPageToken ? `&pageToken=${activeChannel.nextPageToken}` : '';
            const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${activeChannel.id}&part=snippet&maxResults=50${tokenParam}`;
            const res = await fetch(url);
            if (!res.ok) {
                activeChannel.exhausted = true;
                break;
            }

            const data = await res.json();
            const rawItems = data.items || [];
            activeChannel.nextPageToken = data.nextPageToken || null;
            if (!activeChannel.nextPageToken) {
                activeChannel.exhausted = true;
            }

            if (rawItems.length === 0) break;

            const videoIds = rawItems
                .map(item => item.snippet?.resourceId?.videoId)
                .filter(Boolean);

            const durationMap = {};
            if (videoIds.length > 0) {
                const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds.join(',')}&part=contentDetails`;
                const detailsRes = await fetch(detailsUrl);
                if (detailsRes.ok) {
                    const detailsData = await detailsRes.json();
                    (detailsData.items || []).forEach(d => {
                        durationMap[d.id] = parseISO8601Duration(d.contentDetails.duration);
                    });
                }
            }

            for (const item of rawItems) {
                const vid = item.snippet?.resourceId?.videoId;
                const title = item.snippet?.title || '';
                const thumb = item.snippet?.thumbnails?.medium?.url || '';
                if (!vid || !thumb || title === 'Private video' || title === 'Deleted video') continue;

                const duration = durationMap[vid] || 0;
                if (duration < 60) continue; // Exclude Shorts

                if (activeChannel.id === 'UUPfldVy-GUtV-0n7n9v_xhg' && !isEnglishVideoTitle(title)) {
                    continue;
                }

                // Deduplicate against already loaded items
                if (!activeChannel.items.some(existing => existing.id === vid)) {
                    newlyApproved.push({ id: vid, title: title, thumb: thumb });
                }
            }
        }

        if (session !== activeSessionId) return;

        if (newlyApproved.length > 0) {
            activeChannel.items = activeChannel.items.concat(newlyApproved);
            saveChannelCache(
                activeChannel.id,
                activeChannel.items,
                activeChannel.nextPageToken,
                activeChannel.cacheTimestamp
            );
            appendVideoCards(newlyApproved, activeChannel.limit);
        } else if (activeChannel.items.length === 0 && videoList) {
            videoList.innerHTML = '<p style="padding:20px;">No matching videos found.</p>';
        }
    } catch (e) {
        console.error("Catalog Fetch Error:", e);
        if (scrollSentinel) scrollSentinel.textContent = 'Error loading additional videos.';
    } finally {
        if (activeChannel) activeChannel.isFetching = false;
        updateSentinelStatus();
    }
}

function updateSentinelStatus() {
    if (!scrollSentinel || !activeChannel) return;
    if (activeChannel.exhausted) {
        scrollSentinel.textContent = `All ${activeChannel.items.length} videos loaded`;
    } else {
        scrollSentinel.textContent = `Showing ${activeChannel.items.length} videos — scroll down for more`;
    }
}

function parseISO8601Duration(duration) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
    return (hours * 3600) + (minutes * 60) + seconds;
}

function appendVideoCards(videos, limitType) {
    if (!videoList) return;
    const watchedSet = getWatchedSet();
    const fragment = document.createDocumentFragment();

    videos.forEach(video => {
        const isWatched = watchedSet.has(video.id);
        const card = document.createElement('div');
        card.className = isWatched ? 'video-card watched' : 'video-card';
        card.dataset.videoId = video.id;

        card.innerHTML = `
            <img class="video-thumb" loading="lazy" src="${video.thumb}">
            ${isWatched ? '<div class="watched-badge">✓ Watched</div>' : ''}
            <div class="video-title">${video.title}</div>
        `;
        card.onclick = () => playVideo(video.id, limitType);
        fragment.appendChild(card);
    });

    videoList.appendChild(fragment);
}

// =============================================================
// INFINITE SCROLL OBSERVER & EXECUTION TIMERS
// =============================================================
if (scrollSentinel && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && activeChannel && !activeChannel.isFetching && !activeChannel.exhausted) {
            loadMoreChannelVideos();
        }
    }, {
        root: null,
        rootMargin: '400px' // Pre-fetch 400px before reaching bottom
    });
    observer.observe(scrollSentinel);
}

setInterval(tickWatchTime, 5000); // Record 5s watch time every 5s for timed channels
setInterval(checkLimits, 10000);   // Check cutoff limits every 10s
checkLimits();                       // Initial check on load
showHome();