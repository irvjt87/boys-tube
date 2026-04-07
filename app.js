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
let player; // Global variable for the API player

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
            'iv_load_policy': 3,
            'enablejsapi': 1,
            // REQUIRED FOR BRAVE: Explicitly define the origin
            'origin': window.location.origin 
        },
        events: {
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

// Add this new function to handle restricted videos
function onPlayerError(event) {
    // 101 and 150 are the codes for "Embedding disabled by owner"
    if (event.data === 101 || event.data === 150) {
        console.warn("This video is restricted. Closing player to prevent exit.");
        playerContainer.style.display = 'none';
        player.stopVideo();
        alert("This specific video is locked by the owner and cannot play in the sandbox.");
    }
}

// 3. Close player when video ends (The "Leak" Fix)
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        playerContainer.style.display = 'none';
        player.stopVideo();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// 4. Show Home (Channel Folders)
function showHome() {
    playerContainer.style.display = 'none';
    if (player) player.stopVideo();
    
    document.querySelector('h2').innerText = "Pick a Channel";
    videoList.innerHTML = '';

    ALLOWED_CHANNELS.forEach(channel => {
        const folder = document.createElement('div');
        folder.className = 'video-card';
        
        // Zero-cost thumbnail trick
        const folderThumb = `https://i.ytimg.com/vi/${channel.id.replace('UU', '')}/mqdefault.jpg`;

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

// 5. Fetch Channel Videos (1 API unit)
async function fetchChannelVideos(playlistId, name) {
    const cacheKey = `cache_${playlistId}`;
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTime = localStorage.getItem(`${cacheKey}_time`);

    // If data exists and is less than 4 hours old, use it (0 API Units)
    if (cachedData && cacheTime && (Date.now() - cacheTime < 14400000)) {
        console.log(`Loading ${name} from local cache...`);
        renderChannelView(JSON.parse(cachedData), name);
        return;
    }

    // Otherwise, call the API (1 API Unit)
    videoList.innerHTML = `<p style="padding:20px;">Opening ${name}...</p>`;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${playlistId}&part=snippet&maxResults=100`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.items) {
            localStorage.setItem(cacheKey, JSON.stringify(data.items));
            localStorage.setItem(`${cacheKey}_time`, Date.now());
            renderChannelView(data.items, name);
        }
    } catch (e) {
        videoList.innerHTML = '<p style="padding:20px;">Error loading videos.</p>';
    }
}

// 6. Grid View
function renderChannelView(videos, name) {
    document.querySelector('h2').innerHTML = `<span onclick="showHome()" style="color:#3498db; cursor:pointer;">← Back</span> | ${name}`;
    videoList.innerHTML = '';
    
    // Logic Gate: Filter out videos that are likely Shorts
    const filteredVideos = videos.filter(video => {
        const title = video.snippet.title.toLowerCase();
        const description = video.snippet.description.toLowerCase();
        
        // Filter out by keywords (Cost: 0 Units)
        const isShortKeyword = title.includes('#shorts') || 
                             title.includes('shorts') || 
                             description.includes('#shorts');
        
        return !isShortKeyword;
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

// 7. Play Video via API (The "Black Box" Fix)
function playVideo(videoId) {
    playerContainer.style.display = 'block';
    
    // Using loadVideoById is much safer than changing .src 
    // as it prevents the playlist "drawer" from rendering.
    player.loadVideoById({
        videoId: videoId,
        suggestedQuality: 'hd720'
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

showHome();