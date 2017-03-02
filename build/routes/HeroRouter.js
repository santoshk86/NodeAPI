"use strict";
const express_1 = require("express");
var Heroes = require("../database/data"), getNextId = require("./getNextId");
var nextId = getNextId(Heroes);
class HeroRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getAll(req, res, next) {
        res.send(Heroes);
    }
    getOne(req, res, next) {
        let query = parseInt(req.params.id);
        let hero = Heroes.find(hero => hero.id === query);
        if (hero) {
            res.status(200)
                .send({
                message: "Success",
                status: res.status,
                hero
            });
        }
        else {
            res.status(404)
                .send({
                message: "No hero found with the given id.",
                status: res.status
            });
        }
    }
    saveHero(req, res, next) {
        var newHero = req.body;
        newHero.id = nextId;
        nextId++;
        Heroes.push(newHero);
        res.send({ message: "Success", status: "201", newHero });
        res.end();
    }
    updateHero(req, res, next) {
        var inputHero = req.body;
        let query = parseInt(req.params.id);
        let hero = Heroes.find(hero => hero.id === query);
        if (hero) {
            hero.name = inputHero.name;
            hero.occupation = inputHero.occupation;
        }
        res.send(hero);
        res.end();
    }
    init() {
        this.router.get("/", this.getAll);
        this.router.post("/", this.saveHero);
        this.router.put("/:id", this.updateHero);
        this.router.get("/:id", this.getOne);
    }
}
exports.HeroRouter = HeroRouter;
const heroRoutes = new HeroRouter();
heroRoutes.init();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = heroRoutes.router;
//# sourceMappingURL=C:/ng2/nodeAPI/compiled/routes/HeroRouter.js.map