using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SurveyWeb.Filters;
using cl = Survey.Controllers;

namespace SurveyWeb.Controllers
{
    [ValidarUsuario]
    public class DashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public ActionResult ObterQuestionariosInicio(int Ano)
        {
            int idUsuario = int.Parse(Request.Cookies["idUsuario"].ToString());
            var q = new cl.QuestionarioController().ObterPorUsuario(idUsuario);
            var dadosGrafico = (from x in q
                                where x.Inicio.Year == Ano
                                group x by new { x.Inicio.Month } into g
                                select new
                                {
                                    Mes = g.Key.Month,
                                    Quantidade = g.Count()
                                }).ToList();
            if (dadosGrafico.Count > 0)
                return Json(dadosGrafico);
            else
                return Json("");
        }

        public ActionResult ObterQuestionariosFim(int Ano)
        {
            int idUsuario = int.Parse(Request.Cookies["idUsuario"].ToString());
            var q = new cl.QuestionarioController().ObterPorUsuario(idUsuario);
            var dadosGrafico = (from x in q
                                where x.Fim.Year == Ano
                                group x by new { x.Fim.Month } into g
                                select new
                                {
                                    Mes = g.Key.Month,
                                    Quantidade = g.Count()
                                }).ToList();
            if (dadosGrafico.Count > 0)
                return Json(dadosGrafico);
            else
                return Json("");
        }

    }
}