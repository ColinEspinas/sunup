import { define, emit } from "../../src/sunup.js";
import IncrementButton from "./IncrementButton.js";

export default define({
  selector: "sunup-app",
  template: ({ state }) => /*html*/ `
    <h1 id="title" @click="setTitle">${state.title}</h1>
    <button is="increment-button"></button>
  `,
  style: () => /*css*/ `
    :host {
      display: flex;
      width: 100%;
      height: 100vh;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'Inter', sans-serif;
    }

    h1 {
      color: red;
    }
  `,
  state: {
    title: "Hello, Sunup!",
    name: "You",
  },
  methods: {
    setTitle({ state, root }) {
      state.title = `Hello, ${state.name}!`;
    },
  },
  watch: {
    state: {
      title({ root, state }) {
        root.querySelector("#title").textContent = state.title;
      },
    },
  },
});
