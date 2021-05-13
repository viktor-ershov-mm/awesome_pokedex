import React from "react";
import { shallow, mount } from "enzyme";
import CustomImage from "../customimage/CustomImage";

const setUp = (props = {}) => {
  const component = shallow(<CustomImage {...props} />);
  return component;
};

const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

const findByAttr = (component, attr) => {
  const wrapper = component.find(attr);
  return wrapper;
};

describe("<CustomImage />", () => {
  describe("have props", () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        imageSrc: "some link",
        imageAlt: "high-quality-pokemon",
        imageWidth: "300px",
        imageHeight: "300px",
      };
      wrapper = setUp(props);
    });

    it("renders without errors", () => {
      const component = findByTestAttr(wrapper, "CustomImageComponent");
      expect(component.length).toBe(1);
    });

    it("Should render an img", () => {
      const image = findByTestAttr(wrapper, "image");
      expect(image.length).toBe(1);
    });
  });
});
