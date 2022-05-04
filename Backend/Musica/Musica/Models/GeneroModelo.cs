using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Musica.Models
{
    public class GeneroModelo : IGenero
    {
        MusicaEntities _contexto;

        public GeneroModelo()
        {
            _contexto = new MusicaEntities();
            _contexto.Configuration.ProxyCreationEnabled = false;
        }
        
        public bool addGenero(GENERO newGenero)
        {
            try
            {
                _contexto.GENERO.Add(newGenero);
                _contexto.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public GENERO getGenero(string id)
        {
            try
            {
                return _contexto.GENERO.Where(g => g.GEN_ID == id).FirstOrDefault();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public IEnumerable<GENERO> getGeneros()
        {
            return _contexto.GENERO.ToList();
        }

        public bool removeGenero(string id)
        {
            GENERO generoTemp = getGenero(id);
            if (generoTemp != null)
            {
                _contexto.GENERO.Remove(generoTemp);
                _contexto.SaveChanges();
                return true;
            }
            return false;
        }

        public GENERO updateGenero(string id, GENERO updatedGenero)
        {
            try
            {
                GENERO generoTemp = getGenero(id);

                if (generoTemp != null)
                {
                    generoTemp.GEN_NOMBRE = updatedGenero.GEN_NOMBRE;

                    _contexto.SaveChanges();
                    return generoTemp;
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