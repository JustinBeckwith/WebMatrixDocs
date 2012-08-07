using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace TestGallery
{
	public static class HtmlExtensions 
	{
		public static MvcHtmlString WebPage(this HtmlHelper htmlHelper, string url)
		{

			return MvcHtmlString.Create(new WebClient().DownloadString(url));
		}
	}
}