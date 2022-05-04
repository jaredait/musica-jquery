using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Musica
{
    public partial class CANCION
    {
        public virtual ALBUM ALBUM { get; set; }
        public virtual GENERO GENERO { get; set; }
    }
}