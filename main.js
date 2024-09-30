let arrItems = [];

// CREATE POST SECTION //
function composeInput() {
	let textarea = document.getElementById("post");
	textarea.style.height = "auto";
	textarea.style.height = `${textarea.scrollHeight}px`;
}

function postBtn() {
	let itemAdd = document.getElementById("post").value;
	arrItems.push(itemAdd);
	display();
}

// NEWSFEED SECTION //

function display() {
	let row = "";
	for (let i = 0; i < arrItems.length; i++) {
		row += `
			<div id="compose" >
					<div id="ava">
						<img
							id="ava-img"
							src="Coursera.png"
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
									class="fa-regular fa-heart"
								></i>
								<span id="likeNum-${i}"></span>
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
	let likeNum = document.getElementById(`likeNum-${index}`);

	heartIcon.classList.toggle("fa-regular");
	heartIcon.classList.toggle("fa-solid");
	likeNum.textContent = heartIcon.classList.contains("fa-solid") ? "1" : "";
}

function deleteBtn(index) {
	let confirmDel = confirm("Are you sure to delete this post?");
	if (confirmDel) {
		arrItems.splice(index, 1);
		display();
	} else {
		display();
	}
}

function editBtn(index) {
	arrItems[index] = prompt("Edit your post...");
	display();
}
