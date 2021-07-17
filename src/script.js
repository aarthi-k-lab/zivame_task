class MovieList {
  constructor() {
    this.movies = [];
    this.pageNoObj = {
      popular: 500,
      toprated: 445,
      upcoming: 12,
      nowplaying: 55,
    };
    this.category = "popular";
    this.pageNo = 1;
    this.totalPages = 500;
  }

  setMovies(movies) {
    this.movies = movies;
  }

  getMovies() {
    return this.movies;
  }

  setPageNoObj(pageNoObj) {
    this.pageNoObj = pageNoObj;
  }

  getPageNoObj() {
    return this.pageNoObj;
  }

  setCategory(category) {
    this.category = category;
  }

  getCategory() {
    return this.category;
  }

  setPageNo(pageNo) {
    this.pageNo = pageNo;
  }

  getPageNo() {
    return this.pageNo;
  }

  setPageNo(pageNo) {
    this.pageNo = pageNo;
  }

  getPageNo() {
    return this.pageNo;
  }

  setTotalPages(totalPages) {
    this.totalPages = totalPages;
  }

  getTotalPages() {
    return this.totalPages;
  }

  changePageNo(pageNo) {
    this.pageNo = pageNo;
    this.showMovies();
  }

  async showMovies() {
    const popularmovie_api_url =
      "https://api.themoviedb.org/3/movie/popular?api_key=02c1998ea98334b9d479daa94aa8a604&page=";
    const topratedmovie_api_url =
      "https://api.themoviedb.org/3/movie/top_rated?api_key=02c1998ea98334b9d479daa94aa8a604&page=";
    const upcomingmovie_api_url =
      "https://api.themoviedb.org/3/movie/upcoming?api_key=02c1998ea98334b9d479daa94aa8a604&page=";
    const nowplaying_api_url =
      "https://api.themoviedb.org/3/movie/now_playing?api_key=02c1998ea98334b9d479daa94aa8a604&page=";
    let mockurl =
      this.category === "popular"
        ? popularmovie_api_url + this.pageNo
        : this.category === "toprated"
        ? topratedmovie_api_url + this.pageNo
        : this.category === "upcoming"
        ? upcomingmovie_api_url + this.pageNo
        : nowplaying_api_url + this.pageNo;
    let movieData = await (await fetch(mockurl)).json();

    this.setMovies(movieData.results);
    this.displayMoviesInDom();
  }

  async searchMovies(searchTerm) {
    const SEARCHAPI =
      "https://api.themoviedb.org/3/search/movie?api_key=02c1998ea98334b9d479daa94aa8a604" +
      "&query=";
    let mockurl = SEARCHAPI + searchTerm;
    let movieData = await (await fetch(mockurl)).json();
    this.setMovies(movieData.results);
    this.displayMoviesInDom();
  }

  displayMoviesInDom() {
    const IMGPATH = "https://image.tmdb.org/t/p/w500/";
    const main = document.getElementById("main");
    main.innerHTML = "";
    this.movies.forEach((element) => {
      const maindiv = document.createElement("div");
      const image = document.createElement("img");
      const text = document.createElement("h2");

      text.innerHTML = `${element.original_title}`;
      image.src =
        element.poster_path !== null ? IMGPATH + element.poster_path : "";
      image.setAttribute("loading", "lazy");
      maindiv.appendChild(image);
      maindiv.appendChild(text);
      main.appendChild(maindiv);
    });
  }
}
const element = document.querySelector(".pagination ul");

let movieList = new MovieList();

//Showing initial Movie List
movieList.showMovies();

//When user change the category
function changeCategory(category) {
  movieList.setPageNo(1);
  movieList.setCategory(category);
  movieList.setTotalPages(movieList.getPageNoObj()[category]);
  createPagination(movieList.getTotalPages(), movieList.getPageNo());

  // movieList.changeCategory(category);
}

//Adding event listener for search movie
const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = document.getElementById("search");
  const searchTerm = search.value;
  if (searchTerm) {
    movieList.searchMovies(searchTerm);
    search.value = "";
    element.innerHTML = "";
  }
});

createPagination(movieList.getTotalPages(), movieList.getPageNo());

function createPagination(totalPages, page) {
  let liTag = "";
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;
  if (page > 1) {
    //show the next button if the page value is greater than 1
    liTag += `<li class="btn prev" onclick="createPagination(${totalPages}, ${
      page - 1
    })"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
  }
  if (page > 2) {
    //if page value is less than 2 then add 1 after the previous button
    liTag += `<li class="first numb" onclick="createPagination(${totalPages}, 1)"><span>1</span></li>`;
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
    liTag += `<li class="numb ${active}" onclick="createPagination(${totalPages}, ${plength})"><span>${plength}</span></li>`;
  }
  if (page < totalPages - 1) {
    //if page value is less than totalPage value by -1 then show the last li or page
    if (page < totalPages - 2) {
      //if page value is less than totalPage value by -2 then add this (...) before the last li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" onclick="createPagination(${totalPages}, ${totalPages})"><span>${totalPages}</span></li>`;
  }
  if (page < totalPages) {
    //show the next button if the page value is less than totalPage(20)
    liTag += `<li class="btn next" onclick="createPagination(totalPages, ${
      page + 1
    })"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
  }

  movieList.changePageNo(page);
  element.innerHTML = liTag; //add li tag inside ul tag
  return liTag; //reurn the li tag
}
