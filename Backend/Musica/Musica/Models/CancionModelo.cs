using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Musica.Models
{
    public class CancionModelo : ICancion
    {
        MusicaEntities _contexto;

        public CancionModelo()
        {
            _contexto = new MusicaEntities();
            _contexto.Configuration.ProxyCreationEnabled = false;
        }

        public bool addCancion(CANCION newCancion)
        {
            try
            {
                _contexto.CANCION.Add(newCancion);
                _contexto.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public CANCION getCancion(string id)
        {
            try
            {
                return _contexto.CANCION.Where(c => c.CAN_ID == id).FirstOrDefault();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public IEnumerable<CANCION> getCanciones()
        {
            return _contexto.CANCION.ToList();
        }

        public bool removeCancion(string id)
        {
            CANCION cancionTemp = getCancion(id);
            if (cancionTemp != null)
            {
                _contexto.CANCION.Remove(cancionTemp);
                _contexto.SaveChanges();
                return true;
            }
            return false;
        }

        public CANCION updateCancion(string id, CANCION updatedCancion)
        {
            try
            {
                CANCION cancionTemp = getCancion(id);

                if(cancionTemp != null)
                {
                    cancionTemp.CAN_NOMBRE = updatedCancion.CAN_NOMBRE;
                    cancionTemp.CAN_DURACION = updatedCancion.CAN_DURACION;
                    cancionTemp.ALB_ID = updatedCancion.ALB_ID;
                    cancionTemp.GEN_ID = updatedCancion.GEN_ID;

                    _contexto.SaveChanges();
                    return cancionTemp;
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