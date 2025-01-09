// document.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
// });
const allsongs = [
    {
        name: 'Hey_Shokha',
        singer: 'Somlata',
        music_src: 'Hey_Shokha',
        pic_src: 'pic-1'
    },
    {
        name: 'Baundule_Ghuri',
        singer: 'Arijit, Anupam',
        music_src: 'Baundule_Ghuri',
        pic_src: 'pic-2'
    },
    {
        name: 'Benche_Thakar_Gaan',
        singer: 'Rupam Islam',
        music_src: 'Benche_Thakar_Gaan',
        pic_src: 'pic-3'
    },
    {
        name: 'Habs',
        singer: 'Nirmal Roy',
        music_src: 'Habs',
        pic_src: 'pic-5'
    },
    {
        name: 'ya_lel_ya_lel',
        singer: 'Unknown',
        music_src: 'ya_lel_ya_lel',
        pic_src: 'pic-7'
    },
    {
        name: 'Mayabono Biharini Horini',
        singer: 'Somlata',
        music_src: 'Mayabono Biharini Horini',
        pic_src: 'pic-8'
    }
]

const imgs = document.querySelector('.imgs');
const song_name = document.querySelector('.m_name');
const artist_name = document.querySelector('.m_artist');
const main_song_track = document.querySelector('#song_source');
const prog_range = document.querySelector('#prog_range');
const ctrlIcon = document.querySelector('#ctrlIcon');
const main_btn = document.querySelector('.main_btn');
const pre_time = document.getElementById('pre_time');
const pro_time = document.getElementById('pro_time');


const close_btn = document.getElementById('close');
const music_list = document.querySelector('.music_list');
const song_duration = document.querySelector('.song_duration');
const list_song_name = document.querySelector('.list_song_name');
const list_singer = document.querySelector('.list_singer');
const show_song_list = document.querySelector('#song_list');


const song_loop = document.querySelector('#song_loop_btn_box');
const repeat_one = document.querySelector('#repeat_one');
const repeat = document.querySelector('#repeat');



const volume_btn = document.querySelector('#volume_btn');
const vol_range_box = document.querySelector('.vol_range_box');
const vol_rang = document.querySelector('#vol_rang');

const song_elem1 = document.querySelector('.song_elem1');
const song_elem2 = document.querySelector('.song_elem2');

// saved volume in local storage 
window.addEventListener('load', () => {
    const savedVolume = localStorage.getItem('volume');
    if (savedVolume !== null) {
        main_song_track.volume = savedVolume;
        vol_rang.value = savedVolume * 100;
    }
});

volume_btn.addEventListener('click', () => {
    if (vol_range_box.style.display == 'none') {
        vol_range_box.style.display = 'flex';
    } else {
        vol_range_box.style.display = 'none';
    }
})
vol_range_box.addEventListener('click', (e) => {
    e.stopPropagation();
});

vol_rang.addEventListener('input', () => {
    main_song_track.volume = vol_rang.value / 100;
    localStorage.setItem('volume', main_song_track.volume);
})


let repeat_song;
let song_index = 0;
let play_music_condition = false;
function loadAllSong(index) {
    imgs.src = `img/${allsongs[index].pic_src}.jpg`;
    song_name.innerHTML = allsongs[index].name;
    artist_name.innerHTML = allsongs[index].singer;
    main_song_track.src = `img/${allsongs[index].music_src}.mp3`;
    main_song_track.load();
}
loadAllSong(song_index);


// play button work 
main_btn.addEventListener('click', () => {
    if (ctrlIcon.classList.contains('fa-play')) {
        main_song_track.play();
        play_music_condition = true;
        ctrlIcon.classList.replace('fa-play', 'fa-pause');
        // for animation resume 
        startAnimations();
        resumeAnimation();
    } else if (ctrlIcon.classList.contains('fa-pause')) {
        main_song_track.pause();
        play_music_condition = false;
        ctrlIcon.classList.replace('fa-pause', 'fa-play');
        // for animation pause 
        pauseAnimation();
    }
});
function startAnimations() {
    song_elem1.classList.add('anim_1');
    song_elem2.classList.add('anim_2');
}
function resumeAnimation() {
    song_elem1.style.animationPlayState = 'running';
    song_elem2.style.animationPlayState = 'running';
}
function pauseAnimation() {

    song_elem1.style.animationPlayState = 'paused';
    song_elem2.style.animationPlayState = 'paused';
}

