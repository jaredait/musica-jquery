using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Musica
{
    public partial class ALBUM
    {
        public virtual ARTISTA ARTISTA { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual List<CANCION> CANCION { get; set; }
    }
}