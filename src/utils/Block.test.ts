import proxyquire from "proxyquire";
import { expect } from "chai";
import sinon from "sinon";
import type BlockType from "./Block";
import { BlockEvents } from "./Block";

const eventBusMock = {
	on: sinon.stub(),
	emit: sinon.stub(),
};

const { default: Block } = proxyquire("./Block", {
	"./EventBus": {
		default: class {
			emit = eventBusMock.emit;

			on = eventBusMock.on;
		},
	},
}) as { default: typeof BlockType };

describe("Block", () => {
	class ComponentMock extends Block {}

	beforeEach(() => {
		eventBusMock.emit.reset();
		eventBusMock.on.reset();
	});

	it("should fire init event on initialization", () => {
		new ComponentMock({});

		expect(eventBusMock.emit.calledWith(BlockEvents.INIT)).to.eq(true);
	});

	it("should fire component-did-update event on set props", () => {
		const component = new ComponentMock({ value: 1 });
		const newValue = 2;

		component.setProps({ value: newValue });

		expect(eventBusMock.emit.calledWith(BlockEvents.FLOW_CDU)).to.eq(true);
	});
});
