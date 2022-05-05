/// <reference path="../jquery-3.6.0.slim.min.js" />

//onst { error } = require("jquery");

let urlAlbum = "http://localhost:9070/api/album/";


function alertar() {
    alert("hola");
}

function ObtenerTodosLosAlbumes() {
    $.ajax(
        {
            type: "GET",
            url: urlAlbum,
            dataType: "json",    // para post put o delete usar contentType. dataType especifica el tipo de dato que el servidor devolvera.
            success: function (data, textStatus, jqXHR) {
                $.each(data, function (key, value) {
                    $(
                        '<tr>' +
                        '<td>' + value.ALB_ID + '</td>' +
                        '<td>' + value.ART_ID + '</td>' +
                        '<td>' + value.ALB_NOMBRE + '</td>' +
                        '<td>' + value.ALB_FECHA_LANZAMIENTO + '</td>' +
                        '</tr>'
                    ).appendTo("#AlbumesTabla");
                }

                );
            },
            error: function (jqHHR, textStatus, errorThrown) {
                alert($`Status: ${textStatus} (${errorThrown})`);
            }
        }
    );
}

function ObtenerAlbumPorId(albumId) {
    $.ajax(
        {
            type: "GET",
            url: urlAlbum + albumId,
            dataType: "json",
            success: function (data) {
                detail = "<div><strong>ID:</strong></div>" + "<div>" + data.ALB_ID + "</div>" + "<br />" +
                    "<div><strong>Nombre:</strong></div>" + "<div>" + data.ALB_NOMBRE + "</div>" + "<br />" +
                    "<div><strong>Artista:</strong></div>" + "<div>" + data.ART_ID + "</div>" + "<br />" +
                    "<div><strong>Fecha de lanzamiento:</strong></div>" + "<div>" + data.ALB_FECHA_LANZAMIENTO + "</div>" + "<br />";
                $("#lista-albumes").html(detail);
            },
            error: function (jqHHR, textStatus, errorThrown) {
                alert($`Status: ${textStatus} (${errorThrown})`);
            }
        }
    );
}

function CrearAlbum() {
    var albumNuevo =
    {
        ALB_ID: $("#ALB_ID").val(),
        ALB_NOMBRE: $("#ALB_NOMBRE").val(),
        ART_ID: $("#ART_ID").val(),
        ALB_FECHA_LANZAMIENTO: $("#ALB_FECHA_LANZAMIENTO").val()
    };

    $.ajax(
        {
            type: "POST",
            url: urlAlbum,
            data: albumNuevo,
            contenType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, status, jqXHR) {
                $("#id-insertado").val(data.ALB_ID);
                $("#nombre-insertado").val(data.ALB_NOMBRE);

            },
            error: function (jqHHR, textStatus, errorThrown) {
                alert($`Status: ${textStatus} (${errorThrown})`);
            }
        }
    );

    limpiarCampos();
}

function Actualizar() {
    var albumActualizado =
    {
        ALB_ID: $("#ALB_ID").val(),
        ALB_NOMBRE: $("#ALB_NOMBRE").val(),
        ART_ID: $("#ART_ID").val(),
        ALB_FECHA_LANZAMIENTO: $("#ALB_FECHA_LANZAMIENTO").val()
    };
    $.ajax(
        {
            type: "PUT",
            url: urlAlbum + albumActualizado.ALB_ID,
            data: albumActualizado,
            contenType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, status, jqXHR) {
                $("#id-insertado").val(data.ALB_ID);
                $("#nombre-insertado").val(data.ALB_NOMBRE);

            },
            error: function (jqHHR, textStatus, errorThrown) {
                alert($`Status: ${textStatus} (${errorThrown})`);
            }
        }
    );
    limpiarCampos();
}

function Eliminar(id) {
    $.ajax(
        {
            type: "DELETE",
            url: urlAlbum + id,
            dataType: "json",
            success: function (data) {
                if (data === null || data === undefined) {

                }
                
                window.location.reload();
            },
            error: function (jqHHR, textStatus, errorThrown) {
                alert('Status: ' + textStatus + ' (' +errorThrown +')');
            }
        }
    );
    $("#album-id").val("");
    
}

function limpiarCampos() {
    $("#ALB_ID").val("")
    $("#ALB_NOMBRE").val("")
    $("#ART_ID").val("")
    $("#ALB_FECHA_LANZAMIENTO").val("");
}