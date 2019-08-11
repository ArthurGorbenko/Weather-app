export default class Component {
  constructor(host, props = {}) {
    this.host = host;
    this.props = props;
    this.init();
    this._render();
  }

  render() {
    return "Do u really wanna see me??";
  }

  init() {}

  updateState(stateDelta) {
    this.state = Object.assign({}, this.state, stateDelta);
    this._render();
  }

  _render() {
    this.host.innerHTML = "";
    const content = this.render();
    content
      .map(item => this._vDomComponentstoHtmlELem(item))
      .forEach(htmlElement => this.host.appendChild(htmlElement));
  }

  _vDomComponentstoHtmlELem(element) {
    stringInArray(["classList", "attributes", "childrens"], element);

    if (typeof element === "string") {
      const container = document.createTextNode(element);
      return container;
    } else if (typeof element.tag === "function") {
      const container = document.createElement(element.tagName || "div");
      element.classList.forEach(className =>
        container.classList.add(className)
      );

      new element.tag(container, element.props);
      return container;
    } else {
      if (element.tag === "img") {
        const image = new Image();
        image.src = element.src;
        if (Array.isArray(image.classList)) {
          image.classList = [image.classList];
        }
        if (image.classList) {
          image.classList.add(...element.classList);
        }
        image.classList.forEach(className => image.classList.add(className));
        this.host.appendChild(image);
        return image;
      }
      const container = document.createElement(element.tag);

      if (element.content) {
        container.innerHTML = element.content;
      }

      if (element.classList) {
        container.classList.add(...element.classList);
      }

      if (element.attributes) {
        element.attributes.forEach(spec => {
          container.setAttribute(spec.name, spec.value);
        });
      }

      if (element.eventHandlers) {
        Object.keys(element.eventHandlers).forEach(event => {
          container.addEventListener(event, element.eventHandlers[event]);
        });
      }

      if (element.childrens) {
        element.childrens.forEach(child => {
          const htmlElement = this._vDomComponentstoHtmlELem(child);
          container.appendChild(htmlElement);
        });
      }
      return container;
    }
  }
}

function stringInArray(arrayOfProps, elem) {
  arrayOfProps.forEach(prop => {
    elem[prop] && !Array.isArray(elem[prop])
      ? (elem[prop] = [elem[prop]])
      : null;
  });
}
