using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Musica.Models
{
    public interface IArtista
    {
        IEnumerable<ARTISTA> getArtistas();
        ARTISTA getArtista(string id);
        bool addArtista(ARTISTA newArtista);
        ARTISTA updateArtista(string id, ARTISTA updatedArtista);
        bool removeArtista(string id);
    }
}
