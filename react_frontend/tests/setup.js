import React from "react";
import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import sinon from "sinon";
import chaiAsPromised from "chai-as-promised";
import {JSDOM} from 'jsdom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

chai.use(sinonChai);
chai.use(chaiAsPromised);

const {document} = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.document = document;
global.window = document.defaultView;
global.navigator = { userAgent: "browser" };

global.React = React;
global.expect = expect;
global.sinon = sinon;

global.fdescribe = (...args) => describe.only(...args);
global.fit = (...args) => it.only(...args);

window.matchMedia = window.matchMedia || function matchMedia() {
    return {
        matches: () => {
        },
        addListener: () => {
        },
        removeListener: () => {
        },
    };
};
