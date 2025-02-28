document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.getElementById("monumentGallery");
    const addBtn = document.getElementById("addMonument");
    const searchInput = document.getElementById("searchMonument");

    // Sample Data
    let monuments = [
        { name: "Taj Mahal", desc: "A famous white marble mausoleum in Agra, India.", city: "Agra", img: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Taj_Mahal_2012.jpg" },
        { name: "Eiffel Tower", desc: "An iconic iron structure in Paris, France.", city: "Paris", img: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg" },
        { name: "Statue of Liberty", desc: "A symbol of freedom in New York, USA.", city: "New York", img: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Statue_of_Liberty%2C_NY.jpg" }
    ];

    // Function to render monuments
    function renderGallery(filteredMonuments = monuments) {
        gallery.innerHTML = "";
        filteredMonuments.forEach((monument, index) => {
            const monumentCard = document.createElement("div");
            monumentCard.classList.add("col-md-4", "mb-4");
            monumentCard.innerHTML = `
                <div class="card">
                    <img src="${monument.img}" class="card-img-top edit-img" data-index="${index}" alt="${monument.name}">
                    <div class="card-body">
                        <h5 class="card-title">${monument.name}</h5>
                        <p class="card-text">${monument.desc}</p>
                        <p class="card-text"><small class="text-muted">${monument.city}</small></p>
                        <button class="btn btn-warning btn-sm edit-btn" data-index="${index}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>
                    </div>
                </div>
            `;
            gallery.appendChild(monumentCard);
        });
    }

    // Add new monument
    addBtn.addEventListener("click", function () {
        const name = prompt("Enter Monument Name:");
        const desc = prompt("Enter Description:");
        const city = prompt("Enter City:");
        const img = prompt("Enter Image URL:");

        if (name && desc && city && img) {
            monuments.push({ name, desc, city, img });
            renderGallery();
        }
    });

    // Edit monument
    gallery.addEventListener("click", function (event) {
        if (event.target.classList.contains("edit-btn")) {
            const index = event.target.dataset.index;
            const newName = prompt("Edit Monument Name:", monuments[index].name);
            const newDesc = prompt("Edit Description:", monuments[index].desc);
            const newCity = prompt("Edit City:", monuments[index].city);
            const newImg = prompt("Edit Image URL:", monuments[index].img);

            if (newName && newDesc && newCity && newImg) {
                monuments[index] = { name: newName, desc: newDesc, city: newCity, img: newImg };
                renderGallery();
            }
        }
    });

    // Delete monument
    gallery.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-btn")) {
            const index = event.target.dataset.index;
            if (confirm("Are you sure you want to delete this monument?")) {
                monuments.splice(index, 1);
                renderGallery();
            }
        }
    });

    // Search function
    searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value.toLowerCase();
        const filteredMonuments = monuments.filter(monument => 
            monument.name.toLowerCase().includes(searchValue)
        );
        renderGallery(filteredMonuments);
    });

    // Initial rendering
    renderGallery();
});
