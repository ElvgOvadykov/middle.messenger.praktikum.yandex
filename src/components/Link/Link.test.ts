import { expect } from "chai";
import sinon from "sinon";
import Router from "@router/Router";
import Link from "./index";

describe("Link component", () => {
	const linkTitle = "Home page";
	const linkHref = "/";

	it("should render", () => {
		new Link({ linkHref, linkTitle: "label" });
	});

	it("should render passed label", () => {
		const link = new Link({ linkHref, linkTitle });

		expect(link.element?.textContent).to.eq(linkTitle);
	});

	it("element should return anchor", () => {
		const link = new Link({ linkHref, linkTitle });
		const { element } = link;

		expect(element).to.be.instanceOf(window.HTMLAnchorElement);
	});

	it("should call Router.go on click", () => {
		const link = new Link({ linkHref, linkTitle });
		const spy = sinon.spy(Router, "go");
		const element = link.element as HTMLAnchorElement;

		element?.click();

		expect(spy.calledOnce).to.eq(true);
	});

	it.only("should call Router.go with passed route on click", () => {
		const link = new Link({ linkHref, linkTitle });
		const spy = sinon.spy(Router, "go");
		const element = link.element as HTMLAnchorElement;

		element?.click();

		expect(spy.calledOnceWith(linkHref)).to.eq(true);
	});
});
