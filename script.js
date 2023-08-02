//HOME
function refresh(){
  location.reload();
}
const refreshButton = document.getElementById('home');
refreshButton.addEventListener('click',refresh);
//search
const searchIcon = document.getElementById('searchIcon');
const searchBox = document.getElementById('searchBox');

searchIcon.addEventListener('click', function() {
  searchBox.classList.toggle('hidden');
  if (!searchBox.classList.contains('hidden')) {
    document.getElementById('SearchInput').focus();
  }
});
  const searchInput = document.getElementById('SearchInput');
  const populerList = document.querySelectorAll('.populer-list');
  const trendingList = document.querySelectorAll('.trending-list');

  searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    populerList.forEach(item => {
      const title = item.querySelector('h3').innerText.toLowerCase();
      const artist = item.querySelector('p').innerText.toLowerCase();
      if (title.includes(searchTerm) || artist.includes(searchTerm)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
    trendingList.forEach(item => {
      const title = item.querySelector('h3').innerText.toLowerCase();
      const artist = item.querySelector('p').innerText.toLowerCase();
      if (title.includes(searchTerm) || artist.includes(searchTerm)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });

// JavaScript untuk pemutar musik
function playAudio(audioPath, imagePath ) {
  let audioPlayer = document.getElementById('audioPlayer');
  let audioSource = document.getElementById('audioSource');
  let currentImage = document.getElementById('currentImage');
  let PopulerPlaylist = document.querySelectorAll('.populer-list');
  let TrendingPlaylist = document.querySelectorAll('.trending-list');
  let nyom1 = document.getElementById('nyom1');
  let nyom2 = document.getElementById('nyom2');
  let currentPlaylistItem = event.currentTarget;
  let songText1 = currentPlaylistItem.querySelector('h3').innerText;
  let songText2 = currentPlaylistItem.querySelector('p').innerText;
  let ctrlicon = document.getElementById("ctrlicon");
  let progres = document.getElementById("progres");


  // Hentikan pemutaran lagu sebelumnya, jika ada
  audioPlayer.pause();
  audioSource.src = audioPath;
  audioPlayer.load();
  audioPlayer.play();

  // Tampilkan gambar yang sesuai
  for (let i = 0; i < PopulerPlaylist.length; i++) {
    PopulerPlaylist[i].classList.remove('active');
  }
  for (let i = 0; i < TrendingPlaylist.length; i++) {
    TrendingPlaylist[i].classList.remove('active');
  }
  currentPlaylistItem.classList.add('active');

  // teks baru
  nyom1.innerText = songText1
  nyom2.innerText = songText2;

  // Tampilkan gambar baru
  currentImage.src = imagePath;
  currentImage.style.display = 'block';
  
  // icon

  ctrlicon.classList.add("fa-pause");
  ctrlicon.classList.remove("fa-play");

  //progres
  
  progres.oninput = function() {
    audioPlayer.currentTime = progres.value;
  };
  
  progres.onchange = function() {
    audioPlayer.play();
    ctrlicon.classList.add("fa-pause");
    ctrlicon.classList.remove("fa-play");
  };
  
  // Tambahkan fungsi untuk mengatur ulang waktu lagu
  

}
  

// control icon 

  function rewindAudio() {
    audioPlayer.currentTime -= 5;
  }
  function forwardAudio() {
    audioPlayer.currentTime += 5;
  }
function playPause() {
  if (ctrlicon.classList.contains("fa-pause")) {
    audioPlayer.pause();
    ctrlicon.classList.remove("fa-pause");
    ctrlicon.classList.add("fa-play");
  } else {
    audioPlayer.play();
    ctrlicon.classList.add("fa-pause");
    ctrlicon.classList.remove("fa-play");
  }
}
if(audioPlayer.play()){
  setInterval(() => {
  progres.value = audioPlayer.currentTime;
}, 500);

}








// //PAUSE PAKAI SPASI
// function pauseMusic(){
//   if(!PopulerPlaylist.pause){
//     PopulerPlaylist.pause();
//   }else{
//     PopulerPlaylist.play();
//   }
// }
// document.addEventListener('keydown', function(event) {
//   if (event.keyCode === 32) { // 32 adalah kode untuk tombol spasi
//     pauseMusic();
//   }
// });    





//POPULER AROW FUNCTION

const carouselpopuler = document.querySelector(".carousel-populer"),
firstImgp = carouselpopuler.querySelectorAll("img")[0],
arowpopuler = document.querySelectorAll(".populer i");
let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
  let scrollWidth = carouselpopuler.scrollWidth - carouselpopuler.clientWidth;
  arowpopuler[1].style.display = carouselpopuler.scrollLeft == 0 ? "none" : "block";
  arowpopuler[1].style.display = carouselpopuler.scrollLeft == scrollWidth ? "none" : "block";
}
arowpopuler.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImgp.clientWidth + 45;
        carouselpopuler.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);
    });
});
const autoSlidepopuler = () => {
  if(carouselpopuler.scrollLeft - (carouselpopuler.scrollWidth - carouselpopuler.clientWidth) > -1 || carouselpopuler.scrollLeft <= 0) return;
  positionDiff = Math.abs(positionDiff); 
  let firstImgWidth = firstImgp.clientWidth + 40;
  let valDifference = firstImgWidth - positionDiff;
  if(carouselpopuler.scrollLeft > prevScrollLeft) {
      return carouselpopuler.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
  }
  carouselpopuler.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}
