import {shallow} from "enzyme";
import App from "../../src/components/App";

describe("App", () => {
    let component;

    beforeEach(() => {
        component = shallow(<App/>);
    });

    it("renders something", () => {
        expect(component).to.exist;
    });
});
