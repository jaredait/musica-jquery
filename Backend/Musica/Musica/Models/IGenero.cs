using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Musica.Models
{
    public interface IGenero
    {
        IEnumerable<GENERO> getGeneros();
        GENERO getGenero(string id);
        bool addGenero(GENERO newGenero);
        GENERO updateGenero(string id, GENERO updatedGenero);
        bool removeGenero(string id);
    }
}