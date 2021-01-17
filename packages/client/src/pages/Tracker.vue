<template lang="pug">
q-page.flex.flex-center.column
  h3.tracker-text Drowsiness: {{ drowsinessScore }}
  h5.tracker-text {{ message }}
  p(v-show="error") {{ error }}
  video#camera(
    :width="frameSize.width",
    :height="frameSize.height",
    muted,
    autoplay
  )
</template>

<script>
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import * as tf from "@tensorflow/tfjs";
import { setWasmPaths } from "@tensorflow/tfjs-backend-wasm";

import wasmSimdPath from "@tensorflow/tfjs-backend-wasm/dist/tfjs-backend-wasm-simd.wasm";
import wasmSimdThreadedPath from "@tensorflow/tfjs-backend-wasm/dist/tfjs-backend-wasm-threaded-simd.wasm";
import wasmPath from "@tensorflow/tfjs-backend-wasm/dist/tfjs-backend-wasm.wasm";

setWasmPaths({
  "tfjs-backend-wasm.wasm": wasmPath,
  "tfjs-backend-wasm-simd.wasm": wasmSimdPath,
  "tfjs-backend-wasm-threaded-simd.wasm": wasmSimdThreadedPath,
});

export default {
  name: "Tracker.vue",
  data() {
    return {
      blinks: 0,
      blinksPerMinute: 0,
      drowsinessScore: "...",
      message: "Calculating drowsiness",
      error: "",
      loading: true,
    };
  },
  computed: {
    frameSize() {
      if (this.$q.platform.is.mobile) {
        return { width: 200, height: 200 };
      } else {
        return { width: 640, height: 480 };
      }
    },
  },
  methods: {
    checkDrowsiness() {
      // check if user is on phone, meaning they are likely driving
      if (this.$q.platform.is.mobile) {
        if (this.blinksPerMinute > 8) {
          this.drowsinessScore = "Normal";
          this.message = "Have a safe drive!";
        } else if (this.blinksPerMinute > 6) {
          this.drowsinessScore = "Moderate";
          this.message = "Be careful.";
        } else {
          this.drowsinessScore = "HIGH";
          this.message = "Pull over and rest immediately.";
        }
      } else {
        if (this.blinksPerMinute > 15) {
          this.drowsinessScore = "Normal";
          this.message = "Have a nice day!";
        } else if (this.blinksPerMinute > 9) {
          this.drowsinessScore = "Moderate";
          this.message = "Get some rest.";
        } else {
          this.drowsinessScore = "HIGH";
          this.message = "Go to sleep.";
        }
      }
    },
  },
  watch: {
    blinksPerMinute() {
      this.checkDrowsiness();
    },
  },
  mounted() {
    const getId = async () => {
      //PARAM: username
      try {
        const response = await this.$axios.post(
          "https://driftrserver.herokuapp.com/getId",
          {
            username: this.$store.state.signedIn,
          }
        );
        //console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };
    const addBlinkData = async () => {
      try {
        const id = await getId();
        const response = await this.$axios.post(
          "https://driftrserver.herokuapp.com/addBlinkData",
          {
            id: id,
            bps: this.blinksPerMinute,
          }
        );
        //console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const trackFace = async () => {
      await tf.setBackend("wasm");
      //console.log(tf.getBackend());

      // Load the MediaPipe facemesh model.
      const model = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
      );
      const video = document.querySelector("video");
      this.loading = false;

      let last_blinked = 0;
      const start_time = new Date().getTime();

      function sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }

      setInterval(addBlinkData, 60000);

      while (true) {
        const faces = await model.estimateFaces({ input: video });

        if (faces.length === 0) {
          this.error =
            "We can't see you, please make sure you are visible in the frame.";
          await sleep(3000);
          continue;
        } else {
          this.error = "";
        }

        const face = faces[0];
        const start = face.boundingBox.topLeft;
        const end = face.boundingBox.bottomRight;
        const size = [end[0] - start[0], end[1] - start[1]];

        const mesh = face.mesh;
        const left = [-1, 33, 160, 158, 133, 153, 144];
        const EAR_LEFT =
          (Math.abs(mesh[left[2]][0] - mesh[left[6]][0]) +
            Math.abs(mesh[left[3]][0] - mesh[left[5]][0])) /
          (2 * Math.abs(mesh[left[1]][1] - mesh[left[4]][1]));
        const right = [-1, 362, 385, 387, 263, 373, 380];
        const EAR_RIGHT =
          (Math.abs(mesh[right[2]][0] - mesh[right[6]][0]) +
            Math.abs(mesh[right[3]][0] - mesh[right[5]][0])) /
          (2 * Math.abs(mesh[right[1]][1] - mesh[right[4]][1]));

        const time_now = new Date().getTime();
        const mins = (time_now - start_time) / 1000 / 60;
        this.blinksPerMinute = Math.round(this.blinks / mins);
        const timeOut = 300;
        const maxEarValue = 0.9;
        //console.log(this.blinks);
        if (
          EAR_LEFT < maxEarValue &&
          EAR_RIGHT < maxEarValue &&
          time_now - last_blinked > timeOut
        ) {
          this.blinks++;
          //console.log(mins)
          last_blinked = new Date().getTime();
        }

        await tf.nextFrame();
        await sleep(100);
      }
    };
    const video = document.getElementById("camera");

    // capture live video stream from web camera
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream;
        });
    }

    function checkVideoLoaded() {
      // check if the video is loaded and ready for processing
      if (video.readyState === 4) {
        console.log("video is ready for processing..");
        trackFace();
      } else {
        console.log("nope, not ready yet..");
        setTimeout(checkVideoLoaded, 20);
      }
    }
    checkVideoLoaded();
  },
};
</script>

<style scoped>
.tracker-text {
  line-height: 0;
}
</style>