function song_again_play() {
    if (repeat_song) {
        main_song_track.currentTime = 0;
        main_song_track.play();
    } else {
        if (song_index < allsongs.length - 1) {
            song_index += 1;
        } else {
            song_index = 0;
        }
        loadAllSong(song_index);
        main_song_track.play();
    }
    play_music_condition = true;
    ctrlIcon.classList = 'fa-solid fa-pause';
}

//if the song is ended them the next song will play
main_song_track.addEventListener('ended', song_again_play);

// song loop work 
song_loop.addEventListener('click', () => {
    if (repeat_one.style.display == 'none' && repeat.style.display == 'block') {
        repeat_one.style.display = 'block';
        repeat.style.display = 'none';
        repeat_song = true;
    } else {
        repeat_one.style.display = 'none';
        repeat.style.display = 'block';
        repeat_song = false;
    }
});

ctrlIcon.addEventListener('click', () => {
    if (repeat_song && main_song_track.currentTime === main_song_track.duration) {
        main_song_track.currentTime = 0;
        main_song_track.play();
    }
});

// forword button work
function skip_next_btn() {
    if (song_index < allsongs.length - 1) {
        song_index += 1;
        play_music_condition = true;
        loadAllSong(song_index);
        main_song_track.play();
        ctrlIcon.classList = 'fa-solid fa-pause';
        // for animation resume 
        startAnimations();
        resumeAnimation();
    } else {
        song_index = 0;
        play_music_condition = true;
        loadAllSong(song_index);
        main_song_track.play();
        ctrlIcon.classList = 'fa-solid fa-pause';
    }
}

// previous button 
function skip_previous_btn() {
    if (song_index <= 0) {
        song_index = allsongs.length - 1;
        loadAllSong(song_index);
        main_song_track.play();
        // for animation resume 
        startAnimations();
        resumeAnimation();
        ctrlIcon.classList = 'fa-solid fa-pause';

    } else {
        song_index = song_index - 1;
        loadAllSong(song_index);
        main_song_track.play();
        ctrlIcon.classList = 'fa-solid fa-pause';
    }
}

// input track work 
prog_range.addEventListener('input', () => {
    main_song_track.currentTime = main_song_track.duration * (prog_range.value / 100);
});

main_song_track.addEventListener('timeupdate', () => {
    if (!isNaN(main_song_track.duration)) {
        prog_range.value = (main_song_track.currentTime / main_song_track.duration) * 100;
    }
});

prog_range.addEventListener('change', () => {
    main_song_track.play();
    ctrlIcon.classList = 'fa-solid fa-pause';
});


function timeFormate(sec) {
    const minutes = Math.floor(sec / 60);
    const second = Math.floor(sec % 60);
    return `${minutes}:${second < 10 ? '0' : ''}${second}`;
}

main_song_track.addEventListener('timeupdate', () => {
    pre_time.textContent = timeFormate(main_song_track.currentTime);
    if (!isNaN(main_song_track.duration)) {
        pro_time.textContent = timeFormate(main_song_track.duration);
    }
})

allsongs.forEach((song, index) => {
    const song_items = document.querySelector('.song_items');
    const li = document.createElement('li');
    li.classList.add('li_list');
    li.innerHTML =
        `<div class="row" style='text-align:start;'>
                <span class="list_song_name">${song.name}</span>
            </div>
            <div>
                <span class="list_singer">${song.singer}</span>
        </div>`;

    li.addEventListener('click', () => {
        main_song_track.src = `img/${song.music_src}.mp3`;
        main_song_track.play();
        // for animation resume 
        startAnimations();
        resumeAnimation();
        play_music_condition = true;
        ctrlIcon.classList = 'fa-solid fa-pause';
        // update image, song name and artist name
        imgs.src = `img/${allsongs[index].pic_src}.jpg`;
        song_name.innerHTML = allsongs[index].name;
        artist_name.innerHTML = allsongs[index].singer;
        song_index = index;
        // console.log(`${song.name} (Index: ${index})`);
    })

    song_items.appendChild(li);
})



show_song_list.addEventListener('click', () => {
    music_list.style.top = '50%';
})

close_btn.addEventListener('click', () => {
    music_list.style.top = '100%';
})


