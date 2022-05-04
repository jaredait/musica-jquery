using Musica.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Musica.Controllers
{
    public class ArtistaController : ApiController
    {
        private IArtista _artistaModelo;

        public ArtistaController()
        {
            _artistaModelo = new ArtistaModelo();
        }

        // GET: api/Artista
        public HttpResponseMessage Get()
        {
            IEnumerable<ARTISTA> listaArtistas = _artistaModelo.getArtistas();
            if (listaArtistas == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No se encontraron artistas");
            }
            return Request.CreateResponse(HttpStatusCode.OK, listaArtistas);
        }

        // GET: api/Artista/5
        public HttpResponseMessage Get(string id)
        {
            ARTISTA cancionTemp = _artistaModelo.getArtista(id);
            if (cancionTemp == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, $"El artista con id = {id} no existe");
            }
            return Request.CreateResponse(HttpStatusCode.OK, cancionTemp);
        }

        // POST: api/Artista
        public HttpResponseMessage Post([FromBody] ARTISTA nuevoArtista)
        {
            try
            {
                _artistaModelo.addArtista(nuevoArtista);

                var mensaje = Request.CreateResponse(HttpStatusCode.Created, nuevoArtista);
                mensaje.Headers.Location = new Uri(Request.RequestUri + nuevoArtista.ART_ID.ToString());

                return mensaje;
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // PUT: api/Artista/5
        public HttpResponseMessage Put(string id, [FromBody]ARTISTA artistaActualizado)
        {
            try
            {
                ARTISTA cancionTemp = _artistaModelo.updateArtista(id, artistaActualizado);

                if (cancionTemp == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, $"El artista con id = {id} no existe");
                }
                return Request.CreateResponse(HttpStatusCode.OK, cancionTemp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // DELETE: api/Artista/5
        public HttpResponseMessage Delete(string id)
        {
            try
            {
                bool operacionExitosa = _artistaModelo.removeArtista(id);
                if (!operacionExitosa)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, $"El artista con id = {id} no existe");
                }
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
