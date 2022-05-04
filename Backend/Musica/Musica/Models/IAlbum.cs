using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Musica.Models
{
    public interface IAlbum
    {
        IEnumerable<ALBUM> getAlbumes();
        ALBUM getAlbum(string id);
        bool addAlbum(ALBUM newAlbum);
        ALBUM updateAlbum(string id, ALBUM updatedAlbum);
        bool removeAlbum(string id);        
    }
}