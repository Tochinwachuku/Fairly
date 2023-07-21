using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.ExternalLinks
{
    public class ExternalLinkUpdateRequest : ExternalLinkAddRequest, IModelIdentifier
    {
        [Range(0, Int32.MaxValue)]
        public int Id { get; set; }
    }
}
