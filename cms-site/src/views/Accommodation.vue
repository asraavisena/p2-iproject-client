<template>
  <div class="w-full overflow-x-hidden border-t flex flex-col">
    <main class="w-full flex-grow p-6">
      <h1 class="text-3xl text-black pb-6">Accommodation</h1>
      <div class="bg-sidebar p-8 rounded">
        <div class="flex">
          <div class="w-7/12 text-gray-800 bg-home-main p-16 flex items-center">
            <div>
              <p class="text-xl mb-5">
                <span>Title:&nbsp;</span>
                {{ accommodation.title }}
              </p>
              <p class="text-xl mb-5">
                <span>Description:&nbsp;</span>
                {{ accommodation.description }}
              </p>
              <p class="text-xl mb-5 font-bold">
                <span class="font-normal">Price:&nbsp;</span>
                Rp. {{ accommodation.price }} /month
              </p>
              <div class="flex">
                <div class="mr-8">
                  <p class="text-xl capitalize">
                    <span>Street:&nbsp;</span>
                    {{ accommodation.address }}
                  </p>
                </div>
                <div class="mr-8">
                  <p class="text-xl capitalize">
                    <span>City:&nbsp;</span>
                    {{ accommodation.city }}
                  </p>
                </div>
                <div class="mr-8">
                  <p class="text-xl capitalize">
                    <span>Zip code:&nbsp;</span>
                    {{ accommodation.zipCode }}
                  </p>
                </div>
                <div class="mr-8">
                  <p class="text-xl capitalize">
                    <span>Latitude:&nbsp;</span>
                    {{ accommodation.lat }}
                  </p>
                </div>
                <div>
                  <p class="text-xl capitalize">
                    <span>Longitude:&nbsp;</span>
                    {{ accommodation.long }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-5/12 relative">
            <MglMap
              :accessToken="accessToken"
              :mapStyle.sync="mapStyle"
              @load="onMapLoaded($event, accommodation.lat, accommodation.long)"
            >
              <MglNavigationControl position="top-right" />
              <MglGeolocateControl position="top-right" />
              <MglMarker :coordinates="coordinates" color="blue" />
            </MglMap>
          </div>
        </div>
      </div>
      <div class="flex flex-row mt-4">
        <button
          class="
            text-l text-center
            bg-btn-in-main
            py-2
            px-4
            rounded-lg
            text-white
            mr-2
          "
          @click="editClick(accommodation.id)"
        >
          Edit
        </button>
        <button
          class="
            text-l text-center
            bg-btn-in-main-danger
            py-2
            px-4
            rounded-lg
            text-white
            mr-auto
          "
          @click="deleteHandler(accommodation.id)"
        >
          Delete
        </button>
        <button
          class="
            text-l text-center
            bg-btn-in-main
            py-2
            px-4
            rounded-lg
            text-white
          "
          @click="showImagesClick(accommodation.id)"
        >
          Show Images
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import {
  MglMap,
  MglMarker,
  MglNavigationControl,
  MglGeolocateControl,
} from "vue-mapbox";
export default {
  name: "Accommodation",
  data() {
    return {
      accessToken: process.env.VUE_APP_MAPBOX_API,
      mapStyle: "mapbox://styles/mapbox/streets-v11",
      coordinates: [],
    };
  },
  components: {
    MglMap,
    MglMarker,
    MglNavigationControl,
    MglGeolocateControl,
  },
  mountend() {
    this.mapbox = Mapbox;
  },
  created() {
    this.$store.dispatch("getAccommodationFunction", this.$route.params.id);
  },
  computed: {
    accommodation() {
      return this.$store.state.accommodation;
    },
  },
  methods: {
    editClick(payload) {
      this.$router
        .push({
          name: "EditAccommodation",
          params: {
            id: +payload,
          },
        })
        .catch(() => {});
    },

    deleteHandler(payload) {
      this.$store.dispatch("deleteAccommodationFunction", payload);
    },

    async onMapLoaded(event, lat, long) {
      // Here we cathing 'load' map event
      const asyncActions = event.component.actions;
      this.coordinates = [long, lat];

      await asyncActions.flyTo({
        //   mapbox [long, lat]
        center: [long, lat],
        zoom: 17,
      });
    },

    showImagesClick(payload) {
      this.$router
        .push({
          name: "ShowImages",
          params: {
            idAccom: +payload,
          },
        })
        .catch(() => {});
    },
  },
};
</script>

<style></style>
