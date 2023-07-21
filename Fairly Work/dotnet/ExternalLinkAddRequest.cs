using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.ExternalLinks
{
    public class ExternalLinkAddRequest
    {

        [Required]
        [Range(1, Int32.MaxValue)]
        public int UrlTypeId { get; set; }

        [Required]
        [StringLength(255)]
        public string Url { get; set; }

        #nullable enable

        [Range(1, Int32.MaxValue)]
        public int? EntityId { get; set; }

        [Range(1, 5)]

        public int? EntityTypeId { get; set; }
        #nullable disable
    }
}
