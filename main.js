let arrItems = JSON.parse(localStorage.getItem("arrItems")) || [];

let arrLikes = JSON.parse(localStorage.getItem("arrLikes")) || [];

let itemAdd = document.getElementById("post");

// CREATE POST FUNCTIONS //
function lineBreak() {
	let textarea = document.getElementById("post");
	textarea.style.height = "auto";
	textarea.style.height = `${textarea.scrollHeight}px`; // tự động xuống dòng
}

function postBtn() {
	if (itemAdd.value !== "") {
		arrItems.push(itemAdd.value);
		updateStorage();
		display();
	}
}

function updateStorage() {
	localStorage.setItem("arrItems", JSON.stringify(arrItems)); // key là "arrItems", value là array chứa các post dạng string
}

// NEWSFEED FUNCTIONS //

if (arrLikes.length === 0) {
	for (let i = 0; i < arrItems.length; i++) {
		arrLikes.push(0);
	}
	localStorage.setItem("arrLikes", JSON.stringify(arrLikes));
}

function display() {
	let row = "";
	for (let i = 0; i < arrItems.length; i++) {
		let heartClass = arrLikes[i] === 1 ? "fa-solid" : "fa-regular";
		let likeNumText = arrLikes[i] === 1 ? "1" : "";
		row += `
			<div id="compose" >
					<div id="ava">
						<img
							id="ava-img"
							src="profile-ava.png"
							alt="Avatar"
						/>
					</div>
					<div id="input-div">
						<span id="ava-name">@tmtri3102</span>
						<div id="post">${arrItems[i]}</div>
						<div id="interaction">
							<div id="intEach" class="like-btn" onclick="likeBtn(${i})">
								<i
									id="heart-${i}"
									class="${heartClass} fa-heart"
								></i>
								<span id="likeCount-${i}">${likeNumText}</span>
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
	itemAdd.value = "";
}

function likeBtn(index) {
	let heartIcon = document.getElementById(`heart-${index}`); // mỗi nút like 1 index riêng
	let likeCount = document.getElementById(`likeCount-${index}`);

	heartIcon.classList.toggle("fa-regular");
	heartIcon.classList.toggle("fa-solid");

	if (arrLikes[index] === 1) {
		arrLikes[index] = 0;
	} else {
		arrLikes[index] = 1;
	}

	localStorage.setItem("arrLikes", JSON.stringify(arrLikes));

	likeCount.textContent = arrLikes[index] === 1 ? "1" : "";
	// likeCount.textContent = heartIcon.classList.contains("fa-solid") ? "1" : "";
}

function editBtn(index) {
	let newPost = prompt("Edit this post:");

	if (newPost == null || newPost == "") {
		updateStorage();
		display();
	} else {
		arrItems[index] = newPost;
		updateStorage();
		display();
	}
}

function deleteBtn(index) {
	let confirmDel = confirm("Are you sure want to delete this post?");

	if (confirmDel) {
		arrItems.splice(index, 1);
		updateStorage();
		display();
	} else {
		updateStorage();
		display();
	}
}

function resetFeed() {
	let confirmReset = confirm(
		"Are you sure want to reset? \nThis will delete the newsfeed."
	);
	if (confirmReset) {
		arrItems = [];
		arrLikes = [];
		updateStorage();
		display();
	} else {
		display();
	}
}
