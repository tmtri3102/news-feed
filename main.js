let arrItems = [];
if (localStorage.getItem("arrItems")) {
	arrItems = JSON.parse(localStorage.getItem("arrItems"));
}
let arrLikes = [];
if (localStorage.getItem("arrLikes")) {
	arrLikes = JSON.parse(localStorage.getItem("arrLikes"));
}

let arrImgs = [];
if (localStorage.getItem("arrImgs")) {
	arrImgs = JSON.parse(localStorage.getItem("arrImgs"));
}

let itemAdd = document.getElementById("post");
let img = document.getElementById("myFile");
let imgAdd = document.getElementById("imgAdd");

// let imgAdd = document.getElementById("myFile").files[0];

// CREATE POST FUNCTIONS //

function lineBreak() {
	let textarea = document.getElementById("post");
	textarea.style.height = "auto";
	textarea.style.height = `${textarea.scrollHeight}px`; // tự xuống dòng
}

function insertImg() {
	let imgURL = URL.createObjectURL(img.files[0]);
	console.log(imgURL);
	imgAdd.innerHTML = `<img src="${imgURL}" alt="an image uploaded" />`;
}

function postBtn() {
	if (itemAdd.value !== "") {
		arrItems.push(itemAdd.value);
		localStorage.setItem("arrItems", JSON.stringify(arrItems));
		if (imgAdd.innerHTML) {
			arrImgs.push(imgAdd.innerHTML);
			localStorage.setItem("arrImgs", JSON.stringify(arrImgs));
		}
		display();
		itemAdd.value = "";
		imgAdd.innerHTML = "";
	}
}

// NEWSFEED FUNCTIONS //

function display() {
	let row = "";
	if (arrItems.length == 0) {
		document.getElementById("itemList").innerHTML = "";
		return;
	}
	for (let i = 0; i < arrItems.length; i++) {
		let iconClass = arrLikes[i] === 1 ? "fa-solid" : "fa-regular";
		row += `
			<div id="compose" >
					<div id="ava">
						<img
							id="ava-img"
							src="https://i.pinimg.com/736x/fa/79/8a/fa798a6673e54b7533904680c9a67f79.jpg"
							alt="Avatar"
						/>
					</div>
					<div id="input-div">
						<span id="ava-name">@username</span>
						<div id="post" class="post-${i} break">${arrItems[i]}</div>
						<div id="imgAdd"></div>
						<div id="interaction">
							<div id="intEach" class="like-btn" onclick="likeBtn(${i})">
								<i
									id="heart-${i}"
									class="${arrLikes[i] === 1 ? "fa-solid" : "fa-regular"} fa-heart"
								></i>
								<span id="likeCount-${i}">${arrLikes[i] === 1 ? "1" : ""}</span>
							</div>
							<div id="edit-del">
								<div id="intEach" onclick="editBtn(${i})">
									<i
										id="editRow"
										class="fa-regular fa-pen-to-square"
									></i>
								</div>
								<div id="intEach" onclick="deleteBtn(${i})">
									<i
										id="deleteRow"
										class="fa-solid fa-trash"
									></i>
								</div>
							</div>
						</div>
					</div>
				</div>
			`;
	}

	document.getElementById("itemList").innerHTML = row;
}

function likeBtn(index) {
	let heartIcon = document.getElementById(`heart-${index}`);
	let likeCount = document.getElementById(`likeCount-${index}`);

	heartIcon.classList.toggle("fa-regular");
	heartIcon.classList.toggle("fa-solid");

	if (heartIcon.classList.contains("fa-solid")) {
		likeCount.textContent = "1";
		arrLikes[index] = 1;
	} else {
		likeCount.textContent = "";
		arrLikes[index] = 0;
	}

	localStorage.setItem("arrLikes", JSON.stringify(arrLikes));
}

function editBtn(index) {
	let newPost = prompt("Edit this post:");

	if (newPost == null || newPost == "") {
		return;
	} else {
		arrItems[index] = newPost;
		localStorage.setItem("arrItems", JSON.stringify(arrItems));
		localStorage.setItem("arrLikes", JSON.stringify(arrLikes));
		display();
	}
}

function deleteBtn(index) {
	let confirmDel = confirm("Are you sure want to delete this post?");

	if (confirmDel) {
		arrItems.splice(index, 1);
		arrLikes.splice(index, 1);

		localStorage.setItem("arrItems", JSON.stringify(arrItems));
		localStorage.setItem("arrLikes", JSON.stringify(arrLikes));
		display();
	}
}

function resetFeed() {
	let confirmReset = confirm(
		"Are you sure want to reset? \nThis will delete the newsfeed."
	);
	if (confirmReset) {
		localStorage.clear();
		location.reload();
		display();
	} else {
		display();
	}
}
