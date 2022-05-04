using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Musica
{
    public partial class ARTISTA
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ARTISTA()
        {
            this.ALBUM = new List<ALBUM>();
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual List<ALBUM> ALBUM { get; set; }
    }
}