import sinon from "sinon";
import { expect } from "chai";
import { BlockConstructor } from "@utils/Block";
import Router from "./Router";

describe("Router", () => {
	const originalBack = global.window.history.back;
	const originalForward = global.window.history.forward;

	const getContentFake = sinon.fake.returns(document.createElement("div"));

	const BlockMock = class {
		getContent = getContentFake;

		// eslint-disable-next-line @typescript-eslint/no-empty-function
		dispatchComponentDidMount = () => {};

		// eslint-disable-next-line @typescript-eslint/no-empty-function
		show = () => {};

		// eslint-disable-next-line @typescript-eslint/no-empty-function
		hide = () => {};
	} as unknown as BlockConstructor;

	before(() => {
		global.window.history.back = () => {
			if (typeof window.onpopstate === "function") {
				window.onpopstate({
					currentTarget: window,
				} as unknown as PopStateEvent);
			}
		};
		global.window.history.forward = () => {
			if (typeof window.onpopstate === "function") {
				window.onpopstate({
					currentTarget: window,
				} as unknown as PopStateEvent);
			}
		};
	});

	beforeEach(() => {
		getContentFake.resetHistory();
	});

	after(() => {
		global.window.history.back = originalBack;
		global.window.history.forward = originalForward;
	});

	it("use() should return Router instance", () => {
		const result = Router.use("/", BlockMock);

		expect(result).to.eq(Router);
	});

	describe(".back()", () => {
		it("should render a page on history back action", () => {
			Router.use("/", BlockMock).start();

			Router.back();

			expect(getContentFake.callCount).to.eq(1);
		});
	});

	it("should render a page on start", () => {
		Router.use("/", BlockMock).start();

		expect(getContentFake.callCount).to.eq(1);
	});
});
