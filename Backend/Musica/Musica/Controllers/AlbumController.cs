using Musica.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Musica.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AlbumController : ApiController
    {
        IAlbum _albumModelo;

        public AlbumController()
        {
            _albumModelo = new AlbumModelo();
        }

        // GET: api/Album
        public HttpResponseMessage Get()
        {
            IEnumerable<ALBUM> listaAlbumes = _albumModelo.getAlbumes();
            if (listaAlbumes == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No se encontraron albumes");
            }
            return Request.CreateResponse(HttpStatusCode.OK, listaAlbumes);
        }

        // GET: api/Album/5
        public HttpResponseMessage Get(string id)
        {
            ALBUM albumTemp = _albumModelo.getAlbum(id);
            if (albumTemp == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, $"El album con id = {id} no existe");
            }
            return Request.CreateResponse(HttpStatusCode.OK, albumTemp);
        }

        // POST: api/Album
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public HttpResponseMessage Post([FromBody] ALBUM nuevoAlbum)
        {
            try
            {
                _albumModelo.addAlbum(nuevoAlbum);

                var mensaje = Request.CreateResponse(HttpStatusCode.Created, nuevoAlbum);
                mensaje.Headers.Location = new Uri(Request.RequestUri + nuevoAlbum.ALB_ID.ToString());

                return mensaje;
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }

        }

        // PUT: api/Album/5
        public HttpResponseMessage Put(string id, [FromBody] ALBUM albumActualizado)
        {
            try
            {
                ALBUM albumTemp = _albumModelo.updateAlbum(id, albumActualizado);

                if (albumTemp == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, $"El album con id = {id} no existe");
                }
                return Request.CreateResponse(HttpStatusCode.OK, albumTemp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // DELETE: api/Album/5
        public HttpResponseMessage Delete(string id)
        {
            try
            {
                bool operacionExitosa = _albumModelo.removeAlbum(id);
                if (!operacionExitosa)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, $"El album con id = {id} no existe");
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
