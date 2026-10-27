const API_KEY = 'AIzaSyDm-xk-2x0bDbW0FikDJDBMYT5t33QA6BQ';

const QUIET_START_MINUTES = (20 * 60) + 15; // 20:15 (8:15 PM)
const QUIET_END_MINUTES   = (6 * 60) + 30;  // 06:30 (6:30 AM)
const BEDTIME_WARN_MIN    = (20 * 60) + 10; // 20:10 (8:10 PM)

const MAX_WATCH_MINUTES   = 90;              // Allowed watch limit for timed channels
const WINDOW_HOURS        = 4;               // Rolling window size in hours
const STORAGE_KEY_LOG     = 'boystube_watch_log_v2';
const STORAGE_KEY_MODE    = 'boystube_device_mode';

const ALLOWED_CHANNELS = [
    // ALWAYS ALLOWED (Mobile + Desktop; No watch time logging)
    { id: 'UUPOxZjoHULhsO95SRN4ScPg', name: 'Badgerland Birding', limit: 'none' },
    { id: 'UU5Lz88Rt3GT75YT2ORAmaMQ', name: 'Cornell Lab', limit: 'none' },
    { id: 'UUDjdXwT-KrFPsqOSg4KL8Nw', name: 'Lesley the Bird Nerd', limit: 'none' },
    { id: 'UUkMCoe_j9MEtkGh9zsZGzLw', name: 'Wild Birds Unlimited', limit: 'none' },
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
    { id: 'UUHstNaT6R-1zA0lBU_XBr_Q', name: 'Marines', limit: 'timed' }
];

const MAX_PAGES = 3;
const videoList = document.getElementById('video-list');
const playerContainer = document.getElementById('player-container');

let player = null;
let isPlayerReady = false;
let pendingVideoId = null;
let currentPlayingLimit = 'none'; // Tracks active video's limit type
let warningShownType = null;      // 'bedtime' or 'timelimit'

