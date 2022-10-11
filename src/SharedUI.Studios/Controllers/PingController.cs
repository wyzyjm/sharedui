using Microsoft.AspNetCore.Mvc;

namespace Microsoft.Azure.SharedUI.Studios.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PingController : ControllerBase
    {
        public PingController()
        {
        }

        [HttpGet]
        public bool Get()
        {
            return true;
        }
    }
}
