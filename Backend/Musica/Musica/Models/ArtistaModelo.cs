using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Musica.Models
{
    public class ArtistaModelo : IArtista
    {
        MusicaEntities _contexto;

        public ArtistaModelo()
        {
            _contexto = new MusicaEntities();
            _contexto.Configuration.ProxyCreationEnabled = false;
        }

        public bool addArtista(ARTISTA newArtista)
        {
            try
            {
                _contexto.ARTISTA.Add(newArtista);
                _contexto.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ARTISTA getArtista(string id)
        {
            try
            {
                return _contexto.ARTISTA.Where(a => a.ART_ID == id).FirstOrDefault();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public IEnumerable<ARTISTA> getArtistas()
        {
            return _contexto.ARTISTA.ToList();
        }

        public bool removeArtista(string id)
        {
            ARTISTA artistaTemp = getArtista(id);
            if (artistaTemp != null)
            {
                _contexto.ARTISTA.Remove(artistaTemp);
                _contexto.SaveChanges();
                return true;
            }
            return false;
        }

        public ARTISTA updateArtista(string id, ARTISTA updatedArtista)
        {
            try
            {
                ARTISTA artistaTemp = getArtista(id);

                if (artistaTemp != null)
                {
                    artistaTemp.ART_NOMBRE = updatedArtista.ART_NOMBRE;
                    artistaTemp.ART_EMAIL = updatedArtista.ART_EMAIL;
                    artistaTemp.ART_FECHA_CREACION = updatedArtista.ART_FECHA_CREACION;
                    artistaTemp.ART_CANT_INTEGRANTES = updatedArtista.ART_CANT_INTEGRANTES;

                    _contexto.SaveChanges();
                    return artistaTemp;
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}