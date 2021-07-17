const apikey = "02c1998ea98334b9d479daa94aa8a604";
const IMGPATH = "https://image.tmdb.org/t/p/w500/";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?api_key=02c1998ea98334b9d479daa94aa8a604" +
  "&query=";
const popularmovie_api_url =
  "https://api.themoviedb.org/3/movie/popular?api_key=02c1998ea98334b9d479daa94aa8a604&page=";
const topratedmovie_api_url =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=02c1998ea98334b9d479daa94aa8a604&page=";
const upcomingmovie_api_url =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=02c1998ea98334b9d479daa94aa8a604&page=";
const nowplaying_api_url =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=02c1998ea98334b9d479daa94aa8a604&page=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const element = document.querySelector(".pagination ul");

const pageNoObj = { popular: 500, toprated: 445, upcoming: 20, nowplaying: 56 };
const movies = [];
const category = "popular";
const pageNo = 1;
const totalPages = pageNoObj["popular"];

let setMovies = (movies) => {
  this.movies = movies;
};

let setCategory = (category) => {
  document.getElementById("main").innerHTML = "";
  this.category = category;
  setTotalPages(pageNoObj[category]);
  showMovies();
};

let setPageNo = (pageNo) => {
  document.getElementById("main").innerHTML = "";
  this.pageNo = pageNo;
  showMovies();
};

let setTotalPages = (totalPages) => {
  document.getElementById("main").innerHTML = "";
  this.totalPages = totalPages;
  createPagination(totalPages, pageNo);
};

let displayMoviesInDom = () => {
  this.movies.forEach((element) => {
    const el = document.createElement("div");
    const image = document.createElement("img");
    const text = document.createElement("h2");

    text.innerHTML = `${element.original_title}`;
    image.src =
      element.poster_path !== null ? IMGPATH + element.poster_path : "";
    image.setAttribute("loading", "lazy");
    el.appendChild(image);
    el.appendChild(text);
    main.appendChild(el);
  });
};

let showMovies = async () => {
  let category = this.category;
  let mockurl =
    category === "popular"
      ? popularmovie_api_url + this.pageNo
      : category === "toprated"
      ? topratedmovie_api_url + this.pageNo
      : category === "upcoming"
      ? upcomingmovie_api_url + this.pageNo
      : nowplaying_api_url + this.pageNo;
  let movieData = await (await fetch(mockurl)).json();

  setMovies(movieData.results);
  displayMoviesInDom();
};

searchMovies = async (searchTerm) => {
  let mockurl = SEARCHAPI + searchTerm;
  let movieData = await (await fetch(mockurl)).json();

  setMovies(movieData.results);
  displayMoviesInDom();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = "";

  const searchTerm = search.value;

  if (searchTerm) {
    searchMovies(SEARCHAPI + searchTerm);
    search.value = "";
  }
});

let total = totalPages;
createPagination(total, pageNo);

function createPagination(totalPages, page) {
  let liTag = "";
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;
  if (page > 1) {
    //show the next button if the page value is greater than 1
    liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${
      page - 1
    })"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
  }
  if (page > 2) {
    //if page value is less than 2 then add 1 after the previous button
    liTag += `<li class="first numb" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;
    if (page > 3) {
      //if page value is greater than 3 then add this (...) after the first li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }
  // how many pages or li show before the current li
  if (page == totalPages) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }
  // how many pages or li show after the current li
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage = afterPage + 1;
  }
  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) {
      //if plength is greater than totalPage length then continue
      continue;
    }
    if (plength == 0) {
      //if plength is 0 than add +1 in plength value
      plength = plength + 1;
    }
    if (page == plength) {
      //if page is equal to plength than assign active string in the active variable
      active = "active";
    } else {
      //else leave empty to the active variable
      active = "";
    }
    liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength})"><span>${plength}</span></li>`;
  }
  if (page < totalPages - 1) {
    //if page value is less than totalPage value by -1 then show the last li or page
    if (page < totalPages - 2) {
      //if page value is less than totalPage value by -2 then add this (...) before the last li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
  }
  if (page < totalPages) {
    //show the next button if the page value is less than totalPage(20)
    liTag += `<li class="btn next" onclick="createPagination(totalPages, ${
      page + 1
    })"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
  }

  setPageNo(page);
  element.innerHTML = liTag; //add li tag inside ul tag
  return liTag; //reurn the li tag
}
