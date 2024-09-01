let dataBlog = []; //parkiran

function addBlog(event) {
  event.preventDefault();

  let title = document.getElementById("input-blog-title").value;
  let content = document.getElementById("input-blog-content").value;
  let img = document.getElementById("input-blog-image").files;

  img = URL.createObjectURL(img[0]);

  const imgJavasript = '<i class="fa-brands fa-js"></i>';
  const imgPython = '<i class="fa-brands fa-python"></i>';
  const imgSwift = '<i class="fa-brands fa-swift"></i>';
  const imgRuby = '<i class="fa-regular fa-gem"></i>';

  let swift = document.getElementById("swift").checked ? imgSwift : "";
  let ruby = document.getElementById("ruby").checked ? imgRuby : "";
  let phyton = document.getElementById("phyton").checked ? imgPython : "";
  let javascript = document.getElementById("javascript").checked
    ? imgJavasript
    : "";

  //mobil
  let blog = {
    title,
    content: content,
    img,
    postAt: new Date(),
    updateAt: new Date(),
    swift,
    ruby,
    phyton,
    javascript,
  };

  dataBlog.push(blog); // dataBlog = [blog,blog]

  console.log(dataBlog);
  renderBlog();
}

function renderBlog() {
  let name = "ande";
  document.getElementById("contents").innerHTML = "";

  for (let i = 0; i < dataBlog.length; i++) {
    document.getElementById("contents").innerHTML += `
    <div class="blog-list-item">
          <div class="blog-image">
            <img src="${dataBlog[i].img}" alt="" />
          </div>
          <div class="blog-content">
            <div class="btn-group">
              <button class="btn-edit">Edit Post</button>
              <button class="btn-post">Delete Post</button>
            </div>
            <h1>
              <a href="Blog-detail.html" target="_blank"
                >${dataBlog[i].title}</a
              >
            </h1>
            <div class="detail-blog-content">
            ${getFullDate(dataBlog[i].postAt)} | ${name}
            </div>
            <p>
            ${dataBlog[i].content}
            </p>
            ${dataBlog[i].swift}
            ${dataBlog[i].ruby}
            ${dataBlog[i].phyton}
            ${dataBlog[i].javascript}
            <p style="float: right">${getDistanceTime(dataBlog[i].postAt)}</p>
          </div>
        </div>`;
  }
}

function getFullDate(waktu) {
  let nameOfMonth = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // console.log(waktu);
  let tanggal = new Date(waktu);
  let date = tanggal.getDate();
  let month = nameOfMonth[waktu.getMonth()];
  let year = tanggal.getFullYear();

  let hour = tanggal.getHours();
  let minute = tanggal.getMinutes();

  return `${date} ${month} ${year} - ${hour}:${minute} WIB`;
}

function getDistanceTime(time) {
  let postTime = time;
  let currentTime = new Date();

  let distanceTime = currentTime - postTime; //4000

  let miliSecond = 1000;
  let secondInHour = 3600;
  let hourInDay = 24;

  let distanceTimeInSecond = Math.floor(distanceTime / miliSecond);
  let distanceTimeInMinute = Math.floor(distanceTime / (miliSecond * 60));
  let distanceTimeInHour = Math.floor(
    distanceTime / (miliSecond * secondInHour)
  );
  let distanceTimeInDay = Math.floor(
    distanceTime / (miliSecond * secondInHour * hourInDay)
  );

  if (distanceTimeInDay > 0) {
    return `${distanceTimeInDay} days ago`;
  } else if (distanceTimeInHour > 0) {
    return `${distanceTimeInHour} hours ago`;
  } else if (distanceTimeInMinute > 0) {
    return `${distanceTimeInMinute} minutes ago`;
  } else {
    return `${distanceTimeInSecond} seconds ago`;
  }
}

// const start = new Date()
// console.log(start);
// console.log("tanggal: ", start.getDate());
// console.log("bulan : ", start.getMonth());
// console.log("nama bulan : ", nameOfMonth[start.getMonth]);
// console.log("tahun : ", start.getFullYear());
