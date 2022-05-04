using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Musica.Models
{
    public interface ICancion
    {
        IEnumerable<CANCION> getCanciones();
        CANCION getCancion(string id);
        bool addCancion(CANCION newCancion);
        CANCION updateCancion(string id, CANCION updatedCancion);
        bool removeCancion(string id);
    }
}