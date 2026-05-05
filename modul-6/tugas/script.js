let todos = [];
let filter = "all";

const input = document.getElementById("input-tugas");
const btnTambah = document.getElementById("btn-tambah");
const selectPrioritas = document.getElementById("prioritas");

btnTambah.addEventListener("click", tambahTugas);

function tambahTugas() {
  const teks = input.value.trim();

  // VALIDASI
  if (!teks) return alert("Tidak boleh kosong");
  if (teks.length < 3) return alert("Minimal 3 karakter");
  if (teks.length > 100) return alert("Maksimal 100 karakter");

  const todo = {
    id: Date.now(),
    teks,
    selesai: false,
    prioritas: selectPrioritas.value,
  };

  todos.push(todo);
  input.value = "";

  render();
}

const list = document.getElementById("list-tugas");

function render() {
  list.innerHTML = "";

  let filtered = todos;

  if (filter === "aktif") {
    filtered = todos.filter((t) => !t.selesai);
  }
  if (filter === "selesai") {
    filtered = todos.filter((t) => t.selesai);
  }

  filtered.forEach((todo) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <input type="checkbox" ${todo.selesai ? "checked" : ""}>
      <span>${todo.teks}</span>
      <small>(${todo.prioritas})</small>
      <button>Hapus</button>
    `;

    list.appendChild(li);
  });
  updateCounter();
}

list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  const index = [...list.children].indexOf(li);
  const todo = todos[index];

  if (e.target.type === "checkbox") {
    todo.selesai = !todo.selesai;
  }

  if (e.target.tagName === "BUTTON") {
    todos.splice(index, 1);
  }

  render();
});

document.querySelectorAll("[data-filter]").forEach((btn) => {
  btn.addEventListener("click", () => {
    filter = btn.dataset.filter;
    render();
  });
});

document.getElementById("hapus-selesai").addEventListener("click", () => {
  todos = todos.filter((t) => !t.selesai);
  render();
});

function updateCounter() {
  const sisa = todos.filter((t) => !t.selesai).length;
  document.getElementById("counter").textContent = `${sisa} tugas tersisa`;
}

function simpan() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function load() {
  const data = localStorage.getItem("todos");
  if (data) todos = JSON.parse(data);
}

function render() {
  simpan();
}

load();
render();
li.querySelector("span").addEventListener("dblclick", (e) => {
  const inputEdit = document.createElement("input");
  inputEdit.value = todo.teks;

  e.target.replaceWith(inputEdit);
  inputEdit.focus();

  inputEdit.addEventListener("blur", () => {
    todo.teks = inputEdit.value;
    render();
  });

  inputEdit.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      todo.teks = inputEdit.value;
      render();
    }
  });
});
li.draggable = true;