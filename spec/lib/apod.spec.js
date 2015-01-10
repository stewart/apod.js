"use strict";

var apod = source("apod");

describe("apod", function() {
  describe("#latest", function() {
    it("is a function", function() {
      expect(apod.latest).to.be.a("function");
    });
  });

  describe("#forDate", function() {
    it("is a function", function() {
      expect(apod.forDate).to.be.a("function");
    });
  });

  describe("#random", function() {
    it("is a function", function() {
      expect(apod.random).to.be.a("function");
    });
  });
});
