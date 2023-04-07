import sinon, {
	SinonFakeXMLHttpRequest,
	SinonFakeXMLHttpRequestStatic,
} from "sinon";
import { expect } from "chai";
import HTTPTransport, { METHODS } from "./HTTPTransport";

describe("HTTPTransport class", () => {
	let xhr: SinonFakeXMLHttpRequestStatic;
	let instance: HTTPTransport;
	let requests: SinonFakeXMLHttpRequest[] = [];
	const originalXMLHttpRequest = global.XMLHttpRequest;

	before(() => {
		xhr = sinon.useFakeXMLHttpRequest();

		// @ts-ignore
		global.XMLHttpRequest = xhr;

		xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
			requests.push(request);
		};
	});

	beforeEach(() => {
		instance = new HTTPTransport("/auth");
		requests = [];
	});

	after(() => {
		global.XMLHttpRequest = originalXMLHttpRequest;
	});

	describe("Get method", () => {
		it("should make GET request", () => {
			instance.get("/user", {});

			const [request] = requests;

			expect(request.method).to.eq(METHODS.GET);
		});
	});

	describe("Post method", () => {
		it("should make POST request", () => {
			instance.post("/user", {});

			const [request] = requests;

			expect(request.method).to.eq(METHODS.POST);
		});
	});

	describe("Put method", () => {
		it("should make PUT request", () => {
			instance.put("/user", {});

			const [request] = requests;

			expect(request.method).to.eq(METHODS.PUT);
		});
	});

	describe("Delete method", () => {
		it("should make DELETE request", () => {
			instance.delete("/user", {});

			const [request] = requests;

			expect(request.method).to.eq(METHODS.DELETE);
		});
	});
});
