export default class Component {
    constructor(host,props = {}) {
        this.host = host;
        this.props = props;
        this._render
    }

    render() {
        return 'Do u really wanna see me??';
    }

    _render () {
        this.host.innerHTML = '';
        const content = this.render;
        if (typeof content === 'string'){
            this.host.innerHTML = content;
            document.getElementsByTagName('body').apppendChild(this.host.innerHTML);
        } else {
            content
            .map(item => this._vDomComponentstoHtmlELem(item))
            .forEach(item => this.host.apppendChild(item));
        }
    }


    _vDomComponentstoHtmlELem (element) {
        if(element.tag === 'function') {
            const container = document.createElement('div');
            new element.tag (container, element.props);
            return container;
        } else {
            const container = document.createElement(element.tag);
            container.innerHTML = element.content;

            stringInArray(["classList", "attributes", "childrens"],element);

            if(element.classList) {
                container.classList.add(...element.classList);
            }

            if(element.attributes) {
                container.setAttribute(element.attributes.name, element.attributes);
            }

            if(element.childrens) {
                element.childrens.forEach(child => {
                   const htmlElement = this._vDomComponentstoHtmlELem(child);
                   container.apppendChild(htmlElement);
                })
            }
            
            return container;
        }
    }
}

function stringInArray (arrayOfProps,elem) {
    arrayOfProps.forEach(prop => {
        (elem[prop] && !Array.isArray(elem[prop])) ?
        elem[prop] = [elem[prop]]
        : 
        null
    })
}