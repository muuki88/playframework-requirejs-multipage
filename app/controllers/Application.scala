package controllers

import play.api._
import play.api.mvc._
import play.api.libs.json._

object Application extends Controller {

  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  def dashboard = Action {
    Ok(views.html.dashboard("Your new application is ready."))
  }

  def sample = Action { implicit request =>
    request.body.asJson map { json =>
      println(json)
    }
    Ok(Json.obj("time" -> System.currentTimeMillis))
  }

  /**
   * Returns the JavaScript router that the client can use for "type-safe" routes.
   * @param varName The name of the global variable, defaults to `jsRoutes`
   */
  def jsRoutes(varName: String = "jsRoutes") = Action { implicit request =>
    import routes.javascript._
    Ok(
      Routes.javascriptRouter(varName)(
        routes.javascript.Application.index,
        routes.javascript.Application.sample)).as(JAVASCRIPT)
  }

}