const API_KEY = 'AIzaSyDm-xk-2x0bDbW0FikDJDBMYT5t33QA6BQ';

const ALLOWED_CHANNELS = [
    { id: 'UUfpCQ89W9wjkHc8J_6eTbBg', name: 'Outdoor Boys' },
    { id: 'UUiLW00N3_Qe5yazpDk8xxjA', name: 'Outdoor Tom' },
    { id: 'UUIMXKin1fXXCeq2UJePJEog', name: 'My Self Reliance' },
    { id: 'UUNepEAWZH0TBu7dkxIbluDw', name: 'Dad, How Do I?' },
    { id: 'UUq0fxytZwEYul4AmfEiXL_w', name: 'Zen Garden Oasis' },
    { id: 'PLU6AbyBWHPOtBBMOm7HwK2dEvGkrnpZvy', name: 'Prager-Trailblazers' },
    { id: 'PLU6AbyBWHPOsDaw5dQ4VVNVlhWKe0MaCx', name: 'Prager-Hustle' },
    { id: 'PLU6AbyBWHPOuH5OQLqaSi2xZqth4WTW_c', name: 'Prager-History' },
    { id: 'PLU6AbyBWHPOsqu6Oylcqp0GoOdAAETK72', name: 'Prager-U.S.Citizenship' },
    { id: 'PLU6AbyBWHPOvJNhiuJ2oKLOg77Udus7Fs', name: 'Prager-Cash Course' },
    { id: 'UUs7ywDt1v4zHhn7sfCao-lQ', name: 'Sam Eckholm' },
    { id: 'UUShDR6hPfOqyUjMbasOrb8w', name: 'Warrior Kids' },
    { id: 'UUzWn_gTaXyH5Idyo8Raf7_A', name: 'Catfish and Carp' },
    { id: 'UU8H3lzJU5Qm-s3WVroB87kw', name: 'AWMI'},
    { id: 'UU8TdKeCw11lF9QYX33wmWeQ', name: 'Rick McFarland - River Rock'},
    { id: 'UUmPBWknVW9b4oCkgtqnfCyA', name: 'Greg Mohr'},
    { id: 'UUPfldVy-GUtV-0n7n9v_xhg', name: 'Keith Moore Faith Life' },
    { id: 'UUsljKOcYKll4vQmvPOsovkQ', name: 'Charis'},
    { id: 'UUxrLpZPsYKvE7qSiULRaT7g', name: 'GTN'},
    { id: 'UUZA2cbFAHOcwY3V1T6tLfYQ', name: 'Barry Bennett'},
    { id: 'UU9tPS5igk3NOyDP0XLX96bw', name: 'Duck Dynasty' },
    { id: 'UUEDp4UbPxHjGT7B1cRZXt_w', name: 'Shotgun Scientists' },
    { id: 'UUfU5tYD7fuHC9E4DaxsTH-g', name: 'Stalekracker' },
    { id: 'UUHstNaT6R-1zA0lBU_XBr_Q', name: 'Marines' }
];

const videoList = document.getElementById('video-list');
const playerContainer = document.getElementById('player-container');
let player; 

// 1. Load YouTube IFrame API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 2. Initialize Player
function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-player', {
        height: '360',
        width: '640',
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
            'autoplay': 0,
            'rel': 0,
            'modestbranding': 1,
            'playsinline': 1, 
            'fs': 0,          
            'iv_load_policy': 3,
            'enablejsapi': 1,
            'origin': window.location.origin 
        },
        events: {
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

function onPlayerError(event) {
    if (event.data === 101 || event.data === 150) {
        playerContainer.style.display = 'none';
        player.stopVideo();
        alert("This video is locked and cannot play in the sandbox.");
    }
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        showHome();
    }
}

