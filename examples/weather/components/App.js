import { define, emit } from "../../../src/sunup.js";
import IncrementButton from "./IncrementButton.js";

export default define({
  selector: "sunup-app",
  template: ({ state, methods }) => /*html*/ `
    <div class="background">
      <span id="date">${methods.formatDate({state})}</span>
    </div>
  `,
  style: () => /*css*/ `
    :host {
      --w: calc(.56 * var(--h));
      --h: calc(100vh - 20px);
      width: var(--w);
      height: var(--h);
      font-family: var(--font);
      border-radius: 10px;
      overflow: hidden;
      box-sizing: border-box;
    }

    .background {
      height: 100%;
      width: 100%;
      background: var(--background-gradient);
      padding: 50px 0 0;
    }

    #date {
      display: flex;
      justify-content: center;
      font-weight: 400;
      color: var(--white-color);
      font-size: var(--regular-font-size);
    }
  `,
  state: {
    date: Date.now(),
  },
  methods: {
    setTitle({ state, root }) {
      state.title = `Hello, ${state.name}!`;
    },
    formatDate({ state }) {
      const options = {weekday: "short", month: "long", day: "numeric"};
      return new Date(state.date).toLocaleDateString("en-US", options);
    }
  },
  watch: {
    state: {
      title({ root, state }) {
        root.querySelector("#title").textContent = state.title;
      },
    },
  },
});
