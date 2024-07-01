const para = document.querySelector("#para");
const listJob = document.querySelector("#listJob");
const preBtn = document.querySelector("#pre");
const nextBtn = document.querySelector("#next");
const searchInput = document.querySelector("#searchInput");
const searchIcon = document.querySelector("#searchIcon");
const cate = document.querySelector("#cate");
const sortBy = [];

let value = 0;
let today = new Date();

// Info student
para.innerHTML = `<p> Module 1 Technical Interview </p>
<p> Learner name:  To Nguyen Minh Dat</p>
<p> Date: ${today}</p>
`;

const API_KEY = `https://frcz3-8080.csb.app`;
let url = ``;
//collect data from API
const getAPI = async () => {
  try {
    url = `${API_KEY}/jobs?q=${searchInput.value
      .replace(/[^0-9a-zA-Z ]/g, "")
      .trim()}&_start=${0 + value}&_end=${
      10 + value
    }&_limit=10&_sort=${sortBy.join(",")}`;
    const res = await fetch(url);
    if (res) {
      const data = await res.json();
      console.log(`newArray`);
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const renderJobs = async () => {
  try {
    const data = await getAPI();
    listJob.innerHTML = ``;

    const ulListJob = document.createElement(`ul`);
    data.forEach((job) => {
      const x = document.createElement(`li`);
      x.textContent = `${job.title}   id:${job.id}`;
      // console.log(Object.keys(job));
      ulListJob.appendChild(x);
    });
    listJob.appendChild(ulListJob);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
renderJobs();
// button next
nextBtn.addEventListener("click", async () => {
  value += 10;
  renderJobs();
  preBtn.disabled = false;
});

preBtn.addEventListener("click", () => {
  if (value > 0) {
    value -= 10;
    renderJobs();
    if (value === 0) preBtn.disabled = true;
  }
});

// Search
searchInput.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    const data = await getAPI();
    if (data.length === 0) {
      listJob.textContent = `Sorry`;
    } else {
      renderJobs();
    }
  }
});

// cate
const createCate = async () => {
  try {
    const data = await getAPI();
    // in 1 cai job chua moi cai keys la ok
    Object.keys(data[0]).forEach(async (name) => {
      const label = document.createElement("label");
      label.setAttribute("for", name);
      label.innerHTML = `<input type="checkbox" id="${name}" value="${name}"/>${name}`;
      console.log(name);
      cate.appendChild(label);
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
createCate();

cate.addEventListener("change", async (event) => {
  const sortElement = event.target.value;
  sortBy.push(sortElement);
  renderJobs();
});
