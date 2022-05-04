using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Musica.Models
{
    public class AlbumModelo : IAlbum
    {
        MusicaEntities _contexto;

        public AlbumModelo()
        {
            _contexto = new MusicaEntities();
            _contexto.Configuration.ProxyCreationEnabled = false;
        }

        public IEnumerable<ALBUM> getAlbumes()
        {
            return _contexto.ALBUM.ToList();
        }

        public ALBUM getAlbum(string id)
        {
            try
            {
                return _contexto.ALBUM.Where(a => a.ALB_ID == id).FirstOrDefault();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public bool addAlbum(ALBUM newAlbum)
        {
            try
            {
                _contexto.ALBUM.Add(newAlbum);
                _contexto.SaveChanges();
                return true;
            }
            catch(Exception ex)
            {
                throw ex;
            }

        }

        public ALBUM updateAlbum(string id, ALBUM updatedAlbum)
        {
            try
            {
                ALBUM albumTemp = _contexto.ALBUM.Where(a => a.ALB_ID == id).FirstOrDefault();

                if (albumTemp != null)
                {
                    albumTemp.ALB_NOMBRE = updatedAlbum.ALB_NOMBRE;
                    albumTemp.ART_ID = updatedAlbum.ART_ID;
                    albumTemp.ALB_FECHA_LANZAMIENTO = updatedAlbum.ALB_FECHA_LANZAMIENTO;

                    _contexto.SaveChanges();
                    return albumTemp;
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool removeAlbum(string id)
        {
            try
            {
                ALBUM albumTemp = _contexto.ALBUM.Where(a => a.ALB_ID.Equals(id)).FirstOrDefault();
                if (albumTemp != null)
                {
                    _contexto.ALBUM.Remove(albumTemp);
                    _contexto.SaveChanges();
                    return true;
                }
                return false;                
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}