const DragStart = (e) => {
  e.preventDefault();
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carouselpopuler.scrollLeft;
};

const dragEnd = (e) => {
  isDragStart = false;
  isDragging = false;
  carouselpopuler.classList.remove("dragging");
};

const dragging = (e) => {
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carouselpopuler.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carouselpopuler.scrollLeft = prevScrollLeft - positionDiff;
};

carouselpopuler.addEventListener("mousedown", DragStart);
carouselpopuler.addEventListener("touchstart", DragStart);

document.addEventListener("mouseup", dragEnd);
document.addEventListener("touchend", dragEnd);

document.addEventListener("mousemove", dragging);
document.addEventListener("touchmove", dragging);


//TRENDING AROW FUNCTION
const carouseltrending = document.querySelector(".carousel-trending"),
firstImgt = carouseltrending.querySelectorAll("img")[0],
arowtrending = document.querySelectorAll(".trending i");
let isDragStarttrending = false, isDraggingtrending = false, prevPageXtrending, prevScrollLefttrending, positionDifftrending;



const showHideIconsTrending = () => {
  let scrollWidth = carouseltrending.scrollWidth - carouseltrending.clientWidth;
  arowtrending[1].style.display = carouseltrending.scrollLeft == 0 ? "none" : "block";
  arowtrending[1].style.display = carouseltrending.scrollLeft == scrollWidth ? "none" : "block";
}

arowtrending.forEach(icon => {
  icon.addEventListener("click", () => {
      let firstImgWidth = firstImgt.clientWidth + 45;
      carouseltrending.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
      setTimeout(() => showHideIconsTrending(), 60);
  });
});


const autoSlidetrending = () => {
if(carouseltrending.scrollLeft - (carouseltrending.scrollWidth - carouseltrending.clientWidth) > -1 || carouseltrending.scrollLeft <= 0) return;
positionDifftrending = Math.abs(positionDifftrending); 
let firstImgWidth = firstImgt.clientWidth + 40;
let valDifference = firstImgWidth - positionDifftrending;
if(carouseltrending.scrollLeft > prevScrollLefttrending) {
    return carouseltrending.scrollLeft += positionDifftrending > firstImgWidth / 3 ? valDifference : -positionDifftrending;
}
carouseltrending.scrollLeft -= positionDifftrending > firstImgWidth / 3 ? valDifference : -positionDifftrending;
}

const dragStartTrending = (e) => {
  e.preventDefault();
  isDragStarttrending = true;
  prevPageXtrending = e.pageX || e.touches[0].pageX;
  prevScrollLefttrending = carouseltrending.scrollLeft;
};

const dragEndTrending = (e) => {
  isDragStarttrending = false;
  isDraggingtrending = false;
  carouseltrending.classList.remove("dragging");
};

const draggingTrending = (e) => {
  if (!isDragStarttrending) return;
  e.preventDefault();
  isDraggingtrending = true;
  carouseltrending.classList.add("dragging");
  positionDifftrending = (e.pageX || e.touches[0].pageX) - prevPageXtrending;
  carouseltrending.scrollLeft = prevScrollLefttrending - positionDifftrending;
};




carouseltrending.addEventListener("mousedown", dragStartTrending);
carouseltrending.addEventListener("touchstart", dragStartTrending);

document.addEventListener("mouseup", dragEndTrending);
document.addEventListener("touchend", dragEndTrending);

document.addEventListener("mousemove", draggingTrending);
document.addEventListener("touchmove", draggingTrending);

// // Get the necessary DOM elements
// let searchInput = document.getElementById('searchInput');
// let list = document.getElementById('list').getElementsByTagName('li');

// // Function to filter and display search results
// function searchItems() {
//   const searchTerm = searchInput.value.toLowerCase();

//   for (let i = 0; i < list.length; i++) {
//     const itemText = list[i].innerText.toLowerCase();
//     if (itemText.includes(searchTerm)) {
//       list[i].style.display = 'block';
//     } else {
//       list[i].style.display = 'none';
//     }
//   }
// };

// // Event listener for search input
// searchInput.addEventListener('input', searchItems);
