using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using AngularJS.InjectHTML.Models;

namespace AngularJS.InjectHTML.Controllers
{
    public class FeedbackController : ApiController
    {
        public FeedbackModel[] Get()
        {
            var htmlContent = "";

            using (var client = new WebClient())
            {
                //client.Proxy = new WebProxy();
                //client.Proxy.Credentials = new NetworkCredential("username","passwd","domain");

                htmlContent = client.DownloadString("http://someurl.com");                
            }

            return new []
                       {
                           new FeedbackModel() {Content = htmlContent}
                       };
        }

    }
}
