import use from "../../../src/use.js";

export default async () => {

  const Component = await use('../../src/component.js');
  const name = Component.tag(import.meta.url);
  const css = await use(`../../example/components/test-component/${name}.css`);
  const htm = await use(`../../example/components/test-component/${name}.htm`);

  class Test extends Component {

    connected() {
      console.log("Connected !");

      this.css = css;
      this.htm = htm;
    }
  }

  customElements.define(name, Test);

  return Test;
};