// =============================================================
// DEVICE PROFILE & CHANNEL FILTERING
// =============================================================
function getDeviceMode() {
    // 1. Explicit URL parameter override (e.g., index.html?mode=mobile or index.html?mode=desktop)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('mode')) {
        const mode = urlParams.get('mode').toLowerCase();
        localStorage.setItem(STORAGE_KEY_MODE, mode);
        return mode;
    }

    // 2. Saved preference in local storage
    const savedMode = localStorage.getItem(STORAGE_KEY_MODE);
    if (savedMode) return savedMode;

    // 3. Fallback Auto-Detection (iOS / Mobile user agent / small screen)
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
    } catch(e) {
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

// Only logs watch time if video playing is from a 'timed' channel
function tickWatchTime() {
    const isPlaying = playerContainer && 
                      (playerContainer.style.display === 'block' || playerContainer.classList.contains('active')) &&
                      currentPlayingLimit === 'timed';

    if (!isPlaying) return;

    let log = cleanOldLogs(getWatchLog());
    const now = Date.now();

    if (log.length > 0 && (now - log[log.length - 1].timestamp) < 6000) {
        log[log.length - 1].duration += 1;
        log[log.length - 1].timestamp = now;
    } else {
        log.push({ timestamp: now, duration: 1 });
    }

    saveWatchLog(log);
}

function checkLimits() {
    const now = new Date();
    const currentMinutes = (now.getHours() * 60) + now.getMinutes();

    // 1. BEDTIME HARD CUTOFF (20:15 - 06:30) - Applies across ALL devices & channels
    const isQuietTime = (currentMinutes >= QUIET_START_MINUTES) || (currentMinutes < QUIET_END_MINUTES);
    if (isQuietTime) {
        showLockout("🌙", "Quiet Time", "BoysTube is off for the night. Time to get off screens!", "Unlocks at 6:30 AM");
        triggerMediaStop();
        return;
    }

    // 2. WATCH TIME LIMIT (Desktop Timed Channels)
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

    // Clear lockout screen if active and within valid operating parameters
    const lockoutScreen = document.getElementById('lockout-screen');
    if (lockoutScreen) lockoutScreen.style.display = 'none';

    // 3. WARNING TOAST NOTIFICATIONS (5-minute alerts)
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

function triggerMediaStop() {
    document.querySelectorAll('iframe').forEach(iframe => iframe.src = '');
    document.querySelectorAll('video, audio').forEach(media => media.pause());
    showHome();
}

// =============================================================
// YOUTUBE PLAYER & APP NAVIGATION
// =============================================================
function isEnglishVideo(item) {
    const title = item.snippet?.title || '';
    const langRegex = /\b(Vietnamese|Turkish|Thai|Swahili|Spanish|Español|French|Français|German|Deutsch|Russian|Portuguese|Hindi|Arabic|Italian|Tagalog|Korean|Chinese|Japanese|Farsi|Urdu)\b/i;
    if (langRegex.test(title)) return false;

    const nonEnglishScriptRegex = /[\u0e00-\u0e7f\u0400-\u04FF\u0600-\u06FF\u0900-\u097F\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fffİıĞğŞşÇçÖöÜü]/;
    if (nonEnglishScriptRegex.test(title)) return false;

    return true;
}

// 1. Load YouTube IFrame API (MUST be www.youtube.com)
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api"; // <-- Do NOT change this to youtube-nocookie.com
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 2. Initialize Player with nocookie host option
function onYouTubeIframeAPIReady() {
    // Fallback origin check for local serving vs web hosting
    const currentOrigin = (window.location.protocol.startsWith('http')) 
        ? window.location.origin 
        : 'http://localhost';

    const playerVarsObj = {
        'autoplay': 1,
        'rel': 0,
        'modestbranding': 1,
        'playsinline': 1, 
        'fs': 0,          
        'iv_load_policy': 3,
        'enablejsapi': 1,
        'cc_load_policy': 0,
        'origin': currentOrigin
    };

    player = new YT.Player('video-player', {
        height: '360',
        width: '640',
        videoId: '38pP0_Z-kMw',
        host: 'https://www.youtube.com', // Use standard youtube.com to pass bot validation
        playerVars: playerVarsObj,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

function onPlayerReady() {
    isPlayerReady = true;
    if (pendingVideoId) {
        const vidToPlay = pendingVideoId;
        pendingVideoId = null;
        playVideo(vidToPlay, currentPlayingLimit);
    }
}

function onPlayerError(event) {
    if (event.data === 101 || event.data === 500) {
        if (playerContainer) playerContainer.style.display = 'none';
        if (player && typeof player.stopVideo === 'function') player.stopVideo();
        alert("The video owner disabled embedded playback for this video.");
    }
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        try {
            if (player && typeof player.setOption === 'function') {
                player.setOption('captions', 'track', {});
            }
        } catch (e) {
            console.warn("Caption disable error skipped:", e);
        }
    }

    if (event.data === YT.PlayerState.ENDED) {
        showHome();
    }
}

function showHome() {
    if (playerContainer) {
        playerContainer.classList.remove('active');
        playerContainer.style.display = 'none';
    }
    const backBtn = document.getElementById('back-btn');
    if (backBtn) backBtn.style.display = 'none';
    
    if (player && isPlayerReady && typeof player.stopVideo === 'function') {
        player.stopVideo();
    }
    
    const header = document.getElementById('page-title');
    if (header) header.innerText = "Pick a Channel";
    
    if (videoList) videoList.innerHTML = '';

    const visibleChannels = getVisibleChannels();

    visibleChannels.forEach(channel => {
        const folder = document.createElement('div');
        folder.className = 'video-card';
        
        const cacheKey = `cache_v2_${channel.id}`;
        const cachedData = localStorage.getItem(cacheKey);
        let folderThumb = 'https://i.ytimg.com/vi/38pP0_Z-kMw/mqdefault.jpg';
        
        if (cachedData) {
            try {
                const parsed = JSON.parse(cachedData);
                if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].snippet?.thumbnails?.medium?.url) {
                    folderThumb = parsed[0].snippet.thumbnails.medium.url;
                }
            } catch (e) {
                console.error("Cache parsing error", e);
            }
        }

        folder.innerHTML = `
            <div style="position:relative;">
                <img class="video-thumb" src="${folderThumb}" style="border: 3px solid #333; filter: brightness(0.7);">
                <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); font-weight:bold; font-size:18px; text-shadow: 2px 2px 4px #000; color:#fff;">OPEN</div>
            </div>
            <div class="video-title" style="text-align:center; font-weight:bold; padding: 10px 0;">${channel.name}</div>
        `;
        
        folder.onclick = () => fetchChannelVideos(channel.id, channel.name, channel.limit);
        if (videoList) videoList.appendChild(folder);
    });
}

async function fetchChannelVideos(playlistId, name, limitType) {
    const cacheKey = `cache_v2_${playlistId}`;
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTime = localStorage.getItem(`${cacheKey}_time`);

    if (cachedData && cacheTime && (Date.now() - Number(cacheTime) < 14400000)) {
        try {
            renderChannelView(JSON.parse(cachedData), name, limitType);
            return;
        } catch (e) {
            localStorage.removeItem(cacheKey);
            localStorage.removeItem(`${cacheKey}_time`);
        }
    }

    if (videoList) videoList.innerHTML = `<p style="padding:20px;">Fetching and Auditing ${name}...</p>`;
    
    try {
        let allItems = [];
        let nextPageToken = '';

        for (let i = 0; i < MAX_PAGES; i++) {
            const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${playlistId}&part=snippet&maxResults=50${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
            const res = await fetch(url);
            if (!res.ok) break;
            
            const data = await res.json();
            if (data.items) allItems = allItems.concat(data.items);
            
            nextPageToken = data.nextPageToken;
            if (!nextPageToken) break;
        }

        if (allItems.length === 0) {
            if (videoList) videoList.innerHTML = '<p style="padding:20px;">No videos found for this channel.</p>';
            return;
        }

        const durationMap = {};
        const videoIds = allItems.map(item => item.snippet.resourceId.videoId);
        
        for (let i = 0; i < videoIds.length; i += 50) {
            const chunk = videoIds.slice(i, i + 50).join(',');
            const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${chunk}&part=contentDetails`;
            const detailsRes = await fetch(detailsUrl);
            if (!detailsRes.ok) continue;
            
            const detailsData = await detailsRes.json();
            if (detailsData.items) {
                detailsData.items.forEach(item => {
                    durationMap[item.id] = parseISO8601Duration(item.contentDetails.duration);
                });
            }
        }

        let realVideos = allItems.filter(item => {
            const duration = durationMap[item.snippet.resourceId.videoId] || 0;
            return duration >= 60; // Exclude YouTube Shorts
        });

        if (playlistId === 'UUPfldVy-GUtV-0n7n9v_xhg') {
            realVideos = realVideos.filter(isEnglishVideo);
        }

        if (realVideos.length > 0) {
            localStorage.setItem(cacheKey, JSON.stringify(realVideos));
            localStorage.setItem(`${cacheKey}_time`, Date.now().toString());
            renderChannelView(realVideos, name, limitType);
        } else {
            if (videoList) videoList.innerHTML = '<p style="padding:20px;">No matching videos found.</p>';
        }
    } catch (e) {
        console.error("Audit Failure:", e);
        if (videoList) videoList.innerHTML = '<p style="padding:20px;">System Error: Failed to retrieve video list.</p>';
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

function renderChannelView(videos, name, limitType) {
    const header = document.getElementById('page-title');
    if (header) header.innerHTML = `<span onclick="showHome()" style="color:#3498db; cursor:pointer;">← Back</span> | ${name}`;
    if (videoList) videoList.innerHTML = '';
    
    videos.forEach(video => {
        const videoId = video.snippet.resourceId.videoId;
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <img class="video-thumb" src="${video.snippet.thumbnails.medium.url}">
            <div class="video-title">${video.snippet.title}</div>
        `;
        card.onclick = () => playVideo(videoId, limitType);
        if (videoList) videoList.appendChild(card);
    });
}

function playVideo(videoId, limitType) {
    currentPlayingLimit = limitType || 'none';

    // Enforce active watch limit before initiating playback on timed channels
    if (currentPlayingLimit === 'timed') {
        const watchedSeconds = getWatchedSeconds();
        if (watchedSeconds >= (MAX_WATCH_MINUTES * 60)) {
            checkLimits();
            return;
        }
    }

    if (!isPlayerReady || !player) {
        pendingVideoId = videoId;
        return;
    }

    if (playerContainer) {
        playerContainer.classList.add('active');
        playerContainer.style.display = 'block';
    }
    
    const backBtn = document.getElementById('back-btn');
    if (backBtn) backBtn.style.display = 'block';
    
    if (typeof player.loadVideoById === 'function') {
        player.loadVideoById({
            videoId: videoId,
            suggestedQuality: 'hd720'
        });
    }
}

// Execution Timers
setInterval(tickWatchTime, 5000); // Record watch time every 5s for timed channels
setInterval(checkLimits, 10000);   // Check cutoff limits every 10s
checkLimits();                      // Initial check on load
showHome();