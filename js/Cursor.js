AFRAME.registerComponent("cursor-listener", {
    schema: {
      selectedItemId: { default: "", type: "string" }
    },
    init: function() {
      this.handleClickEvents();
      this.handleMouseEnterEvents();
      this.handleMouseLeaveEvents();
    },
    handleClickEvents: function() {
      //  Click Events
      this.el.addEventListener("click", evt => {
        const placesContainer = document.querySelector("#places-container");
        const { state } = placesContainer.getAttribute("tour");
  
        if (state === "places-list") {
          const id = this.el.getAttribute("id");
          const placesId = [
            "budapest",
            "new-york-city",
            "eiffel-tower"
          ];
          if (placesId.includes(id)) {
            placesContainer.setAttribute("tour", {
              state: "view",
              selectedCard: id
            });
          }};
  
          if (state === "view"){
            this.handleViewState()
          }
          if (state === "change-view"){
            this.handleViewState()
          }
      });
    },
    handleViewState: function() {
      const placeContainer = document.querySelector("#places-container");
      const id = this.el.getAttribute("id");
      const {selectedItemId} = placeContainer.getAttribute("curser-listener");
      const sideViewPlaceId = ["place-0","place-1","place-2","place-3","place-4"];
      if (sideViewPlaceId.includes(id)){
        placeContainer.setAttribute("tour", {
          state: "change-view"
        });
        const skyEl = document.querySelector("#main-container");
        skyEl.setAttribute("material", {
          src:`assets/360_images/${selectedItemId}/${id}.jpg`,
          color:"#ffffff"
        });
      }
    
    },
    handleMouseEnterEvents: function() {
      // Mouse Center Events
      this.el.addEventListener("mouseenter", () => {
        const placeContainer = document.querySelector("#places-container");
        const { state } = placeContainer.getAttribute("tour");
        if (state === "places-list") {
          this.handlePlacesListState();
        }
      });
    },
    handlePlacesListState: function() {
      const id = this.el.getAttribute("id");
      const placesId = ["budapest", "new-york-city", "eiffel-tower"];
      if (placesId.includes(id)) {
        const placeContainer = document.querySelector("#places-container");
        placeContainer.setAttribute("cursor-listener", {
          selectedItemId: id
        });
        this.el.setAttribute("material", {
          opacity: 1
        });
      }
    },
    handleMouseLeaveEvents: function() {
      // Mouse Leave Events
      this.el.addEventListener("mouseleave", () => {
        const placesContainer = document.querySelector("#places-container");
        const { state } = placesContainer.getAttribute("tour");
        if (state === "places-list") {
          const { selectedItemId } = this.data;
          if (selectedItemId) {
            const el = document.querySelector(`#${selectedItemId}`);
            const id = el.getAttribute("id");
            if (id == selectedItemId) {
              el.setAttribute("material", {
                color: "#0077CC",
                opacity: 1
              });
            }
          }
        }
      });
    },
    
  });
  