using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TestGallery.Controllers
{
    public class DocsController : Controller
    {
        //
        // GET: /Docs/

        public ActionResult Index(string path)
        {
			// load the side bar
			using (var sideBarFile = new StreamReader(Server.MapPath("~/StaticContent/develop/extend/sidebar.html")))
			{
				string output = sideBarFile.ReadToEnd();
				output = output.Replace("~/", Url.Content("~/"));
				ViewBag.sidebar = output;
			}

			// load the content
			var localPath = Server.MapPath(string.Format("~/StaticContent/develop/{0}.html", path));
			if (!System.IO.File.Exists(localPath))
			{
				localPath = Server.MapPath(string.Format("~/StaticContent/develop/{0}/default.html", path));
			}

			using (var contentFile = new StreamReader(localPath))
			{
				ViewBag.content = contentFile.ReadToEnd();
			}

            return View();
        }

    }
}
