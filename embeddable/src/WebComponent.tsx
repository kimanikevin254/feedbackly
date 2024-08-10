import ReactDOM from "react-dom/client";
import Widget from "./components/Widget";

// Type for the normalizeAttribute function
export const normalizeAttribute = (attribute: string): string => {
    return attribute.replace(/-([a-z])/g, (_: string, letter: string) => letter.toUpperCase());
}

// Type for the props object
type Props = Record<string, string>;

class WidgetWebComponent extends HTMLElement {
    #shadowRoot;

    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const props = this.getPropsFromAttributes();
        const root = ReactDOM.createRoot(this.#shadowRoot);
        root.render(<Widget {...props} />);
    }

    getPropsFromAttributes(): Props {
        const props: Props = {};

        for (const { name, value } of Array.from(this.attributes)) {
            props[normalizeAttribute(name)] = value;
        }

        return props;
    }
}

export default WidgetWebComponent;
