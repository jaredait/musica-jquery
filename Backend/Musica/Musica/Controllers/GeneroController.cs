using Musica.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Musica.Controllers
{
    public class GeneroController : ApiController
    {
        IGenero _generoModelo;

        public GeneroController()
        {
            _generoModelo = new GeneroModelo();
        }

        // GET: api/Genero
        public HttpResponseMessage Get()
        {
            IEnumerable<GENERO> listaGeneros = _generoModelo.getGeneros();
            if (listaGeneros == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No se encontraron generos");
            }
            return Request.CreateResponse(HttpStatusCode.OK, listaGeneros);
        }

        // GET: api/Genero/5
        public HttpResponseMessage Get(string id)
        {
            GENERO generoTemp = _generoModelo.getGenero(id);
            if (generoTemp == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, $"El género con id = {id} no existe");
            }
            return Request.CreateResponse(HttpStatusCode.OK, generoTemp);
        }

        // POST: api/Genero
        public HttpResponseMessage Post([FromBody] GENERO nuevoGenero)
        {
            try
            {
                _generoModelo.addGenero(nuevoGenero);

                var mensaje = Request.CreateResponse(HttpStatusCode.Created, nuevoGenero);
                mensaje.Headers.Location = new Uri(Request.RequestUri + nuevoGenero.GEN_ID.ToString());

                return mensaje;
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // PUT: api/Genero/5
        public HttpResponseMessage Put(string id, [FromBody] GENERO artistaActualizado)
        {
            try
            {
                GENERO generoTemp = _generoModelo.updateGenero(id, artistaActualizado);

                if (generoTemp == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, $"El género con id = {id} no existe");
                }
                return Request.CreateResponse(HttpStatusCode.OK, generoTemp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // DELETE: api/Genero/5
        public HttpResponseMessage Delete(string id)
        {
            try
            {
                bool operacionExitosa = _generoModelo.removeGenero(id);
                if (!operacionExitosa)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, $"El género con id = {id} no existe");
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
