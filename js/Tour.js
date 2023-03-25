AFRAME.registerComponent("tour", {
    schema: {
        state: { type: "string", default: "places-list" },
        selectedCard: { type: "string", default: "#card1" },
        zoomAspectRatio: { type: "number", default: 1}
    },
    init: function() {
        this.placeContainer = this.el;
        this.cameraEl = document.querySelector("#camera");
        this.createCards();
    },
    update: function() {
        window.addEventListener("keydown", e => {
            if (e.key === "ArrowUp") {
                if (
                    (this.data.zoomAspectRatio <= 10 && this.data.state === "view") ||
                    (this.data.zoomAspectRatio <= 10 && this.data.state === "change-view")
                ) {
                    this.data.zoomAspectRatio += 0.002;
                    this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
                }
            }
            if (e.key === "ArrowDown") {
              if (
                (this.data.zoomAspectRatio > 1 && this.data.state === "view") ||
                (this.data.zoomAspectRatio > 1 && this.data.state === "change-view")
              ) {
                this.data.zoomAspectRatio -= 0.002;
                this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
              }
            }
        });
    },
    tick: function() {
      const { state } = this.el.getAttribute("tour");
  
      if (state === "view") {
        this.hideEl([this.placesContainer]);
        this.showView();
      }
    },
    hideEl: function(elList) {
      elList.map(el => {
        el.setAttribute("visible", false);
      });
    },
    showView: function() {
      const { selectedCard } = this.data;
      const skyEl = document.querySelector("#main-container");
      skyEl.setAttribute("material", {
        src: `./assets/360_images/${selectedCard}/place-0.jpg`,
        color: "#fff"
      });
    },
    createCards: function() {
        const details = {
            budapest: {
                position: { x: 20, y: -4.5, z: -5.5 },
                rotation: { x: 0, y: -90, z: 0 },
                src: "./assets/thumbnails/budapest.jpg",
                title: "Budapest",
                id: "budapest"
            },
            eiffel_tower: {
                position: { x: 4.6, y: -5.5, z: 25},
                rotation: { x: 180, y: 0, z: 0 },
                src: "./assets/thumbnails/eiffle_tower.png",
                title: "Eiffel tower",
                id: "eiffel_tower"
            },
            new_york_city: {
                position: { x: -9, y: 34, z: -100},
                rotation: { x: 0, y: 0, z: 0 },
                src: "./assets/thumbnails/new_york_city.png",
                title: "New york",
                id: "new_york_city"
            },
        };
        for (var key in details) {
            const item = details[key];
            const thumbNail = this.createThumbNail(item);
            const title = this.createTitleEl(item);
            thumbNail.appendChild(title);
            this.placesContainer.appendChild(thumbNail);
        }
    },
    createThumbNail: function(item) {
        const entityEl = document.createElement("a-entity");
        const id = `place-${item.id}`;
        entityEl.setAttribute("visible", true);
        entityEl.setAttribute("id", id);
        entityEl.setAttribute("geometry", {
            primitive: "circle",
            radius: 3
        });
        entityEl.setAttribute("position", item.position);
        entityEl.setAttribute("rotation", item.rotation);
        entityEl.setAttribute("material", { src: item.src, opacity: 0.6});
        entityEl.setAttribute("cursor-listener", {});
        return entityEl;
    },
});