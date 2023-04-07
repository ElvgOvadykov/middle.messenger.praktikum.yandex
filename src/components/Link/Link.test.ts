import { expect } from "chai";
import sinon from "sinon";
import Router from "@router/Router";
import Link from "./index";

describe("Link component", () => {
	const linkTitle = "Home page";
	const linkHref = "/";
	const spy = sinon.spy(Router, "go");
	let link = new Link({ linkHref, linkTitle });

	beforeEach(() => {
		link = new Link({ linkHref, linkTitle });
		spy.resetHistory();
	});

	it("should render", () => {
		new Link({ linkHref, linkTitle: "label" });
	});

	it("should render passed label", () => {
		expect(link.element?.textContent).to.eq(linkTitle);
	});

	it("element should return anchor", () => {
		const { element } = link;

		expect(element).to.be.instanceOf(window.HTMLAnchorElement);
	});

	it("should call Router.go on click", () => {
		const element = link.element as HTMLAnchorElement;

		element?.click();

		expect(spy.calledOnce).to.eq(true);
	});

	it("should call Router.go with passed route on click", () => {
		const element = link.element as HTMLAnchorElement;

		element?.click();

		expect(spy.calledOnceWith(linkHref)).to.eq(true);
	});
});
