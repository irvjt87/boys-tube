const API_KEY = 'AIzaSyDm-xk-2x0bDbW0FikDJDBMYT5t33QA6BQ';

const ALLOWED_CHANNELS = [
    { id: 'PLlBVuTSjOrclb0iCMSRpS_H1lSrlSVeEm', name: 'Science Buddies-Elenco' },
    { id: 'UU1usuCeFHj1tQikOJ00SWyA', name: 'Patriot DIY' },
    { id: 'UU3-GqvQtVl0x5o3TiQi2gCg', name: 'Meyer Makes' },
    { id: 'UUkMCoe_j9MEtkGh9zsZGzLw', name: 'Wild Birds Unlimited' },
    { id: 'UUfpCQ89W9wjkHc8J_6eTbBg', name: 'Outdoor Boys' },
    { id: 'UUiLW00N3_Qe5yazpDk8xxjA', name: 'Outdoor Tom' },
    { id: 'PLLb4Aujw26R6FsJJ3py4ponBlBxp0UnRA', name: 'Discovery UK' },
    { id: 'UUIMXKin1fXXCeq2UJePJEog', name: 'My Self Reliance' },
    { id: 'UUNepEAWZH0TBu7dkxIbluDw', name: 'Dad, How Do I?' },
    { id: 'UUq0fxytZwEYul4AmfEiXL_w', name: 'Zen Garden Oasis' },
    { id: 'UUasG9kJWi1eVxM0QkyqKVJQ', name: 'Hand Tool Rescue' },
    { id: 'UUUtWNBWbFL9We-cdXkiAuJA', name: 'This Old House' },
    { id: 'PLU6AbyBWHPOtBBMOm7HwK2dEvGkrnpZvy', name: 'Prager-Trailblazers' },
    { id: 'PLU6AbyBWHPOsDaw5dQ4VVNVlhWKe0MaCx', name: 'Prager-Hustle' },
    { id: 'PLU6AbyBWHPOuH5OQLqaSi2xZqth4WTW_c', name: 'Prager-History' },
    { id: 'PLU6AbyBWHPOsqu6Oylcqp0GoOdAAETK72', name: 'Prager-U.S.Citizenship' },
    { id: 'PLU6AbyBWHPOvJNhiuJ2oKLOg77Udus7Fs', name: 'Prager-Cash Course' },
    { id: 'UUs7ywDt1v4zHhn7sfCao-lQ', name: 'Sam Eckholm' },
    { id: 'UUShDR6hPfOqyUjMbasOrb8w', name: 'Warrior Kids' },
    { id: 'UUzWn_gTaXyH5Idyo8Raf7_A', name: 'Catfish and Carp' },
    { id: 'UU8H3lzJU5Qm-s3WVroB87kw', name: 'AWMI' },
    { id: 'UU8TdKeCw11lF9QYX33wmWeQ', name: 'Rick McFarland - River Rock' },
    { id: 'UUmPBWknVW9b4oCkgtqnfCyA', name: 'Greg Mohr' },
    { id: 'UUPfldVy-GUtV-0n7n9v_xhg', name: 'Keith Moore Faith Life' },
    { id: 'UUsljKOcYKll4vQmvPOsovkQ', name: 'Charis' },
    { id: 'UUxrLpZPsYKvE7qSiULRaT7g', name: 'GTN' },
    { id: 'UUZA2cbFAHOcwY3V1T6tLfYQ', name: 'Barry Bennett' },
    { id: 'UU9tPS5igk3NOyDP0XLX96bw', name: 'Duck Dynasty' },
    { id: 'UUEDp4UbPxHjGT7B1cRZXt_w', name: 'Shotgun Scientists' },
    { id: 'UUfU5tYD7fuHC9E4DaxsTH-g', name: 'Stalekracker' },
    { id: 'UUHstNaT6R-1zA0lBU_XBr_Q', name: 'Marines' }
];

const MAX_PAGES = 3; 
const videoList = document.getElementById('video-list');
const playerContainer = document.getElementById('player-container');

let player = null;
let isPlayerReady = false;
let pendingVideoId = null;

// 1. Load YouTube IFrame API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 2. Initialize Player
function onYouTubeIframeAPIReady() {
    const playerVarsObj = {
        'autoplay': 1,
        'rel': 0,
        'modestbranding': 1,
        'playsinline': 1, 
        'fs': 0,          
        'iv_load_policy': 3,
        'enablejsapi': 1,
        'cc_load_policy': 0
    };

    if (window.location.protocol.startsWith('http')) {
        playerVarsObj.origin = window.location.origin;
    }

    player = new YT.Player('video-player', {
        height: '360',
        width: '640',
        videoId: '38pP0_Z-kMw', // Default baseline ID to initialize iframe properly
        host: 'https://www.youtube-nocookie.com',
        playerVars: playerVarsObj,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

function onPlayerReady(event) {
    isPlayerReady = true;
    // Execute queued video load if user clicked prior to API readiness
    if (pendingVideoId) {
        const vidToPlay = pendingVideoId;
        pendingVideoId = null;
        playVideo(vidToPlay);
    }
}

function onPlayerError(event) {
    if (event.data === 101 || event.data === 200) {
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

// 4. Show Home View
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
    
    const header = document.querySelector('h2');
    if (header) header.innerText = "Pick a Channel";
    
    if (videoList) videoList.innerHTML = '';

    ALLOWED_CHANNELS.forEach(channel => {
        const folder = document.createElement('div');
        folder.className = 'video-card';
        
        const cacheKey = `cache_${channel.id}`;
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
        
        folder.onclick = () => fetchChannelVideos(channel.id, channel.name);
        if (videoList) videoList.appendChild(folder);
    });
}

// 5. Fetch Channel Videos
async function fetchChannelVideos(playlistId, name) {
    const cacheKey = `cache_${playlistId}`;
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTime = localStorage.getItem(`${cacheKey}_time`);

    if (cachedData && cacheTime && (Date.now() - Number(cacheTime) < 14400000)) {
        try {
            renderChannelView(JSON.parse(cachedData), name);
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

        const realVideos = allItems.filter(item => {
            const duration = durationMap[item.snippet.resourceId.videoId] || 0;
            return duration >= 60; 
        });

        if (realVideos.length > 0) {
            localStorage.setItem(cacheKey, JSON.stringify(realVideos));
            localStorage.setItem(`${cacheKey}_time`, Date.now().toString());
            renderChannelView(realVideos, name);
        } else {
            if (videoList) videoList.innerHTML = '<p style="padding:20px;">No long-form videos found.</p>';
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

// 6. Grid View
function renderChannelView(videos, name) {
    const header = document.querySelector('h2');
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
        card.onclick = () => playVideo(videoId);
        if (videoList) videoList.appendChild(card);
    });
}

// 7. Play Video
function playVideo(videoId) {
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

showHome();