import { Router, Request, Response, NextFunction } from "express";
// tslint:disable-next-line:typedef
var Heroes = require("../database/data"),
  getNextId = require("./getNextId");
var nextId = getNextId(Heroes);

export class HeroRouter {
  router: Router;

  /**
   * Initialize the HeroRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all Heroes.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    res.send(Heroes);
  }

  /**
   * GET one hero by id
*/
  public getOne(req: Request, res: Response, next: NextFunction) {
    // tslint:disable-next-line:typedef
    let query = parseInt(req.params.id);
    // tslint:disable-next-line:typedef
    let hero = Heroes.find(hero => hero.id === query);
    if (hero) {
      res.status(200)
        .send({
          message: "Success",
          status: res.status,
          hero
        });
    } else {
      res.status(404)
        .send({
          message: "No hero found with the given id.",
          status: res.status
        });
    }
  }
  ///
  public saveHero(req: Request, res: Response, next: NextFunction) {
    var newHero = req.body;
    newHero.id = nextId;
    nextId++;
    Heroes.push(newHero);
    res.send({ message: "Success", status: "201", newHero });
    res.end();
  }

  ///
  public updateHero(req: Request, res: Response, next: NextFunction) {
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

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  // tslint:disable-next-line:typedef
  init() {
    this.router.get("/", this.getAll);
    this.router.post("/", this.saveHero);
    this.router.put("/:id", this.updateHero);
    this.router.get("/:id", this.getOne);
  }

}

// create the HeroRouter, and export its configured Express.Router
// tslint:disable-next-line:typedef
const heroRoutes = new HeroRouter();
heroRoutes.init();

export default heroRoutes.router;