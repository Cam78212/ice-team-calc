import { html, fixture, expect } from '@open-wc/testing';
import "../ice-team-calc.js";

describe("IceTeamCalc test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <ice-team-calc
        title="title"
      ></ice-team-calc>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
