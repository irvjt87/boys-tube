const API_KEY = 'AIzaSyDm-xk-2x0bDbW0FikDJDBMYT5t33QA6BQ';

// Hardcode the allowed channel IDs here. 
// Example: UCp68_L633868... is Mark Rober
const ALLOWED_CHANNELS = [
    'UCfpCQ89W9wjkHc8J_6eTbBg',   //Outdoor Boys
    'UCNIFiHaLZkYASaWDdkC1njg',   //Duck Dynasty
    'UCiLW00N3_Qe5yazpDk8xxjA',   //Outdoor Tom
    'UCEDp4UbPxHjGT7B1cRZXt_w',   //Shotgun Scientists
    'UCs7ywDt1v4zHhn7sfCao-lQ',   //Sam Eckholm
    'UCzWn_gTaXyH5Idyo8Raf7_A',   //Catfish and Carp
    'UCfU5tYD7fuHC9E4DaxsTH-g',   //Stalekracker Official
    'UCHstNaT6R-1zA0lBU_XBr_Q',   //Marines
    '' // Add as many as you want
];

const videoList = document.getElementById('video-list');
const player = document.getElementById('video-player');

async function fetchAllowedVideos() {
    let allVideos = [];

    // Loop through each allowed channel and get their latest videos
    for (const channelId of ALLOWED_CHANNELS) {
        const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.items) {
            allVideos.push(...data.items.filter(item => item.id.videoId));
        }
    }

    renderVideos(allVideos);
}

function renderVideos(videos) {
    videoList.innerHTML = ''; // Clear loading state
    videos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <img class="video-thumb" src="${video.snippet.thumbnails.medium.url}" alt="thumbnail">
            <p style="font-size: 14px;">${video.snippet.title}</p>
        `;
        
        // When clicked, load the video into the player with strict parameters
        card.onclick = () => playVideo(video.id.videoId);
        videoList.appendChild(card);
    });
}

function playVideo(videoId) {
    // rel=0 ensures if videos end, it only suggests videos from the SAME channel
    // modestbranding=1 removes the YouTube logo
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    window.scrollTo(0, 0); // Scroll up to the player
}

// Start the app
fetchAllowedVideos();