// 4. Show Home
function showHome() {
    playerContainer.classList.remove('active');
    playerContainer.style.display = 'none';
    const backBtn = document.getElementById('back-btn');
    if (backBtn) backBtn.style.display = 'none';
    
    if (player) player.stopVideo();
    
    document.querySelector('h2').innerText = "Pick a Channel";
    videoList.innerHTML = '';

    ALLOWED_CHANNELS.forEach(channel => {
        const folder = document.createElement('div');
        folder.className = 'video-card';
        
        let folderThumb;
        if (channel.id.startsWith('UU')) {
            folderThumb = `https://i.ytimg.com/vi/${channel.id.replace('UU', '')}/mqdefault.jpg`;
        } else {
            folderThumb = 'https://i.ytimg.com/vi/38pP0_Z-kMw/mqdefault.jpg'; 
        }

        folder.innerHTML = `
            <div style="position:relative;">
                <img class="video-thumb" src="${folderThumb}" style="border: 3px solid #333; filter: brightness(0.7);">
                <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); font-weight:bold; font-size:18px; text-shadow: 2px 2px 4px #000;">OPEN</div>
            </div>
            <div class="video-title" style="text-align:center; font-weight:bold; padding: 10px 0;">${channel.name}</div>
        `;
        
        folder.onclick = () => fetchChannelVideos(channel.id, channel.name);
        videoList.appendChild(folder);
    });
}

// 5. Fetch Channel Videos (With Duration Filtering)
async function fetchChannelVideos(playlistId, name) {
    const cacheKey = `cache_${playlistId}`;
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTime = localStorage.getItem(`${cacheKey}_time`);

    if (cachedData && cacheTime && (Date.now() - cacheTime < 14400000)) {
        renderChannelView(JSON.parse(cachedData), name);
        return;
    }

    videoList.innerHTML = `<p style="padding:20px;">Auditing ${name} for "Real" videos...</p>`;
    
    try {
        let allItems = [];
        const baseUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${playlistId}&part=snippet&maxResults=50`;
        
        // Call 1: Get first 50
        const res1 = await fetch(baseUrl);
        const data1 = await res1.json();
        if (data1.items) allItems = data1.items;

        // Call 2: If Outdoor Boys, get next 50
        if (playlistId === 'UUfpCQ89W9wjkHc8J_6eTbBg' && data1.nextPageToken) {
            const res2 = await fetch(`${baseUrl}&pageToken=${data1.nextPageToken}`);
            const data2 = await res2.json();
            if (data2.items) allItems = allItems.concat(data2.items);
        }

        // --- THE DURATION AUDIT (The "Shorts" Filter) ---
        // 1. Extract IDs
        const videoIds = allItems.map(item => item.snippet.resourceId.videoId).join(',');
        
        // 2. Batch Request for Durations (1 API Unit)
        const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=contentDetails`;
        const detailsRes = await fetch(detailsUrl);
        const detailsData = await detailsRes.json();

        // 3. Map durations back to the items
        const durationMap = {};
        detailsData.items.forEach(item => {
            durationMap[item.id] = parseISO8601Duration(item.contentDetails.duration);
        });

        // 4. Final Filter: Must be > 60 seconds (Cost: 0 Units)
        const realVideos = allItems.filter(item => {
            const duration = durationMap[item.snippet.resourceId.videoId] || 0;
            return duration >= 60; 
        });

        if (realVideos.length > 0) {
            localStorage.setItem(cacheKey, JSON.stringify(realVideos));
            localStorage.setItem(`${cacheKey}_time`, Date.now());
            renderChannelView(realVideos, name);
        }
    } catch (e) {
        console.error(e);
        videoList.innerHTML = '<p style="padding:20px;">Error performing duration audit.</p>';
    }
}

// Helper to convert YouTube's "PT10M30S" format to total seconds
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
    document.querySelector('h2').innerHTML = `<span onclick="showHome()" style="color:#3498db; cursor:pointer;">← Back</span> | ${name}`;
    videoList.innerHTML = '';
    
    const filteredVideos = videos.filter(video => {
        const title = video.snippet.title.toLowerCase();
        const description = video.snippet.description.toLowerCase();
        return !(title.includes('shorts') || description.includes('#shorts'));
    });

    filteredVideos.forEach(video => {
        const videoId = video.snippet.resourceId.videoId;
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <img class="video-thumb" src="${video.snippet.thumbnails.medium.url}">
            <div class="video-title">${video.snippet.title}</div>
        `;
        card.onclick = () => playVideo(videoId);
        videoList.appendChild(card);
    });
}

// 7. Play Video
function playVideo(videoId) {
    if (!player || typeof player.loadVideoById !== 'function') return;

    playerContainer.classList.add('active');
    playerContainer.style.display = 'block';
    
    const backBtn = document.getElementById('back-btn');
    if (backBtn) backBtn.style.display = 'block';
    
    player.loadVideoById({
        videoId: videoId,
        suggestedQuality: 'hd720'
    });
}

// Initial Boot
showHome();